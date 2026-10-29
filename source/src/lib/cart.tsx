import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type LineCustomization = {
  /** Base dish price before portion/serveware changes. */
  basePrice: number;
  /** Portion choices, when the dish comes in more than one size. */
  portions?: { count: number; label: string; price: number }[] | undefined;
  portion?: number | undefined;
  /** Removals offered for this dish, and the ones the customer picked. */
  removalOptions?: { id: string; label: string }[] | undefined;
  removed: string[];
  format: "disposable" | "plated";
  material: string;
  materialLabel: string;
  materialSurcharge: number;
  allergyNotes?: string | undefined;
  instructions?: string | undefined;
};

export type CartLine = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  /** "food" lines and "service" lines are grouped separately in the cart. */
  kind?: "food" | "service" | undefined;
  image?: string | undefined;
  /** For services: the unit being counted, e.g. "hours" or "staff". */
  unit?: string | undefined;
  /** Per-dish customization summary, e.g. "No onion · Plated: Terracotta". */
  customization?: string | undefined;
  /** Free-text instructions scoped to this dish. */
  instructions?: string | undefined;
  /** Structured customization, editable from the cart. */
  custom?: LineCustomization | undefined;
};

/** Small tags summarising a line's customization, for display in the cart. */
export function customizationTags(line: CartLine): string[] {
  const custom = line.custom;
  if (!custom) {
    const tags: string[] = [];
    if (line.customization) tags.push(...line.customization.split(" · "));
    if (line.instructions) tags.push(`Note: ${line.instructions}`);
    return tags;
  }
  const tags: string[] = [];
  if (custom.portions && custom.portions.length > 1) {
    const portion = custom.portions.find((option) => option.count === custom.portion);
    if (portion) tags.push(portion.label);
  }
  for (const removed of custom.removed) tags.push(`No ${removed}`);
  tags.push(
    custom.format === "plated"
      ? `Plated (${custom.materialLabel}, +₹${custom.materialSurcharge.toLocaleString("en-IN")})`
      : "Disposable serveware",
  );
  if (custom.allergyNotes?.trim()) tags.push(`Allergy: ${custom.allergyNotes.trim()}`);
  if (custom.instructions?.trim()) tags.push(`Note: ${custom.instructions.trim()}`);
  return tags;
}

/** Unit price implied by a line's current customization. */
export function customizedPrice(custom: LineCustomization): number {
  const portion = custom.portions?.find((option) => option.count === custom.portion);
  const base = portion?.price ?? custom.basePrice;
  return base + (custom.format === "plated" ? custom.materialSurcharge : 0);
}


type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (item: Omit<CartLine, "quantity">, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  updateCustomization: (id: string, patch: Partial<LineCustomization>) => void;
  orderNotes: string;
  setOrderNotes: (notes: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [orderNotes, setOrderNotes] = useState("");

  const value = useMemo<CartContextValue>(() => {
    return {
      lines,
      count: lines.reduce((total, line) => total + line.quantity, 0),
      subtotal: lines.reduce((total, line) => total + line.price * line.quantity, 0),
      add: (item, quantity = 1) =>
        setLines((prev) => {
          const existing = prev.find((line) => line.id === item.id);
          if (existing) {
            return prev.map((line) =>
              line.id === item.id ? { ...line, quantity: line.quantity + quantity } : line,
            );
          }
          return [...prev, { ...item, quantity }];
        }),
      setQuantity: (id, quantity) =>
        setLines((prev) =>
          quantity <= 0
            ? prev.filter((line) => line.id !== id)
            : prev.map((line) => (line.id === id ? { ...line, quantity } : line)),
        ),
      updateCustomization: (id, patch) =>
        setLines((prev) =>
          prev.map((line) => {
            if (line.id !== id || !line.custom) return line;
            const custom = { ...line.custom, ...patch };
            return { ...line, custom, price: customizedPrice(custom) };
          }),
        ),
      orderNotes,
      setOrderNotes,
      remove: (id) => setLines((prev) => prev.filter((line) => line.id !== id)),
      clear: () => setLines([]),
    };
  }, [lines, orderNotes]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
