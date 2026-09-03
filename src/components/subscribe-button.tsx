"use client";

import { useState } from "react";
import { startSubscription } from "@/app/actions/billing";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function SubscribeButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subscribe = async () => {
    setLoading(true);
    setError("");
    try {
      const url = await startSubscription();
      if (url) window.location.href = url;
      else setError("We couldn't open checkout. Please try again.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Please sign in before subscribing.");
      setLoading(false);
    }
  };

  return <div><Button className="primary-button" onClick={subscribe} disabled={loading}>{loading ? "Opening checkout…" : "Start 7-day trial"} <ArrowUpRight size={16} /></Button>{error && <p className="mt-3 text-sm text-destructive">{error}</p>}</div>;
}
