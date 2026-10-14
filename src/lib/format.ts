import { apiBaseUrl } from "@/lib/config";

export function formatAmount(value: number) {
  const amount = Number(value);
  const safe = Number.isFinite(amount) ? amount : 0;
  // Fixed locale, no currency style — never emits $ / € / etc.
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false,
  }).format(safe);
}

/** Product and order costs are paid from account credit. Never show currency symbols. */
export function formatCredit(value: number) {
  return `${formatAmount(value)} credits`;
}

/** Alias kept for older imports — same as formatCredit. */
export function formatPrice(value: number) {
  return formatCredit(value);
}

export function mediaUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${apiBaseUrl}${url.startsWith("/") ? url : `/${url}`}`;
}
