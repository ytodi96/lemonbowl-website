import type { MenuItem } from "@/lib/menu";

export type ServingMaterial = {
  id: string;
  label: string;
  surcharge: number;
};

/** Plated serving materials, each with its own additional charge. */
export const SERVING_MATERIALS: ServingMaterial[] = [
  { id: "wooden", label: "Wooden", surcharge: 450 },
  { id: "terracotta", label: "Terracotta", surcharge: 550 },
  { id: "ceramic-blue", label: "Ceramic – Blue", surcharge: 750 },
  { id: "ceramic-black", label: "Ceramic – Black", surcharge: 750 },
  { id: "ceramic-white", label: "Ceramic – White", surcharge: 700 },
];

/**
 * Garnishes / aromatics that can be left out without changing what the dish is.
 * Anything not on this list is treated as a core ingredient and never offered
 * for removal.
 */
const OPTIONAL_INGREDIENTS: { match: string[]; label: string }[] = [
  { match: ["garlic"], label: "garlic" },
  { match: ["onion"], label: "onion" },
  { match: ["coriander", "cilantro"], label: "coriander" },
  { match: ["mint", "pudina"], label: "mint" },
  { match: ["green chilli", "green chili", "chilli", "chili"], label: "green chilli" },
  { match: ["peanut"], label: "peanuts" },
  { match: ["walnut"], label: "walnuts" },
  { match: ["cashew"], label: "cashews" },
  { match: ["almond"], label: "almonds" },
  { match: ["sev"], label: "sev" },
  { match: ["boondi"], label: "boondi" },
  { match: ["pomegranate", "anardana"], label: "pomegranate" },
  { match: ["sesame", "til"], label: "sesame" },
  { match: ["olive"], label: "olives" },
  { match: ["jalapeno", "jalapeño"], label: "jalapeños" },
  { match: ["pickled"], label: "pickles" },
  { match: ["cheese"], label: "cheese" },
  { match: ["butter"], label: "butter" },
  { match: ["ghee"], label: "ghee" },
  { match: ["cream"], label: "cream" },
  { match: ["papad"], label: "papad" },
  { match: ["raisin", "kishmish"], label: "raisins" },
  { match: ["saffron", "kesar"], label: "saffron" },
];

/** Removals that make sense for this specific dish, in a "No X" phrasing. */
export function removableIngredients(item: MenuItem): { id: string; label: string }[] {
  const text = `${item.ingredients} ${item.contents}`.toLowerCase();
  const name = item.name.toLowerCase();

  const out: { id: string; label: string }[] = [];
  for (const option of OPTIONAL_INGREDIENTS) {
    const found = option.match.some((needle) => text.includes(needle));
    if (!found) continue;
    // Never offer to remove something the dish is named after — that would
    // change the dish's identity.
    const isCore = option.match.some((needle) => name.includes(needle));
    if (isCore) continue;
    out.push({ id: option.label, label: `No ${option.label}` });
  }
  return out;
}

export type PortionOption = {
  /** Piece count for this option. */
  count: number;
  label: string;
  price: number;
};

/**
 * Portion choices for dishes sold by piece count (e.g. "8 Pcs"). Returns an
 * empty array when the dish only comes in one portion size.
 */
export function portionOptions(item: MenuItem): PortionOption[] {
  if (item.service) return [];
  // Sheet-provided size options (e.g. 12in / 14in / 16in) always win.
  if (item.sizes && item.sizes.length > 1) {
    return item.sizes.map((size, index) => ({
      count: index + 1,
      label: size.label,
      price: size.price,
    }));
  }
  const match = /^(\d+)\s*(pcs|pieces|pc)\b/i.exec(item.serves.trim());
  if (!match) return [];
  const base = Number(match[1]);
  if (!Number.isFinite(base) || base < 4) return [];

  const counts = [base, base * 1.5, base * 2]
    .map((count) => Math.round(count))
    .filter((count, index, all) => all.indexOf(count) === index);

  return counts.map((count) => ({
    count,
    label: `${count} pcs`,
    price: Math.round((item.price * count) / base / 10) * 10,
  }));
}
