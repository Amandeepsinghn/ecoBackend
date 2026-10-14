"use client";

import { primaryButton } from "@/components/ui";
import { setCartQuantity, useCart } from "@/lib/cart/cart";
import { formatCredit } from "@/lib/format";
import Link from "next/link";

export function CartView() {
  const items = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-[28px] bg-soft px-6 py-10 text-sm text-muted">
        Your cart is empty.{" "}
        <Link href="/products" className="font-medium text-foreground underline">
          Browse products
        </Link>
      </div>
    );
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="w-full max-w-2xl min-w-0">
      <ul className="divide-y divide-line">
        {items.map((item) => (
          <li
            key={item.productId}
            className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <div className="min-w-0">
              <Link
                href={`/products/${item.productId}`}
                className="break-words font-semibold"
              >
                {item.name}
              </Link>
              <p className="mt-1 text-sm text-muted tabular-nums">
                {formatCredit(item.price)}
              </p>
            </div>
            <label className="flex items-center justify-between gap-3 sm:justify-end">
              <span className="text-sm text-muted sm:sr-only">Quantity</span>
              <input
                type="number"
                min={0}
                value={item.quantity}
                aria-label={`Quantity for ${item.name}`}
                onChange={(event) =>
                  setCartQuantity(item.productId, Number(event.target.value))
                }
                className="h-11 w-24 rounded-2xl bg-soft px-3 text-sm outline-none"
              />
            </label>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-base font-semibold tabular-nums">Total {formatCredit(total)}</p>
      <Link href="/checkout" className={`${primaryButton} mt-5 sm:w-auto`}>
        Checkout
      </Link>
    </div>
  );
}
