"use client";

import { useState, useEffect, useCallback } from "react";

const COMPLETED_KEY = "finance_hub_completed_articles";
const BOOKMARKS_KEY = "finance_hub_bookmarked_tips";
const STREAK_KEY = "finance_hub_reading_streak";
const LAST_DATE_KEY = "finance_hub_last_active_date";

export function useProgress() {
  const [completedArticles, setCompletedArticles] = useState<string[]>([]);
  const [bookmarkedTips, setBookmarkedTips] = useState<number[]>([]);
  const [streakCount, setStreakCount] = useState<number>(1);
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

      // Streak calculation
      const todayStr = new Date().toISOString().split("T")[0];
      const storedLastDate = localStorage.getItem(LAST_DATE_KEY);
      const storedStreak = localStorage.getItem(STREAK_KEY);
      const parsedStreak = storedStreak ? parseInt(storedStreak, 10) : 1;

      if (!storedLastDate) {
        // First visit
        setStreakCount(1);
        localStorage.setItem(STREAK_KEY, "1");
        localStorage.setItem(LAST_DATE_KEY, todayStr);
      } else if (storedLastDate === todayStr) {
        // Already visited today
        setStreakCount(parsedStreak);
      } else {
        const lastDate = new Date(storedLastDate);
        const today = new Date(todayStr);
        const diffDays = Math.round((today.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

        if (diffDays === 1) {
          // Visited yesterday, streak continues!
          const nextStreak = parsedStreak + 1;
          setStreakCount(nextStreak);
          localStorage.setItem(STREAK_KEY, nextStreak.toString());
          localStorage.setItem(LAST_DATE_KEY, todayStr);
        } else {
          // Streak broken
          setStreakCount(1);
          localStorage.setItem(STREAK_KEY, "1");
          localStorage.setItem(LAST_DATE_KEY, todayStr);
        }
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

  const exportProgress = useCallback((): string => {
    const payload = {
      completedArticles,
      bookmarkedTips,
      streakCount,
      exportedAt: new Date().toISOString(),
      version: 1,
    };
    return btoa(JSON.stringify(payload));
  }, [completedArticles, bookmarkedTips, streakCount]);

  const importProgress = useCallback((encodedData: string): boolean => {
    try {
      const decoded = atob(encodedData.trim());
      const payload = JSON.parse(decoded);
      if (Array.isArray(payload.completedArticles)) {
        setCompletedArticles(payload.completedArticles);
        localStorage.setItem(COMPLETED_KEY, JSON.stringify(payload.completedArticles));
      }
      if (Array.isArray(payload.bookmarkedTips)) {
        setBookmarkedTips(payload.bookmarkedTips);
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(payload.bookmarkedTips));
      }
      if (typeof payload.streakCount === "number") {
        setStreakCount(payload.streakCount);
        localStorage.setItem(STREAK_KEY, payload.streakCount.toString());
      }
      return true;
    } catch {
      return false;
    }
  }, []);

  return {
    isHydrated,
    completedArticles,
    toggleArticleCompleted,
    isArticleCompleted,
    bookmarkedTips,
    toggleBookmarkTip,
    isTipBookmarked,
    streakCount,
    exportProgress,
    importProgress,
  };
}
