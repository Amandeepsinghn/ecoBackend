"use client";

/* eslint-disable @next/next/no-img-element */

import { BagIcon, TruckIcon } from "@/components/icons";
import { OrderReceipt } from "@/components/orders/order-receipt";
import { primaryButton, secondaryButton } from "@/components/ui";
import { checkout, errorMessage, getProduct } from "@/lib/api";
import type { Order, Product } from "@/lib/api/types";
import { useSession } from "@/lib/auth/session";
import { addToCart } from "@/lib/cart/cart";
import { categoryHref, categoryLabel } from "@/lib/catalog";
import { formatCredit, mediaUrl } from "@/lib/format";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8];

export function ProductDetail({ productId }: { productId: number }) {
  const session = useSession();
  const [product, setProduct] = useState<Product | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [buyError, setBuyError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [buying, setBuying] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<"details" | "reviews">("details");

  useEffect(() => {
    if (!session) return;
    let ignore = false;

    getProduct(productId)
      .then((data) => {
        if (!ignore) {
          setProduct(data);
          setActivePhoto(0);
        }
      })
      .catch((caught) => {
        if (!ignore) setLoadError(errorMessage(caught));
      });

    return () => {
      ignore = true;
    };
  }, [productId, session]);

  const photos = useMemo(() => product?.photos ?? [], [product]);
  const visibleThumbs = photos.slice(0, 4);
  const extraCount = Math.max(photos.length - 4, 0);

  if (!session) {
    return (
      <div className="rounded-[28px] bg-soft px-6 py-10 text-sm text-muted">
        Sign in to view this product.{" "}
        <Link href="/login" className="font-medium text-foreground underline">
          Sign in
        </Link>
      </div>
    );
  }

  if (loadError) return <p className="text-sm text-accent">{loadError}</p>;
  if (!product) return <p className="text-sm text-muted">Loading product…</p>;

  function onAdd() {
    if (!product) return;
    setOrder(null);
    setBuyError(null);
    addToCart(
      { productId: product.id, name: product.name, price: product.price },
      quantity,
    );
    setNotice("Added to cart.");
  }

  async function onBuy() {
    if (!product) return;
    setBuying(true);
    setNotice(null);
    setBuyError(null);
    try {
      const placed = await checkout({
        items: [{ product_id: product.id, quantity }],
      });
      setOrder(placed);
      setProduct((current) =>
        current && current.stock !== null
          ? { ...current, stock: Math.max(current.stock - quantity, 0) }
          : current,
      );
    } catch (caught) {
      setBuyError(errorMessage(caught));
    } finally {
      setBuying(false);
    }
  }

  if (order) {
    return (
      <OrderReceipt
        order={order}
        lines={[
          {
            label: product.name,
            quantity,
            unitPrice: product.price,
          },
        ]}
        secondaryLabel="Back to product"
        onSecondary={() => setOrder(null)}
      />
    );
  }

  return (
    <div className="min-w-0">
      <div className="grid min-w-0 gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
        <div className="min-w-0">
          <div className="overflow-hidden rounded-[24px] bg-sand sm:rounded-[32px]">
            {photos[activePhoto] ? (
              <img
                src={mediaUrl(photos[activePhoto].url)}
                alt={product.name}
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div className="aspect-square w-full bg-soft" />
            )}
          </div>
          {photos.length > 0 ? (
            <div className="mt-3 grid grid-cols-4 gap-2 sm:mt-4 sm:gap-3">
              {visibleThumbs.map((photo, index) => {
                const isLast = index === visibleThumbs.length - 1 && extraCount > 0;
                return (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setActivePhoto(index)}
                    className={`relative overflow-hidden rounded-xl bg-sand sm:rounded-2xl ${
                      activePhoto === index ? "ring-2 ring-foreground" : ""
                    }`}
                  >
                    <img
                      src={mediaUrl(photo.url)}
                      alt=""
                      className="aspect-square w-full object-cover"
                    />
                    {isLast ? (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/35 text-xs font-semibold text-white sm:text-sm">
                        +{extraCount} more
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="min-w-0">
          <div className="flex items-center justify-between gap-3 text-sm text-muted">
            <Link
              href={categoryHref(product.product_type)}
              className="min-w-0 truncate font-medium text-foreground transition hover:underline"
            >
              {categoryLabel(product.product_type)}
            </Link>
            <p className="shrink-0">#{product.id}</p>
          </div>
          <h1 className="mt-3 break-words text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-bold tracking-tight tabular-nums sm:mt-5 sm:text-3xl">
            {formatCredit(product.price)}
          </p>

          {photos.length > 1 ? (
            <div className="mt-6 sm:mt-8">
              <p className="text-sm text-muted">Photos</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {photos.map((photo, index) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setActivePhoto(index)}
                    className={`overflow-hidden rounded-xl ${
                      activePhoto === index ? "ring-2 ring-foreground" : "ring-1 ring-line"
                    }`}
                  >
                    <img
                      src={mediaUrl(photo.url)}
                      alt=""
                      className="h-11 w-11 object-cover sm:h-12 sm:w-12"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-6 sm:mt-8">
            <p className="text-sm text-muted">Quantity</p>
            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8">
              {quantityOptions.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setQuantity(value)}
                  className={`h-11 rounded-xl text-sm font-medium transition ${
                    quantity === value
                      ? "bg-foreground text-background"
                      : "bg-soft text-foreground hover:bg-line"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted">
              {product.stock === null ? "Stock unavailable" : `${product.stock} in stock`}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8">
            <button
              type="button"
              onClick={onBuy}
              disabled={buying || product.stock === 0}
              className={`${primaryButton} sm:w-full`}
            >
              {buying ? "Purchasing…" : "Buy now"}
            </button>
            <button
              type="button"
              onClick={onAdd}
              disabled={buying || product.stock === 0}
              className={`${secondaryButton} sm:w-full`}
            >
              <BagIcon className="h-4 w-4" />
              Add to cart
            </button>
          </div>

          <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-muted">
            <TruckIcon className="mt-0.5 h-4 w-4 shrink-0" />
            <span>Free delivery on orders over 30.00 credits</span>
          </p>
          {notice ? <p className="mt-3 text-sm text-foreground">{notice}</p> : null}
          {buyError ? <p className="mt-3 text-sm text-accent">{buyError}</p> : null}
        </div>
      </div>

      <div className="mt-10 border-t border-line pt-6 sm:mt-14 sm:pt-8">
        <div className="flex gap-5 overflow-x-auto text-sm sm:gap-6">
          {(
            [
              ["details", "Details"],
              ["reviews", "Reviews"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`shrink-0 pb-2 font-medium ${
                tab === key
                  ? "border-b-2 border-foreground text-foreground"
                  : "text-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "details" ? (
          <div className="mt-6 max-w-2xl text-sm leading-7 text-muted">
            {product.description || "No description yet for this product."}
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="rounded-[24px] bg-soft px-5 py-6 text-sm text-muted sm:rounded-[28px] sm:px-6 sm:py-8">
              Reviews are not in the API yet. Details from the product payload show above.
            </div>
            <aside className="rounded-[24px] bg-sand px-5 py-5 sm:rounded-[28px] sm:px-6 sm:py-6">
              <p className="text-sm font-semibold text-foreground">
                Popular picks with discounts over 25%
              </p>
              <p className="mt-2 text-sm text-muted">
                Browse the catalog for more stock from the shop API.
              </p>
              <Link
                href="/products"
                className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-full bg-white px-4 text-sm font-medium sm:w-auto"
              >
                View more
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
