import React from "react";
import scamsData from "@/../content/data/scams.json";
import { ScamCheckerClient } from "@/components/ScamCheckerClient";
import { ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Scam Alert & Indian Cyber Red-Flag Library | PaisaKit",
  description: "Live red-flag detector for current Indian cyber traps: digital arrest, fake Telegram task jobs, and UPI collect fraud.",
};

export default function ScamsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-ink-200 pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-100 border border-red-200 text-red-800 text-xs font-semibold uppercase tracking-wider mb-2">
          <ShieldAlert className="w-3.5 h-3.5 text-red-700" />
          Fraud Defense & Emergency Helpline
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
          &quot;Is This A Scam?&quot; Red-Flag Library
        </h1>
        <p className="text-sm sm:text-base text-ink-600 max-w-2xl mt-1 leading-relaxed">
          Breakdowns of the most prevalent digital financial traps targeting young Indians, complete with an interactive symptom checker and shareable WhatsApp alerts.
        </p>
      </div>

      <ScamCheckerClient scams={scamsData} />
    </div>
  );
}
