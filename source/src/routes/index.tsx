import { TrustMarquee } from "@/components/trust-marquee";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  ClipboardList,
  Gift,
  PartyPopper,
  Sparkles,
  Truck,
  Users,
  UtensilsCrossed,
  Recycle,
  CalendarClock,
} from "lucide-react";

import heroPlatter from "@/assets/hero-platter.jpg";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";
import dish5 from "@/assets/dish-5.jpg";
import dish6 from "@/assets/dish-6.jpg";
import { PHOTOS } from "@/lib/photos";
import { FadeImage } from "@/components/fade-image";

const title = "The Lemon Bowl — Bespoke Platters Delivered in Delhi NCR";
const description =
  "Restaurant-quality platters and meals, delivered. Bespoke, multi-cuisine, ready-to-serve platters for everyday ordering, celebrations and gifting across Delhi NCR.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

const steps = [
  {
    icon: PartyPopper,
    title: "Tell us what you're celebrating",
    copy: "A birthday, a brunch, an office event, an intimate soirée — or a gift.",
  },
  {
    icon: ClipboardList,
    title: "We curate the spread",
    copy: "Matched to your occasion, guest count and preferences.",
  },
  {
    icon: Truck,
    title: "We plate, style and deliver",
    copy: "It arrives ready — no last-minute kitchen work.",
  },
  {
    icon: Users,
    title: "You gather, everyone eats well",
    copy: "You host. We have already done the hard part.",
  },
  {
    icon: Recycle,
    title: "We collect",
    copy: "Platters and serveware picked up after — no plastic, no cleanup left behind.",
  },
];

const bestsellers = [
  {
    name: "Purani Dilli Tikka Thali",
    copy: "Smoky paneer tikka, mint chutney and warm naan.",
    price: "₹749",
    image: dish1,
  },
  {
    name: "Levant Mezze Platter",
    copy: "Hummus, falafel, olives and house pita.",
    price: "₹899",
    image: dish2,
  },
  {
    name: "Mithai Ka Dabba",
    copy: "Assorted mithai and dry fruits, gift-boxed.",
    price: "₹1,249",
    image: dish3,
  },
  {
    name: "Far East Dim Sum Board",
    copy: "Steamed dumplings, sushi rolls and dips.",
    price: "₹999",
    image: dish4,
  },
  {
    name: "Sunday Brunch Spread",
    copy: "Croissants, quiche, fruit and berry tarts.",
    price: "₹1,099",
    image: dish5,
  },
  {
    name: "Awadhi Biryani Handi",
    copy: "Slow-cooked biryani with raita and salad.",
    price: "₹1,349",
    image: dish6,
  },
];

const comparison = [
  {
    label: "Freshness",
    lemon: "Cooked to order the morning of your event",
    rest: "Batch-cooked hours ahead, reheated",
  },
  {
    label: "Presentation",
    lemon: "Pre-plated on serveware, styled to serve",
    rest: "Foil trays and plastic containers",
  },
  {
    label: "Convenience",
    lemon: "Arrives table-ready; we collect after",
    rest: "You plate, you serve, you clean up",
  },
  {
    label: "Personal touch",
    lemon: "Menu shaped with you by the founders",
    rest: "Fixed packages, no conversation",
  },
];

const galleryImages = [
  { src: PHOTOS.chaatThali, alt: "Two-tier terracotta chaat thali with saffron dahi and chutneys" },
  { src: PHOTOS.grillPlatter, alt: "Charcoal grill platter of paneer tikka, broccoli and lotus stem" },
  { src: PHOTOS.panAsianSpread, alt: "Pan-Asian spread of sushi, momos, noodles and manchurian" },
  { src: PHOTOS.sandesh, alt: "Kesar sandesh set on a banana leaf in a terracotta dish" },
];

