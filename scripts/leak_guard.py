#!/usr/bin/env python3
"""Leak guard: block commits that contain private data.

Checks every file it is given (or every tracked file with --all) for:
  1. Blocked file types and folders (.env, .xlsx, .zip, .vcf, WhatsApp exports,
     anything under Chats/, _raw/ or data/).
  2. Indian mobile numbers: 10 digits starting 6-9, with or without +91 / 0.
     The placeholders 9999999999 and 9199999999 are allowed.
  3. Any name on the do-not-publish list. The list's path comes from the
     DO_NOT_PUBLISH_FILE env var (or the same key in .env). Matched names are
     never printed, only their line number in the list, so CI logs stay clean.

Usage:
  python scripts/leak_guard.py            # scan all tracked files
  python scripts/leak_guard.py FILE ...   # scan these files (pre-commit)

Exit code 1 if anything is found. Standard library only.
"""

import os
import re
import subprocess
import sys
from pathlib import Path

ALLOWED_NUMBERS = {"9999999999", "9199999999"}

# (?<![0-9A-Za-z]) stops matches inside hashes and IDs like a1b2c3...
PHONE_RE = re.compile(
    r"(?<![0-9A-Za-z])(?:\+?91[\s-]?|0)?([6-9]\d{4}[\s-]?\d{5})(?![0-9A-Za-z])"
)

BLOCKED_SUFFIXES = {".xlsx", ".zip", ".vcf"}
BLOCKED_DIRS = {"chats", "_raw", "data"}
MAX_BYTES = 5_000_000


def blocked_path(path: Path) -> str | None:
    name = path.name.lower()
    if name == ".env" or (name.endswith(".env") and name != ".env.example"):
        return "env file"
    if path.suffix.lower() in BLOCKED_SUFFIXES:
        return f"{path.suffix} file"
    if "whatsapp chat" in name:
        return "WhatsApp export"
    for part in path.parts[:-1]:
        if part.lower() in BLOCKED_DIRS:
            return f"inside a {part}/ folder"
    return None


def read_env_value(key: str) -> str | None:
    if os.environ.get(key):
        return os.environ[key]
    env_file = Path(".env")
    if env_file.is_file():
        for line in env_file.read_text(encoding="utf-8", errors="ignore").splitlines():
            if line.strip().startswith(f"{key}="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    return None


def load_names() -> tuple[list[tuple[int, re.Pattern]], Path | None]:
    list_path = read_env_value("DO_NOT_PUBLISH_FILE")
    if not list_path:
        print("leak-guard: WARNING DO_NOT_PUBLISH_FILE not set, name check skipped")
        return [], None
    path = Path(list_path)
    if not path.is_file():
        print(f"leak-guard: WARNING do-not-publish list not found at {path}, name check skipped")
        return [], None
    names = []
    for i, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
        name = line.strip()
        if name and not name.startswith("#"):
            names.append((i, re.compile(rf"(?<!\w){re.escape(name)}(?!\w)", re.IGNORECASE)))
    return names, path.resolve()


def tracked_files() -> list[str]:
    out = subprocess.run(["git", "ls-files", "-z"], capture_output=True, text=True, check=True)
    return [f for f in out.stdout.split("\0") if f]


def scan(files: list[str]) -> int:
    names, list_path = load_names()
    problems = 0
    for f in files:
        path = Path(f)
        reason = blocked_path(path)
        if reason:
            print(f"{f}: blocked file ({reason})")
            problems += 1
            continue
        if not path.is_file() or (list_path and path.resolve() == list_path):
            continue
        data = path.read_bytes()
        if len(data) > MAX_BYTES or b"\0" in data[:8000]:
            continue  # binary or very large: gitleaks covers secrets here
        text = data.decode("utf-8", errors="ignore")
        for lineno, line in enumerate(text.splitlines(), start=1):
            for m in PHONE_RE.finditer(line):
                digits = re.sub(r"\D", "", m.group(1))
                if digits not in ALLOWED_NUMBERS:
                    print(f"{f}:{lineno}: Indian mobile number ({digits[:2]}******{digits[-2:]})")
                    problems += 1
            for list_line, pattern in names:
                if pattern.search(line):
                    print(f"{f}:{lineno}: name from do-not-publish list (entry on line {list_line})")
                    problems += 1
    return problems


def main() -> int:
    files = sys.argv[1:] or tracked_files()
    problems = scan(files)
    if problems:
        print(f"leak-guard: {problems} problem(s) found. Commit blocked.")
        return 1
    print(f"leak-guard: {len(files)} file(s) clean")
    return 0


if __name__ == "__main__":
    sys.exit(main())
