import Link from "next/link";
import { getUser } from "@/lib/auth";
import { SubscribeButton } from "@/components/subscribe-button";

export default async function PricingPage() {
  const user = await getUser();
  return (
    <main className="min-h-dvh bg-background px-6 py-10 text-foreground sm:px-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="eyebrow text-primary">← BACK TO LEARN</Link>
        <div className="mt-16 max-w-2xl">
          <p className="eyebrow text-primary">PREMIUM / FULL DAY</p>
          <h1 className="mt-4 text-5xl font-bold tracking-[-0.06em] sm:text-7xl">More practice.<br /><span className="text-primary">More confidence.</span></h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">Unlock the complete English-learning route with deeper lessons, personalized practice, speaking cues, and progress insights.</p>
        </div>
        <section className="mt-14 grid gap-5 md:grid-cols-[1.15fr_.85fr]">
          <div className="border border-border bg-foreground p-7 text-background sm:p-9">
            <div className="flex items-start justify-between gap-4"><div><p className="eyebrow text-background/55">ENGLISH TUTOR</p><h2 className="mt-3 text-3xl font-bold tracking-[-0.04em]">Premium monthly</h2></div><span className="border border-background/35 px-2 py-1 font-mono text-[10px] tracking-[.08em] text-background/70">BEST VALUE</span></div>
            <div className="mt-10 flex items-end gap-2"><strong className="text-6xl leading-none tracking-[-0.07em]">$1</strong><span className="pb-1 text-background/55">/ month</span></div>
            <p className="mt-3 border-l-2 border-primary pl-3 text-sm font-semibold text-background">Try all premium practice free for 7 days.</p>
            <div className="mt-9 grid gap-3 border-t border-background/20 pt-6 text-sm text-background/80 sm:grid-cols-2"><p>✓ 7-day free trial</p><p>✓ Advanced daily lessons</p><p>✓ Unlimited tutor practice</p><p>✓ Speaking practice cues</p><p>✓ Personalized progress</p></div>
            <div className="mt-9">{user ? <SubscribeButton /> : <Link href="/auth/start" className="inline-flex h-9 items-center gap-2 bg-primary px-4 text-sm font-bold text-primary-foreground">Sign in to start trial <span>↗</span></Link>}<p className="mt-3 text-xs text-background/45">Free for 7 days, then $1 per month. Cancel anytime before your trial ends to avoid a charge. Secure checkout handled by Stripe.</p></div>
          </div>
          <div className="border border-border bg-card p-7 sm:p-9"><p className="eyebrow text-muted-foreground">THE ROUTE</p><div className="mt-7 space-y-6"><div><strong className="text-lg">01 · Learn deeply</strong><p className="mt-1 text-sm text-muted-foreground">Grammar and vocabulary lessons built around the mistakes you make.</p></div><div><strong className="text-lg">02 · Speak naturally</strong><p className="mt-1 text-sm text-muted-foreground">Practice conversations that move from Hindi support to simple English.</p></div><div><strong className="text-lg">03 · Keep your rhythm</strong><p className="mt-1 text-sm text-muted-foreground">See your streak, weak areas, and next best practice moment.</p></div></div></div>
        </section>
      </div>
    </main>
  );
}
