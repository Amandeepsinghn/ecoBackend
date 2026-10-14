import type { Metadata } from "next";
import { AdminProducts } from "@/components/admin/admin-products";

export const metadata: Metadata = {
  title: "Admin products",
};

export default function AdminPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Products</h1>
      <div className="mt-8">
        <AdminProducts />
      </div>
    </>
  );
}
