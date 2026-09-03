import Link from "next/link";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import { getEntitlement } from "@/lib/entitlements";

export default async function PremiumPage() {
  const user = await getUser();
  if (!user) redirect("/auth/start");
  const access = await getEntitlement(user.id);
  if (!access.active) redirect("/pricing");

  return <main className="min-h-dvh bg-background px-6 py-10 text-foreground sm:px-10"><div className="mx-auto max-w-5xl"><Link href="/" className="eyebrow text-primary">← BACK TO LEARN</Link><section className="mt-16 border border-border bg-foreground p-8 text-background sm:p-12"><p className="eyebrow text-background/60">PREMIUM / ACTIVE</p><h1 className="mt-4 max-w-2xl text-5xl font-bold tracking-[-0.06em] sm:text-7xl">Your next lesson<br /><span className="text-primary">starts here.</span></h1><p className="mt-6 max-w-xl text-lg text-background/70">Practice a real office conversation, then get a Hindi explanation for the one phrase that stretches you.</p><div className="mt-10 grid gap-3 sm:grid-cols-3"><div className="border border-background/20 p-4"><strong className="text-xl">05 min</strong><p className="mt-1 text-xs text-background/55">conversation cue</p></div><div className="border border-background/20 p-4"><strong className="text-xl">03</strong><p className="mt-1 text-xs text-background/55">new expressions</p></div><div className="border border-background/20 p-4"><strong className="text-xl">1:1</strong><p className="mt-1 text-xs text-background/55">tutor feedback</p></div></div><Link href="/?station=conversation" className="mt-10 inline-flex h-10 items-center bg-primary px-5 text-sm font-bold text-primary-foreground">Start premium practice ↗</Link></section></div></main>;
}
