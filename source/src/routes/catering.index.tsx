import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Clock, Users } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PHOTOS } from "@/lib/photos";
import { FadeImage } from "@/components/fade-image";

const title = "Catering Packages & Platters — The Lemon Bowl";
const description =
  "Pre-composed catering packages for weddings, corporate lunches, birthdays and festive spreads — curated, plated and delivered across Delhi NCR.";

export const Route = createFileRoute("/catering/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: PHOTOS.mezzePlatter },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: PHOTOS.mezzePlatter },
    ],
  }),
  component: Page,
});

type Package = {
  id: string;
  name: string;
  image: string;
  from: number;
  per: string;
  serves: string;
  blurb: string;
  includes: string[];
};

const PACKAGES: Package[] = [
  {
    id: "corporate-lunch",
    name: "Corporate Lunch",
    image: PHOTOS.northIndianThali,
    from: 649,
    per: "per person",
    serves: "Minimum 15 guests",
    blurb:
      "A clean, boxed-or-buffet working lunch that arrives on time and sets up in minutes — no kitchen required.",
    includes: ["2 mains + dal", "Rice & breads", "Salad and raita", "Dessert of the day"],
  },
  {
    id: "birthday-grazing",
    name: "Birthday Grazing Table",
    image: PHOTOS.tacoBar,
    from: 18500,
    per: "per table",
    serves: "Serves 20–25 guests",
    blurb:
      "A generous grazing spread of dips, breads, bites and sweets, styled on wood and terracotta.",
    includes: ["6 dips & spreads", "Breads, chips & crudité", "8 assorted bites", "Dessert corner"],
  },
  {
    id: "festive-spread",
    name: "Festive Spread",
    image: PHOTOS.mithaiPlatter,
    from: 24500,
    per: "per spread",
    serves: "Serves 25–30 guests",
    blurb:
      "Our Diwali and Holi favourite — chaat, kababs, mains and a warm mithai counter with rabri.",
    includes: ["Chaat counter", "4 kababs", "3 mains + breads", "Mithai platter with rabri"],
  },
  {
    id: "wedding-mezze",
    name: "Wedding Mezze Board",
    image: PHOTOS.mezzePlatter,
    from: 32000,
    per: "per board",
    serves: "Serves 30–35 guests",
    blurb:
      "A showpiece Levantine board — nine dips, house pita, falafel and a herbed biryani centrepiece.",
    includes: ["9 dips & mezze", "House-baked pita", "Falafel & grills", "Biryani centrepiece"],
  },
  {
    id: "pan-asian-social",
    name: "Pan-Asian Social",
    image: PHOTOS.panAsianSpread,
    from: 21000,
    per: "per spread",
    serves: "Serves 20–25 guests",
    blurb: "Sushi, dim sum, noodles and wok mains for evenings that run long and easy.",
    includes: ["Sushi & dim sum", "2 wok mains", "Noodles & rice", "Asian dessert"],
  },
  {
    id: "breakfast-morning",
    name: "House Warming Breakfast",
    image: PHOTOS.poha,
    from: 449,
    per: "per person",
    serves: "Minimum 12 guests",
    blurb: "Poha, parathas, chai and coolers for pujas, mornings-after and early gatherings.",
    includes: ["Poha & upma handis", "Stuffed parathas", "Chai & filter coffee", "Bottled coolers"],
  },
];

const rupees = (value: number) => `₹${value.toLocaleString("en-IN")}`;

function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Catering"
        title="Packages & Platters"
        description="Start with a package our hosts order again and again. Every one of them can be adjusted — swap dishes, scale headcount, or build something entirely your own."
      />

      <section className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((pack) => (
            <article
              key={pack.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <FadeImage
                  src={pack.image}
                  alt={pack.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-display text-xl">{pack.name}</h2>
                <p className="mt-1 text-xs text-muted-foreground">{pack.serves}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pack.blurb}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  {pack.includes.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-[color:var(--primary-deep)]" />
                      {line}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm">
                  <span className="text-muted-foreground">From </span>
                  <span className="font-display text-xl text-[color:var(--primary-deep)]">
                    {rupees(pack.from)}
                  </span>{" "}
                  <span className="text-muted-foreground">{pack.per}</span>
                </p>
                <Link
                  to="/catering/quote"
                  className="press mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
                >
                  View details & enquire
                  <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-6 lg:px-10">
        <div className="grid gap-6 rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow">Prefer to compose it yourself?</p>
            <h2 className="mt-2 font-display text-2xl">Build your own menu</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Pick your dips, bites, mains and desserts within simple limits — or let our chef choose
              for you.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              to="/catering/build-your-own"
              className="press rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
            >
              Build your own
            </Link>
            <Link
              to="/catering/quote"
              className="press rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-6xl px-6 pb-24 lg:px-10">
        <div className="rounded-2xl border border-border bg-secondary p-8">
          <p className="eyebrow inline-flex items-center gap-2">
            <Building2 className="h-4 w-4" strokeWidth={1.7} />
            Office & corporate catering
          </p>
          <h2 className="mt-2 font-display text-2xl">Feeding a team, a floor or a townhall</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Share your headcount, per-head budget and lead time and we will send back two or three
            costed menus — recurring weekly lunches, client meetings, offsites and festive hampers.
            GST invoicing and single-point coordination included.
          </p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            <Callout icon={Users} label="Headcount" text="15 to 500 guests, veg and non-veg lines" />
            <Callout icon={Clock} label="Lead time" text="48 hours standard, 24 hours on request" />
            <Callout
              icon={Building2}
              label="Billing"
              text="GST invoice, PO-friendly, monthly settlement"
            />
          </ul>
          <Link
            to="/catering/quote"
            className="press mt-6 inline-block rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent"
          >
            Request a corporate quote
          </Link>
        </div>
      </section>
    </>
  );
}

function Callout({
  icon: Icon,
  label,
  text,
}: {
  icon: typeof Users;
  label: string;
  text: string;
}) {
  return (
    <li className="rounded-xl border border-border bg-card p-4">
      <p className="flex items-center gap-2 text-sm font-semibold">
        <Icon className="h-4 w-4 text-[color:var(--primary-deep)]" strokeWidth={1.7} />
        {label}
      </p>
      <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
    </li>
  );
}
