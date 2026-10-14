import type { Metadata } from "next";
import { ProductCreateForm } from "@/components/admin/product-create-form";

export const metadata: Metadata = {
  title: "New product",
};

export default function NewProductPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">New product</h1>
      <div className="mt-8">
        <ProductCreateForm />
      </div>
    </>
  );
}
