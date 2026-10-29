import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Clock, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";

const title = "Request a Catering Quote — The Lemon Bowl";
const description =
  "Tell us about your event and a Lemon Bowl team member will respond with a costed menu within 24 hours.";

export const Route = createFileRoute("/catering/quote")({
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
  component: Page,
});

const inputClass =
  "mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[color:var(--primary-deep)]";

type Errors = Partial<Record<"name" | "email" | "phone" | "eventType" | "guests" | "date", string>>;

function Page() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    guests: "",
    date: "",
    budget: "",
    details: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Errors = {};
    if (!form.name.trim() || form.name.trim().length > 80) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()) || form.email.length > 255)
      next.email = "Enter a valid email address.";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s|-/g, "")))
      next.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!form.eventType) next.eventType = "Select an event type.";
    const guests = Number(form.guests);
    if (!Number.isFinite(guests) || guests < 5 || guests > 5000)
      next.guests = "Enter a guest count between 5 and 5000.";
    if (!form.date) next.date = "Choose your event date.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  if (sent) {
    return (
      <>
        <PageHeader eyebrow="Catering" title="Enquiry received" description="" />
        <section className="mx-auto max-w-2xl px-6 pb-24 lg:px-10">
          <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-[var(--shadow-soft)]">
            <CheckCircle2
              className="mx-auto h-12 w-12 text-[color:var(--primary-deep)]"
              strokeWidth={1.5}
            />
            <h2 className="mt-4 font-display text-2xl">Thank you, {form.name.split(" ")[0]}</h2>
            <p className="mt-3 text-muted-foreground">
              A Lemon Bowl team member will get back to you within 24 hours with menu suggestions
              and pricing for your event.
            </p>
            <a
              href="https://wa.me/919999999999"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
              Or WhatsApp us now
            </a>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Catering"
        title="Get a Quote"
        description="This is a request, not a purchase — nothing is charged and nothing is confirmed until we have spoken."
      />

      <section className="mx-auto grid max-w-5xl gap-10 px-6 pb-24 lg:grid-cols-[1.4fr_1fr] lg:px-10">
        <form
          onSubmit={submit}
          noValidate
          className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your name" error={errors.name}>
              <input
                type="text"
                maxLength={80}
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                className={inputClass}
                autoComplete="name"
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                type="email"
                maxLength={255}
                value={form.email}
                onChange={(event) => update("email", event.target.value)}
                className={inputClass}
                autoComplete="email"
              />
            </Field>
            <Field label="Phone" error={errors.phone}>
              <input
                type="tel"
                maxLength={14}
                value={form.phone}
                onChange={(event) => update("phone", event.target.value)}
                placeholder="98XXXXXXXX"
                className={inputClass}
                autoComplete="tel"
              />
            </Field>
            <Field label="Event type" error={errors.eventType}>
              <select
                value={form.eventType}
                onChange={(event) => update("eventType", event.target.value)}
                className={inputClass}
              >
                <option value="">Select</option>
                <option>Wedding or sangeet</option>
                <option>Corporate / office</option>
                <option>Birthday</option>
                <option>House party</option>
                <option>Festive / puja</option>
                <option>Gifting</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Guest count" error={errors.guests}>
              <input
                type="number"
                min={5}
                max={5000}
                value={form.guests}
                onChange={(event) => update("guests", event.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Event date" error={errors.date}>
              <input
                type="date"
                value={form.date}
                onChange={(event) => update("date", event.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          <div className="mt-4">
            <Field label="Budget range (optional)">
              <select
                value={form.budget}
                onChange={(event) => update("budget", event.target.value)}
                className={inputClass}
              >
                <option value="">Prefer not to say</option>
                <option>Under ₹25,000</option>
                <option>₹25,000 – ₹50,000</option>
                <option>₹50,000 – ₹1,00,000</option>
                <option>₹1,00,000 – ₹3,00,000</option>
                <option>Above ₹3,00,000</option>
              </select>
            </Field>
          </div>

          <div className="mt-4">
            <Field label="Details or special requests (optional)">
              <textarea
                rows={4}
                maxLength={1000}
                value={form.details}
                onChange={(event) => update("details", event.target.value)}
                placeholder="Cuisines you have in mind, dietary needs, venue, service timings"
                className={inputClass}
              />
            </Field>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-full border-2 border-[color:var(--primary-deep)] bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent sm:w-auto sm:px-10"
          >
            Request a Quote
          </button>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" strokeWidth={1.8} />
            A Lemon Bowl team member responds within 24 hours.
          </p>
        </form>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-border bg-secondary p-6">
            <h2 className="font-display text-xl">What happens next</h2>
            <ol className="mt-3 space-y-3 text-sm text-muted-foreground">
              <li>1. We read your brief and call you to understand the occasion.</li>
              <li>2. You receive two or three costed menu options within 24 hours.</li>
              <li>3. We refine, confirm quantities, and block your date.</li>
            </ol>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <p className="text-sm text-muted-foreground">
              Ordering for today or tomorrow instead? Our everyday menu checks out instantly.
            </p>
            <Link
              to="/order"
              className="mt-4 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
            >
              Order from the menu
            </Link>
          </div>
        </aside>
      </section>
    </>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-[color:var(--destructive)]">{error}</span>}
    </label>
  );
}
