"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

interface TrackProgressBarProps {
  totalLessons: number;
  articleSlugs: string[];
}

export function TrackProgressBar({ totalLessons, articleSlugs }: TrackProgressBarProps) {
  const { isHydrated, completedArticles } = useProgress();

  const completedCount = isHydrated
    ? articleSlugs.filter((s) => completedArticles.includes(s)).length
    : 0;

  const percent = Math.round((completedCount / Math.max(1, totalLessons)) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-medium">
        <span className="text-ink-700">
          {completedCount === totalLessons && totalLessons > 0 ? (
            <span className="inline-flex items-center gap-1.5 text-brand font-bold">
              <CheckCircle2 className="w-4 h-4 text-brand" /> Congratulations! You completed this track.
            </span>
          ) : (
            `Track Progress: ${completedCount} of ${totalLessons} lessons marked complete`
          )}
        </span>
        <span className="font-mono text-ink-500 font-semibold">{percent}%</span>
      </div>

      <div className="w-full h-2 bg-ink-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default TrackProgressBar;
