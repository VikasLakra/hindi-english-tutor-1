"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { verifyCheckout } from "@/app/actions/billing";

export default function BillingSuccessPage() {
  const [state, setState] = useState<"checking" | "active" | "failed">("checking");

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId) {
      setState("failed");
      return;
    }
    void verifyCheckout(sessionId).then((result) => setState(result.active ? "active" : "failed")).catch(() => setState("failed"));
  }, []);

  return <main className="flex min-h-dvh items-center justify-center bg-background px-6 text-foreground"><section className="w-full max-w-lg border border-border bg-card p-8 text-center sm:p-12">{state === "checking" && <><p className="eyebrow text-primary">PAYMENT / CONFIRMING</p><h1 className="mt-5 text-4xl font-bold tracking-[-0.06em]">Checking your new access…</h1><p className="mt-4 text-muted-foreground">Your tutor is confirming the payment securely.</p></>}{state === "active" && <><p className="eyebrow text-primary">PAYMENT / COMPLETE</p><h1 className="mt-5 text-4xl font-bold tracking-[-0.06em]">You’re all set.</h1><p className="mt-4 text-muted-foreground">Premium lessons and speaking practice are now unlocked.</p><Link href="/premium" className="mt-8 inline-flex h-10 items-center bg-primary px-5 text-sm font-bold text-primary-foreground">Open premium lessons ↗</Link></>}{state === "failed" && <><p className="eyebrow text-destructive">PAYMENT / NEEDS REVIEW</p><h1 className="mt-5 text-4xl font-bold tracking-[-0.06em]">We couldn’t confirm it yet.</h1><p className="mt-4 text-muted-foreground">Your payment may still be processing. Return to your tutor and try again shortly.</p><Link href="/" className="mt-8 inline-flex h-10 items-center border border-border px-5 text-sm font-bold">Back to learning</Link></>}</section></main>;
}