function PurposeSelector() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <h2 className="text-3xl sm:text-4xl">What are you looking for today?</h2>
      <p className="mt-4 max-w-xl text-base text-muted-foreground">
        Pick the closest fit — we will take you straight to the right place.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <Link
          to="/order"
          className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
        >
          <UtensilsCrossed className="h-7 w-7 text-primary-deep" strokeWidth={1.5} />
          <div className="mt-8">
            <h3 className="font-display text-2xl">Order food for myself, today</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Browse the menu and get a plated meal delivered.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-deep">
              Go to menu <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>

        <Link
          to="/occasions"
          className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
        >
          <PartyPopper className="h-7 w-7 text-primary-deep" strokeWidth={1.5} />
          <div className="mt-8">
            <h3 className="font-display text-2xl">I'm hosting a get-together</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              See how we cater each kind of occasion, then pick your path.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-deep">
              Explore occasions{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>

        <Link
          to="/order"
          search={{ collection: "gifting" }}
          className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
        >
          <Gift className="h-7 w-7 text-primary-deep" strokeWidth={1.5} />
          <div className="mt-8">
            <h3 className="font-display text-2xl">I want to gift food or sweets</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              See our gifting-ready hampers, mithai and platters.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-deep">
              View gifting picks{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>

        <Link
          to="/occasions"
          className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
        >
          <CalendarClock className="h-7 w-7 text-primary-deep" strokeWidth={1.5} />
          <div className="mt-8">
            <h3 className="font-display text-2xl">I'm planning a larger event</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Find your occasion and the right way to order or request a quote.
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-deep">
              Explore occasions{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

function Index() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden">
        <FadeImage
          src={heroPlatter}
          alt="An elegantly plated platter of canapés on a cream linen table"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/55 to-foreground/10" />
        <div className="relative mx-auto flex min-h-[72vh] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl leading-[1.12] text-background sm:text-5xl lg:text-6xl">
              Restaurant-quality platters and meals, delivered.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-background/85">
              The Lemon Bowl brings the experience of a beautifully plated table to your home — for
              a weekday lunch or a table full of guests.
            </p>
            <Link
              to="/order"
              className="press mt-10 inline-flex rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition-colors hover:bg-primary-deep"
            >
              Order Now
            </Link>
          </div>
        </div>
      </section>

      {/* 2. What is The Lemon Bowl */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-24">
        <p className="eyebrow">What is The Lemon Bowl</p>
        <p className="mt-6 font-display text-2xl leading-relaxed sm:text-[28px]">
          We are a bespoke, multi-cuisine kitchen making ready-to-serve, pre-plated platters and
          meals.
        </p>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          Everything is cooked fresh, plated on real serveware and delivered table-ready — for
          everyday ordering, celebrations at home and thoughtful gifting. Founded and still run by a
          mother-daughter duo in Delhi NCR.
        </p>
      </section>

      {/* 3. How to experience the magic */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h2 className="max-w-2xl text-3xl sm:text-4xl">
            How to experience the Lemon Bowl magic
          </h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {steps.map((step, index) => (
              <li key={step.title}>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-primary-deep">
                    <step.icon className="h-[20px] w-[20px]" strokeWidth={1.5} />
                  </span>
                  <span className="font-display text-2xl text-primary-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg leading-snug">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Purpose-driven selector */}
      <PurposeSelector />

      {/* 5. Credibility strip */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { value: "6+", label: "Years of hosting, plating and delivering" },
            { value: "4,500+", label: "Happy hosts and orders served" },
            { value: "5", label: "Cities served across Delhi NCR" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-4xl text-primary-deep sm:text-5xl">{stat.value}</p>
              <p className="mt-3 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5b. Brands that trust us */}
      <TrustMarquee />

      {/* 6. Bestsellers */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Bestsellers</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Loved on repeat</h2>
          </div>
          <Link
            to="/order"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-deep"
          >
            See the full menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bestsellers.map((item) => (
            <article
              key={item.name}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]"
            >
              <FadeImage
                src={item.image}
                alt={item.name}
                width={900}
                height={700}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl">{item.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.copy}</p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="font-display text-lg">{item.price}</span>
                  <Link
                    to="/order"
                    className="press rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
                  >
                    Order now
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. Our offering vs the rest */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-24">
          <h2 className="text-3xl sm:text-4xl">Our offering vs the rest</h2>
          <div className="mt-10 grid gap-4">
            <div className="hidden grid-cols-[1fr_1.2fr_1.2fr] gap-6 px-1 sm:grid">
              <span className="eyebrow">&nbsp;</span>
              <span className="eyebrow">The Lemon Bowl</span>
              <span className="eyebrow">Typical delivery or catering</span>
            </div>
            {comparison.map((row) => (
              <div
                key={row.label}
                className="grid gap-4 rounded-xl border border-border bg-background p-6 sm:grid-cols-[1fr_1.2fr_1.2fr] sm:items-center sm:gap-6"
              >
                <p className="font-display text-lg">{row.label}</p>
                <p className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-deep" strokeWidth={2.2} />
                  {row.lemon}
                </p>
                <p className="text-sm text-muted-foreground">{row.rest}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Gallery teaser */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Gallery</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Tables we have set</h2>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-deep"
          >
            See more <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((image) => (
            <FadeImage
              key={image.alt}
              src={image.src}
              alt={image.alt}
              width={900}
              height={1100}
              className="aspect-[3/4] w-full rounded-2xl object-cover"
            />
          ))}
        </div>
      </section>

      {/* 9. Catering teaser */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-border bg-secondary px-8 py-10">
          <div>
            <h2 className="font-display text-2xl">Planning something bigger?</h2>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">
              Weddings, office events and milestone celebrations — we build the menu with you.
            </p>
          </div>
          <Link
            to="/catering"
            className="press inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Explore catering <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 10. Lead capture */}
      <section className="mx-auto max-w-3xl px-4 pb-24 text-center sm:px-6">
        <Sparkles className="mx-auto h-6 w-6 text-primary-deep" strokeWidth={1.5} />
        <h2 className="mt-5 text-3xl">Stay in the loop for offers and new menus</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          A gentle note now and then — seasonal menus, festive hampers, nothing more.
        </p>
        <form
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(event) => event.preventDefault()}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            maxLength={255}
            placeholder="you@example.com"
            className="press h-12 flex-1 rounded-full border border-border bg-card px-5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            className="press h-12 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
          >
            Keep me posted
          </button>
        </form>
      </section>
    </>
  );
}
