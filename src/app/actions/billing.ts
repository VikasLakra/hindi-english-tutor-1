"use server";

import { requireUser } from "@/lib/auth";
import { appOrigin } from "@/lib/app-origin";
import { grantEntitlement } from "@/lib/entitlements";
import { stripe, stripeAccount } from "@/lib/stripe";

const premiumPriceId = "price_1UBb5VJc01dLhUgCagUYEpNt";

export async function startSubscription() {
  const user = await requireUser();
  const origin = await appOrigin();
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: premiumPriceId, quantity: 1 }],
    success_url: `${origin}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing`,
    customer_email: user.email,
    metadata: { userId: user.id },
    subscription_data: { metadata: { userId: user.id } },
  }, stripeAccount);
  return session.url;
}

export async function verifyCheckout(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["subscription"] }, stripeAccount);
    const subscription = typeof session.subscription === "object" ? session.subscription : null;
    const active = session.payment_status === "paid" || subscription?.status === "active" || subscription?.status === "trialing";
    if (!active) return { active: false };
    const user = await requireUser();
    await grantEntitlement({
      userId: user.id,
      email: session.customer_details?.email ?? user.email,
      customerId: typeof session.customer === "string" ? session.customer : session.customer?.id,
      subscriptionId: subscription?.id,
      plan: "premium",
      status: "active",
    });
    return { active: true };
  } catch {
    return { active: false };
  }
}
