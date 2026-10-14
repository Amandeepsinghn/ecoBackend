import Link from "next/link";
import { shell } from "@/components/ui";

export default function NotFound() {
  return (
    <section className={`${shell} flex flex-1 flex-col justify-center py-24`}>
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-3 text-sm text-muted">That route is not part of the storefront.</p>
      <Link href="/" className="mt-6 text-sm font-medium underline">
        Back home
      </Link>
    </section>
  );
}
