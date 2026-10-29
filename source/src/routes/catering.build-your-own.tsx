import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";

const title = "Build Your Own Catering Menu — The Lemon Bowl";
const description =
  "Compose your own catering menu — pick dips, bites, mains, breads and desserts within simple limits, or let our chef curate it for you.";

export const Route = createFileRoute("/catering/build-your-own")({
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

type Option = { id: string; label: string; note?: string; add?: number };
type Group = { id: string; heading: string; limit: number; hint: string; options: Option[] };

const GROUPS: Group[] = [
  {
    id: "dips",
    heading: "Dips & Spreads",
    limit: 2,
    hint: "Pick any 2",
    options: [
      { id: "hummus", label: "Classic hummus" },
      { id: "beetroot-hummus", label: "Beetroot hummus" },
      { id: "babaganoush", label: "Baba ganoush" },
      { id: "muhammara", label: "Muhammara", add: 250 },
      { id: "labneh", label: "Herbed labneh" },
      { id: "green-chutney", label: "Coriander-mint chutney" },
    ],
  },
  {
    id: "bites",
    heading: "Bites & Appetizers",
    limit: 4,
    hint: "Pick any 4",
    options: [
      { id: "pinwheels", label: "Cheesy tortilla pinwheels" },
      { id: "falafel", label: "Falafel with tahini" },
      { id: "paneer-tikka", label: "Malai paneer tikka" },
      { id: "vada-pav", label: "Vada pav sliders" },
      { id: "dahi-bhalla", label: "Dahi bhalla cups" },
      { id: "mini-tacos", label: "Mini taco bites" },
      { id: "mashawi-chicken", label: "Mashawi chicken skewers", note: "Non-veg", add: 450 },
      { id: "mutton-seekh", label: "Mutton seekh kabab", note: "Non-veg", add: 650 },
    ],
  },
  {
    id: "mains",
    heading: "Mains",
    limit: 3,
    hint: "Pick any 3",
    options: [
      { id: "dal-makhani", label: "Dal makhani" },
      { id: "paneer-lababdar", label: "Paneer lababdar" },
      { id: "kadhai-veg", label: "Kadhai vegetables" },
      { id: "veg-biryani", label: "Awadhi vegetable biryani" },
      { id: "thai-curry", label: "Thai green curry" },
      { id: "butter-chicken", label: "Butter chicken", note: "Non-veg", add: 550 },
      { id: "chicken-biryani", label: "Lucknowi chicken biryani", note: "Non-veg", add: 600 },
    ],
  },
  {
    id: "breads",
    heading: "Breads & Rice",
    limit: 2,
    hint: "Pick any 2",
    options: [
      { id: "lachha", label: "Lachha paratha" },
      { id: "naan", label: "Butter naan" },
      { id: "pita", label: "House-baked pita" },
      { id: "jeera-rice", label: "Jeera rice" },
      { id: "burnt-garlic-rice", label: "Burnt garlic rice" },
    ],
  },
  {
    id: "desserts",
    heading: "Desserts",
    limit: 2,
    hint: "Pick any 2",
    options: [
      { id: "gulab-jamun", label: "Gulab jamun with rabri" },
      { id: "jalebi", label: "Hot jalebi" },
      { id: "sandesh", label: "Kesar sandesh" },
      { id: "baked-yogurt", label: "Baked yogurt", add: 200 },
      { id: "tiramisu", label: "Tiramisu cups", add: 350 },
    ],
  },
  {
    id: "extras",
    heading: "Serving & Setup Extras",
    limit: 3,
    hint: "Optional — pick up to 3",
    options: [
      { id: "waitstaff", label: "Waitstaff (per person, 4 hrs)", add: 1800 },
      { id: "chafing", label: "Chafing dishes & serving equipment", add: 2500 },
      { id: "decor", label: "Table décor & styling", add: 4500 },
      { id: "live-chaat", label: "Live chaat counter with server", add: 6500 },
    ],
  },
];

type ChefChoice = "self" | "veg" | "non-veg" | "mix" | null;

function Page() {
  const [chefChoice, setChefChoice] = useState<ChefChoice>(null);
  const [selected, setSelected] = useState<Record<string, string[]>>({});

  const addOnTotal = useMemo(() => {
    let total = 0;
    for (const group of GROUPS) {
      for (const option of group.options) {
        if (selected[group.id]?.includes(option.id)) total += option.add ?? 0;
      }
    }
    return total;
  }, [selected]);

  const toggle = (group: Group, optionId: string) => {
    setSelected((prev) => {
      const current = prev[group.id] ?? [];
      if (current.includes(optionId)) {
        return { ...prev, [group.id]: current.filter((id) => id !== optionId) };
      }
      if (current.length >= group.limit) return prev;
      return { ...prev, [group.id]: [...current, optionId] };
    });
  };

  const chefPicked = chefChoice && chefChoice !== "self";

  return (
    <>
      <PageHeader
        eyebrow="Catering"
        title="Build Your Own"
        description="Choose as much or as little as you like. Nothing is locked in — this becomes the starting point for your quote."
      />

      <section className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="rounded-2xl border border-[color:var(--primary-deep)] bg-card p-6 shadow-[var(--shadow-soft)]">
          <p className="flex items-center gap-2 font-display text-xl">
            <Sparkles className="h-5 w-5 text-[color:var(--primary-deep)]" strokeWidth={1.6} />
            Let us know if you'd like help selecting
          </p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Most hosts hand this bit over to us. Either way works beautifully.
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <ChoiceChip active={chefChoice === "self"} onClick={() => setChefChoice("self")}>
              No thanks, I'll choose myself
            </ChoiceChip>
            <ChoiceChip active={chefChoice === "veg"} onClick={() => setChefChoice("veg")}>
              Let the chef choose — Veg
            </ChoiceChip>
            <ChoiceChip active={chefChoice === "non-veg"} onClick={() => setChefChoice("non-veg")}>
              Let the chef choose — Non-Veg
            </ChoiceChip>
            <ChoiceChip active={chefChoice === "mix"} onClick={() => setChefChoice("mix")}>
              Let the chef choose — Mix
            </ChoiceChip>
          </div>

          {chefPicked && (
            <div className="mt-5 rounded-xl border border-border bg-secondary p-4 text-sm text-muted-foreground">
              Wonderful — our chef will curate a{" "}
              <strong className="text-foreground">
                {chefChoice === "mix" ? "mixed veg & non-veg" : chefChoice}
              </strong>{" "}
              menu around your guest count and occasion. Share the details on the quote form and we
              will send a proposed menu within 24 hours.
              <div className="mt-3">
                <Link
                  to="/catering/quote"
                  className="inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-4xl px-6 pb-24 lg:px-10">
        <div className="space-y-8">
          {GROUPS.map((group) => {
            const current = selected[group.id] ?? [];
            return (
              <div
                key={group.id}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border bg-secondary px-5 py-4">
                  <h2 className="font-display text-xl">{group.heading}</h2>
                  <p className="text-sm text-muted-foreground">
                    {group.hint} · {current.length}/{group.limit} selected
                  </p>
                </div>
                <ul className="grid gap-2 p-5 sm:grid-cols-2">
                  {group.options.map((option) => {
                    const checked = current.includes(option.id);
                    const disabled = !checked && current.length >= group.limit;
                    return (
                      <li key={option.id}>
                        <label
                          className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3.5 py-3 text-sm transition-colors ${
                            checked
                              ? "border-[color:var(--primary-deep)] bg-accent"
                              : disabled
                                ? "border-border opacity-50"
                                : "border-border hover:bg-secondary"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={disabled}
                            onChange={() => toggle(group, option.id)}
                            className="mt-0.5 accent-[color:var(--primary-deep)]"
                          />
                          <span>
                            <span className="font-medium">{option.label}</span>
                            {option.note && (
                              <span className="ml-2 rounded-full bg-[color:var(--coral)] px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-[color:var(--coral-foreground)]">
                                {option.note}
                              </span>
                            )}
                            {option.add ? (
                              <span className="mt-0.5 block text-xs text-muted-foreground">
                                +₹{option.add.toLocaleString("en-IN")}
                              </span>
                            ) : (
                              <span className="mt-0.5 block text-xs text-muted-foreground">
                                Included
                              </span>
                            )}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="font-display text-xl">Your selection</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {Object.values(selected).flat().length} items chosen
              {addOnTotal > 0 && (
                <>
                  {" "}
                  · priced add-ons{" "}
                  <span className="font-semibold text-[color:var(--primary-deep)]">
                    +₹{addOnTotal.toLocaleString("en-IN")}
                  </span>
                </>
              )}
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Check className="h-3.5 w-3.5" strokeWidth={2} />
              Final pricing depends on guest count — we confirm everything before you commit.
            </p>
          </div>
          <Link
            to="/catering/quote"
            className="mt-5 inline-block rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep sm:mt-0"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}

function ChoiceChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
        active
          ? "border-[color:var(--primary-deep)] bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
