import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const title = "FAQ — Delivery, Lead Time & Policies | The Lemon Bowl";
const description =
  "Answers on delivery areas across Delhi NCR, minimum order value, lead time, cancellations, reheating, allergens and payment methods.";

export const Route = createFileRoute("/faq")({
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

type Faq = { q: string; a: string };
type Section = { heading: string; items: Faq[] };

const SECTIONS: Section[] = [
  {
    heading: "Delivery & areas",
    items: [
      {
        q: "Where do you deliver?",
        a: "We deliver across Delhi NCR — South and Central Delhi, Gurugram, Noida, Greater Noida, Ghaziabad and Faridabad. For addresses beyond these zones, write to us and we will confirm feasibility for larger orders.",
      },
      {
        q: "Is there a delivery charge?",
        a: "A flat delivery charge of ₹199 applies to everyday orders within our standard zones. Event and catering deliveries are quoted based on distance, volume and setup requirements.",
      },
      {
        q: "Can I choose a delivery time?",
        a: "Yes. At checkout you can pick a two-hour slot. For events we agree an exact arrival time and our team calls when the vehicle is dispatched.",
      },
    ],
  },
  {
    heading: "Orders & lead time",
    items: [
      {
        q: "What is the minimum order value?",
        a: "The minimum order value is ₹1,500 for everyday menu orders. Catering packages have their own minimums, usually starting at 12–15 guests.",
      },
      {
        q: "How much lead time do you need?",
        a: "Everyday menu orders need 24 hours' notice. Catering and platters for events are best confirmed 48–72 hours in advance. Same-day requests are sometimes possible — WhatsApp us and we will tell you honestly.",
      },
      {
        q: "Can I change my order after placing it?",
        a: "Quantities and menu items can be changed up to 24 hours before the delivery slot. Within 24 hours we may have already procured and prepped, so changes depend on the item.",
      },
    ],
  },
  {
    heading: "Cancellations & refunds",
    items: [
      {
        q: "What is your cancellation policy?",
        a: "Cancellations more than 48 hours before delivery are refunded in full. Between 24 and 48 hours, 50% of the order value is retained. Within 24 hours orders are non-refundable, as ingredients have been procured and prep has begun.",
      },
      {
        q: "What if something is wrong with my order?",
        a: "Tell us within two hours of delivery with a photograph and we will make it right — a replacement, a credit or a refund of the affected item. We do not argue about food.",
      },
    ],
  },
  {
    heading: "Storage, reheating & serving",
    items: [
      {
        q: "How should I store the food until serving?",
        a: "Refrigerate anything you are not serving within two hours. Most mains and gravies keep well for 24–48 hours refrigerated; chaat, salads and dairy-based desserts are best eaten the same day. Every box carries its own storage note.",
      },
      {
        q: "How do I reheat without ruining the presentation?",
        a: "Gravies and mains reheat best on a low flame with a splash of water, or in a microwave in 60-second bursts. Breads reheat on a dry tawa. Grills and kababs go into an oven at 160°C for 6–8 minutes. Item-level guidance appears on each product page.",
      },
      {
        q: "Do platters need assembling?",
        a: "No. Platters and boards arrive pre-plated in the serveware shown on the site. You lift the lid and place them on the table.",
      },
    ],
  },
  {
    heading: "Dietary needs & allergens",
    items: [
      {
        q: "How do you handle allergens?",
        a: "Every item lists its major allergens — nuts, dairy and gluten — and you can filter the menu by them. Our kitchen handles all three, so we cannot guarantee a fully allergen-free environment. For severe allergies, please call us before ordering.",
      },
      {
        q: "Do you cook veg and non-veg separately?",
        a: "Yes. Our non-veg Mashawi line is prepared in a separate section with its own equipment and staff. Pure-veg and Jain (no onion, no garlic) menus are available on request.",
      },
    ],
  },
  {
    heading: "Payments & billing",
    items: [
      {
        q: "Which payment methods do you accept?",
        a: "UPI, bank transfer, credit and debit cards via a secure payment link, and cash on delivery for everyday orders. Card payments on-site are being added shortly.",
      },
      {
        q: "Do you provide a GST invoice?",
        a: "Yes. Share your GSTIN and billing entity when confirming and we will issue a GST invoice. Corporate accounts can be set up for monthly settlement.",
      },
      {
        q: "Is a deposit required for events?",
        a: "For catering and events we take 50% to confirm the date, with the balance due on or before the delivery day.",
      },
    ],
  },
];

function Page() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Everything about delivery, lead times, storage and policies. If your question is not here, WhatsApp us — we reply quickly."
      />

      <section className="mx-auto max-w-3xl px-6 pb-16 lg:px-10">
        <div className="space-y-10">
          {SECTIONS.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-2xl">{section.heading}</h2>
              <Accordion type="single" collapsible className="mt-3">
                {section.items.map((item) => (
                  <AccordionItem
                    key={item.q}
                    value={item.q}
                    className="border-b border-border last:border-b-0"
                  >
                    <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="leading-relaxed text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24 lg:px-10">
        <div className="rounded-2xl border border-border bg-secondary p-8 text-center">
          <h2 className="font-display text-2xl">Still have a question?</h2>
          <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
            Our team is on WhatsApp through the day and happy to talk menus, quantities or timing.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/919999999999"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
            >
              Chat on WhatsApp
            </a>
            <Link
              to="/contact"
              className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
