import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductEditor } from "@/components/admin/product-editor";

export const metadata: Metadata = {
  title: "Edit product",
};

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading product…</p>}>
      <EditProductRoute params={params} />
    </Suspense>
  );
}

async function EditProductRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = Number(id);

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Edit product</h1>
      <div className="mt-8">
        {Number.isInteger(productId) && productId > 0 ? (
          <ProductEditor productId={productId} />
        ) : (
          <p className="text-sm text-muted">That product id is not valid.</p>
        )}
      </div>
    </>
  );
}
