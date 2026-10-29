import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { PHOTOS } from "@/lib/photos";
import { FadeImage } from "@/components/fade-image";

const title = "The Founders — The Lemon Bowl";
const description =
  "Aakriti Todi and Moonmoon Todi — the mother-daughter duo behind every menu we plate.";

export const Route = createFileRoute("/about/founders")({
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
      <PageHeader
        eyebrow="About"
        title="The Mother-Daughter Duo"
        description="One of us obsesses over how a table looks. The other has never once measured a spice. Somehow, it works."
      />

      <section className="mx-auto max-w-5xl px-6 lg:px-10">
        <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
          <FadeImage
            src={PHOTOS.founders}
            alt="Aakriti Todi and Moonmoon Todi, founders of The Lemon Bowl, seated together"
            className="w-full object-cover"
          />
          <figcaption className="px-6 py-4 text-sm text-muted-foreground">
            Aakriti Todi and Mrs. Moonmoon Todi — co-founders, The Lemon Bowl.
          </figcaption>
        </figure>
      </section>

      <section className="mx-auto mt-16 max-w-5xl space-y-16 px-6 pb-8 lg:px-10">
        <article className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-start lg:gap-12">
          <div className="overflow-hidden rounded-2xl border border-border bg-secondary shadow-[var(--shadow-soft)]">
            <FadeImage
              src={PHOTOS.pinwheelTable}
              alt="A Lemon Bowl platter styled on a set table"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Co-founder</p>
            <h2 className="mt-2 font-display text-3xl">Aakriti Todi</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                Aakriti spent years in wedding planning before The Lemon Bowl, which is another way
                of saying she spent years learning how a room should feel the moment guests walk in.
                Flowers, linen, the order in which food appears — she notices all of it, and she
                cannot un-notice it.
              </p>
              <p>
                That instinct is why our platters look the way they do. She drives presentation and
                curation: which dishes belong beside each other, what a board should look like when
                the lid comes off, how a menu should read for a sangeet versus a Tuesday lunch.
              </p>
              <p>
                Her real passion, though, is simpler than any of that — creating occasions that
                bring people together, and taking the work of it off the host's shoulders.
              </p>
            </div>
          </div>
        </article>

        <article className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-12">
          <div className="lg:order-2 overflow-hidden rounded-2xl border border-border bg-secondary shadow-[var(--shadow-soft)]">
            <FadeImage
              src={PHOTOS.northIndianThali}
              alt="North Indian mains cooked in the Lemon Bowl kitchen"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="lg:order-1">
            <p className="eyebrow">Co-founder</p>
            <h2 className="mt-2 font-display text-3xl">Mrs. Moonmoon Todi</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                Moonmoon is the flavour foundation of the brand. Decades of cooking for family,
                festivals and full houses have given her the kind of judgement no recipe card can
                hold — she knows when a dal has had enough time, and she is almost never wrong.
              </p>
              <p>
                She brings traditional cooking wisdom to every menu: the tempering that makes a
                simple sabzi memorable, the balance of sweet and sour in a chutney, the reason a
                biryani rests before it travels. Nothing leaves the kitchen without her tasting it.
              </p>
              <p>
                Ask her for the recipe and she will tell you honestly that she cooks by instinct.
                That instinct is our standard.
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 lg:px-10">
        <div className="rounded-2xl border border-border bg-secondary p-8 text-center">
          <h2 className="font-display text-2xl">Cook with us at your next gathering</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            Tell us the occasion and we will suggest a menu — for six people or six hundred.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              to="/order"
              className="press rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
            >
              Order now
            </Link>
            <Link
              to="/catering/quote"
              className="press rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
