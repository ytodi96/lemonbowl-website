import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { OCCASIONS } from "@/lib/occasions";
import { PageHeader } from "@/components/page-header";
import { FadeImage } from "@/components/fade-image";

const title = "Occasions We Cater — The Lemon Bowl";
const description =
  "Celebrations, store launches, gallery openings, corporate events, employee treats, campuses, wedding functions or just because — see how The Lemon Bowl caters each one.";

export const Route = createFileRoute("/occasions/")({
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
  component: OccasionsHub,
});

function OccasionsHub() {
  return (
    <>
      <PageHeader
        eyebrow="Occasions"
        title="What are we feeding?"
        description="From a Tuesday evening at home to a launch with two hundred guests — pick the closest fit and we'll show you the right way to order."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {OCCASIONS.map((occasion) => (
            <Link
              key={occasion.slug}
              to="/occasions/$slug"
              params={{ slug: occasion.slug }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <FadeImage
                  src={occasion.image}
                  alt={occasion.title}
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-xl leading-snug">{occasion.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {occasion.tagline}
                </p>
                <div className="flex-1" />
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--primary-deep)]">
                  See how it works
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
