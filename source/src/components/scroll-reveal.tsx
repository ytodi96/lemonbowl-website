import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Site-wide scroll reveal. Adds the `.reveal` transition to top-level page
 * sections and unlocks them as they enter the viewport, so sections settle in
 * gently instead of popping. Purely presentational — no layout changes.
 */
export function ScrollReveal() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let observer: IntersectionObserver | null = null;

    const frame = window.setTimeout(() => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("main section")).filter(
        (section) => {
          if (section.dataset["reveal"] === "off") return false;
          if (section.className.includes("sticky") || section.className.includes("fixed")) {
            return false;
          }
          return section.closest("section") === section;
        },
      );

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).dataset["revealState"] = "shown";
              observer?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
      );

      for (const section of sections) {
        const box = section.getBoundingClientRect();
        // Anything already on screen (hero, first fold) shows immediately.
        if (box.top < window.innerHeight * 0.9) continue;
        section.dataset["revealState"] = "hidden";
        observer.observe(section);
      }
    }, 80);

    return () => {
      window.clearTimeout(frame);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
