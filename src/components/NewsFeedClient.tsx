"use client";

import React, { useState, useMemo } from "react";
import { FeedItem } from "@/lib/rss";
import { NewsCard } from "./NewsCard";
import { Search, Newspaper } from "lucide-react";

interface Props {
  initialNews: FeedItem[];
}

const CATEGORIES = ["All", "Personal Finance", "Economy", "Banking", "Policy"] as const;

export function NewsFeedClient({ initialNews }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return initialNews.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.source.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [initialNews, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Controls Bar */}
      <div className="bg-surface p-6 rounded-lg border border-ink-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter headlines by keyword (e.g. RBI, UPI, Tax, Inflation)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-md border border-ink-300 bg-canvas text-ink-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-md text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? "bg-ink-900 text-surface"
                    : "bg-canvas text-ink-700 hover:bg-ink-100 border border-ink-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-ink-500 font-medium px-1">
          <span>Displaying {filteredItems.length} curated updates</span>
          <span>Refreshes automatically every 3 hours</span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="bg-surface border border-ink-200 rounded-lg p-12 text-center">
            <Newspaper className="w-8 h-8 text-ink-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-ink-800">No headlines found matching criteria.</p>
            <p className="text-xs text-ink-500 mt-1">Try resetting the category filter or search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsFeedClient;
