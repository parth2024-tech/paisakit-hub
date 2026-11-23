"use client";

import React, { useState, useMemo } from "react";
import tipsData from "@/../content/data/daily-tips.json";
import { Sparkles, Share2, Copy, Check, ArrowRight, Bookmark, BookmarkCheck, Flame } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

interface Tip {
  id: number;
  title: string;
  snippet: string;
  action: string;
  tag: string;
  source: string;
}

const tips = tipsData as Tip[];

export function DailyTipCard() {
  const { isHydrated, isTipBookmarked, toggleBookmarkTip, streakCount } = useProgress();
  const [copied, setCopied] = useState(false);

  // Calculate day of year deterministically
  const defaultIndex = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear % tips.length;
  }, []);

  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const currentTip = tips[currentIndex] || tips[0];
  const bookmarked = isHydrated && isTipBookmarked(currentTip.id);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % tips.length);
  };

  const handleCopy = async () => {
    const textToCopy = `💡 Today's Money Tip: ${currentTip.title}\n\n${currentTip.snippet}\n\nActionable Step: ${currentTip.action}\n\nRead more on Zero-Jargon Finance Hub`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `💡 Today's Money Tip: *${currentTip.title}*\n\n${currentTip.snippet}\n\n👉 *Action Step:* ${currentTip.action}\n\nVia Zero-Jargon Finance Hub`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <section className="w-full bg-surface border border-ink-200 rounded-lg shadow-sm p-6 sm:p-8 relative overflow-hidden">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-subtle border border-brand-border text-brand-dark text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand" />
            1-Minute Money Tip
          </span>
          {isHydrated && (
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amberBrand-subtle border border-amberBrand-border text-amber-900 text-xs font-bold"
              title="Daily Reading Streak"
            >
              <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              {streakCount}-Day Streak
            </span>
          )}
          <span className="text-xs text-ink-500 font-medium">
            Tip #{currentTip.id} of {tips.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleBookmarkTip(currentTip.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
              bookmarked
                ? "bg-brand text-surface border-brand"
                : "bg-surface text-ink-700 border-ink-300 hover:bg-ink-50"
            }`}
            title={bookmarked ? "Remove bookmark" : "Save tip for later"}
          >
            {bookmarked ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5" /> Saved
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" /> Save Tip
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-ink-100 text-ink-800 hover:bg-ink-200 border border-ink-300 transition-colors"
          >
            Next Tip <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Tip Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-ink-900 tracking-tight leading-snug mb-3">
        {currentTip.title}
      </h2>

      {/* Snippet / Plain English explanation */}
      <p className="text-sm sm:text-base text-ink-700 leading-relaxed mb-4">
        {currentTip.snippet}
      </p>

      {/* Action Box */}
      <div className="bg-canvas border-l-4 border-brand p-3.5 sm:p-4 rounded-r-md mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-dark mb-1">
          Actionable Takeaway
        </p>
        <p className="text-xs sm:text-sm text-ink-800 font-medium leading-relaxed">
          {currentTip.action}
        </p>
      </div>

      {/* Bottom Share & Source Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-ink-200">
        <p className="text-xs text-ink-500">
          Source: <span className="text-ink-700 font-medium">{currentTip.source}</span>
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-ink-700 bg-surface border border-ink-300 hover:bg-ink-50 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-brand" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-surface bg-brand hover:bg-brand-dark transition-colors shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" /> Share on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}

export default DailyTipCard;
