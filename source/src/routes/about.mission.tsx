import { createFileRoute, Link } from "@tanstack/react-router";
import { Leaf, HandHeart, Sparkles, Timer } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PHOTOS } from "@/lib/photos";
import { FadeImage } from "@/components/fade-image";

const title = "Our Mission — The Lemon Bowl";
const description =
  "Freshness, presentation and warm hospitality — our promise to make hosting effortless for every guest you invite.";

export const Route = createFileRoute("/about/mission")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: PHOTOS.grillPlatter },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: PHOTOS.grillPlatter },
    ],
  }),
  component: Page,
});

const VALUES = [
  {
    icon: Leaf,
    title: "Freshness, without exception",
    text: "Nothing is cooked in advance and held. Every order is made the morning it travels, with produce bought that day.",
  },
  {
    icon: Sparkles,
    title: "Presentation as part of the meal",
    text: "Food arrives pre-plated in serveware you would set out yourself — terracotta, wood, banana leaf. You lift the lid, and that is it.",
  },
  {
    icon: HandHeart,
    title: "Hospitality, not transaction",
    text: "We call to confirm. We ask about the spice level, the children, the aunt who avoids garlic. We would want someone to ask us.",
  },
  {
    icon: Timer,
    title: "Effortless for the host",
    text: "No assembling, no reheating puzzles, no guesswork on quantities. Our job is to hand you back your own evening.",
  },
];

function Page() {
  return (
    <>
      <PageHeader eyebrow="About" title="Our Mission" description={description} />

      <section className="mx-auto max-w-4xl px-6 lg:px-10">
        <p className="font-display text-2xl leading-snug sm:text-3xl">
          We started The Lemon Bowl because hosting should feel generous, not stressful. Our mission
          is to bring the care of a home kitchen and the precision of a restaurant to the same table
          — food that is freshly cooked, thoughtfully plated and delivered ready to serve, so the
          only thing left for you to do is sit down with the people you invited.
        </p>
      </section>

      <section className="mx-auto mt-14 max-w-5xl px-6 lg:px-10">
        <ul className="grid gap-5 sm:grid-cols-2">
          {VALUES.map((value) => (
            <li
              key={value.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
            >
              <value.icon
                className="h-6 w-6 text-[color:var(--primary-deep)]"
                strokeWidth={1.6}
                aria-hidden
              />
              <h2 className="mt-3 font-display text-xl">{value.title}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{value.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-16 max-w-5xl px-6 pb-24 lg:px-10">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] lg:grid lg:grid-cols-2">
          <FadeImage
            src={PHOTOS.grillPlatter}
            alt="Close-up of a freshly grilled paneer and vegetable platter"
            className="h-full w-full object-cover"
          />
          <div className="p-8 lg:p-10">
            <h2 className="font-display text-2xl">Held to one standard</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Every dish that leaves our kitchen has been tasted by one of us. That is not a
              marketing line — it is the only quality check we have ever fully trusted, and it is why
              we grow slowly and deliberately across Delhi NCR.
            </p>
            <Link
              to="/reviews"
              className="press mt-6 inline-block rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              Read what our hosts say
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
