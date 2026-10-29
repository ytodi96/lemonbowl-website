import p7353 from "@/assets/photos/DSC_7353.jpg.asset.json";
import p7647 from "@/assets/photos/DSC_7647.jpg.asset.json";
import p7379 from "@/assets/photos/DSC_7379.jpg.asset.json";
import p7543 from "@/assets/photos/DSC_7543.jpg.asset.json";
import p7345 from "@/assets/photos/DSC_7345.jpg.asset.json";
import p7380 from "@/assets/photos/DSC_7380.jpg.asset.json";
import p8668 from "@/assets/photos/DSC_8668.jpg.asset.json";
import p8683 from "@/assets/photos/DSC_8683.jpg.asset.json";
import p8378 from "@/assets/photos/DSC_8378.jpg.asset.json";
import p8415 from "@/assets/photos/DSC_8415.jpg.asset.json";
import p8774 from "@/assets/photos/DSC_8774.jpg.asset.json";
import p8221 from "@/assets/photos/DSC_8221.jpg.asset.json";
import p8361 from "@/assets/photos/DSC_8361.jpg.asset.json";
import p8757 from "@/assets/photos/DSC_8757.jpg.asset.json";
import p8213 from "@/assets/photos/DSC_8213.jpg.asset.json";
import p8743 from "@/assets/photos/DSC_8743.jpg.asset.json";
import p8569 from "@/assets/photos/DSC_8569.jpg.asset.json";
import p8748 from "@/assets/photos/DSC_8748.jpg.asset.json";
import p8196 from "@/assets/photos/DSC_8196.jpg.asset.json";
import p8196b from "@/assets/photos/DSC_8196-2.jpg.asset.json";
import p8488 from "@/assets/photos/DSC_8488.jpg.asset.json";
import p8695 from "@/assets/photos/DSC_8695.jpg.asset.json";
import p8205 from "@/assets/photos/DSC_8205.jpg.asset.json";
import p8767 from "@/assets/photos/DSC_8767.jpg.asset.json";
import p8381 from "@/assets/photos/DSC_8381.jpg.asset.json";
import p8431 from "@/assets/photos/DSC_8431.jpg.asset.json";
import p8199 from "@/assets/photos/DSC_8199.jpg.asset.json";
import p8524 from "@/assets/photos/DSC_8524.jpg.asset.json";

import p8692 from "@/assets/photos/DSC_8692.jpg.asset.json";
import p7884 from "@/assets/photos/DSC_7884.jpg.asset.json";
import p7899 from "@/assets/photos/DSC_7899.jpg.asset.json";
import p7905 from "@/assets/photos/DSC_7905.jpg.asset.json";
import p8179 from "@/assets/photos/DSC_8179.jpg.asset.json";
import p8555 from "@/assets/photos/DSC_8555.jpg.asset.json";
import p7878 from "@/assets/photos/DSC_7878.jpg.asset.json";
import p7904 from "@/assets/photos/DSC_7904.jpg.asset.json";
import p7822 from "@/assets/photos/DSC_7822.jpg.asset.json";

/** Real brand photography, served from the Lovable CDN. */
export const PHOTOS = {
  pinwheelPlatter: p7353.url,
  pinwheelTable: p7345.url,
  mexicanSpread: p7379.url,
  tacoBite: p7380.url,
  grillPlatter: p7543.url,
  sandesh: p7647.url,
  chaatThali: p8668.url,
  panAsianSpread: p8683.url,
  bottledDrinks: p8378.url,
  founders: p8415.url,
  tacoBar: p8774.url,
  vadaPav: p8221.url,
  drinksSpread: p8361.url,
  paratha: p8757.url,
  mezzePlatter: p8213.url,
  poha: p8743.url,
  mithaiPlatter: p8569.url,
  northIndianThali: p8748.url,
  chaatServed: p8196.url,
  chaatLeafBowl: p8196b.url,
  vadaPavPlatter: p8488.url,
  northIndianHandis: p8695.url,
  samosaPatti: p8205.url,
  snackPlatter: p8767.url,
  bottledCoolers: p8381.url,
  dalMakhani: p8431.url,
  dahiBhalla: p8199.url,
  chholeHandi: p8524.url,
  chocolateMousse: p8692.url,
  partySpread: p7884.url,
  panAsianStarters: p7899.url,
  panAsianTable: p7905.url,
  vadaPavThali: p8179.url,
  kadhiPakora: p8555.url,
  moonmoonHosting: p7878.url,
  mithaiTable: p7904.url,
  guestsGathered: p7822.url,
} as const;

