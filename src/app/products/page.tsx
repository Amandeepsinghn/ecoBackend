import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";
import { CategoryGrid } from "@/components/shop/category-grid";

export const metadata: Metadata = {
  title: "Shop",
};

export default function ProductsPage() {
  return (
    <PageFrame
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/products", label: "Shop" },
      ]}
      title="Shop by category"
      description="Pick a category, then browse the products in it."
    >
      <CategoryGrid />
    </PageFrame>
  );
}
