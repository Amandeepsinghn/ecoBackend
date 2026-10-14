import type { Metadata } from "next";
import { Suspense } from "react";
import { PageFrame } from "@/components/page-frame";
import { CategoryProducts } from "@/components/shop/category-products";

export const metadata: Metadata = {
  title: "Category",
};

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <PageFrame
          crumbs={[
            { href: "/", label: "Home" },
            { href: "/products", label: "Shop" },
          ]}
          description="Loading category…"
        />
      }
    >
      <CategoryRoute params={params} />
    </Suspense>
  );
}

async function CategoryRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let label = slug;
  try {
    label = decodeURIComponent(slug);
  } catch {
    label = slug;
  }

  return (
    <PageFrame
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/products", label: "Shop" },
        { href: `/products/category/${slug}`, label },
      ]}
    >
      <CategoryProducts slug={slug} />
    </PageFrame>
  );
}
