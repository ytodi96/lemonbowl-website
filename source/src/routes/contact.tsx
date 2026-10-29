import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHeader } from "@/components/page-header";

const title = "Contact The Lemon Bowl — WhatsApp, Call or Write";
const description =
  "WhatsApp us, call, or send a message — The Lemon Bowl delivers platters and catering across Delhi NCR from our kitchen in Okhla Phase II.";

export const Route = createFileRoute("/contact")({
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

const WHATSAPP = "https://wa.me/919999999999";
const PHONE = "+919999999999";
const PHONE_DISPLAY = "+91 99999 99999";
const EMAIL = "hello@thelemonbowl.in";
const MAP_QUERY = "Okhla Industrial Area Phase II, New Delhi";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[color:var(--primary-deep)]";

type Errors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to us"
        description="The quickest way to reach us is WhatsApp — we usually reply within minutes during kitchen hours."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-24 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:px-10">
        <ContactForm />

        <aside className="space-y-5">
          <a
            href={WHATSAPP}
            className="flex items-center gap-4 rounded-2xl border-2 border-[color:var(--primary-deep)] bg-primary p-6 text-primary-foreground shadow-[var(--shadow-lift)] transition-colors hover:bg-primary-deep"
          >
            <MessageCircle className="h-9 w-9 flex-none" strokeWidth={1.7} aria-hidden />
            <span>
              <span className="block font-display text-2xl">Chat on WhatsApp</span>
              <span className="mt-0.5 block text-sm opacity-80">
                Menus, quantities, timings — fastest reply
              </span>
            </span>
          </a>

          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={`tel:${PHONE}`}
              className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition-colors hover:bg-accent"
            >
              <Phone
                className="h-5 w-5 text-[color:var(--primary-deep)]"
                strokeWidth={1.7}
                aria-hidden
              />
              <p className="mt-2.5 text-sm font-semibold">Call us</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{PHONE_DISPLAY}</p>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition-colors hover:bg-accent"
            >
              <Mail
                className="h-5 w-5 text-[color:var(--primary-deep)]"
                strokeWidth={1.7}
                aria-hidden
              />
              <p className="mt-2.5 text-sm font-semibold">Email us</p>
              <p className="mt-0.5 break-all text-sm text-muted-foreground">{EMAIL}</p>
            </a>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <MapPin
                className="h-4 w-4 text-[color:var(--primary-deep)]"
                strokeWidth={1.7}
                aria-hidden
              />
              Where we deliver
            </p>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              We deliver across Delhi NCR — South and Central Delhi, Gurugram, Noida, Greater Noida,
              Ghaziabad and Faridabad. Our central kitchen is in Okhla Industrial Area Phase II, New
              Delhi. Deliveries only; the kitchen is not a storefront.
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" strokeWidth={1.7} aria-hidden />
              Kitchen hours 8 am – 9 pm, all days
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
            <iframe
              title="The Lemon Bowl central kitchen location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full border-0"
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Planning an event?{" "}
            <Link to="/catering/quote" className="underline underline-offset-2">
              Request a catering quote
            </Link>{" "}
            for a costed menu within 24 hours.
          </p>
        </aside>
      </section>
    </>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
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
    if (form.message.trim().length < 10) next.message = "Tell us a little more (10+ characters).";
    else if (form.message.trim().length > 1000) next.message = "Message is too long.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-soft)]">
        <CheckCircle2
          className="mx-auto h-11 w-11 text-[color:var(--primary-deep)]"
          strokeWidth={1.5}
        />
        <h2 className="mt-4 font-display text-2xl">Message sent</h2>
        <p className="mt-2 text-muted-foreground">
          Thank you, {form.name.split(" ")[0]} — we will get back to you within one working day. For
          anything urgent, WhatsApp is quicker.
        </p>
        <a
          href={WHATSAPP}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
          Chat on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8"
    >
      <h2 className="font-display text-2xl">Send us a message</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        We read every message ourselves and reply within a working day.
      </p>

      <div className="mt-5 space-y-4">
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
        <Field label="Message" error={errors.message}>
          <textarea
            rows={5}
            maxLength={1000}
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            placeholder="What can we help you with?"
            className={inputClass}
          />
        </Field>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-full border border-[color:var(--primary-deep)] bg-card px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-accent sm:w-auto sm:px-10"
      >
        Send message
      </button>
    </form>
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
