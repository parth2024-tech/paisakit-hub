"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

interface ReadProgressBarProps {
  slug: string;
  title: string;
}

export function ReadProgressBar({ slug, title }: ReadProgressBarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isHydrated, isArticleCompleted, toggleArticleCompleted } = useProgress();

  useEffect(() => {
    function handleScroll() {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const currentScroll = window.scrollY;
      const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      setScrollProgress(progress);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const completed = isHydrated && isArticleCompleted(slug);

  return (
    <div className="sticky top-0 z-40 bg-surface/95 backdrop-blur-sm border-b border-ink-200">
      {/* Top micro progress line */}
      <div
        className="h-1 bg-brand transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4">
        <p className="text-xs sm:text-sm font-medium text-ink-700 truncate max-w-[200px] sm:max-w-md">
          {title}
        </p>

        <button
          type="button"
          onClick={() => toggleArticleCompleted(slug)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${
            completed
              ? "bg-brand text-surface border-brand shadow-sm"
              : "bg-surface text-ink-800 border-ink-300 hover:border-brand hover:text-brand"
          }`}
        >
          {completed ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-surface" /> Lesson Completed
            </>
          ) : (
            <>
              <Circle className="w-3.5 h-3.5 text-ink-400" /> Mark as Done
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ReadProgressBar;
