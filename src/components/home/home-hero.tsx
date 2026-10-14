"use client";

import { primaryButton, secondaryButton, shell } from "@/components/ui";
import { useSession } from "@/lib/auth/session";
import Link from "next/link";

export function HomeHero() {
  const session = useSession();

  return (
    <section className={`${shell} flex flex-1 flex-col justify-center py-10 sm:py-16 lg:py-24`}>
      <div className="grid min-w-0 items-end gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted">eco shop</p>
          <h1 className="mt-3 max-w-xl text-4xl font-bold tracking-tight sm:mt-4 sm:text-5xl lg:text-6xl">
            Soft store. Real catalog.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted sm:mt-5 sm:text-base">
            Browse products, build a cart, and check out through the live shop API.
          </p>
          <div className="mt-7 flex w-full max-w-md flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap">
            <Link href="/products" className={primaryButton}>
              Shop by category
            </Link>
            {!session ? (
              <Link href="/register" className={secondaryButton}>
                Create account
              </Link>
            ) : null}
          </div>
        </div>
        <div className="min-h-56 rounded-[28px] bg-sand p-6 sm:min-h-72 sm:rounded-[36px] sm:p-8 lg:min-h-96">
          <div className="flex h-full min-h-44 flex-col justify-between sm:min-h-56 lg:min-h-[18rem]">
            <p className="text-sm text-muted">Featured feel</p>
            <div>
              <p className="text-2xl font-bold tracking-tight sm:text-3xl">Catalog first</p>
              <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
                Clean product pages, sand gallery panels, and a black add-to-cart
                action — same rhythm as a modern footwear storefront.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
