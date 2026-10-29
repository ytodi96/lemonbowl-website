import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";

const title = "Monthly Subscription Enquiry — The Lemon Bowl";
const description =
  "Tell us how often you'd like a curated Lemon Bowl spread for your leadership team, client meetings or recurring events, and we'll design a monthly plan.";

export const Route = createFileRoute("/occasions/subscription")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SubscriptionEnquiry,
});

const FREQUENCIES = [
  "Once a month",
  "Twice a month",
  "Weekly",
  "Quarterly",
  "Not sure yet — advise me",
];

function SubscriptionEnquiry() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Subscription"
        title="Enquire about a monthly plan"
        description="A curated spread for your leadership team, client meetings or recurring events — planned once, delivered on a schedule."
      />

      <section className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:py-20">
        <Link
          to="/occasions/$slug"
          params={{ slug: "corporate" }}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to corporate occasions
        </Link>

        {sent ? (
          <div className="mt-8 rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-soft)]">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-6 w-6" aria-hidden />
            </span>
            <h2 className="mt-5 font-display text-2xl">Thank you — we have your enquiry</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A Lemon Bowl team member will reach out within 24 hours to shape the plan around your
              calendar.
            </p>
            <Link
              to="/order"
              className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
            >
              Browse the menu meanwhile
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
            className="mt-8 space-y-5 rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]"
          >
            <Field label="Your name" name="name">
              <input
                required
                name="name"
                id="name"
                autoComplete="name"
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
              />
            </Field>

            <Field label="Company or organisation" name="company">
              <input
                required
                name="company"
                id="company"
                autoComplete="organization"
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
              />
            </Field>

            <Field label="Frequency preference" name="frequency">
              <select
                name="frequency"
                id="frequency"
                defaultValue={FREQUENCIES[0]}
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
              >
                {FREQUENCIES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Email" name="email">
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
                />
              </Field>
              <Field label="Phone" name="phone">
                <input
                  required
                  type="tel"
                  name="phone"
                  id="phone"
                  autoComplete="tel"
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
                />
              </Field>
            </div>

            <Field label="Anything else we should know? (optional)" name="notes">
              <textarea
                name="notes"
                id="notes"
                rows={4}
                placeholder="Headcount, dietary mix, preferred delivery day"
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
              />
            </Field>

            <button
              type="submit"
              className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
            >
              Send subscription enquiry
            </button>
            <p className="text-center text-xs text-muted-foreground">
              This is an enquiry, not an order — nothing is charged now.
            </p>
          </form>
        )}
      </section>
    </>
  );
}

function Field({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}
