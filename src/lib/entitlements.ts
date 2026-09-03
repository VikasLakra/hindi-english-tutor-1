import "server-only";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { entitlement } from "@/db/schema";

export type Entitlement = { active: boolean; plan: string | null };

export async function grantEntitlement(input: {
  userId?: string;
  email?: string;
  customerId?: string;
  plan?: string;
  status?: string;
  subscriptionId?: string;
}) {
  const existing = input.subscriptionId
    ? await db.select({ id: entitlement.id }).from(entitlement).where(eq(entitlement.subscriptionId, input.subscriptionId)).limit(1)
    : [];
  const values = {
    userId: input.userId ?? null,
    email: input.email ?? null,
    stripeCustomerId: input.customerId ?? null,
    subscriptionId: input.subscriptionId ?? null,
    plan: input.plan ?? "premium",
    status: input.status ?? "active",
    updatedAt: new Date(),
  };
  if (existing[0]) await db.update(entitlement).set(values).where(eq(entitlement.id, existing[0].id));
  else await db.insert(entitlement).values(values);
}

export async function revokeEntitlement(match: { subscriptionId?: string; customerId?: string }) {
  const where = match.subscriptionId ? eq(entitlement.subscriptionId, match.subscriptionId) : match.customerId ? eq(entitlement.stripeCustomerId, match.customerId) : null;
  if (where) await db.update(entitlement).set({ status: "canceled", updatedAt: new Date() }).where(where);
}

export async function getEntitlement(userId?: string): Promise<Entitlement> {
  if (!userId) return { active: false, plan: null };
  const rows = await db.select({ plan: entitlement.plan }).from(entitlement).where(and(eq(entitlement.userId, userId), eq(entitlement.status, "active"))).limit(1);
  return { active: Boolean(rows[0]), plan: rows[0]?.plan ?? null };
}
