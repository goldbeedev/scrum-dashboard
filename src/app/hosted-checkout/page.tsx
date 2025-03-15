import type { Metadata } from "next";

import CheckoutForm from "@/app/components/CheckoutForm";
import { JSX } from "react";

export const metadata: Metadata = {
  title: "Review and confirm your order",
};

export default function CheckOutPage(): JSX.Element {
  return (
    <div className="page-container">
      <h1>Checkout</h1>
      <p>Review and complete your purchase below</p>
      <CheckoutForm uiMode="hosted" />
    </div>
  );
}