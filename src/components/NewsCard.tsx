import React from "react";
import { ExternalLink, Calendar, Newspaper } from "lucide-react";
import { FeedItem } from "@/lib/rss";

interface NewsCardProps {
  item: FeedItem;
}

const CATEGORY_STYLES: Record<string, string> = {
  "Personal Finance": "bg-emerald-50 text-emerald-800 border-emerald-200",
  Economy: "bg-blue-50 text-blue-800 border-blue-200",
  Banking: "bg-amber-50 text-amber-800 border-amber-200",
  Policy: "bg-slate-100 text-slate-800 border-slate-300",
};

export function NewsCard({ item }: NewsCardProps) {
  const badgeStyle = CATEGORY_STYLES[item.category] || "bg-slate-100 text-slate-800 border-slate-300";

  return (
    <article className="group bg-surface border border-ink-200 rounded-lg p-5 flex flex-col justify-between hover:border-brand transition-all hover:shadow-sm">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold border ${badgeStyle}`}>
            {item.category}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-ink-500 font-medium">
            <Calendar className="w-3 h-3" />
            {item.pubDate}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-ink-900 group-hover:text-brand transition-colors leading-snug mb-2">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="focus:outline-none focus:underline"
          >
            {item.title}
          </a>
        </h3>

        <p className="text-xs sm:text-sm text-ink-600 leading-relaxed mb-4">
          {item.snippet}
        </p>
      </div>

      <div className="pt-3 border-t border-ink-100 flex items-center justify-between gap-2 text-xs">
        <span className="flex items-center gap-1.5 font-medium text-ink-700">
          <Newspaper className="w-3.5 h-3.5 text-ink-400" />
          {item.source}
        </span>

        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-ink-700 group-hover:text-brand font-semibold transition-colors"
        >
          Read <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </article>
  );
}

export default NewsCard;
