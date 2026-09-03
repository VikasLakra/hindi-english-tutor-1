import "server-only";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export const stripeAccount = process.env.STRIPE_ACCOUNT_ID ? { stripeAccount: process.env.STRIPE_ACCOUNT_ID } : undefined;
