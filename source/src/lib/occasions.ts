import { PHOTOS } from "@/lib/photos";

export type ArchetypeAction =
  | { kind: "order"; collection?: "gifting" | "small-team" }
  | { kind: "quote" }
  | { kind: "subscription" }
  | { kind: "build" };

export type Archetype = {
  title: string;
  blurb: string;
  cta: string;
  action: ArchetypeAction;
  note?: string;
};

export type Occasion = {
  slug: string;
  title: string;
  tagline: string;
  header: string;
  image: string;
  archetypes: Archetype[];
};

const smallTeamOrder = (blurb: string, cta = "Order now"): Archetype => ({
  title: "Small Order",
  blurb,
  cta,
  action: { kind: "order", collection: "small-team" },
  note: "Instant cart checkout — no quote needed.",
});

const fullCatering = (blurb: string): Archetype => ({
  title: "Full Catering",
  blurb,
  cta: "Request a quote",
  action: { kind: "quote" },
  note: "Our team replies within 24 hours.",
});

const gifting = (blurb: string, cta = "View gifting options"): Archetype => ({
  title: "Gifting",
  blurb,
  cta,
  action: { kind: "order", collection: "gifting" },
});

const buildYourOwn = (blurb: string): Archetype => ({
  title: "Build Your Own Spread",
  blurb,
  cta: "Start building",
  action: { kind: "build" },
});

