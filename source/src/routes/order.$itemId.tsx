import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, Flame, Minus, Plus } from "lucide-react";
import { CATEGORIES, MENU, itemGallery, type MenuItem } from "@/lib/menu";
import { SERVING_MATERIALS, portionOptions, removableIngredients } from "@/lib/customize";
import { ProductGallery } from "@/components/product-gallery";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/order/$itemId")({
  loader: ({ params }) => {
    const item = MENU.find((entry) => entry.id === params.itemId);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Dish unavailable — The Lemon Bowl" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { item } = loaderData;
    const title = `${item.name} — The Lemon Bowl`;
    const description = item.ingredients.slice(0, 155);
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
  notFoundComponent: ItemNotFound,
  component: ProductDetail,
});

const rupee = (value: number) => `₹${value.toLocaleString("en-IN")}`;

function singular(unit: string) {
  return unit.endsWith("s") ? unit.slice(0, -1) : unit;
}

function ItemNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-[family-name:var(--font-display)] text-3xl">We couldn't find that dish</h1>
      <p className="mt-3 text-muted-foreground">
        It may have moved off the menu. Browse the full menu to find something else you'll love.
      </p>
      <Link
        to="/order"
        className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-[color:var(--primary-deep)]"
      >
        Back to the menu
      </Link>
    </div>
  );
}

