import { grantEntitlement, revokeEntitlement } from "@/lib/entitlements";
import { stripe, stripeAccount } from "@/lib/stripe";
import type Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return new Response("Signature verification failed", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id;
      await grantEntitlement({ userId: session.metadata?.userId, email: session.customer_details?.email ?? undefined, customerId, plan: "premium", status: "active" });
      break;
    }
    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
      await grantEntitlement({ customerId, plan: "premium", status: "active" });
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
      if (subscription.status === "active" || subscription.status === "trialing") {
        await grantEntitlement({ userId: subscription.metadata?.userId, customerId, subscriptionId: subscription.id, plan: "premium", status: "active" });
      } else {
        await revokeEntitlement({ subscriptionId: subscription.id, customerId });
      }
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
      await revokeEntitlement({ subscriptionId: subscription.id, customerId });
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
      await revokeEntitlement({ customerId });
      break;
    }
    default:
      break;
  }

  return new Response(null, { status: 200 });
}
