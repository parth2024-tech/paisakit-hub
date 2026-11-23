"use client";

import React, { useState } from "react";
import { Bookmark, X, Trash2 } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import tipsData from "@/../content/data/daily-tips.json";

interface Tip {
  id: number;
  title: string;
  snippet: string;
  action: string;
  tag: string;
  source: string;
}

const tips = tipsData as Tip[];

export function SavedDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { isHydrated, bookmarkedTips, toggleBookmarkTip, completedArticles } = useProgress();

  const savedTipsList = tips.filter((t) => bookmarkedTips.includes(t.id));

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-ink-700 bg-surface border border-ink-300 rounded-md hover:bg-ink-50 transition-colors"
        title="View your bookmarks and reading stats"
      >
        <Bookmark className="w-3.5 h-3.5 text-brand" />
        <span className="hidden sm:inline">Saved</span>
        {isHydrated && bookmarkedTips.length > 0 && (
          <span className="ml-1 w-4 h-4 rounded-full bg-brand text-surface text-[10px] flex items-center justify-center font-bold">
            {bookmarkedTips.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-ink-900/40 backdrop-blur-xs">
          <div className="bg-surface w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-ink-200">
            {/* Header */}
            <div className="p-5 border-b border-ink-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-ink-900 text-base">Your Learning Dashboard</h3>
                <p className="text-xs text-ink-500">
                  {completedArticles.length} lessons finished • {bookmarkedTips.length} tips bookmarked
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-ink-400 hover:text-ink-800 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content List */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-3">
                  Bookmarked Money Tips ({savedTipsList.length})
                </h4>

                {savedTipsList.length === 0 ? (
                  <div className="p-6 text-center border border-dashed border-ink-300 rounded-lg">
                    <Bookmark className="w-6 h-6 text-ink-300 mx-auto mb-2" />
                    <p className="text-xs text-ink-500">No bookmarked tips yet.</p>
                    <p className="text-[11px] text-ink-400 mt-1">
                      Click &quot;Save Tip&quot; on the daily card to save them here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedTipsList.map((tip) => (
                      <div
                        key={tip.id}
                        className="p-3.5 bg-canvas border border-ink-200 rounded-lg relative group"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <span className="text-[10px] font-semibold text-brand uppercase tracking-wider">
                            {tip.tag}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleBookmarkTip(tip.id)}
                            className="text-ink-400 hover:text-red-600 transition-colors"
                            title="Remove bookmark"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h5 className="text-xs font-bold text-ink-900 leading-snug mb-1">
                          {tip.title}
                        </h5>
                        <p className="text-[11px] text-ink-600 leading-relaxed mb-2">
                          {tip.snippet}
                        </p>
                        <div className="bg-surface p-2 rounded border border-ink-200/80 text-[11px] text-ink-800 font-medium">
                          💡 {tip.action}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-ink-200 bg-canvas flex items-center justify-between">
              <span className="text-xs text-ink-500">Stored safely in your browser</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-xs font-semibold bg-ink-900 text-surface rounded-md hover:bg-ink-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SavedDrawer;
