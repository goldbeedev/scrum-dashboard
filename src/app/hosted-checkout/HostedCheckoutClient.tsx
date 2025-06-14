'use client';

import CheckoutForm from "@/app/components/CheckoutForm";
import { useSearchParams } from "next/navigation";

export default function HostedCheckoutClient() {
  const searchParams = useSearchParams();
  const seats = Number(searchParams.get("seats")) || 5;
  const BASE_PRICE = 19;
  const BULK_DISCOUNT_THRESHOLD = 20;
  const BULK_DISCOUNT_PERCENTAGE = 15;

  const calculatePrice = (seats: number) => {
    const baseTotal = seats * BASE_PRICE;
    if (seats >= BULK_DISCOUNT_THRESHOLD) {
      const discount = (baseTotal * BULK_DISCOUNT_PERCENTAGE) / 100;
      return Math.round(baseTotal - discount);
    }
    return baseTotal;
  };

  const totalPrice = calculatePrice(seats);

  return (
    <div className="page-container">
      <h1>Checkout</h1>
      <p>Review and complete your purchase below</p>
      <p>Selected Plan: {seats} Seats</p>
      <p>Total Price: ${totalPrice}/month</p>
      <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-4 mt-4 mb-8">
        <h3 className="text-blue-400 font-semibold mb-2">Test Mode</h3>
        <p className="text-gray-300 mb-2">Use these test card numbers:</p>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>4242 4242 4242 4242 (successful payment)</li>
          <li>4000 0000 0000 9995 (insufficient funds)</li>
          <li>4000 0000 0000 3220 (3D Secure)</li>
        </ul>
        <p className="text-gray-300 mt-2">Use any future expiration date, any 3-digit CVC, and any postal code.</p>
      </div>
      <CheckoutForm uiMode="hosted" amount={totalPrice} />
    </div>
  );
} 