function ProductDetail() {
  const { item } = Route.useLoaderData();
  const { add } = useCart();
  const step = item.unitOptions?.[0] ?? 1;
  const [quantity, setQuantity] = useState(step);
  const [added, setAdded] = useState(false);

  // Customization (food items only)
  const removals = useMemo(() => (item.service ? [] : removableIngredients(item)), [item]);
  const [removed, setRemoved] = useState<string[]>([]);
  const [format, setFormat] = useState<"disposable" | "plated">("disposable");
  const [material, setMaterial] = useState(SERVING_MATERIALS[0]!.id);
  const [allergyNotes, setAllergyNotes] = useState("");
  const [instructions, setInstructions] = useState("");

  const portions = useMemo(() => portionOptions(item), [item]);
  const [portion, setPortion] = useState(portions[0]?.count ?? 0);
  const selectedPortion = portions.find((option) => option.count === portion) ?? portions[0];
  const photos = useMemo(() => itemGallery(item), [item]);

  const selectedMaterial = SERVING_MATERIALS.find((m) => m.id === material)!;
  const surcharge = format === "plated" ? selectedMaterial.surcharge : 0;
  const basePrice = selectedPortion?.price ?? item.price;
  const unitPrice = basePrice + surcharge;

  const categoryLabel = CATEGORIES.find((category) => category.id === item.category)?.label ?? "";
  const unitWord = item.unit ? singular(item.unit) : "item";

  const customizationSummary = () => {
    const parts: string[] = [];
    if (selectedPortion && portions.length > 1) parts.push(selectedPortion.label);
    if (removed.length) parts.push(removed.map((r) => `No ${r}`).join(", "));
    parts.push(format === "plated" ? `Plated: ${selectedMaterial.label}` : "Disposable serveware");
    if (allergyNotes.trim()) parts.push(`Allergy: ${allergyNotes.trim()}`);
    return parts.join(" · ");
  };

  const handleAdd = () => {
    const summary = item.service ? undefined : customizationSummary();
    const lineId = item.service
      ? item.id
      : `${item.id}::${portions.length > 1 ? `${portion}pcs-` : ""}${format}${format === "plated" ? `-${material}` : ""}${
          removed.length ? `::${[...removed].sort().join("-")}` : ""
        }${allergyNotes.trim() ? `::allergy-${allergyNotes.trim().slice(0, 30)}` : ""}${
          instructions.trim() ? `::${instructions.trim().slice(0, 40)}` : ""
        }`;

    add(
      {
        id: lineId,
        name: item.name,
        price: unitPrice,
        kind: item.service ? "service" : "food",
        image: item.image,
        unit: item.unit,
        customization: summary,
        instructions: instructions.trim() || undefined,
        custom: item.service
          ? undefined
          : {
              basePrice: item.price,
              portions: portions.length > 1 ? portions : undefined,
              portion: selectedPortion?.count,
              removalOptions: removals,
              removed,
              format,
              material,
              materialLabel: selectedMaterial.label,
              materialSurcharge: selectedMaterial.surcharge,
              allergyNotes: allergyNotes.trim() || undefined,
              instructions: instructions.trim() || undefined,
            },
      },
      quantity,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 pb-32 pt-8 lg:px-10 lg:pb-24">
      <Link
        to="/order"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to the menu
      </Link>

      <div className="mt-8 grid gap-12 lg:mt-10 lg:grid-cols-[45fr_55fr] lg:gap-20">
        <div>
          <ProductGallery images={photos} name={item.name} />
        </div>

        <div className="lg:pt-2">
          <p className="eyebrow">The Lemon Bowl · {item.cuisine || categoryLabel}</p>

          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            {item.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {item.tag && (
              <span className="rounded-full bg-[color:var(--coral)] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--coral-foreground)]">
                {item.tag}
              </span>
            )}
            {item.diet === "non-veg" && item.nonVegType && (
              <span className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                <Flame className="h-3 w-3" aria-hidden />
                {item.nonVegType}
              </span>
            )}
            {item.glutenFree && (
              <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Gluten free
              </span>
            )}
            {item.diy && (
              <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                DIY — some assembly
              </span>
            )}
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              {item.service
                ? "Hosting service"
                : item.diet === "non-veg"
                  ? "Non-vegetarian"
                  : item.diet === "vegan"
                    ? "Vegan"
                    : "Vegetarian"}
            </span>
          </div>

          {item.specialNote && (
            <p className="mt-3 text-sm text-[color:var(--primary-deep)]">{item.specialNote}</p>
          )}
          {item.note && !item.service && (
            <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
          )}

          <p className="mt-6 text-2xl font-bold text-[color:var(--primary-deep)]">
            {rupee(unitPrice)}
            <span className="ml-2 text-sm font-medium text-muted-foreground">
              {item.unit ? `per ${unitWord}` : (selectedPortion?.label ?? item.serves)}
            </span>
          </p>
          {surcharge > 0 && (
            <p className="mt-1 text-xs text-muted-foreground">
              Includes {rupee(surcharge)} for plated serveware ({selectedMaterial.label}).
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center rounded-full border border-border bg-card">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((value) => Math.max(step, value - step))}
                className="grid h-11 w-11 place-items-center rounded-l-full text-muted-foreground transition-colors hover:text-foreground"
              >
                <Minus className="h-4 w-4" aria-hidden />
              </button>
              <span className="min-w-14 text-center text-sm font-semibold">
                {quantity}
                {item.unit && (
                  <span className="ml-1 font-normal text-muted-foreground">{item.unit}</span>
                )}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((value) => value + step)}
                className="grid h-11 w-11 place-items-center rounded-r-full text-muted-foreground transition-colors hover:text-foreground"
              >
                <Plus className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="press inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-9 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:bg-[color:var(--primary-deep)]"
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" aria-hidden />
                  Added to cart
                </>
              ) : (
                `Add to Cart · ${rupee(unitPrice * quantity)}`
              )}
            </button>
          </div>

          <p className="mt-5 max-w-prose leading-relaxed text-muted-foreground">
            {item.ingredients}
          </p>

          <InfoBlock item={item} />

          {!item.service && (
            <section
              aria-labelledby="customize-dish"
              className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6 sm:p-8"
            >
              <h2
                id="customize-dish"
                className="font-[family-name:var(--font-display)] text-xl text-foreground"
              >
                Customize this dish
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Optional — tell the kitchen how you&apos;d like it made and served.
              </p>

              {portions.length > 1 && (
                <div className="mt-6">
                  <p className="eyebrow">Portion size</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {portions.map((option) => {
                      const active = option.count === portion;
                      return (
                        <button
                          key={option.count}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setPortion(option.count)}
                          className={`rounded-xl border px-4 py-2.5 text-left text-sm transition-colors ${
                            active
                              ? "border-[color:var(--primary-deep)] bg-primary text-primary-foreground"
                              : "border-border bg-card text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <span className="block font-semibold">{option.label}</span>
                          <span className="block text-xs opacity-90">{rupee(option.price)}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Use the stepper above to order more than one of the chosen portion.
                  </p>
                </div>
              )}

              {removals.length > 0 && (
                <div className="mt-6">
                  <p className="eyebrow">Leave something out</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {removals.map((option) => {
                      const active = removed.includes(option.id);
                      return (
                        <button
                          key={option.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() =>
                            setRemoved((prev) =>
                              prev.includes(option.id)
                                ? prev.filter((value) => value !== option.id)
                                : [...prev, option.id],
                            )
                          }
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                            active
                              ? "border-[color:var(--primary-deep)] bg-primary text-primary-foreground"
                              : "border-border bg-card text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {active && <Check className="h-3.5 w-3.5" aria-hidden />}
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-6">
                <p className="eyebrow">Serving format</p>
                <div className="mt-3 space-y-3">
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-4">
                    <input
                      type="radio"
                      name="serving-format"
                      value="disposable"
                      checked={format === "disposable"}
                      onChange={() => setFormat("disposable")}
                      className="mt-1 accent-[color:var(--primary-deep)]"
                    />
                    <span>
                      <span className="block text-sm font-semibold">Disposable</span>
                      <span className="block text-sm text-muted-foreground">
                        Ready-to-serve packaging — no extra charge.
                      </span>
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-4">
                    <input
                      type="radio"
                      name="serving-format"
                      value="plated"
                      checked={format === "plated"}
                      onChange={() => setFormat("plated")}
                      className="mt-1 accent-[color:var(--primary-deep)]"
                    />
                    <span>
                      <span className="block text-sm font-semibold">Plated</span>
                      <span className="block text-sm text-muted-foreground">
                        Arranged on our serveware and collected after your event.
                      </span>
                    </span>
                  </label>

                  {format === "plated" && (
                    <label className="block rounded-xl border border-border bg-card p-4 text-sm">
                      <span className="font-semibold">Choose serveware material</span>
                      <select
                        value={material}
                        onChange={(event) => setMaterial(event.target.value)}
                        className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                      >
                        {SERVING_MATERIALS.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.label} · +{rupee(option.surcharge)}
                          </option>
                        ))}
                      </select>
                      <span className="mt-2 block text-xs text-muted-foreground">
                        Serveware charge is added to this dish&apos;s price.
                      </span>
                    </label>
                  )}
                </div>
              </div>

              <label className="mt-6 block rounded-xl border border-[color:var(--coral)]/50 bg-card p-4">
                <span className="eyebrow text-[color:var(--coral)]">
                  Allergy &amp; dietary notes
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  Flagged separately for our prep and packing team.
                </span>
                <textarea
                  value={allergyNotes}
                  onChange={(event) => setAllergyNotes(event.target.value)}
                  rows={2}
                  placeholder="e.g. nut allergy, no dairy, gluten-free"
                  className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
                />
              </label>

              <label className="mt-6 block">
                <span className="eyebrow">Special instructions for this dish</span>
                <textarea
                  value={instructions}
                  onChange={(event) => setInstructions(event.target.value)}
                  rows={3}
                  placeholder="e.g. keep the chutney on the side, mild spice"
                  className="mt-3 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm"
                />
              </label>
            </section>
          )}
        </div>
      </div>

      {/* Sticky add-to-cart on mobile — stays reachable while scrolling */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur transition-[opacity,transform] duration-[250ms] ease-[var(--ease-standard)] lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-muted-foreground">{item.name}</p>
            <p className="text-sm font-semibold text-[color:var(--primary-deep)]">
              {rupee(unitPrice * quantity)}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                {quantity} {item.unit ?? (quantity > 1 ? "portions" : "portion")}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="press inline-flex h-11 flex-none items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:bg-[color:var(--primary-deep)]"
          >
            {added ? (
              <>
                <Check className="h-4 w-4" aria-hidden />
                Added
              </>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ item }: { item: MenuItem }) {
  const rows: { label: string; value: string }[] = [
    { label: item.service ? "What's included" : "Contents", value: item.contents },
    { label: item.service ? "Priced by" : "Portion", value: item.serves },
  ];

  if (!item.service) {
    if (item.reheating) rows.push({ label: "Reheating & serving", value: item.reheating });
    if (item.storage) rows.push({ label: "Storage", value: item.storage });
    if (item.shelfLife) rows.push({ label: "Shelf life", value: item.shelfLife });
    if (item.allergens.length) {
      rows.push({
        label: "Contains",
        value: item.allergens.map((allergen) => allergen).join(", "),
      });
    }
  }

  if (item.note) rows.push({ label: "Note", value: item.note });

  return (
    <section
      aria-labelledby="product-details"
      className="mt-10 overflow-hidden rounded-2xl border border-border bg-card"
    >
      <h2
        id="product-details"
        className="border-b border-border px-6 py-4 font-[family-name:var(--font-display)] text-lg"
      >
        {item.service ? "Service details" : "Good to know"}
      </h2>
      <dl className="divide-y divide-border">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 px-6 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {row.label}
            </dt>
            <dd className="text-sm leading-relaxed text-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
