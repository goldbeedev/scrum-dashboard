import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2023-10-16",
  appInfo: {
    name: "SOME_ENV",
    url: "SOME_ENV",
  },
});