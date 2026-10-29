import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, X, ShoppingBag, CheckCircle2, Pencil } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import {
  useCart,
  customizationTags,
  type CartLine,
  type LineCustomization,
} from "@/lib/cart";
import { SERVING_MATERIALS } from "@/lib/customize";
import { FadeImage } from "@/components/fade-image";

const title = "Your Cart — The Lemon Bowl";
const description =
  "Review your platters, meals and add-on services, then place your order for delivery across Delhi NCR.";

export const Route = createFileRoute("/order/cart")({
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
  component: CartPage,
});

const rupees = (value: number) => `₹${value.toLocaleString("en-IN")}`;
const DELIVERY_FEE = 199;
const UPSELL_ITEM_THRESHOLD = 6;
const UPSELL_TOTAL_THRESHOLD = 12000;

function CartPage() {
  const { lines, setQuantity, remove, clear, updateCustomization, orderNotes, setOrderNotes } =
    useCart();
  const [upsellDismissed, setUpsellDismissed] = useState(false);
  const [placed, setPlaced] = useState(false);

  const food = useMemo(() => lines.filter((line) => line.kind !== "service"), [lines]);
  const services = useMemo(() => lines.filter((line) => line.kind === "service"), [lines]);

  const foodSubtotal = food.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const serviceSubtotal = services.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const foodUnits = food.reduce((sum, line) => sum + line.quantity, 0);
  const total = foodSubtotal + serviceSubtotal + (lines.length ? DELIVERY_FEE : 0);

  const showUpsell =
    !upsellDismissed &&
    services.length === 0 &&
    (foodUnits >= UPSELL_ITEM_THRESHOLD || foodSubtotal >= UPSELL_TOTAL_THRESHOLD);

  if (placed) {
    return (
      <>
        <PageHeader eyebrow="Order" title="Order placed" description="" />
        <section className="mx-auto max-w-2xl px-6 pb-24 lg:px-10">
          <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-[var(--shadow-soft)]">
            <CheckCircle2 className="mx-auto h-12 w-12 text-[color:var(--primary-deep)]" strokeWidth={1.5} />
            <h2 className="mt-4 font-display text-2xl">Thank you — we have your order</h2>
            <p className="mt-3 text-muted-foreground">
              A member of our team will call to confirm your delivery slot within the next few
              hours. For anything urgent, WhatsApp us and we will pick it up right away.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/order"
                className="press rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
              >
                Back to the menu
              </Link>
              <Link
                to="/contact"
                className="press rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Order" title="Your Cart" description={description} />

      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-10">
        {lines.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-[var(--shadow-soft)]">
            <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" strokeWidth={1.4} />
            <h2 className="mt-4 font-display text-2xl">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">
              Browse the menu and add platters, mains, chaat or desserts.
            </p>
            <Link
              to="/order"
              className="press mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
            >
              Browse the menu
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
            <div className="space-y-10">
              <CartSection
                heading="Food & Platters"
                note="Delivered chilled or hot as noted on each item."
                lines={food}
                subtotal={foodSubtotal}
                onQuantity={setQuantity}
                onRemove={remove}
                onCustomize={updateCustomization}
                emptyLabel="No food items yet."
              />

              {showUpsell && (
                <div className="relative rounded-2xl border border-[color:var(--coral)] bg-card p-6 shadow-[var(--shadow-soft)]">
                  <button
                    type="button"
                    onClick={() => setUpsellDismissed(true)}
                    aria-label="Dismiss suggestion"
                    className="absolute right-3 top-3 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <X className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                  <p className="font-display text-lg">Hosting a bigger gathering?</p>
                  <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
                    Add waitstaff, serving equipment or table décor and we will set everything up
                    before your guests arrive.
                  </p>
                  <Link
                    to="/order"
                    className="press mt-4 inline-block rounded-full border border-[color:var(--coral)] px-5 py-2.5 text-sm font-semibold text-[color:var(--coral)] transition-colors hover:bg-[color:var(--coral)] hover:text-[color:var(--coral-foreground)]"
                  >
                    Add staff or décor
                  </Link>
                </div>
              )}

              <CartSection
                heading="Services"
                note="Staff, décor and gift wrapping — billed per unit or hour."
                lines={services}
                subtotal={serviceSubtotal}
                onQuantity={setQuantity}
                onRemove={remove}
                onCustomize={updateCustomization}
                emptyLabel="No services added."
              />

              <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:p-6">
                <label htmlFor="order-notes" className="font-display text-xl">
                  Notes for the whole order
                </label>
                <p className="mt-1 text-sm text-muted-foreground">
                  Applies to the entire delivery, separate from the per-dish notes above —
                  delivery instructions, gate code, guard details or a general allergy summary.
                </p>
                <textarea
                  id="order-notes"
                  rows={3}
                  maxLength={500}
                  value={orderNotes}
                  onChange={(event) => setOrderNotes(event.target.value)}
                  placeholder="e.g. Gate code 4421, call on arrival. One guest is severely allergic to peanuts."
                  className="mt-3 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-[box-shadow,border-color] duration-200 focus:border-[color:var(--primary-deep)] focus:ring-2 focus:ring-[color:var(--ring)]"
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  {orderNotes.length}/500 — sent to the kitchen and the delivery team.
                </p>
              </div>

              <button
                type="button"
                onClick={clear}
                className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
              >
                Clear cart
              </button>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <Checkout
                foodSubtotal={foodSubtotal}
                serviceSubtotal={serviceSubtotal}
                total={total}
                onPlaced={() => {
                  clear();
                  setPlaced(true);
                }}
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function CartSection({
  heading,
  note,
  lines,
  subtotal,
  onQuantity,
  onRemove,
  onCustomize,
  emptyLabel,
}: {
  heading: string;
  note: string;
  lines: CartLine[];
  subtotal: number;
  onQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onCustomize: (id: string, patch: Partial<LineCustomization>) => void;
  emptyLabel: string;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-2xl">{heading}</h2>
        <p className="text-sm text-muted-foreground">{note}</p>
      </div>

      <div className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
        {lines.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">{emptyLabel}</p>
        ) : (
          lines.map((line) => (
            <article key={line.id} className="flex gap-4 p-4 sm:p-5">
              {line.image ? (
                <FadeImage
                  src={line.image}
                  alt={line.name}
                  className="h-20 w-20 flex-none rounded-xl object-cover"
                />
              ) : (
                <div className="h-20 w-20 flex-none rounded-xl bg-secondary" />
              )}

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <Link
                    to="/order/$itemId"
                    params={{ itemId: line.id.split("::")[0]! }}
                    className="font-medium leading-snug hover:text-[color:var(--primary-deep)]"
                  >
                    {line.name}
                  </Link>
                  <p className="font-semibold text-[color:var(--primary-deep)]">
                    {rupees(line.price * line.quantity)}
                  </p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {rupees(line.price)} {line.unit ? `per ${singular(line.unit)}` : "each"}
                </p>
                <CustomizationSummary line={line} onCustomize={onCustomize} />

                <div className="mt-3 flex items-center gap-4">
                  <div className="press inline-flex items-center rounded-full border border-border">
                    <button
                      type="button"
                      aria-label={`Decrease ${line.name}`}
                      onClick={() => onQuantity(line.id, line.quantity - 1)}
                      className="p-2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Minus className="h-4 w-4" strokeWidth={1.8} />
                    </button>
                    <span className="min-w-14 text-center text-sm font-medium">
                      {line.quantity}
                      {line.unit ? ` ${line.unit}` : ""}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase ${line.name}`}
                      onClick={() => onQuantity(line.id, line.quantity + 1)}
                      className="p-2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Plus className="h-4 w-4" strokeWidth={1.8} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemove(line.id)}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-[color:var(--destructive)]"
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={1.7} />
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))
        )}

        <div className="flex items-center justify-between bg-secondary px-5 py-3.5 text-sm">
          <span className="text-muted-foreground">{heading} subtotal</span>
          <span className="font-semibold">{rupees(subtotal)}</span>
        </div>
      </div>
    </div>
  );
}

function CustomizationSummary({
  line,
  onCustomize,
}: {
  line: CartLine;
  onCustomize: (id: string, patch: Partial<LineCustomization>) => void;
}) {
  const [editing, setEditing] = useState(false);
  const tags = customizationTags(line);
  const custom = line.custom;

  if (tags.length === 0) return null;

  const chipClass =
    "rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground transition-colors duration-200";

  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center gap-1.5">
        {tags.map((tag) => (
          <span key={tag} className={chipClass}>
            {tag}
          </span>
        ))}
        {custom ? (
          <button
            type="button"
            onClick={() => setEditing((open) => !open)}
            aria-expanded={editing}
            className="press inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs font-medium transition-[background-color,color,transform] duration-200 hover:bg-secondary active:scale-[0.97]"
          >
            <Pencil className="h-3 w-3" strokeWidth={1.8} />
            {editing ? "Done" : "Edit"}
          </button>
        ) : (
          <Link
            to="/order/$itemId"
            params={{ itemId: line.id.split("::")[0]! }}
            className="press rounded-full border border-border px-2.5 py-1 text-xs font-medium transition-colors duration-200 hover:bg-secondary"
          >
            Edit
          </Link>
        )}
      </div>

      {editing && custom && (
        <div className="mt-3 space-y-4 rounded-xl border border-border bg-secondary/50 p-4">
          {custom.portions && custom.portions.length > 1 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Portion size
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {custom.portions.map((option) => (
                  <button
                    key={option.count}
                    type="button"
                    onClick={() => onCustomize(line.id, { portion: option.count })}
                    className={`rounded-full border px-3 py-1.5 text-xs transition-[background-color,border-color,transform] duration-200 active:scale-[0.97] ${
                      custom.portion === option.count
                        ? "border-[color:var(--primary-deep)] bg-primary text-primary-foreground"
                        : "border-border bg-background hover:bg-secondary"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {custom.removalOptions && custom.removalOptions.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Leave out
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {custom.removalOptions.map((option) => {
                  const active = custom.removed.includes(option.label);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() =>
                        onCustomize(line.id, {
                          removed: active
                            ? custom.removed.filter((value) => value !== option.label)
                            : [...custom.removed, option.label],
                        })
                      }
                      className={`rounded-full border px-3 py-1.5 text-xs transition-[background-color,border-color,transform] duration-200 active:scale-[0.97] ${
                        active
                          ? "border-[color:var(--primary-deep)] bg-primary text-primary-foreground"
                          : "border-border bg-background hover:bg-secondary"
                      }`}
                    >
                      No {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Serving format
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["disposable", "plated"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onCustomize(line.id, { format: option })}
                  className={`rounded-full border px-3 py-1.5 text-xs capitalize transition-[background-color,border-color,transform] duration-200 active:scale-[0.97] ${
                    custom.format === option
                      ? "border-[color:var(--primary-deep)] bg-primary text-primary-foreground"
                      : "border-border bg-background hover:bg-secondary"
                  }`}
                >
                  {option === "plated" ? "Plated serveware" : "Disposable"}
                </button>
              ))}
            </div>
            {custom.format === "plated" && (
              <div className="mt-2 flex flex-wrap gap-2">
                {SERVING_MATERIALS.map((material) => (
                  <button
                    key={material.id}
                    type="button"
                    onClick={() =>
                      onCustomize(line.id, {
                        material: material.id,
                        materialLabel: material.label,
                        materialSurcharge: material.surcharge,
                      })
                    }
                    className={`rounded-full border px-3 py-1.5 text-xs transition-[background-color,border-color,transform] duration-200 active:scale-[0.97] ${
                      custom.material === material.id
                        ? "border-[color:var(--primary-deep)] bg-primary text-primary-foreground"
                        : "border-border bg-background hover:bg-secondary"
                    }`}
                  >
                    {material.label} +₹{material.surcharge.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Allergy &amp; dietary notes
              <textarea
                rows={2}
                maxLength={200}
                value={custom.allergyNotes ?? ""}
                onChange={(event) => onCustomize(line.id, { allergyNotes: event.target.value })}
                placeholder="e.g. severe nut allergy"
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground outline-none transition-[box-shadow,border-color] duration-200 focus:border-[color:var(--primary-deep)] focus:ring-2 focus:ring-[color:var(--ring)]"
              />
            </label>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Special instructions
              <textarea
                rows={2}
                maxLength={200}
                value={custom.instructions ?? ""}
                onChange={(event) => onCustomize(line.id, { instructions: event.target.value })}
                placeholder="e.g. mild spice, cut into halves"
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-normal normal-case tracking-normal text-foreground outline-none transition-[box-shadow,border-color] duration-200 focus:border-[color:var(--primary-deep)] focus:ring-2 focus:ring-[color:var(--ring)]"
              />
            </label>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Updated unit price</span>
            <span className="font-semibold text-[color:var(--primary-deep)]">
              {rupees(line.price)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function singular(unit: string) {
  return unit.endsWith("s") ? unit.slice(0, -1) : unit;
}

type Errors = Partial<Record<"name" | "phone" | "address" | "date" | "slot", string>>;

function Checkout({
  foodSubtotal,
  serviceSubtotal,
  total,
  onPlaced,
}: {
  foodSubtotal: number;
  serviceSubtotal: number;
  total: number;
  onPlaced: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    slot: "",
    notes: "",
    payment: "upi",
  });
  const [errors, setErrors] = useState<Errors>({});

  const update = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    else if (form.name.trim().length > 80) next.name = "Name is too long.";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s|-/g, "")))
      next.phone = "Enter a valid 10-digit Indian mobile number.";
    if (form.address.trim().length < 10) next.address = "Please add a full delivery address.";
    else if (form.address.trim().length > 400) next.address = "Address is too long.";
    if (!form.date) next.date = "Choose a delivery date.";
    if (!form.slot) next.slot = "Choose a delivery time.";
    setErrors(next);
    if (Object.keys(next).length === 0) onPlaced();
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
      noValidate
    >
      <h2 className="font-display text-2xl">Checkout</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Delivery across Delhi NCR. We confirm every order by phone.
      </p>

      <div className="mt-5 space-y-4">
        <Field label="Full name" error={errors.name}>
          <input
            type="text"
            maxLength={80}
            value={form.name}
            onChange={(event) => update("name")(event.target.value)}
            className={inputClass}
            autoComplete="name"
          />
        </Field>

        <Field label="Phone number" error={errors.phone}>
          <input
            type="tel"
            maxLength={14}
            value={form.phone}
            onChange={(event) => update("phone")(event.target.value)}
            placeholder="98XXXXXXXX"
            className={inputClass}
            autoComplete="tel"
          />
        </Field>

        <Field label="Delivery address" error={errors.address}>
          <textarea
            rows={3}
            maxLength={400}
            value={form.address}
            onChange={(event) => update("address")(event.target.value)}
            placeholder="Flat / house, street, locality, city, pin code"
            className={inputClass}
            autoComplete="street-address"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Date needed" error={errors.date}>
            <input
              type="date"
              value={form.date}
              onChange={(event) => update("date")(event.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Time slot" error={errors.slot}>
            <select
              value={form.slot}
              onChange={(event) => update("slot")(event.target.value)}
              className={inputClass}
            >
              <option value="">Select</option>
              <option value="breakfast">8 am – 10 am</option>
              <option value="lunch">11 am – 1 pm</option>
              <option value="afternoon">3 pm – 5 pm</option>
              <option value="evening">6 pm – 8 pm</option>
            </select>
          </Field>
        </div>

        <Field label="Notes for the kitchen (optional)">
          <textarea
            rows={2}
            maxLength={300}
            value={form.notes}
            onChange={(event) => update("notes")(event.target.value)}
            placeholder="Allergies, spice level, gate instructions"
            className={inputClass}
          />
        </Field>

        <fieldset>
          <legend className="text-sm font-medium">Payment method</legend>
          <div className="mt-2 space-y-2">
            {[
              { id: "upi", label: "UPI (payment link sent on confirmation)" },
              { id: "card", label: "Card (payment gateway coming soon)" },
              { id: "cod", label: "Cash on delivery" },
            ].map((option) => (
              <label
                key={option.id}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-border px-3.5 py-2.5 text-sm transition-colors hover:bg-secondary"
              >
                <input
                  type="radio"
                  name="payment"
                  value={option.id}
                  checked={form.payment === option.id}
                  onChange={(event) => update("payment")(event.target.value)}
                  className="accent-[color:var(--primary-deep)]"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <dl className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
        <Row label="Food & platters" value={rupees(foodSubtotal)} />
        <Row label="Services" value={rupees(serviceSubtotal)} />
        <Row label="Delivery" value={rupees(DELIVERY_FEE)} />
        <div className="flex items-baseline justify-between border-t border-border pt-3">
          <dt className="font-display text-lg">Total</dt>
          <dd className="font-display text-xl text-[color:var(--primary-deep)]">
            {rupees(total)}
          </dd>
        </div>
      </dl>

      <button
        type="submit"
        className="press mt-5 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
      >
        Place Order
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Planning an event instead?{" "}
        <Link to="/catering/quote" className="underline underline-offset-2">
          Request a catering quote
        </Link>
        .
      </p>
    </form>
  );
}

const inputClass =
  "mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[color:var(--primary-deep)]";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-[color:var(--destructive)]">{error}</span>}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
