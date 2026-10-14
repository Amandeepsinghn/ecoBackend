"use client";

import { OrderReceipt, type ReceiptLine } from "@/components/orders/order-receipt";
import { primaryButton } from "@/components/ui";
import { checkout, errorMessage } from "@/lib/api";
import type { Order } from "@/lib/api/types";
import { useSession } from "@/lib/auth/session";
import { clearCart, useCart } from "@/lib/cart/cart";
import { formatCredit } from "@/lib/format";
import Link from "next/link";
import { useState } from "react";

export function CheckoutView() {
  const items = useCart();
  const session = useSession();
  const [order, setOrder] = useState<Order | null>(null);
  const [receiptLines, setReceiptLines] = useState<ReceiptLine[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  if (!session) {
    return (
      <div className="rounded-[28px] bg-soft px-6 py-10 text-sm text-muted">
        Sign in to place an order.{" "}
        <Link href="/login" className="font-medium text-foreground underline">
          Sign in
        </Link>
      </div>
    );
  }

  if (order) {
    return <OrderReceipt order={order} lines={receiptLines} />;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-[28px] bg-soft px-6 py-10 text-sm text-muted">
        Nothing to check out.{" "}
        <Link href="/cart" className="font-medium text-foreground underline">
          View cart
        </Link>
      </div>
    );
  }

  async function onCheckout() {
    setPending(true);
    setError(null);
    try {
      const lines = items.map((item) => ({
        label: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
      }));
      const placed = await checkout({
        items: items.map((item) => ({
          product_id: item.productId,
          quantity: item.quantity,
        })),
      });
      clearCart();
      setReceiptLines(lines);
      setOrder(placed);
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setPending(false);
    }
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="w-full max-w-xl min-w-0 rounded-[24px] bg-soft p-5 sm:rounded-[28px] sm:p-8">
      <ul className="space-y-3 text-sm">
        {items.map((item) => (
          <li
            key={item.productId}
            className="flex items-start justify-between gap-3 sm:gap-4"
          >
            <span className="min-w-0 break-words">
              {item.name} × {item.quantity}
            </span>
            <span className="shrink-0 font-medium tabular-nums">
              {formatCredit(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-base font-semibold tabular-nums">Total {formatCredit(total)}</p>
      <button
        type="button"
        onClick={onCheckout}
        disabled={pending}
        className={`${primaryButton} mt-6 sm:w-full`}
      >
        {pending ? "Placing order…" : "Place order"}
      </button>
      {error ? <p className="mt-3 text-sm text-accent">{error}</p> : null}
    </div>
  );
}
