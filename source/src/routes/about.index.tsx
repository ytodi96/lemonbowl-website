import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { PHOTOS } from "@/lib/photos";
import { FadeImage } from "@/components/fade-image";

const title = "Our Story — The Lemon Bowl";
const description =
  "How a mother-daughter duo turned a love of hosting into ready-to-serve platters and curated catering across Delhi NCR.";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: PHOTOS.founders },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: PHOTOS.founders },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader eyebrow="About" title="Our Story" description={description} />

      <section className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              The Lemon Bowl began the way most good things at home do — with too many people
              arriving at once, and a kitchen that somehow managed. Between the two of us, hosting
              was never a chore. It was the point.
            </p>
            <p>
              What we kept noticing, though, was how much of the joy of hosting got lost in the
              logistics. Friends would call the night before a party, exhausted before it began.
              Delivery meant lukewarm food in mismatched containers. Caterers meant negotiating
              minimums for a gathering of twelve. There was nothing in between: nothing that felt
              considered, arrived beautifully, and simply let you be with your guests.
            </p>
            <p>
              So we built it. Every Lemon Bowl order is cooked to order, pre-plated in serveware you
              would happily put on your own table, and delivered ready — no assembling, no
              rearranging, no last-minute panic. Some days that is a chaat thali for a Sunday
              afternoon. Other days it is a mezze board for eighty at a wedding.
            </p>
            <p className="font-display text-2xl leading-snug text-foreground">
              We are here to make hosting deliciously effortless — a restaurant experience, at home.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FadeImage
              src={PHOTOS.mezzePlatter}
              alt="Large mezze platter with dips, pita and biryani"
              className="h-full w-full rounded-2xl border border-border object-cover shadow-[var(--shadow-soft)] sm:col-span-2"
            />
            <FadeImage
              src={PHOTOS.chaatThali}
              alt="Two-tier chaat thali with saffron dahi"
              className="aspect-square w-full rounded-2xl border border-border object-cover shadow-[var(--shadow-soft)]"
            />
            <FadeImage
              src={PHOTOS.mithaiPlatter}
              alt="Festive mithai platter with jalebi and rabri"
              className="aspect-square w-full rounded-2xl border border-border object-cover shadow-[var(--shadow-soft)]"
            />
          </div>
        </div>

        <div className="mt-16 flex flex-wrap gap-3 border-t border-border pt-8">
          <Link
            to="/about/founders"
            className="press rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
          >
            Meet the founders
          </Link>
          <Link
            to="/about/mission"
            className="press rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Our mission
          </Link>
        </div>
      </section>
    </>
  );
}
