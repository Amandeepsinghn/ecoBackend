import { shell } from "@/components/ui";
import Link from "next/link";

export function PageFrame({
  crumbs,
  title,
  description,
  children,
}: {
  crumbs?: { href: string; label: string }[];
  title?: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={`${shell} min-w-0 py-6 sm:py-10`}>
      {crumbs && crumbs.length > 0 ? (
        <nav className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted sm:mb-6">
          {crumbs.map((crumb, index) => (
            <span key={crumb.href} className="flex min-w-0 items-center gap-2">
              {index > 0 ? <span aria-hidden>›</span> : null}
              <Link
                href={crumb.href}
                className="max-w-[12rem] truncate transition hover:text-foreground sm:max-w-none"
              >
                {crumb.label}
              </Link>
            </span>
          ))}
        </nav>
      ) : null}
      {title ? (
        <h1 className="break-words text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          {title}
        </h1>
      ) : null}
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{description}</p>
      ) : null}
      {children ? (
        <div className={`min-w-0 ${title || description ? "mt-6 sm:mt-8" : ""}`}>
          {children}
        </div>
      ) : null}
    </section>
  );
}
