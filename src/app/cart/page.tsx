import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";
import { CartView } from "@/components/orders/cart-view";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <PageFrame
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/cart", label: "Cart" },
      ]}
      title="Cart"
      description="The cart stays in this browser. Checkout sends it to the orders API."
    >
      <CartView />
    </PageFrame>
  );
}
