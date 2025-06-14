import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review and confirm your order",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 