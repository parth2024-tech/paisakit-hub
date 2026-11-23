import React from "react";
import { fetchFinanceFeeds } from "@/lib/rss";
import { NewsFeedClient } from "@/components/NewsFeedClient";
import { Newspaper } from "lucide-react";

export const revalidate = 10800; // 3 hours ISR

export const metadata = {
  title: "Stay Updated: Plain-English Finance News | PaisaKit",
  description: "Automated daily plain-English updates from Finshots, RBI, and business media without noise.",
};

export default async function UpdatesPage() {
  const news = await fetchFinanceFeeds();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="border-b border-ink-200 pb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blueBrand-subtle border border-blueBrand-border text-blueBrand text-xs font-semibold uppercase tracking-wider mb-2">
          <Newspaper className="w-3.5 h-3.5" />
          Live RSS Aggregator
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
          Daily Financial Updates
        </h1>
        <p className="text-sm sm:text-base text-ink-600 max-w-2xl mt-1 leading-relaxed">
          Automated plain-English business and personal finance news fetched from verified public feeds so the hub stays fresh every day.
        </p>
      </div>

      <NewsFeedClient initialNews={news} />
    </div>
  );
}
