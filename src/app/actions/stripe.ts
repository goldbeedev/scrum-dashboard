"use server";

import type { Stripe } from "stripe";

import { headers } from "next/headers";

import { CURRENCY } from "@/app/config";
import { formatAmountForStripe } from "@/app/utils/stripe-helpers";
import { stripe } from "@/app/lib/stripe";

export async function createCheckoutSession(
  data: FormData,
): Promise<{ client_secret: string | null; url: string | null }> {
  const ui_mode = data.get(
    "uiMode",
  ) as Stripe.Checkout.SessionCreateParams.UiMode;
  const amount = Number(data.get("amount")) || 0;

  const headersList = await headers()
  const origin: string = headersList.get("origin") as string;
  
  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: "Scrum Dashboard Subscription",
              description: "Monthly subscription for Scrum Dashboard",
            },
            unit_amount: formatAmountForStripe(amount, CURRENCY),
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      ...(ui_mode === "hosted" && {
        success_url: `${origin}/signup?step=invite&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/signup`,
      }),
      // Do I need this?
      // ...(ui_mode === "embedded" && {
      //   return_url: `${origin}/donate-with-embedded-checkout/result?session_id={CHECKOUT_SESSION_ID}`,
      // }),
      ui_mode,
    });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}

export async function createPaymentIntent(
  data: FormData,
): Promise<{ client_secret: string }> {
  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.create({
      amount: formatAmountForStripe(
        Number(data.get("cartPrice") as string),
        CURRENCY,
      ),
      automatic_payment_methods: { enabled: true },
      currency: CURRENCY,
    });

  return { client_secret: paymentIntent.client_secret as string };
}