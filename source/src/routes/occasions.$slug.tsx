import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { OCCASIONS, occasionBySlug, type Archetype } from "@/lib/occasions";

export const Route = createFileRoute("/occasions/$slug")({
  loader: ({ params }) => {
    const occasion = occasionBySlug(params.slug);
    if (!occasion) throw notFound();
    return { occasion };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Occasion not found — The Lemon Bowl" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { occasion } = loaderData;
    const title = `${occasion.title} Catering — The Lemon Bowl`;
    const description = `${occasion.tagline} Order a small spread, request full catering, set up a recurring plan or send gifting — across Delhi NCR.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: OccasionNotFound,
  component: OccasionPage,
});

function OccasionNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl">We don't have that occasion yet</h1>
      <p className="mt-3 text-muted-foreground">
        Browse the occasions we cater and pick the closest fit.
      </p>
      <Link
        to="/occasions"
        className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-deep"
      >
        All occasions
      </Link>
    </div>
  );
}

function ArchetypeCta({ archetype }: { archetype: Archetype }) {
  const className =
    "mt-6 inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep";
  const icon = <ArrowRight className="h-4 w-4" aria-hidden />;

  if (archetype.action.kind === "order") {
    const collection = archetype.action.collection;
    return collection ? (
      <Link to="/order" search={{ collection }} className={className}>
        {archetype.cta}
        {icon}
      </Link>
    ) : (
      <Link to="/order" className={className}>
        {archetype.cta}
        {icon}
      </Link>
    );
  }
  if (archetype.action.kind === "quote") {
    return (
      <Link to="/catering/quote" className={className}>
        {archetype.cta}
        {icon}
      </Link>
    );
  }
  if (archetype.action.kind === "build") {
    return (
      <Link to="/catering/build-your-own" className={className}>
        {archetype.cta}
        {icon}
      </Link>
    );
  }
  return (
    <Link to="/occasions/subscription" className={className}>
      {archetype.cta}
      {icon}
    </Link>
  );
}

function OccasionPage() {
  const { occasion } = Route.useLoaderData();
  const others = OCCASIONS.filter((entry) => entry.slug !== occasion.slug);

  return (
    <>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <Link
            to="/occasions"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All occasions
          </Link>
          <p className="eyebrow mt-6">{occasion.title}</p>
          <h1 className="mt-3 max-w-3xl text-3xl leading-tight sm:text-4xl">{occasion.header}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {occasion.tagline}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {occasion.archetypes.map((archetype) => (
            <article
              key={archetype.title}
              className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]"
            >
              <h2 className="font-display text-2xl">{archetype.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {archetype.blurb}
              </p>
              <div className="flex-1" />
              <ArchetypeCta archetype={archetype} />
              {archetype.note && (
                <p className="mt-3 text-xs text-muted-foreground">{archetype.note}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl">Other occasions we cater</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {others.map((entry) => (
              <Link
                key={entry.slug}
                to="/occasions/$slug"
                params={{ slug: entry.slug }}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:bg-accent"
              >
                {entry.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
