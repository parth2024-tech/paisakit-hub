import React from "react";
import glossaryData from "@/../content/data/glossary.json";
import { GlossaryClient } from "@/components/GlossaryClient";
import { Compass } from "lucide-react";

export const metadata = {
  title: "Searchable Jargon Decoder & Finance Glossary | PaisaKit",
  description: "Plain English definitions for essential financial terms, from Inflation and CIBIL to Repo Rate and Mutual Funds.",
};

export default function GlossaryPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-ink-200 pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-subtle border border-brand-border text-brand-dark text-xs font-semibold uppercase tracking-wider mb-2">
          <Compass className="w-3.5 h-3.5 text-brand" />
          A–Z Finance Dictionary
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
          Hover-to-Define Glossary
        </h1>
        <p className="text-sm sm:text-base text-ink-600 max-w-2xl mt-1 leading-relaxed">
          Every financial term translated into one sentence of plain English with everyday Indian examples. No Wall Street buzzwords.
        </p>
      </div>

      <GlossaryClient glossary={glossaryData} />
    </div>
  );
}
