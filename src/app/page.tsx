import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Check, ShieldAlert, CheckSquare } from "lucide-react";
import { DailyTipCard } from "@/components/DailyTipCard";
import { TrackCard } from "@/components/TrackCard";
import { MoneyQuizModal } from "@/components/MoneyQuizModal";
import { NewsCard } from "@/components/NewsCard";
import { NewsletterDigest } from "@/components/NewsletterDigest";
import tracksData from "@/../content/data/tracks.json";
import { getArticlesByTrack } from "@/lib/mdx";
import { fetchFinanceFeeds } from "@/lib/rss";

export default async function HomePage() {
  const news = await fetchFinanceFeeds();
  const latestNews = news.slice(0, 3);

  // Map article slugs for each track to support progress calculation
  const tracksWithSlugs = tracksData.map((t) => {
    const articles = getArticlesByTrack(t.slug);
    return {
      ...t,
      articleSlugs: articles.map((a) => a.frontmatter.slug),
    };
  });

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero Section */}
      <section className="pt-4 sm:pt-8 text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-subtle border border-brand-border text-brand-dark text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-brand" />
          Clear • Independent • Plain English
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-ink-900 tracking-tight leading-tight">
          Master your money without the financial jargon.
        </h1>

        <p className="text-base sm:text-lg text-ink-600 leading-relaxed max-w-2xl mx-auto">
          A zero-jargon finance knowledge hub built specifically for young adults starting from scratch. No complex stock formulas, no Wall Street noise—just daily clarity, practical habits, and verified rules.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-brand text-surface text-sm font-semibold hover:bg-brand-dark transition-colors shadow-sm"
          >
            Start Learning <ArrowRight className="w-4 h-4" />
          </Link>

          <MoneyQuizModal />
        </div>

        {/* Value Pillars */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <div className="p-3 bg-surface border border-ink-200 rounded-md flex items-start gap-2.5">
            <div className="w-5 h-5 rounded bg-brand-subtle text-brand flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 font-bold" />
            </div>
            <div>
              <p className="text-xs font-bold text-ink-900">100% Free & Open</p>
              <p className="text-[11px] text-ink-500">Zero paywalls, no courses, and ad-free guides.</p>
            </div>
          </div>

          <div className="p-3 bg-surface border border-ink-200 rounded-md flex items-start gap-2.5">
            <div className="w-5 h-5 rounded bg-brand-subtle text-brand flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 font-bold" />
            </div>
            <div>
              <p className="text-xs font-bold text-ink-900">Tap-to-Define Terms</p>
              <p className="text-[11px] text-ink-500">Mobile bottom sheet & desktop hover tooltips for jargon.</p>
            </div>
          </div>

          <div className="p-3 bg-surface border border-ink-200 rounded-md flex items-start gap-2.5">
            <div className="w-5 h-5 rounded bg-brand-subtle text-brand flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 font-bold" />
            </div>
            <div>
              <p className="text-xs font-bold text-ink-900">Local-First Streaks</p>
              <p className="text-[11px] text-ink-500">Track streaks and export backup codes with zero login.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rotating Daily Money Tip Card */}
      <section id="daily-tip">
        <DailyTipCard />
      </section>

      {/* Structured Learning Tracks */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-ink-200 pb-4">
          <div>
            <span className="text-xs font-bold text-brand uppercase tracking-wider">
              Step-by-Step Curriculum
            </span>
            <h2 className="text-2xl font-bold text-ink-900 tracking-tight">
              Curated Learning Tracks ({tracksWithSlugs.length})
            </h2>
            <p className="text-xs sm:text-sm text-ink-600 mt-1">
              Curated sequential reading paths designed for your 20s. Read at your own pace.
            </p>
          </div>

          <Link
            href="/learn"
            className="text-xs font-semibold text-brand hover:text-brand-dark inline-flex items-center gap-1"
          >
            View all tracks <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracksWithSlugs.map((track) => (
            <TrackCard
              key={track.slug}
              track={track}
              articleSlugs={track.articleSlugs}
            />
          ))}
        </div>
      </section>

      {/* Two Essential Pillars: Scams Alert & Action Checklists */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scam Red-Flag Banner */}
        <div className="bg-red-50/60 border border-red-200 rounded-lg p-6 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-100 text-red-800 text-[11px] font-bold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
              Fraud Defense Library
            </div>
            <h3 className="text-lg font-bold text-red-950">
              Interactive &quot;Is This A Scam?&quot; Red-Flag Checker
            </h3>
            <p className="text-xs sm:text-sm text-red-900/80 leading-relaxed">
              Verify suspicious Telegram part-time jobs, fake digital arrest video calls, and UPI collect requests before you send ₹1. Includes shareable WhatsApp warning cards for family groups.
            </p>
          </div>

          <div className="pt-4 mt-2">
            <Link
              href="/scams"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-red-600 text-surface text-xs font-bold hover:bg-red-700 transition-colors shadow-xs"
            >
              Test Suspicious Message <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Milestone Checklists Banner */}
        <div className="bg-surface border border-ink-200 rounded-lg p-6 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-subtle text-brand-dark text-[11px] font-bold uppercase tracking-wider border border-brand-border">
              <CheckSquare className="w-3.5 h-3.5 text-brand" />
              Actionable Checklists
            </div>
            <h3 className="text-lg font-bold text-ink-900">
              First Salary & Credit Card Milestones
            </h3>
            <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
              Turn reading into concrete action. Interactive browser checklists for your first pay day, before swiping your first credit card, and setting up direct mutual fund SIPs.
            </p>
          </div>

          <div className="pt-4 mt-2">
            <Link
              href="/checklists"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-ink-900 text-surface text-xs font-bold hover:bg-ink-800 transition-colors"
            >
              Open Milestone Checklists <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Live 100% Free RSS Updates Preview */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-ink-200 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              100% Open & Free Reads
            </span>
            <h2 className="text-2xl font-bold text-ink-900 tracking-tight">
              Daily Plain-English News
            </h2>
            <p className="text-xs sm:text-sm text-ink-600 mt-1">
              Curated non-paywalled updates from Finshots, Freefincal, and RBI releases refreshed every 3 hours.
            </p>
          </div>

          <Link
            href="/updates"
            className="text-xs font-semibold text-brand hover:text-brand-dark inline-flex items-center gap-1"
          >
            See all free headlines <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {latestNews.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Searchable Glossary Teaser */}
      <section className="bg-surface border border-ink-200 rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="w-9 h-9 rounded-md bg-brand-subtle text-brand border border-brand-border flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-ink-900">
            Encountered a confusing word? Decode it in seconds.
          </h3>
          <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
            From Repo Rate and Nifty 50 to ULIPs and CIBIL, browse our searchable A–Z plain-English dictionary with zero textbook nonsense.
          </p>
        </div>

        <Link
          href="/glossary"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-ink-900 text-surface text-sm font-semibold hover:bg-ink-800 transition-colors shrink-0"
        >
          Open Jargon Glossary <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Weekly Email Digest Signup (Version 2) */}
      <section>
        <NewsletterDigest />
      </section>
    </div>
  );
}
