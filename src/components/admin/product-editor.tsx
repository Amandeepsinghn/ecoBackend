"use client";

/* eslint-disable @next/next/no-img-element */

import {
  deleteProduct,
  deleteProductPhoto,
  errorMessage,
  getAdminProduct,
  updateProduct,
  updateStock,
  uploadProductPhotos,
} from "@/lib/api";
import type { Product } from "@/lib/api/types";
import { mediaUrl } from "@/lib/format";
import { inputClass, labelClass, primaryButton, secondaryButton } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function ProductEditor({ productId }: { productId: number }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    getAdminProduct(productId)
      .then(setProduct)
      .catch((caught) => setError(errorMessage(caught)));
  }, [productId]);

  if (error && !product) return <p className="text-sm text-red-600">{error}</p>;
  if (!product) return <p className="text-sm text-zinc-500">Loading product…</p>;

  async function onUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const description = String(form.get("description") ?? "").trim();
    setPending(true);
    setError(null);
    setNotice(null);
    try {
      const updated = await updateProduct(productId, {
        name: String(form.get("name") ?? ""),
        price: Number(form.get("price")),
        description: description || null,
      });
      setProduct(updated);
      setNotice("Product updated.");
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setPending(false);
    }
  }

  async function onStock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const stock = Number(new FormData(event.currentTarget).get("stock"));
    setPending(true);
    setError(null);
    setNotice(null);
    try {
      const updated = await updateStock(productId, { stock });
      setProduct(updated);
      setNotice("Stock updated.");
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setPending(false);
    }
  }

  async function onPhotos(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const files = Array.from(
      (event.currentTarget.elements.namedItem("files") as HTMLInputElement).files ?? [],
    );
    if (files.length === 0) return;
    setPending(true);
    setError(null);
    setNotice(null);
    try {
      const updated = await uploadProductPhotos(productId, files);
      setProduct(updated);
      event.currentTarget.reset();
      setNotice("Photos uploaded.");
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setPending(false);
    }
  }

  async function onDeletePhoto(photoId: number) {
    setPending(true);
    setError(null);
    setNotice(null);
    try {
      await deleteProductPhoto(productId, photoId);
      setProduct((current) =>
        current
          ? { ...current, photos: current.photos.filter((photo) => photo.id !== photoId) }
          : current,
      );
      setNotice("Photo removed.");
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setPending(false);
    }
  }

  async function onDelete() {
    if (!window.confirm("Delete this product?")) return;
    setPending(true);
    setError(null);
    try {
      await deleteProduct(productId);
      router.push("/admin");
    } catch (caught) {
      setError(errorMessage(caught));
      setPending(false);
    }
  }

  return (
    <div className="grid w-full max-w-3xl min-w-0 gap-8">
      <form
        key={`${product.name}-${product.price}-${product.description ?? ""}`}
        onSubmit={onUpdate}
        className="flex w-full max-w-md flex-col gap-4 rounded-[24px] bg-soft p-5 sm:rounded-[28px] sm:p-8"
      >
        <label className={labelClass}>
          <span>Name</span>
          <input required name="name" defaultValue={product.name} className={inputClass} />
        </label>
        <label className={labelClass}>
          <span>Credits</span>
          <input
            required
            type="number"
            name="price"
            min={0.01}
            step="0.01"
            defaultValue={product.price}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          <span>Description</span>
          <textarea
            name="description"
            rows={4}
            defaultValue={product.description ?? ""}
            className={`${inputClass} h-auto py-2`}
          />
        </label>
        <button type="submit" disabled={pending} className={primaryButton}>
          Save product
        </button>
      </form>

      <form
        key={product.stock ?? "none"}
        onSubmit={onStock}
        className="flex w-full max-w-xs flex-col gap-3 sm:flex-row sm:items-end"
      >
        <label className={`${labelClass} w-full`}>
          <span>Stock</span>
          <input
            required
            type="number"
            name="stock"
            min={0}
            step={1}
            defaultValue={product.stock ?? 0}
            className={inputClass}
          />
        </label>
        <button type="submit" disabled={pending} className={secondaryButton}>
          Update stock
        </button>
      </form>

      <div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {product.photos.map((photo) => (
            <li key={photo.id} className="space-y-2">
              <img src={mediaUrl(photo.url)} alt="" className="aspect-square w-full rounded-xl object-cover" />
              <button
                type="button"
                disabled={pending}
                onClick={() => onDeletePhoto(photo.id)}
                className="text-sm underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={onPhotos} className="mt-4 flex flex-wrap items-center gap-3">
          <input required type="file" name="files" accept="image/*" multiple />
          <button type="submit" disabled={pending} className={secondaryButton}>
            Upload photos
          </button>
        </form>
      </div>

      <button type="button" onClick={onDelete} disabled={pending} className="w-fit text-sm text-red-600 underline">
        Delete product
      </button>
      {notice ? <p className="text-sm text-zinc-500">{notice}</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
