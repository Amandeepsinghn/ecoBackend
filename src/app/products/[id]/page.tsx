import type { Metadata } from "next";
import { Suspense } from "react";
import { PageFrame } from "@/components/page-frame";
import { ProductDetail } from "@/components/shop/product-detail";

export const metadata: Metadata = {
  title: "Product",
};

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <PageFrame
          crumbs={[
            { href: "/", label: "Home" },
            { href: "/products", label: "Shop" },
          ]}
          description="Loading product…"
        />
      }
    >
      <ProductRoute params={params} />
    </Suspense>
  );
}

async function ProductRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = Number(id);

  return (
    <PageFrame
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/products", label: "Shop" },
        { href: `/products/${id}`, label: `#${id}` },
      ]}
    >
      {Number.isInteger(productId) && productId > 0 ? (
        <ProductDetail productId={productId} />
      ) : (
        <p className="text-sm text-muted">That product id is not valid.</p>
      )}
    </PageFrame>
  );
}
