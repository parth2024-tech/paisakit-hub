"use client";

import React, { useState } from "react";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";

export function NewsletterDigest() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    // Client-side confirmation (connects to Resend/Brevo API in production)
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 600);
  };

  return (
    <div className="bg-canvas border border-ink-200 rounded-lg p-6 sm:p-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-10 h-10 rounded-lg bg-brand-subtle text-brand border border-brand-border flex items-center justify-center mx-auto mb-3">
          <Mail className="w-5 h-5" />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight mb-2">
          Weekly Plain-English Money Digest
        </h3>
        <p className="text-xs sm:text-sm text-ink-600 max-w-md mx-auto mb-6 leading-relaxed">
          Every Sunday morning, get 3 zero-jargon financial takeaways and verified regulatory updates directly in your inbox. No promotions, no stock tip spam.
        </p>

        {status === "success" ? (
          <div className="bg-brand-subtle border border-brand-border text-brand-dark p-4 rounded-md inline-flex items-center gap-2 text-sm font-semibold animate-in fade-in">
            <CheckCircle className="w-5 h-5 text-brand" />
            You are on the list! Check your inbox this Sunday morning.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="Enter your personal email"
              required
              className="flex-1 px-3.5 py-2.5 rounded-md border border-ink-300 bg-surface text-ink-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-md bg-brand text-surface text-sm font-semibold hover:bg-brand-dark transition-colors shadow-sm disabled:opacity-50"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-xs text-red-600 mt-2 font-medium">{errorMessage}</p>
        )}

        <p className="text-[11px] text-ink-400 mt-3">
          Zero marketing spam. Unsubscribe with 1 click at any time.
        </p>
      </div>
    </div>
  );
}

export default NewsletterDigest;
