import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "eco",
    template: "%s · eco",
  },
  description: "Storefront for the eco shop.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} h-full bg-white antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-foreground">
        <SiteHeader />
        <main className="flex min-w-0 flex-1 flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
