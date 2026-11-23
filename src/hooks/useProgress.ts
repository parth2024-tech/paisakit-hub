"use client";

import { useState, useEffect, useCallback } from "react";

const COMPLETED_KEY = "finance_hub_completed_articles";
const BOOKMARKS_KEY = "finance_hub_bookmarked_tips";

export function useProgress() {
  const [completedArticles, setCompletedArticles] = useState<string[]>([]);
  const [bookmarkedTips, setBookmarkedTips] = useState<number[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedCompleted = localStorage.getItem(COMPLETED_KEY);
      if (storedCompleted) {
        setCompletedArticles(JSON.parse(storedCompleted));
      }
      const storedBookmarks = localStorage.getItem(BOOKMARKS_KEY);
      if (storedBookmarks) {
        setBookmarkedTips(JSON.parse(storedBookmarks));
      }
    } catch {
      // Safe fallback on localStorage errors
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const toggleArticleCompleted = useCallback((slug: string) => {
    setCompletedArticles((prev) => {
      const isAlreadyCompleted = prev.includes(slug);
      const updated = isAlreadyCompleted ? prev.filter((s) => s !== slug) : [...prev, slug];
      try {
        localStorage.setItem(COMPLETED_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  const isArticleCompleted = useCallback(
    (slug: string) => {
      return completedArticles.includes(slug);
    },
    [completedArticles]
  );

  const toggleBookmarkTip = useCallback((tipId: number) => {
    setBookmarkedTips((prev) => {
      const isBookmarked = prev.includes(tipId);
      const updated = isBookmarked ? prev.filter((id) => id !== tipId) : [...prev, tipId];
      try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  const isTipBookmarked = useCallback(
    (tipId: number) => {
      return bookmarkedTips.includes(tipId);
    },
    [bookmarkedTips]
  );

  return {
    isHydrated,
    completedArticles,
    toggleArticleCompleted,
    isArticleCompleted,
    bookmarkedTips,
    toggleBookmarkTip,
    isTipBookmarked,
  };
}
