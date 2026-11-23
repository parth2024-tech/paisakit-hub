import React from "react";
import checklistsData from "@/../content/data/checklists.json";
import { ChecklistsClient } from "@/components/ChecklistsClient";
import { CheckSquare } from "lucide-react";

export const metadata = {
  title: "Milestone Financial Checklists | PaisaKit",
  description: "Interactive, tick-off personal finance checklists for first salary, credit cards, mutual funds, and insurance.",
};

export default function ChecklistsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-ink-200 pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-subtle border border-brand-border text-brand-dark text-xs font-semibold uppercase tracking-wider mb-2">
          <CheckSquare className="w-3.5 h-3.5 text-brand" />
          Actionable Milestones
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
          Financial Hygiene Checklists
        </h1>
        <p className="text-sm sm:text-base text-ink-600 max-w-2xl mt-1 leading-relaxed">
          Step-by-step tick-off checklists stored in your browser. Audit your first payslip, apply for cards safely, and verify your investments without costly omissions.
        </p>
      </div>

      <ChecklistsClient checklists={checklistsData} />
    </div>
  );
}
