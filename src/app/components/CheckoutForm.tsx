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

interface CheckoutFormProps {
  uiMode: Stripe.Checkout.SessionCreateParams.UiMode;
}

export default function CheckoutForm(props: CheckoutFormProps): JSX.Element {
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
    const uiMode = data.get(
      "uiMode",
    ) as Stripe.Checkout.SessionCreateParams.UiMode;
    const { client_secret, url } = await createCheckoutSession(data);
    
    // might not need
    // if (uiMode === "embedded") return setClientSecret(client_secret);

    window.location.assign(url as string);
  };

  // not sure if this will stay a form, it could be credits or subscriptions with tiers or radio buttons on a form.
  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="uiMode" value={props.uiMode} />
        <StripeTestCards />
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