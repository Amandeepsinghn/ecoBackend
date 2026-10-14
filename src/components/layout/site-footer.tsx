import { shell } from "@/components/ui";
import Link from "next/link";

const columns = [
  {
    title: "Company",
    links: [
      { href: "/", label: "About us" },
      { href: "/products", label: "Stores" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/account", label: "Help" },
      { href: "/checkout", label: "Delivery" },
    ],
  },
  {
    title: "Shop",
    links: [
      { href: "/products", label: "Catalog" },
      { href: "/cart", label: "Cart" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-line bg-white sm:mt-16">
      <div className={`${shell} grid gap-8 py-10 sm:grid-cols-2 sm:gap-10 sm:py-12 lg:grid-cols-4`}>
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="text-2xl font-bold tracking-tight">eco</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted">
            Soft storefront for the catalog, cart, and account APIs.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-semibold">{column.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted sm:mt-4">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
