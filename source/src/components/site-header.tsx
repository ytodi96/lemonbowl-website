import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { navItems } from "@/lib/nav";
import { useCart } from "@/lib/cart";
import logoAsset from "@/assets/logo-tlb-circle.png.asset.json";

function CartButton({ onNavigate }: { onNavigate?: () => void }) {
  const { count } = useCart();
  return (
    <Link
      to="/order/cart"
      onClick={onNavigate}
      aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent"
    >
      <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.6} />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-coral px-1 text-[11px] font-semibold text-coral-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" onClick={close} className="flex items-center gap-3">
          <img
            src={logoAsset.url}
            alt="The Lemon Bowl logo"
            className="h-11 w-11 shrink-0 rounded-full object-cover sm:h-12 sm:w-12"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-tight sm:text-[22px]">
              The Lemon Bowl
            </span>
            <span className="eyebrow mt-1 hidden sm:block">Bespoke platters · Delhi NCR</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="inline-flex items-center rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="pointer-events-none absolute left-0 top-full w-52 pt-2 opacity-0 transition-opacity group-hover:pointer-events-auto group-focus-within:pointer-events-auto group-hover:opacity-100 group-focus-within:opacity-100">
                  <div className="overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-lift)]">
                    {item.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="block px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/order"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-colors hover:bg-primary-deep sm:inline-flex"
          >
            Order Now
          </Link>
          <CartButton />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent lg:hidden"
          >
            {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <Link
              to="/order"
              onClick={close}
              className="mb-4 block rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Order Now
            </Link>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    onClick={close}
                    className="block py-2 text-sm font-medium text-foreground"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mb-2 ml-3 border-l border-border pl-3">
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <Link
                            to={child.to}
                            onClick={close}
                            className="block py-1.5 text-sm text-muted-foreground"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
