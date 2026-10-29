export type NavChild = { label: string; to: string };
export type NavItem = { label: string; to: string; children?: NavChild[] };

export const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "Catering",
    to: "/catering",
    children: [
      { label: "Packages & Platters", to: "/catering" },
      { label: "Build Your Own", to: "/catering/build-your-own" },
      { label: "Get a Quote", to: "/catering/quote" },
    ],
  },
  { label: "Gifting", to: "/gifting" },
  {
    label: "About",
    to: "/about",
    children: [
      { label: "Our Story", to: "/about" },
      { label: "The Founders", to: "/about/founders" },
      { label: "Our Mission", to: "/about/mission" },
    ],
  },
  { label: "Gallery", to: "/gallery" },
  { label: "Reviews", to: "/reviews" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];
