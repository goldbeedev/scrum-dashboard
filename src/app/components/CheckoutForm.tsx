/* eslint-disable */
"use client";

import type Stripe from "stripe";

import React, { JSX, useState } from "react";

import StripeTestCards from "@/app/components/StripeTestCards";

import { formatAmountForDisplay } from "@/app/utils/stripe-helpers";
import * as config from "@/app/config";
import { createCheckoutSession } from "@/app/actions/stripe";
import getStripe from "@/app/utils/get-stripe";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { CURRENCY } from "@/app/config";

interface CheckoutFormProps {
  uiMode: Stripe.Checkout.SessionCreateParams.UiMode;
  amount: number;
}

export default function CheckoutForm({ uiMode, amount }: CheckoutFormProps): JSX.Element {
  const [loading] = useState<boolean>(false);
  const [subscriptionAmount, setSubscriptionAmount] = useState<{ cartPrice: number }>({
    cartPrice: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
  });
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handleCartChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ): void =>
    setSubscriptionAmount({
      ...subscriptionAmount,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const formAction = async (data: FormData): Promise<void> => {
    const { url } = await createCheckoutSession(data);
    if (url) {
      window.location.assign(url);
    }
  };

  // not sure if this will stay a form, it could be credits or subscriptions with tiers or radio buttons on a form.
  return (
    <>
      <form action={formAction} className="mt-8">
        <input type="hidden" name="uiMode" value={uiMode} />
        <input type="hidden" name="amount" value={amount} />
        <button
          type="submit"
          className="w-full btn btn-primary bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
        >
          Pay ${amount}/month
        </button>
      </form>
      {clientSecret ? (
        <EmbeddedCheckoutProvider
          stripe={getStripe()}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : null}
    </>
  );
}