export const OCCASIONS: Occasion[] = [
  {
    slug: "celebration",
    title: "Celebration",
    tagline: "Birthdays, anniversaries and festive gatherings at home.",
    header:
      "Celebrating something at home? Here's how Lemon Bowl can help — from a quick spread to a fully styled table.",
    image: PHOTOS.mithaiPlatter,
    archetypes: [
      smallTeamOrder("A tight, fixed-menu selection for an intimate table of 6–10.", "Order now"),
      fullCatering(
        "A styled, multi-course spread with grazing boards, mains and mithai for a full guest list.",
      ),
      buildYourOwn("Pick your own dips, sides, mains and desserts within simple limits."),
      gifting("Return gifts, mithai boxes and hampers for the guests who came.", "View gifting picks"),
    ],
  },
  {
    slug: "store-launch",
    title: "Store Launch",
    tagline: "Openings and previews where guests graze while they browse.",
    header:
      "Opening a store or showroom? Here's how Lemon Bowl can help you feed a walk-through crowd without stalling it.",
    image: PHOTOS.mezzePlatter,
    archetypes: [
      smallTeamOrder("Finger food and coolers for a soft launch or press preview.", "Order now"),
      fullCatering("Roaming canapés, grazing tables and beverage counters for a full launch day."),
      {
        title: "Monthly Subscription",
        blurb:
          "Keep a curated spread arriving for recurring store events, VIP previews and weekend footfall pushes.",
        cta: "Enquire about subscription",
        action: { kind: "subscription" },
      },
      gifting("Branded hampers and mithai boxes for launch-day guests and partners."),
    ],
  },
  {
    slug: "art-gallery",
    title: "Art Gallery / Exhibition Opening",
    tagline: "Quiet, elegant food that doesn't compete with the walls.",
    header:
      "Opening a show? Here's how Lemon Bowl can help — one-bite food, clean service, nothing that drips on the artwork.",
    image: PHOTOS.panAsianStarters,
    archetypes: [
      smallTeamOrder("One-bite canapés and coolers for a preview evening or artist walkthrough."),
      fullCatering("Full vernissage service — passed canapés, mithai counter and beverage styling."),
      {
        title: "Monthly Subscription",
        blurb:
          "A recurring spread for galleries with a rolling exhibition calendar — same standard, every opening.",
        cta: "Enquire about subscription",
        action: { kind: "subscription" },
      },
      gifting("Artist, collector and patron gifting — mithai boxes and curated hampers."),
    ],
  },
  {
    slug: "corporate",
    title: "Corporate Event",
    tagline: "Offsites, town halls, board lunches and client meetings.",
    header:
      "Hosting a corporate event or looking after your team? Here's how Lemon Bowl can help.",
    image: PHOTOS.northIndianHandis,
    archetypes: [
      {
        title: "Small Team Order",
        blurb:
          "A quick, fixed-menu order with a lower minimum — right for a team of 6–15 and ready the same week.",
        cta: "Order now",
        action: { kind: "order", collection: "small-team" },
        note: "Instant cart checkout — this is not a quote request.",
      },
      {
        title: "Full Catering",
        blurb:
          "A larger, styled spread for town halls, offsites and client events — live counters, staff and serveware included.",
        cta: "Request a quote",
        action: { kind: "quote" },
        note: "Share headcount, budget and lead time; we reply within 24 hours.",
      },
      {
        title: "Monthly Subscription",
        blurb:
          "A curated spread for your leadership team or client meetings, every month — planned once, delivered on schedule.",
        cta: "Enquire about subscription",
        action: { kind: "subscription" },
      },
      {
        title: "Corporate Gifting",
        blurb:
          "Hampers and platters for client and employee gifting, wrapped and delivered across Delhi NCR.",
        cta: "View gifting options",
        action: { kind: "order", collection: "gifting" },
      },
    ],
  },
  {
    slug: "treating-employees",
    title: "Treating Employees",
    tagline: "Milestones, appraisals, festivals and just-because Fridays.",
    header:
      "Want to treat your team? Here's how Lemon Bowl can help — from a Friday spread to a festival lunch.",
    image: PHOTOS.northIndianThali,
    archetypes: [
      smallTeamOrder("A fixed-menu lunch or snack spread for a single floor or pod."),
      fullCatering("Festival lunches and reward dinners for the whole office, fully set up."),
      {
        title: "Monthly Subscription",
        blurb: "One recurring team spread a month — same day each month, no re-ordering.",
        cta: "Enquire about subscription",
        action: { kind: "subscription" },
      },
      gifting("Employee gifting — mithai boxes and hampers for festivals and milestones."),
    ],
  },
  {
    slug: "institutional",
    title: "Institutional / Academy Catering",
    tagline: "Schools, academies and campuses with recurring volume.",
    header:
      "Catering for an institution or academy? Here's how Lemon Bowl can help — volume, consistency and clean logistics.",
    image: PHOTOS.northIndianHandis,
    archetypes: [
      smallTeamOrder("Staff room and faculty orders on a fixed, quick-turnaround menu."),
      fullCatering("Convocations, sports days and parent events at institutional volume."),
      {
        title: "Recurring Contract",
        blurb:
          "A standing weekly or monthly menu for campuses — fixed pricing, agreed lead times, one point of contact.",
        cta: "Enquire about a contract",
        action: { kind: "subscription" },
      },
      gifting("Faculty appreciation and visiting-guest gifting boxes."),
    ],
  },
  {
    slug: "wedding-adjacent",
    title: "Wedding-Adjacent Events",
    tagline: "Sangeet, mehendi, haldi and the at-home functions around them.",
    header:
      "Planning the functions around a wedding? Here's how Lemon Bowl can help with the smaller, at-home ones.",
    image: PHOTOS.partySpread,
    archetypes: [
      smallTeamOrder("Chaat, snacks and coolers for a small mehendi or haldi at home."),
      fullCatering("Sangeet and cocktail-night catering with grazing tables, counters and staff."),
      buildYourOwn("Compose the spread yourself — chaat counter, mains, breads and mithai."),
      gifting("Trousseau and guest gifting — mithai boxes, hampers and platters."),
    ],
  },
  {
    slug: "just-because",
    title: "Just Because",
    tagline: "A small, casual gathering with no occasion attached.",
    header:
      "No occasion, just people coming over? Here's how Lemon Bowl can help — quick, easy, nothing to plan.",
    image: PHOTOS.guestsGathered,
    archetypes: [
      smallTeamOrder("A quick fixed-menu order that lands ready to serve.", "Order now"),
      fullCatering("Turn a casual evening into something styled, if you'd rather we handled it."),
      buildYourOwn("Choose your own dips, sides and mains within simple limits."),
      gifting("Sending food to someone instead? Browse gifting-ready picks."),
    ],
  },
];

export const occasionBySlug = (slug: string) => OCCASIONS.find((entry) => entry.slug === slug);
