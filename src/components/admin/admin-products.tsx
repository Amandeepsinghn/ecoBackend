"use client";

import { errorMessage, getAdminProducts } from "@/lib/api";
import type { Product } from "@/lib/api/types";
import { formatCredit } from "@/lib/format";
import Link from "next/link";
import { useEffect, useState } from "react";

export function AdminProducts() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAdminProducts()
      .then(setProducts)
      .catch((caught) => setError(errorMessage(caught)));
  }, []);

  if (error) return <p className="text-sm text-accent">{error}</p>;
  if (!products) return <p className="text-sm text-muted">Loading products…</p>;
  if (products.length === 0) {
    return <p className="rounded-[28px] bg-soft px-6 py-10 text-sm text-muted">No products yet.</p>;
  }

  return (
    <ul className="divide-y divide-line rounded-[24px] bg-soft px-4 sm:rounded-[28px] sm:px-5">
      {products.map((product) => (
        <li
          key={product.id}
          className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-5"
        >
          <div className="min-w-0">
            <Link
              href={`/admin/products/${product.id}`}
              className="break-words font-semibold"
            >
              {product.name}
            </Link>
            <p className="mt-1 text-sm text-muted tabular-nums">
              {formatCredit(product.price)} · stock {product.stock ?? "—"}
            </p>
          </div>
          <span className="shrink-0 text-sm text-muted">#{product.id}</span>
        </li>
      ))}
    </ul>
  );
}
