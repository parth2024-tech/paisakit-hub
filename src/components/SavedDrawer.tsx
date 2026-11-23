"use client";

import React, { useState } from "react";
import { Bookmark, X, Trash2, Flame, Download, Upload, Check } from "lucide-react";
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
  const {
    isHydrated,
    bookmarkedTips,
    toggleBookmarkTip,
    completedArticles,
    streakCount,
    exportProgress,
    importProgress,
  } = useProgress();

  const [importCode, setImportCode] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [copiedBackup, setCopiedBackup] = useState(false);
  const [importStatus, setImportStatus] = useState<"idle" | "success" | "error">("idle");

  const savedTipsList = tips.filter((t) => bookmarkedTips.includes(t.id));

  const handleExport = () => {
    const code = exportProgress();
    navigator.clipboard.writeText(code);
    setCopiedBackup(true);
    setTimeout(() => setCopiedBackup(false), 2500);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importCode.trim()) return;
    const ok = importProgress(importCode.trim());
    if (ok) {
      setImportStatus("success");
      setTimeout(() => {
        setImportStatus("idle");
        setShowImport(false);
        setImportCode("");
      }, 1500);
    } else {
      setImportStatus("error");
    }
  };

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
        <div className="fixed inset-0 z-50 flex justify-end bg-ink-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-surface w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-ink-200">
            {/* Header */}
            <div className="p-5 border-b border-ink-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-ink-900 text-base">Your Learning Dashboard</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-ink-500">
                    {completedArticles.length} finished • {bookmarkedTips.length} saved
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-amberBrand-subtle text-amber-900 border border-amberBrand-border">
                    <Flame className="w-3 h-3 text-amber-600 fill-amber-500" />
                    {streakCount}-Day Streak
                  </span>
                </div>
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
            <div className="p-5 overflow-y-auto flex-1 space-y-6">
              {/* Backup & Cross-Device Sync Box */}
              <div className="bg-canvas border border-ink-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink-900">
                    Cross-Device Backup & Sync
                  </span>
                  <span className="text-[10px] text-ink-500 font-mono">Zero-Account</span>
                </div>
                <p className="text-[11px] text-ink-600 leading-relaxed">
                  Export your progress to a private string, or restore your completed lessons and streak on your mobile phone or work laptop.
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleExport}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface border border-ink-300 text-xs font-semibold text-ink-700 hover:bg-ink-100 transition-colors"
                  >
                    {copiedBackup ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-brand" /> Copied Backup Code!
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" /> Export Progress
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowImport((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface border border-ink-300 text-xs font-semibold text-ink-700 hover:bg-ink-100 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" /> Import
                  </button>
                </div>

                {showImport && (
                  <form onSubmit={handleImportSubmit} className="pt-2 space-y-2">
                    <textarea
                      value={importCode}
                      onChange={(e) => setImportCode(e.target.value)}
                      placeholder="Paste your exported progress code here..."
                      rows={2}
                      className="w-full p-2 text-xs font-mono rounded border border-ink-300 bg-surface text-ink-900 focus:outline-none focus:ring-1 focus:ring-brand"
                    />
                    <div className="flex items-center justify-between">
                      <button
                        type="submit"
                        className="px-3 py-1 bg-brand text-surface text-xs font-bold rounded hover:bg-brand-dark"
                      >
                        Restore Progress
                      </button>
                      {importStatus === "success" && (
                        <span className="text-xs text-brand font-bold">Restored successfully!</span>
                      )}
                      {importStatus === "error" && (
                        <span className="text-xs text-red-600 font-bold">Invalid backup code.</span>
                      )}
                    </div>
                  </form>
                )}
              </div>

              {/* Bookmarked Tips */}
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
