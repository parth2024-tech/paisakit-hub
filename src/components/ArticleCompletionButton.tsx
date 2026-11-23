"use client";

import React from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

interface Props {
  slug: string;
}

export function ArticleCompletionButton({ slug }: Props) {
  const { isHydrated, isArticleCompleted, toggleArticleCompleted } = useProgress();

  const completed = isHydrated && isArticleCompleted(slug);

  return (
    <button
      type="button"
      onClick={() => toggleArticleCompleted(slug)}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-bold transition-all shadow-sm ${
        completed
          ? "bg-brand text-surface hover:bg-brand-dark"
          : "bg-ink-900 text-surface hover:bg-ink-800"
      }`}
    >
      {completed ? (
        <>
          <CheckCircle2 className="w-4 h-4 text-surface" /> Lesson Completed (Click to Undo)
        </>
      ) : (
        <>
          <Circle className="w-4 h-4 text-ink-400" /> Mark Lesson as Complete
        </>
      )}
    </button>
  );
}

export default ArticleCompletionButton;
