"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, BookOpen, Wallet, Receipt, CreditCard, TrendingUp } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

interface TrackCardProps {
  track: {
    slug: string;
    title: string;
    shortDescription: string;
    level: string;
    totalArticles: number;
    estimatedTime: string;
    icon?: string;
  };
  articleSlugs: string[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  Wallet,
  Receipt,
  CreditCard,
  TrendingUp,
};

export function TrackCard({ track, articleSlugs }: TrackCardProps) {
  const { isHydrated, completedArticles } = useProgress();

  // Calculate completed count for this track
  const completedInTrack = isHydrated
    ? articleSlugs.filter((slug) => completedArticles.includes(slug)).length
    : 0;

  const progressPercent = Math.round((completedInTrack / Math.max(1, track.totalArticles)) * 100);
  const IconComponent = (track.icon && ICON_MAP[track.icon]) || BookOpen;

  return (
    <article className="group bg-surface border border-ink-200 rounded-lg p-6 flex flex-col justify-between hover:border-brand transition-all hover:shadow-sm">
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-brand-subtle text-brand border border-brand-border flex items-center justify-center">
            <IconComponent className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-ink-600 bg-ink-100 px-2.5 py-1 rounded-md">
            {track.level}
          </span>
        </div>

        <h3 className="text-lg font-bold text-ink-900 group-hover:text-brand transition-colors mb-2">
          <Link href={`/learn/${track.slug}`} className="focus:outline-none focus:underline">
            {track.title}
          </Link>
        </h3>

        <p className="text-xs sm:text-sm text-ink-600 leading-relaxed mb-6">
          {track.shortDescription}
        </p>
      </div>

      <div className="pt-4 border-t border-ink-100">
        {/* Progress Bar & Status */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
            <span className="text-ink-600">
              {completedInTrack === track.totalArticles && track.totalArticles > 0 ? (
                <span className="inline-flex items-center gap-1 text-brand font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Track Finished
                </span>
              ) : (
                `${completedInTrack} of ${track.totalArticles} completed`
              )}
            </span>
            <span className="text-ink-500 font-mono text-[11px]">{progressPercent}%</span>
          </div>

          <div className="w-full h-1.5 bg-ink-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="flex items-center gap-1 text-ink-500 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {track.estimatedTime}
          </span>

          <Link
            href={`/learn/${track.slug}`}
            className="inline-flex items-center gap-1 text-brand font-semibold group-hover:translate-x-0.5 transition-transform"
          >
            Start Track <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default TrackCard;
