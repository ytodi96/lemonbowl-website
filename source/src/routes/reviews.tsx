import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Quote } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PHOTOS } from "@/lib/photos";

const title = "Reviews — What Our Hosts Say | The Lemon Bowl";
const description =
  "Testimonials from hosts, offices and families across Delhi NCR who order platters and catering from The Lemon Bowl.";

export const Route = createFileRoute("/reviews")({
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

type Review = {
  quote: string;
  attribution: string;
  context: string;
  rating: number;
};

const REVIEWS: Review[] = [
  {
    quote:
      "The mezze board was the first thing every guest photographed and the last thing left on the table. It arrived exactly on time and needed nothing from us.",
    attribution: "DAG, Delhi Art Gallery",
    context: "Exhibition preview · 60 guests",
    rating: 5,
  },
  {
    quote:
      "We now order the working lunch every Thursday. Warm, generous portions, sensible packaging, and someone always calls to confirm the headcount.",
    attribution: "Operations Lead, Gurugram tech office",
    context: "Recurring corporate lunch · 40 pax",
    rating: 5,
  },
  {
    quote:
      "I hosted forty people for my mother's birthday and did not step into the kitchen once. The chaat counter was the highlight — people still bring it up.",
    attribution: "Host, Vasant Vihar",
    context: "Birthday at home · 40 guests",
    rating: 5,
  },
  {
    quote:
      "The presentation is genuinely restaurant-level. Terracotta, banana leaf, everything plated. It does not feel like delivery food at all.",
    attribution: "Couple, Golf Links",
    context: "Anniversary dinner · 12 guests",
    rating: 5,
  },
  {
    quote:
      "Their team understood a Marwari menu without us explaining twice — no onion, no garlic, and still full of flavour. That is rare.",
    attribution: "Family, Noida",
    context: "Festive puja lunch · 80 guests",
    rating: 5,
  },
  {
    quote:
      "We asked for a mixed veg and non-veg spread two days before a client dinner. They sent three costed options the same evening and delivered flawlessly.",
    attribution: "Partner, South Delhi law firm",
    context: "Client dinner · 25 guests",
    rating: 4,
  },
  {
    quote:
      "The gifting hampers went to eleven cities and every single one arrived intact and beautiful. Our clients called us about them.",
    attribution: "Marketing Head, consumer brand",
    context: "Diwali gifting · 120 hampers",
    rating: 5,
  },
  {
    quote:
      "The reheating notes on every box made a real difference — nothing was dry, nothing was guesswork. Small thing, big deal.",
    attribution: "Home order, Dwarka",
    context: "Everyday family order",
    rating: 5,
  },
];

const average = (REVIEWS.reduce((sum, review) => sum + review.rating, 0) / REVIEWS.length).toFixed(
  1,
);

function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Reviews"
        title="What Our Hosts Say"
        description="Gatherings of twelve and weddings of eight hundred — here is how it went, in their words."
      />

      <section className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
          <Stars rating={5} />
          <p className="text-sm text-muted-foreground">
            <span className="font-display text-2xl text-foreground">{average}</span> average across{" "}
            {REVIEWS.length} recent reviews from hosts across Delhi NCR.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <blockquote
              key={review.attribution + review.context}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
            >
              <Quote
                className="h-6 w-6 text-[color:var(--primary)]"
                strokeWidth={1.6}
                aria-hidden
              />
              <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">"{review.quote}"</p>
              <div className="mt-5 border-t border-border pt-4">
                <Stars rating={review.rating} />
                <p className="mt-2 font-medium">— {review.attribution}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{review.context}</p>
              </div>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-6 pb-24 lg:px-10">
        <div className="rounded-2xl border border-border bg-secondary p-8 text-center">
          <h2 className="font-display text-2xl">Your gathering next?</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            Order from the everyday menu, or tell us about the occasion and we will curate it.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              to="/order"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
            >
              Order now
            </Link>
            <Link
              to="/catering/quote"
              className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          className={
            index <= rating
              ? "h-4 w-4 fill-[color:var(--primary)] text-[color:var(--primary)]"
              : "h-4 w-4 text-border"
          }
          strokeWidth={1.6}
          aria-hidden
        />
      ))}
    </div>
  );
}
