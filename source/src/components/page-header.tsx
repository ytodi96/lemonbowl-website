import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export function Placeholder({ label }: { label: string }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
        <p className="eyebrow">Coming next</p>
        <p className="mt-3 font-display text-xl">{label}</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          This section is part of the navigational shell and will be filled with full content.
        </p>
      </div>
    </div>
  );
}