export type GalleryCategory =
  | "Weddings"
  | "Corporate"
  | "Birthdays"
  | "Grazing Tables"
  | "Everyday";

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "Weddings",
  "Corporate",
  "Birthdays",
  "Grazing Tables",
  "Everyday",
];

export type GalleryPhoto = {
  src: string;
  alt: string;
  caption: string;
  categories: GalleryCategory[];
};

export const GALLERY: GalleryPhoto[] = [
  {
    src: PHOTOS.mezzePlatter,
    alt: "Large mezze platter with hummus, dips, pita, kababs and biryani in terracotta bowls",
    caption: "Grand mezze board — nine dips, pita, falafel and biryani",
    categories: ["Weddings", "Grazing Tables"],
  },
  {
    src: PHOTOS.chaatThali,
    alt: "Two-tier terracotta chaat platter with saffron dahi, chutneys and papdi",
    caption: "Two-tier chaat thali with saffron dahi and pomegranate",
    categories: ["Weddings", "Birthdays"],
  },
  {
    src: PHOTOS.mithaiPlatter,
    alt: "Mithai platter with jalebi, gulab jamun, sandesh and a pot of rabri",
    caption: "Festive mithai platter with warm rabri",
    categories: ["Weddings", "Grazing Tables"],
  },
  {
    src: PHOTOS.panAsianSpread,
    alt: "Pan-Asian spread with sushi, momos, noodles and manchurian",
    caption: "Pan-Asian spread for a table of guests",
    categories: ["Birthdays", "Corporate"],
  },
  {
    src: PHOTOS.tacoBar,
    alt: "Taco bar with salsas, refried beans, corn salsa, taco shells and nachos",
    caption: "Build-your-own taco and nacho bar",
    categories: ["Birthdays", "Grazing Tables"],
  },
  {
    src: PHOTOS.northIndianThali,
    alt: "North Indian spread with paneer curry, dal makhani, lachha paratha and papad",
    caption: "North Indian mains, plated for the table",
    categories: ["Corporate", "Everyday"],
  },
  {
    src: PHOTOS.drinksSpread,
    alt: "Bottled coolers, lassi and juices in cane baskets",
    caption: "Bottled coolers and lassi, chilled and sealed",
    categories: ["Corporate", "Everyday", "Grazing Tables"],
  },
  {
    src: PHOTOS.vadaPav,
    alt: "Terracotta platter of vada pav with green chutney and dry garlic chutney",
    caption: "Vada pav platter with chutneys",
    categories: ["Corporate", "Everyday"],
  },
  {
    src: PHOTOS.chaatServed,
    alt: "Chaat being served in a leaf bowl with chutneys alongside",
    caption: "Live-style chaat, served in leaf bowls",
    categories: ["Birthdays", "Weddings"],
  },
  {
    src: PHOTOS.poha,
    alt: "Terracotta handi of poha with sev and masala on a wooden tray",
    caption: "Breakfast poha in a terracotta handi",
    categories: ["Everyday", "Corporate"],
  },
  {
    src: PHOTOS.paratha,
    alt: "Stuffed parathas stacked on a blue ceramic plate",
    caption: "Stuffed parathas, straight off the tawa",
    categories: ["Everyday"],
  },
  {
    src: PHOTOS.pinwheelPlatter,
    alt: "Hand dipping a cheesy tortilla pinwheel into corn salsa",
    caption: "Cheesy tortilla pinwheels, plated and ready to serve",
    categories: ["Birthdays", "Grazing Tables"],
  },
  {
    src: PHOTOS.grillPlatter,
    alt: "Close-up of paneer tikka, broccoli, potatoes and lotus stem on a grill platter",
    caption: "Charcoal grill platter — paneer, broccoli and lotus stem",
    categories: ["Weddings", "Everyday"],
  },
  {
    src: PHOTOS.sandesh,
    alt: "Saffron sandesh discs on a banana leaf in a terracotta dish",
    caption: "Kesar sandesh, set on banana leaf",
    categories: ["Weddings", "Everyday"],
  },
  {
    src: PHOTOS.mexicanSpread,
    alt: "Bowls of salsa, refried beans and corn salsa with tortilla chips",
    caption: "Mexican dips and chips board",
    categories: ["Grazing Tables", "Birthdays"],
  },
  {
    src: PHOTOS.pinwheelTable,
    alt: "Pinwheel platter styled on a red gingham table with dips",
    caption: "A styled table, delivered ready",
    categories: ["Grazing Tables", "Corporate"],
  },
  {
    src: PHOTOS.chaatLeafBowl,
    alt: "Gloved hand serving papdi chaat in a leaf bowl beside terracotta chutney pots",
    caption: "Papdi chaat, assembled to order in leaf bowls",
    categories: ["Weddings", "Birthdays"],
  },
  {
    src: PHOTOS.dahiBhalla,
    alt: "Dahi bhalla topped with boondi, chutneys and masala in a leaf bowl",
    caption: "Dahi bhalla with boondi and chutneys",
    categories: ["Weddings", "Everyday"],
  },
  {
    src: PHOTOS.vadaPavPlatter,
    alt: "Ring of vada pav with fried chillies, aloo tikki and sabudana in terracotta dishes",
    caption: "Vada pav ring with tikki and sabudana khichdi",
    categories: ["Corporate", "Everyday"],
  },
  {
    src: PHOTOS.snackPlatter,
    alt: "Snack platter of samosas, kababs, pav and pulao with a chaat glass",
    caption: "Tea-time snack platter with pulao and chaat glasses",
    categories: ["Corporate", "Birthdays"],
  },
  {
    src: PHOTOS.samosaPatti,
    alt: "Patti samosas on a banana leaf with tomato dip and vegetable skewers",
    caption: "Patti samosas with skewers and tomato dip",
    categories: ["Birthdays", "Grazing Tables"],
  },
  {
    src: PHOTOS.northIndianHandis,
    alt: "Terracotta handis of curries with lachha paratha, papad and pickles on a wooden board",
    caption: "North Indian handis with paratha and papad",
    categories: ["Weddings", "Corporate"],
  },
  {
    src: PHOTOS.dalMakhani,
    alt: "Brass handi of dal makhani beside lachha paratha and raita",
    caption: "Slow-cooked dal makhani in a brass handi",
    categories: ["Weddings", "Everyday"],
  },
  {
    src: PHOTOS.chholeHandi,
    alt: "Brass handi of chhole with chopped onions and kulchas in a basket",
    caption: "Chhole with kulcha, onions on the side",
    categories: ["Everyday", "Corporate"],
  },
  {
    src: PHOTOS.bottledCoolers,
    alt: "Baskets of bottled coolers in jamun, rose and mango shades",
    caption: "Bottled coolers, chilled in cane baskets",
    categories: ["Grazing Tables", "Corporate", "Everyday"],
  },
  {
    src: PHOTOS.guestsGathered,
    alt: "Guests seated around a low table laid with Lemon Bowl platters and drinks",
    caption: "A living-room gathering, table laid end to end",
    categories: ["Birthdays", "Grazing Tables", "Everyday"],
  },
  {
    src: PHOTOS.partySpread,
    alt: "Party table with tikka platter, sandesh, rabri bowls and welcome drinks",
    caption: "Cocktail-hour spread with grills, mithai and coolers",
    categories: ["Weddings", "Birthdays"],
  },
  {
    src: PHOTOS.mithaiTable,
    alt: "Terracotta plates of peda and sandesh with candles and tulips",
    caption: "Mithai plated on banana leaf, styled with candles",
    categories: ["Weddings", "Grazing Tables"],
  },
  {
    src: PHOTOS.panAsianStarters,
    alt: "Pan-Asian starters with satay, spinach vol-au-vents and rice paper rolls",
    caption: "Pan-Asian starters with peanut satay sauce",
    categories: ["Corporate", "Birthdays"],
  },
  {
    src: PHOTOS.panAsianTable,
    alt: "Long table of rice paper rolls, galouti-style patties and satay skewers",
    caption: "Pan-Asian table, plated course by course",
    categories: ["Corporate", "Grazing Tables"],
  },
  {
    src: PHOTOS.vadaPavThali,
    alt: "Terracotta thali of vada pav with sev, chutneys and pomegranate",
    caption: "Vada pav thali with sev and three chutneys",
    categories: ["Everyday", "Corporate"],
  },
  {
    src: PHOTOS.kadhiPakora,
    alt: "Kadhi in a black handi with pakoras and fried snacks alongside",
    caption: "Kadhi pakora, served warm from the handi",
    categories: ["Everyday", "Weddings"],
  },
  {
    src: PHOTOS.chocolateMousse,
    alt: "Chocolate mousse glasses topped with chocolate shards on a gold tray",
    caption: "Chocolate mousse pots on a gilded tray",
    categories: ["Birthdays", "Weddings"],
  },
  {
    src: PHOTOS.moonmoonHosting,
    alt: "Moonmoon Todi seated with a plate, hosting beside a laid table",
    caption: "Moonmoon, hosting the way it all started",
    categories: ["Everyday", "Birthdays"],
  },
];
