import type { Product } from "@/lib/api/types";

export type Category = {
  slug: string;
  label: string;
  count: number;
  coverUrl: string | null;
};

export function categoryLabel(productType: string | null | undefined) {
  const value = productType?.trim();
  return value && value.length > 0 ? value : "Other";
}

export function categorySlug(productType: string | null | undefined) {
  return encodeURIComponent(categoryLabel(productType).toLowerCase());
}

export function matchesCategory(product: Product, slug: string) {
  return categorySlug(product.product_type) === slug;
}

export function buildCategories(products: Product[]): Category[] {
  const map = new Map<string, Category>();

  for (const product of products) {
    const label = categoryLabel(product.product_type);
    const slug = categorySlug(product.product_type);
    const existing = map.get(slug);

    if (existing) {
      existing.count += 1;
      if (!existing.coverUrl && product.photos[0]) {
        existing.coverUrl = product.photos[0].url;
      }
      continue;
    }

    map.set(slug, {
      slug,
      label,
      count: 1,
      coverUrl: product.photos[0]?.url ?? null,
    });
  }

  return [...map.values()].sort((a, b) => a.label.localeCompare(b.label));
}

export function categoryHref(productType: string | null | undefined) {
  return `/products/category/${categorySlug(productType)}`;
}
