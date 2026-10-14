import { CheckIcon } from "@/components/icons";
import { primaryButton, secondaryButton } from "@/components/ui";
import type { Order } from "@/lib/api/types";
import { formatCredit } from "@/lib/format";
import Link from "next/link";

export type ReceiptLine = {
  label: string;
  quantity: number;
  unitPrice?: number;
};

function statusLabel(status: string) {
  const value = status.trim();
  if (!value) return "Pending";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export function OrderReceipt({
  order,
  lines,
  secondaryLabel,
  onSecondary,
}: {
  order: Order;
  lines?: ReceiptLine[];
  secondaryLabel?: string;
  onSecondary?: () => void;
}) {
  const items =
    lines ??
    order.items.map((item) => ({
      label: `Product #${item.product_id}`,
      quantity: item.quantity,
      unitPrice: item.unit_price,
    }));

  return (
    <div className="mx-auto w-full max-w-xl min-w-0 overflow-hidden rounded-[24px] border border-line bg-white sm:rounded-[32px]">
      <div className="bg-sand px-5 py-7 sm:px-8 sm:py-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
          <CheckIcon className="h-5 w-5" />
        </div>
        <p className="mt-5 text-sm font-medium text-muted">Order #{order.id}</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          You&apos;re all set
        </h2>
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
          Your purchase went through. We&apos;ll keep this order as{" "}
          <span className="font-medium text-foreground">{statusLabel(order.status)}</span> until
          it ships.
        </p>
        <span className="mt-5 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold tracking-wide">
          {statusLabel(order.status)}
        </span>
      </div>

      <div className="px-5 py-6 sm:px-8 sm:py-8">
        <p className="text-sm font-semibold tracking-tight">Items</p>
        <ul className="mt-4 divide-y divide-line">
          {items.map((item) => (
            <li
              key={`${item.label}-${item.quantity}-${item.unitPrice ?? ""}`}
              className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0 sm:gap-4"
            >
              <div className="min-w-0">
                <p className="break-words text-sm font-medium">{item.label}</p>
                <p className="mt-1 text-sm text-muted">Qty {item.quantity}</p>
              </div>
              {item.unitPrice != null ? (
                <p className="shrink-0 text-sm font-semibold tabular-nums">
                  {formatCredit(item.unitPrice * item.quantity)}
                </p>
              ) : null}
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-3 rounded-[20px] bg-soft px-4 py-4 sm:rounded-[24px] sm:px-5 sm:py-5">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-muted">Total charged</span>
            <span className="shrink-0 font-semibold tabular-nums">
              {formatCredit(order.total_price)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-line pt-3">
            <span className="text-sm text-muted">Credit left</span>
            <span className="shrink-0 text-base font-bold tracking-tight tabular-nums sm:text-lg">
              {formatCredit(order.credit)}
            </span>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link href="/products" className={primaryButton}>
            Keep shopping
          </Link>
          {onSecondary && secondaryLabel ? (
            <button type="button" onClick={onSecondary} className={secondaryButton}>
              {secondaryLabel}
            </button>
          ) : (
            <Link href="/account" className={secondaryButton}>
              View account
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
