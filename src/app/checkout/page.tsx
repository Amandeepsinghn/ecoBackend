import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";
import { CheckoutView } from "@/components/orders/checkout-view";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <PageFrame
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/cart", label: "Cart" },
        { href: "/checkout", label: "Checkout" },
      ]}
      title="Checkout"
    >
      <CheckoutView />
    </PageFrame>
  );
}
