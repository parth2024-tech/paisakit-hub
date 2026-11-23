"use client";

import React, { useState, useEffect } from "react";
import { CheckSquare, Square, RotateCcw, CheckCircle2, Award } from "lucide-react";

interface ChecklistItem {
  id: string;
  label: string;
  detail: string;
}

interface Checklist {
  id: string;
  title: string;
  description: string;
  items: ChecklistItem[];
}

interface Props {
  checklists: Checklist[];
}

const STORAGE_KEY = "finance_hub_checklists_state";

export function ChecklistsClient({ checklists }: Props) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [activeChecklistId, setActiveChecklistId] = useState<string>(checklists[0]?.id || "");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCheckedItems(JSON.parse(stored));
      }
    } catch {}
    setIsHydrated(true);
  }, []);

  const toggleItem = (itemId: string) => {
    setCheckedItems((prev) => {
      const exists = prev.includes(itemId);
      const updated = exists ? prev.filter((id) => id !== itemId) : [...prev, itemId];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const activeChecklist = checklists.find((c) => c.id === activeChecklistId) || checklists[0];

  const totalItems = activeChecklist.items.length;
  const completedCount = isHydrated
    ? activeChecklist.items.filter((item) => checkedItems.includes(item.id)).length
    : 0;
  const progressPercent = Math.round((completedCount / Math.max(1, totalItems)) * 100);

  const resetCurrentChecklist = () => {
    setCheckedItems((prev) => {
      const updated = prev.filter((id) => !activeChecklist.items.some((item) => item.id === id));
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  return (
    <div className="space-y-8">
      {/* Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {checklists.map((c) => {
          const isSelected = c.id === activeChecklistId;
          const doneCount = isHydrated
            ? c.items.filter((item) => checkedItems.includes(item.id)).length
            : 0;
          const isAllDone = doneCount === c.items.length;

          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveChecklistId(c.id)}
              className={`text-left p-4 rounded-lg border transition-all ${
                isSelected
                  ? "bg-surface border-brand shadow-sm ring-1 ring-brand"
                  : "bg-surface border-ink-200 hover:border-ink-300"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-ink-500">
                  {doneCount}/{c.items.length} Done
                </span>
                {isAllDone && (
                  <CheckCircle2 className="w-4 h-4 text-brand" />
                )}
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-ink-900 leading-snug line-clamp-2">
                {c.title}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Active Checklist Card */}
      <div className="bg-surface border border-ink-200 rounded-lg p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink-100 pb-5">
          <div>
            <span className="text-xs font-bold text-brand uppercase tracking-wider">
              Action Checklist
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight mt-1">
              {activeChecklist.title}
            </h2>
            <p className="text-xs sm:text-sm text-ink-600 mt-1 max-w-xl">
              {activeChecklist.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={resetCurrentChecklist}
              className="inline-flex items-center gap-1.5 text-xs text-ink-500 hover:text-ink-800 font-medium p-1"
              title="Reset ticks for this checklist"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-medium mb-1.5">
            <span className="text-ink-700">
              {completedCount === totalItems ? (
                <span className="text-brand font-bold inline-flex items-center gap-1">
                  <Award className="w-4 h-4 text-brand" /> Milestone Complete!
                </span>
              ) : (
                `${completedCount} of ${totalItems} tasks completed`
              )}
            </span>
            <span className="font-mono text-ink-500">{progressPercent}%</span>
          </div>

          <div className="w-full h-2 bg-ink-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items Checklist */}
        <div className="space-y-3">
          {activeChecklist.items.map((item, index) => {
            const isChecked = isHydrated && checkedItems.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all flex items-start gap-3.5 ${
                  isChecked
                    ? "bg-brand-subtle/40 border-brand-border text-ink-900"
                    : "bg-surface border-ink-200 text-ink-800 hover:bg-ink-50"
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-brand" />
                  ) : (
                    <Square className="w-5 h-5 text-ink-400" />
                  )}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-ink-400 font-bold">
                      0{index + 1}
                    </span>
                    <h4 className={`text-sm font-bold ${
                      isChecked ? "line-through text-ink-500" : "text-ink-900"
                    }`}>
                      {item.label}
                    </h4>
                  </div>
                  <p className="text-xs text-ink-600 leading-relaxed pl-6">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ChecklistsClient;
