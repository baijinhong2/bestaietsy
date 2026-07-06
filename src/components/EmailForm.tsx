"use client";

import { useState } from "react";
import { Mail, Check, AlertCircle, Loader2, Bell } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function EmailForm({ variant = "primary" }: { variant?: "primary" | "compact" }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  // GDPR-friendly: opt-in for the breaking list. Default = weekly only.
  const [breakingOptIn, setBreakingOptIn] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    if (!email) {
      setStatus("error");
      setMessage("Please enter your email.");
      return;
    }

    const types = ["weekly", ...(breakingOptIn ? ["breaking"] : [])];

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, types }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.error === "RATE_LIMITED") {
          setMessage("Please wait a moment before subscribing again.");
        } else if (data.error === "EMAIL_INVALID") {
          setMessage("Please enter a valid email address.");
        } else {
          setMessage("Something went wrong. Try again later.");
        }
        setStatus("error");
        return;
      }

      const gotBreaking = Array.isArray(data.welcomeSent)
        ? data.welcomeSent.includes("breaking")
        : false;
      setMessage(
        gotBreaking
          ? "You're in! Check both inboxes for confirmation."
          : "You're in! Check your inbox for confirmation.",
      );
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      setBreakingOptIn(false);
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          className="flex-1 px-3 py-2 bg-cream-50 border-2 border-brown-200 rounded-lg text-sm focus:border-primary-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2 bg-primary-500 text-cream-50 text-sm font-bold rounded-lg hover:bg-primary-600 transition disabled:opacity-50 flex items-center gap-1"
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Mail className="w-4 h-4" />
          )}
          Subscribe
        </button>
      </form>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary-50 to-cream-100 border-2 border-primary-200 rounded-2xl p-6 shadow-warm">
      <div className="flex items-center gap-2 mb-2">
        <Mail className="w-5 h-5 text-primary-600" />
        <p className="font-mono text-xs text-primary-700 uppercase tracking-wider">
          free weekly newsletter
        </p>
      </div>
      <h2 className="font-display text-2xl font-bold text-brown-900 mb-2">
        Get the weekly Etsy AI digest
      </h2>
      <p className="text-sm text-brown-700 mb-4">
        1 curated article + 1 actionable tip + 1 policy alert every Tuesday. Free, no spam.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          className="w-full px-4 py-3 bg-cream-50 border-2 border-brown-200 rounded-lg text-base focus:border-primary-500 focus:outline-none"
        />

        {/* Breaking-news opt-in (unchecked by default for GDPR) */}
        <label className="flex items-start gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={breakingOptIn}
            onChange={(e) => setBreakingOptIn(e.target.checked)}
            className="mt-0.5 w-4 h-4 shrink-0 accent-coral-600 cursor-pointer"
          />
          <span className="text-xs text-brown-700 leading-snug">
            <Bell className="inline w-3 h-3 -mt-0.5 mr-0.5 text-coral-600" />
            <strong className="text-brown-900">Also send me breaking Etsy news.</strong>{" "}
            Policy changes, platform outages, major AI tool updates. ~1&ndash;3 emails/month, only when it matters. Unsubscribe anytime.
          </span>
        </label>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full flex items-center justify-center gap-2 bg-primary-500 text-cream-50 font-bold py-3 rounded-lg hover:bg-primary-600 transition disabled:opacity-50"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            <>
              <Mail className="w-4 h-4" />
              Subscribe — It's Free
            </>
          )}
        </button>
      </form>

      {status === "success" && (
        <p className="mt-3 flex items-center gap-2 text-sm text-accent-700 font-medium">
          <Check className="w-4 h-4" />
          {message}
        </p>
      )}
      {status === "error" && (
        <p className="mt-3 flex items-center gap-2 text-sm text-coral-600 font-medium">
          <AlertCircle className="w-4 h-4" />
          {message}
        </p>
      )}

      <p className="text-xs text-brown-500 mt-3">
        🔒 1-click unsubscribe per list · We respect your privacy
      </p>
    </div>
  );
}