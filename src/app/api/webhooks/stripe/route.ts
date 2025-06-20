import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Extract the number of seats from the session metadata or line items
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        const quantity = lineItems.data[0]?.quantity || 1;
        
        // Get the customer's email from the session
        const customerEmail = session.customer_details?.email;
        
        if (customerEmail) {
          // Find the user by email and update their tenant's maxUsers
          const user = await prisma.user.findUnique({
            where: { email: customerEmail },
            include: { tenant: true },
          });

          if (user) {
            await prisma.tenant.update({
              where: { id: user.tenantId },
              data: { maxUsers: quantity },
            });

            console.log(`Updated tenant ${user.tenantId} maxUsers to ${quantity}`);
          }
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        
        // Handle subscription renewals if needed
        console.log('Payment succeeded for invoice:', invoice.id);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Handle subscription cancellation if needed
        console.log('Subscription cancelled:', subscription.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
} 