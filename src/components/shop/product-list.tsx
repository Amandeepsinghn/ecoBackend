"use client";

import { errorMessage, getProducts } from "@/lib/api";
import type { Product } from "@/lib/api/types";
import { useSession } from "@/lib/auth/session";
import { ProductGrid } from "@/components/shop/product-grid";
import Link from "next/link";
import { useEffect, useState } from "react";

/** Full catalog list — kept for admin-style browsing if needed. */
export function ProductList() {
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

  if (!session) {
    return (
      <div className="rounded-[28px] bg-soft px-6 py-10 text-sm text-muted">
        Sign in to load the catalog.{" "}
        <Link href="/login" className="font-medium text-foreground underline">
          Sign in
        </Link>
      </div>
    );
  }

  if (error) return <p className="text-sm text-accent">{error}</p>;
  if (!products) return <p className="text-sm text-muted">Loading products…</p>;
  return <ProductGrid products={products} />;
}
