"use client";

import { errorMessage, getProducts } from "@/lib/api";
import type { Product } from "@/lib/api/types";
import { useSession } from "@/lib/auth/session";
import { categoryLabel, matchesCategory } from "@/lib/catalog";
import { ProductGrid } from "@/components/shop/product-grid";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export function CategoryProducts({ slug }: { slug: string }) {
  const session = useSession();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;
    let ignore = false;

    getProducts()
      .then((data) => {
        if (!ignore) setProducts(data);
      })
      .catch((caught) => {
        if (!ignore) setError(errorMessage(caught));
      });

    return () => {
      ignore = true;
    };
  }, [session]);

  const filtered = useMemo(
    () => (products ? products.filter((product) => matchesCategory(product, slug)) : null),
    [products, slug],
  );

  const title = useMemo(() => {
    if (!filtered || filtered.length === 0) {
      try {
        return decodeURIComponent(slug);
      } catch {
        return slug;
      }
    }
    return categoryLabel(filtered[0].product_type);
  }, [filtered, slug]);

  if (!session) {
    return (
      <div className="rounded-[28px] bg-soft px-6 py-10 text-sm text-muted">
        Sign in to view this category.{" "}
        <Link href="/login" className="font-medium text-foreground underline">
          Sign in
        </Link>
      </div>
    );
  }

  if (error) return <p className="text-sm text-accent">{error}</p>;
  if (!filtered) return <p className="text-sm text-muted">Loading products…</p>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-muted">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </p>
      </div>
      <ProductGrid products={filtered} />
    </div>
  );
}
