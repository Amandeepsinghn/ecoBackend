"use client";

/* eslint-disable @next/next/no-img-element */

import { errorMessage, getProducts } from "@/lib/api";
import { useSession } from "@/lib/auth/session";
import { buildCategories } from "@/lib/catalog";
import { mediaUrl } from "@/lib/format";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Category } from "@/lib/catalog";

export function CategoryGrid() {
  const session = useSession();
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;
    let ignore = false;

    getProducts()
      .then((products) => {
        if (!ignore) setCategories(buildCategories(products));
      })
      .catch((caught) => {
        if (!ignore) setError(errorMessage(caught));
      });

    return () => {
      ignore = true;
    };
  }, [session]);

  if (!session) {
    return (
      <div className="rounded-[28px] bg-soft px-6 py-10 text-sm text-muted">
        Sign in to browse categories.{" "}
        <Link href="/login" className="font-medium text-foreground underline">
          Sign in
        </Link>
      </div>
    );
  }

  if (error) return <p className="text-sm text-accent">{error}</p>;
  if (!categories) return <p className="text-sm text-muted">Loading categories…</p>;
  if (categories.length === 0) {
    return (
      <p className="rounded-[28px] bg-soft px-6 py-10 text-sm text-muted">
        No categories yet. Add products with a type in admin.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <li key={category.slug} className="min-w-0">
          <Link href={`/products/category/${category.slug}`} className="group block min-w-0">
            <div className="overflow-hidden rounded-[24px] bg-sand sm:rounded-[28px]">
              {category.coverUrl ? (
                <img
                  src={mediaUrl(category.coverUrl)}
                  alt={category.label}
                  className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex aspect-[4/3] items-end bg-soft p-5 sm:p-6">
                  <span className="text-xl font-bold tracking-tight sm:text-2xl">
                    {category.label}
                  </span>
                </div>
              )}
            </div>
            <div className="mt-3 flex items-end justify-between gap-3 px-0.5 sm:mt-4">
              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold tracking-tight sm:text-xl">
                  {category.label}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {category.count} {category.count === 1 ? "product" : "products"}
                </p>
              </div>
              <span className="shrink-0 text-sm font-medium text-muted transition group-hover:text-foreground">
                Shop →
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
