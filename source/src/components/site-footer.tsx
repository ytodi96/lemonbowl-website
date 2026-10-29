import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone, MessageCircle } from "lucide-react";
import { navItems } from "@/lib/nav";
import logoAsset from "@/assets/logo-tlb-circle.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_2fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logoAsset.url}
              alt="The Lemon Bowl logo"
              className="h-14 w-14 rounded-full object-cover"
            />
            <p className="font-display text-2xl">The Lemon Bowl</p>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Bespoke, ready-to-serve platters and multi-cuisine menus — a restaurant experience at
            home. Delivering across Delhi NCR.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/919999999999"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
              Chat on WhatsApp
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-accent"
            >
              <Instagram className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </a>
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-accent"
            >
              <Facebook className="h-[18px] w-[18px]" strokeWidth={1.6} />
            </a>
          </div>
          <div className="mt-6 space-y-2 text-sm text-muted-foreground">
            <a href="tel:+919999999999" className="flex items-center gap-2 hover:text-foreground">
              <Phone className="h-4 w-4" strokeWidth={1.6} /> +91 99999 99999
            </a>
            <a
              href="mailto:hello@thelemonbowl.in"
              className="flex items-center gap-2 hover:text-foreground"
            >
              <Mail className="h-4 w-4" strokeWidth={1.6} /> hello@thelemonbowl.in
            </a>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="eyebrow">Order</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/order" className="hover:text-foreground">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/order/cart" className="hover:text-foreground">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/gifting" className="hover:text-foreground">
                  Gifting
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {navItems
                .filter((item) => item.label !== "Home")
                .map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="hover:text-foreground">
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Legal</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/refunds" className="hover:text-foreground">
                  Cancellation & Refunds
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} The Lemon Bowl. All rights reserved.</p>
          <p>Founded by Aakriti Todi & Moonmoon Todi · Delhi NCR</p>
        </div>
      </div>
    </footer>
  );
}
