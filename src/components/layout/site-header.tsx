"use client";

import { CartIcon } from "@/components/icons";
import { shell } from "@/components/ui";
import { isAdmin, useSession } from "@/lib/auth/session";
import { useCart } from "@/lib/cart/cart";
import Link from "next/link";

const navLinks = [
  { href: "/products", label: "Shop" },
  { href: "/cart", label: "Cart" },
  { href: "/account", label: "Account" },
] as const;

export function SiteHeader() {
  const session = useSession();
  const cart = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className={`${shell} flex items-center gap-3 py-3 sm:gap-4 sm:py-4`}>
        <Link href="/" className="shrink-0 text-xl font-bold tracking-tight sm:text-2xl">
          eco
        </Link>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-3">
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-foreground transition hover:bg-soft"
            aria-label="Cart"
          >
            <CartIcon className="h-5 w-5" />
            {cartCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-star px-1 text-[10px] font-bold text-foreground">
                {cartCount}
              </span>
            ) : null}
          </Link>
          {session ? (
            <Link
              href="/account"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background"
              aria-label="Account"
              title="Account"
            >
              {session.role.slice(0, 1).toUpperCase()}
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-soft text-xs font-semibold"
              aria-label="Sign in"
            >
              in
            </Link>
          )}
        </div>
      </div>

      <nav
        className={`${shell} flex gap-x-5 gap-y-2 overflow-x-auto pb-3 text-sm [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
        aria-label="Primary"
      >
        {navLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="shrink-0 text-foreground/80 transition hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
        {isAdmin(session) ? (
          <Link
            href="/admin"
            className="shrink-0 text-foreground/80 transition hover:text-foreground"
          >
            Admin
          </Link>
        ) : null}
      </nav>
    </header>
  );
}
