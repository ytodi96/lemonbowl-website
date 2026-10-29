import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeImage } from "@/components/fade-image";
import { useMemo, useState } from "react";
import { Check, ChevronRight, Flame, SlidersHorizontal, X } from "lucide-react";
import {
  ALLERGEN_FILTERS,
  COURSES,
  DIET_FILTERS,
  courseCuisines,
  courseItems,
  type Allergen,
  type CourseId,
  type Diet,
  type MenuItem,
} from "@/lib/menu";
import { useCart } from "@/lib/cart";

const title = "Our Menu — The Lemon Bowl";
const description =
  "Browse by course — chaat, mains, breads, platters, salads, mithai and drinks — then narrow by cuisine and dietary preference. Delivered across Delhi NCR.";

export const Route = createFileRoute("/order/")({
  validateSearch: (search: Record<string, unknown>): { collection?: string } => {
    const collection = search["collection"];
    return typeof collection === "string" ? { collection } : {};
  },
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

const singular = (unit: string) => (unit === "boxes" ? "box" : unit.replace(/s$/, ""));
const plural = (unit: string, count: number) => (count === 1 ? singular(unit) : unit);

const rupee = (value: number) => `₹${value.toLocaleString("en-IN")}`;

/** Upper price bound used for the "small team order" pre-filtered view. */
const SMALL_TEAM_MAX_PRICE = 1600;

function Page() {
  const { collection } = Route.useSearch();
  const gifting = collection === "gifting";
  const smallTeam = collection === "small-team";

  const [activeCourse, setActiveCourse] = useState<CourseId>("appetizers");
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [bannerOpen, setBannerOpen] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [diets, setDiets] = useState<Diet[]>([]);
  const [allergens, setAllergens] = useState<Allergen[]>([]);

  const toggle = <T,>(list: T[], value: T, set: (next: T[]) => void) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const activeFilterCount = diets.length + allergens.length;
  const isServices = activeCourse === "add-ons";
  const cuisineChips = useMemo(
    () => (isServices ? [] : courseCuisines(activeCourse)),
    [activeCourse, isServices],
  );

  const items = useMemo(() => {
    return courseItems(activeCourse).filter((item) => {
      if (isServices) return true;
      if (cuisines.length) {
        const matches = cuisines.some((cuisine) => item.cuisine === cuisine);
        if (!matches) return false;
      }
      if (diets.length && !diets.includes(item.diet)) return false;
      if (allergens.some((a) => item.allergens.includes(a))) return false;
      if (smallTeam && item.price > SMALL_TEAM_MAX_PRICE) return false;
      if (gifting && !item.gifting) return true;
      return true;
    });
  }, [activeCourse, cuisines, diets, allergens, isServices, smallTeam, gifting]);

  const courseLabel = COURSES.find((course) => course.id === activeCourse)?.label ?? "";

  const heading = gifting ? "Gifting-Ready Selections" : smallTeam ? "Small Team Orders" : "Our Menu";
  const intro = gifting
    ? "Sweets, hampers and platters that travel and gift beautifully — with wrapping and a handwritten note if you like."
    : smallTeam
      ? "A tighter, quick-order view of dishes that suit smaller teams and lower minimums. Add to cart and check out directly."
      : description;

  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <p className="eyebrow">Order</p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl">{heading}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{intro}</p>
        </div>
      </section>

      {/* Tier 1 — course tabs (sticky) */}
      <div className="sticky top-[72px] z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            role="tablist"
            aria-label="Course type"
            className="flex gap-1 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {COURSES.map((course) => {
              const active = activeCourse === course.id;
              return (
                <button
                  key={course.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setActiveCourse(course.id);
                    setCuisines([]);
                  }}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {course.label}
                </button>
              );
            })}
          </div>

          {/* Tier 2 — cuisine chips for the active course */}
          {cuisineChips.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto border-t border-border py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Cuisine
              </span>
              {cuisineChips.map((cuisine) => (
                <Chip
                  key={cuisine}
                  active={cuisines.includes(cuisine)}
                  onClick={() => toggle(cuisines, cuisine, setCuisines)}
                >
                  {cuisine === "Mashawi" && <Flame className="mr-1 inline h-3.5 w-3.5" aria-hidden />}
                  {cuisine}
                </Chip>
              ))}
              {cuisines.length > 0 && (
                <button
                  type="button"
                  onClick={() => setCuisines([])}
                  className="shrink-0 px-2 text-xs font-medium text-[color:var(--primary-deep)] underline underline-offset-4"
                >
                  Clear
                </button>
              )}
              <span className="flex-1" />
              <button
                type="button"
                onClick={() => setFiltersOpen((value) => !value)}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden />
                Diet & allergens
                {activeFilterCount > 0 && (
                  <span className="ml-0.5 rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Dietary preference banner */}
        {bannerOpen && !filtersOpen && (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-secondary/60 px-4 py-3">
            <SlidersHorizontal className="h-4 w-4 text-[color:var(--primary-deep)]" aria-hidden />
            <p className="flex-1 text-sm">
              Set your dietary preferences
              <span className="hidden text-muted-foreground sm:inline">
                {" "}
                — veg, non-veg, vegan and allergens.
              </span>
            </p>
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[color:var(--primary-deep)]"
            >
              Set now
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setBannerOpen(false)}
              aria-label="Dismiss dietary preferences banner"
              className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        )}

        {/* Filter panel */}
        {filtersOpen && (
          <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-xl">Dietary preferences</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Combines with the course and cuisine you&apos;ve selected.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
                className="rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <FilterRow label="Diet">
              {DIET_FILTERS.map((filter) => (
                <Chip
                  key={filter.id}
                  active={diets.includes(filter.id)}
                  onClick={() => toggle(diets, filter.id, setDiets)}
                >
                  {filter.label}
                </Chip>
              ))}
            </FilterRow>

            <FilterRow label="Allergens">
              {ALLERGEN_FILTERS.map((filter) => (
                <Chip
                  key={filter.id}
                  active={allergens.includes(filter.id)}
                  onClick={() => toggle(allergens, filter.id, setAllergens)}
                >
                  {filter.label}
                </Chip>
              ))}
            </FilterRow>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  setDiets([]);
                  setAllergens([]);
                }}
                className="mt-5 text-sm font-medium text-[color:var(--primary-deep)] underline underline-offset-4"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        <section className="py-10">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-4">
            <h2 className="font-display text-2xl sm:text-3xl">{courseLabel}</h2>
            <p className="text-sm text-muted-foreground">
              {isServices
                ? "Services added to your order — choose quantity or duration"
                : `${items.length} ${items.length === 1 ? "item" : "items"}`}
            </p>
          </div>

          {items.length === 0 ? (
            <p className="mt-8 text-sm text-muted-foreground">
              Nothing in this course matches your current filters. Try clearing a cuisine chip or a
              dietary filter.
            </p>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((item) => (
                <ItemCard key={item.id} item={item} highlight={gifting && !!item.gifting} />
              ))}
            </div>
          )}
        </section>

        <div className="border-t border-border py-12 text-center">
          <p className="text-sm text-muted-foreground">Happy with your selection?</p>
          <Link
            to="/order/cart"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[color:var(--primary-deep)]"
          >
            Go to cart
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <p className="eyebrow">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
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
      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        active
          ? "border-[color:var(--primary-deep)] bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function ItemCard({ item, highlight }: { item: MenuItem; highlight?: boolean }) {
  const { add } = useCart();
  const [units, setUnits] = useState(item.unitOptions?.[0] ?? 1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        kind: item.service ? "service" : "food",
        image: item.image,
        unit: item.unit,
      },
      item.unit ? units : 1,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-xl border bg-card shadow-[var(--shadow-soft)] transition-shadow duration-[250ms] ease-[var(--ease-standard)] hover:shadow-[var(--shadow-lift)] ${
        highlight ? "border-[color:var(--coral)]" : "border-border"
      }`}
    >
      <Link
        to="/order/$itemId"
        params={{ itemId: item.id }}
        className="block aspect-[4/3] overflow-hidden bg-secondary"
      >
        <FadeImage
          src={item.image}
          alt={item.name}
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-[250ms] ease-[var(--ease-standard)] hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          {item.tag && (
            <span className="rounded-full bg-[color:var(--coral)] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--coral-foreground)]">
              {item.tag}
            </span>
          )}
          {item.diet === "non-veg" && (
            <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              <Flame className="h-3 w-3" aria-hidden />
              {item.nonVegType || "Non-Veg"}
            </span>
          )}
          {item.diet === "vegan" && (
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Vegan
            </span>
          )}
          {item.glutenFree && (
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Gluten free
            </span>
          )}
          {item.diy && (
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              DIY
            </span>
          )}
          {highlight && (
            <span className="rounded-full border border-[color:var(--coral)] px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-[color:var(--coral)]">
              Gifts well
            </span>
          )}
        </div>

        <h3 className="mt-3 font-semibold leading-snug text-foreground">
          <Link to="/order/$itemId" params={{ itemId: item.id }} className="hover:underline">
            {item.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.ingredients}</p>
        <p className="mt-2 text-xs text-muted-foreground">{item.serves}</p>
        {item.specialNote && (
          <p className="mt-2 text-xs text-[color:var(--primary-deep)]">{item.specialNote}</p>
        )}
        {item.note && <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>}

        <div className="flex-1" />

        <p className="mt-4 text-lg font-bold text-[color:var(--primary-deep)]">
          {item.sizes && item.sizes.length > 1 ? `From ${rupee(item.price)}` : rupee(item.price)}
          {item.unit && (
            <span className="ml-1 text-xs font-medium text-muted-foreground">
              per {singular(item.unit)}
            </span>
          )}
        </p>

        {item.unit && item.unitOptions && (
          <label className="mt-3 block text-sm">
            <span className="text-muted-foreground">Select {item.unit}</span>
            <select
              value={units}
              onChange={(event) => setUnits(Number(event.target.value))}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            >
              {item.unitOptions.map((option) => (
                <option key={option} value={option}>
                  {option} {plural(item.unit!, option)}
                </option>
              ))}
            </select>
          </label>
        )}

        <button
          type="button"
          onClick={handleAdd}
          className="mt-5 self-stretch inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[color:var(--primary-deep)]"
        >
          {added ? (
            <>
              <Check className="h-4 w-4" aria-hidden />
              Added
            </>
          ) : (
            "Add to cart"
          )}
        </button>
      </div>
    </article>
  );
}
