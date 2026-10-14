"use client";

import { createProduct, errorMessage } from "@/lib/api";
import { inputClass, labelClass, primaryButton } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProductCreateForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const description = String(form.get("description") ?? "").trim();
    const productType = String(form.get("product_type") ?? "").trim();
    setPending(true);
    setError(null);

    try {
      const product = await createProduct({
        name: String(form.get("name") ?? ""),
        price: Number(form.get("price")),
        stock: Number(form.get("stock")),
        description: description || null,
        product_type: productType || null,
      });
      router.push(`/admin/products/${product.id}`);
    } catch (caught) {
      setError(errorMessage(caught));
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-md flex-col gap-4 rounded-[28px] bg-soft p-6 sm:p-8">
      <label className={labelClass}>
        <span>Name</span>
        <input required name="name" className={inputClass} />
      </label>
      <label className={labelClass}>
        <span>Credits</span>
        <input required type="number" name="price" min={0.01} step="0.01" className={inputClass} />
      </label>
      <label className={labelClass}>
        <span>Stock</span>
        <input required type="number" name="stock" min={0} step={1} className={inputClass} />
      </label>
      <label className={labelClass}>
        <span>Type</span>
        <input name="product_type" className={inputClass} />
      </label>
      <label className={labelClass}>
        <span>Description</span>
        <textarea name="description" rows={4} className={`${inputClass} h-auto py-2`} />
      </label>
      <button type="submit" disabled={pending} className={primaryButton}>
        {pending ? "Creating…" : "Create product"}
      </button>
      {error ? <p className="text-sm text-accent">{error}</p> : null}
    </form>
  );
}
