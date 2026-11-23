import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | PaisaKit",
  description: "Terms of service and financial education disclaimer for PaisaKit.",
};

export default function TermsPage() {
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
          <FileText className="w-3.5 h-3.5 text-brand" />
          Legal Framework
        </div>
        <h1 className="text-3xl font-extrabold text-ink-900 tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-xs text-ink-500 mt-1">
          Effective Date: November 23, 2026 • Version 1.0
        </p>
      </div>

      <div className="space-y-6 text-sm text-ink-800 leading-relaxed">
        <section className="space-y-2 bg-amberBrand-subtle border border-amberBrand-border p-4 rounded-md">
          <h2 className="text-sm font-bold text-ink-900 uppercase tracking-wide">
            Important Educational Disclaimer
          </h2>
          <p className="text-xs text-ink-800 leading-relaxed">
            PaisaKit is an open educational resource created solely for informational and literacy purposes. Nothing published on this website constitutes registered financial advice, tax advisory, legal counsel, or stock recommendations. PaisaKit is not a SEBI-registered Investment Adviser (RIA) or Research Analyst (RA). Always conduct your own research or consult a licensed professional before making financial commitments.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-ink-900">1. Acceptance of Terms</h2>
          <p>
            By accessing and reading content on PaisaKit, you agree to comply with and be bound by these terms. If you disagree with any portion of these provisions, you should discontinue use of the platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-ink-900">2. Intellectual Property and Open Learning</h2>
          <p>
            All original curriculum materials, plain-English explanations, and interactive tooltips are authored for public literacy. You may quote and share excerpts for non-commercial educational purposes provided that clear attribution is given to PaisaKit.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-ink-900">3. Accuracy of Financial Calculations</h2>
          <p>
            While our editorial team cross-verifies all guides against primary sources from the Reserve Bank of India (RBI), Securities and Exchange Board of India (SEBI), and the Central Board of Direct Taxes (CBDT), tax laws and interest rates fluctuate. We do not warrant that all figures reflect instantaneous tax updates.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-ink-900">4. Limitation of Liability</h2>
          <p>
            In no event shall PaisaKit, its creators, or contributors be held liable for any investment decisions, monetary losses, credit score fluctuations, or operational outcomes resulting from reliance on the educational content provided.
          </p>
        </section>
      </div>
    </div>
  );
}
