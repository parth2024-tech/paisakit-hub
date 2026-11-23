import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | PaisaKit",
  description: "Privacy commitments and transparent local-first data storage policy of PaisaKit.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-600 hover:text-brand transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
      </Link>

      <div className="border-b border-ink-200 pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-subtle border border-brand-border text-brand-dark text-xs font-semibold uppercase tracking-wider mb-2">
          <Shield className="w-3.5 h-3.5 text-brand" />
          Transparency & Security
        </div>
        <h1 className="text-3xl font-extrabold text-ink-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-ink-500 mt-1">
          Effective Date: November 23, 2026 • Version 1.0
        </p>
      </div>

      <div className="space-y-6 text-sm text-ink-800 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-ink-900">1. Local-First Reading Data</h2>
          <p>
            PaisaKit operates on a privacy-first, local storage model. Your reading progress, completed lesson marks, and bookmarked money tips are saved exclusively in your web browser&apos;s <code>localStorage</code>. None of this data is transmitted to or stored on our servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-ink-900">2. No Tracking Cookies or Surveillance</h2>
          <p>
            We do not deploy cross-site tracking pixels, fingerprinting scripts, or behavioral ad trackers. We believe education should be completely ad-free and distraction-free.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-ink-900">3. Email Newsletter Subscriptions</h2>
          <p>
            If you voluntarily submit your email address for the Weekly Sunday Money Digest, your email is stored solely for the purpose of dispatching that weekly newsletter. We will never sell, lease, or distribute your email to third-party financial institutions, banks, or brokers. You can unsubscribe anytime with a single click.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-ink-900">4. External Links and RSS Sources</h2>
          <p>
            Our website displays headlines and links from verified external publications (such as Finshots, LiveMint, and RBI). Visiting external links is governed by the respective privacy policies of those independent websites.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-ink-900">5. Contact and Grievances</h2>
          <p>
            For privacy inquiries, technical audits, or data removal requests, reach out directly via our open GitHub repository or contact the PaisaKit maintainers.
          </p>
        </section>
      </div>
    </div>
  );
}
