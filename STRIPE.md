# Payments
- Billing type: subscription
- Plan: English Tutor Premium → advanced lessons, personalized practice, speaking activities, progress insights
- Price: $9.99/month (price id lives in the server billing action)
- Checkout: Stripe Hosted Checkout with a full-page redirect
- Access: verified after checkout and persisted in the entitlement table; lifecycle updates arrive through the webhook
- Environment: STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET
- Webhook: /api/stripe/webhook
- Preview testing: open the preview in a new browser tab; use Stripe test card 4242 4242 4242 4242 with any future expiry and CVC
