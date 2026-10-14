import Link from "next/link";

const links = [
  { href: "/admin", label: "Products" },
  { href: "/admin/products/new", label: "New product" },
  { href: "/admin/users", label: "User role" },
] as const;

export function AdminNav() {
  return (
    <nav className="mb-8 flex flex-wrap gap-3 text-sm">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-full bg-soft px-4 py-2 font-medium transition hover:bg-line"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
