"use client";

import { createProduct, errorMessage } from "@/lib/api";
import { inputClass, labelClass, primaryButton } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

function buildCreateFormData(form: HTMLFormElement) {
  const raw = new FormData(form);
  const data = new FormData();

  data.set("name", String(raw.get("name") ?? "").trim());
  data.set("price", String(raw.get("price") ?? ""));
  data.set("stock", String(raw.get("stock") ?? ""));

  const description = String(raw.get("description") ?? "").trim();
  if (description) data.set("description", description);

  const productType = String(raw.get("product_type") ?? "").trim();
  if (productType) data.set("product_type", productType);

  for (const entry of raw.getAll("files")) {
    if (entry instanceof File && entry.size > 0) {
      data.append("files", entry);
    }
  }

  return data;
}

export function ProductCreateForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    try {
      const product = await createProduct(buildCreateFormData(event.currentTarget));
      router.push(`/admin/products/${product.id}`);
    } catch (caught) {
      setError(errorMessage(caught));
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      encType="multipart/form-data"
      className="flex w-full max-w-md flex-col gap-4 rounded-[24px] bg-soft p-5 sm:rounded-[28px] sm:p-8"
    >
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
        <input name="product_type" placeholder="e.g. clothing" className={inputClass} />
      </label>
      <label className={labelClass}>
        <span>Description</span>
        <textarea name="description" rows={4} className={`${inputClass} h-auto py-2`} />
      </label>
      <label className={labelClass}>
        <span>Photos</span>
        <input
          type="file"
          name="files"
          accept="image/*"
          multiple
          className="block w-full text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-foreground"
        />
      </label>
      <button type="submit" disabled={pending} className={`${primaryButton} sm:w-full`}>
        {pending ? "Creating…" : "Create product"}
      </button>
      {error ? <p className="text-sm text-accent">{error}</p> : null}
    </form>
  );
}
