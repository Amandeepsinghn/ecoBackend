/* eslint-disable @next/next/no-img-element */

import type { Product } from "@/lib/api/types";
import { formatCredit, mediaUrl } from "@/lib/format";
import Link from "next/link";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="rounded-[28px] bg-soft px-6 py-10 text-sm text-muted">
        No products in this category.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const photo = product.photos[0];
        return (
          <li key={product.id} className="min-w-0">
            <Link href={`/products/${product.id}`} className="group block min-w-0">
              <div className="overflow-hidden rounded-[24px] bg-sand sm:rounded-[28px]">
                {photo ? (
                  <img
                    src={mediaUrl(photo.url)}
                    alt={product.name}
                    className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="aspect-square w-full bg-soft" />
                )}
              </div>
              <div className="mt-3 flex min-w-0 flex-col gap-1 px-0.5 sm:mt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <div className="min-w-0">
                  <h2 className="truncate text-base font-semibold tracking-tight">
                    {product.name}
                  </h2>
                  {product.product_type ? (
                    <p className="mt-1 truncate text-sm text-muted">{product.product_type}</p>
                  ) : null}
                </div>
                <p className="shrink-0 text-sm font-semibold tabular-nums sm:text-base sm:text-right">
                  {formatCredit(product.price)}
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
