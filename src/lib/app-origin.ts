import "server-only";
import { headers } from "next/headers";

export async function appOrigin(): Promise<string> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  if (!host) throw new Error("We couldn't determine the app address for checkout.");
  return `${protocol}://${host}`;
}
