"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Fuse from "fuse.js";
import { Search, BookOpen, Compass, Sparkles, X, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchItem {
  id: string;
  type: "Article" | "Glossary" | "Daily Tip";
  title: string;
  description: string;
  url: string;
  category: string;
}

export function GlobalSearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load search index once on mount or first open
  useEffect(() => {
    async function loadIndex() {
      try {
        const res = await fetch("/api/search-index");
        const json = await res.json();
        if (json.items) {
          setItems(json.items);
        }
      } catch {}
    }
    loadIndex();
  }, []);

  // Listen for Ctrl+K or Cmd+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Configure Fuse.js
  const fuse = useMemo(() => {
    return new Fuse(items, {
      keys: ["title", "description", "category"],
      threshold: 0.35,
      ignoreLocation: true,
    });
  }, [items]);

  const results = useMemo(() => {
    if (!query.trim()) return items.slice(0, 8);
    return fuse.search(query).map((res) => res.item).slice(0, 10);
  }, [fuse, query, items]);

  const handleSelect = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-ink-300 bg-surface hover:bg-ink-50 text-ink-500 text-xs font-medium transition-colors"
        title="Search articles, terms, and daily tips (Ctrl+K)"
      >
        <Search className="w-3.5 h-3.5 text-ink-400" />
        <span className="hidden sm:inline">Search PaisaKit...</span>
        <kbd className="hidden sm:inline-block font-mono text-[10px] bg-ink-100 text-ink-600 px-1.5 py-0.5 rounded border border-ink-200">
          ⌘K
        </kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-ink-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="bg-surface w-full max-w-xl rounded-xl border border-ink-200 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="p-4 border-b border-ink-200 flex items-center gap-3 bg-canvas">
              <Search className="w-4 h-4 text-ink-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, jargon terms, or daily money tips..."
                className="w-full bg-transparent text-ink-900 text-sm focus:outline-none placeholder:text-ink-400"
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-ink-400 hover:text-ink-800 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="p-3 overflow-y-auto flex-1 divide-y divide-ink-100">
              {results.length === 0 ? (
                <div className="p-8 text-center text-xs text-ink-500">
                  No matching results for &quot;{query}&quot;. Try terms like CIBIL, inflation, or tax.
                </div>
              ) : (
                results.map((item) => {
                  const typeIcon =
                    item.type === "Article"
                      ? BookOpen
                      : item.type === "Glossary"
                      ? Compass
                      : Sparkles;
                  const Icon = typeIcon;

                  const badgeClass =
                    item.type === "Article"
                      ? "bg-brand-subtle text-brand-dark border-brand-border"
                      : item.type === "Glossary"
                      ? "bg-blue-50 text-blue-800 border-blue-200"
                      : "bg-amber-50 text-amber-800 border-amber-200";

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item.url)}
                      className="p-3 rounded-lg hover:bg-ink-50 cursor-pointer transition-colors flex items-start justify-between gap-3 group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded bg-ink-100 text-ink-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand group-hover:text-surface transition-colors">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${badgeClass}`}>
                              {item.type}
                            </span>
                            <h4 className="text-sm font-bold text-ink-900 group-hover:text-brand transition-colors">
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-xs text-ink-500 line-clamp-1">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-ink-300 group-hover:text-brand group-hover:translate-x-0.5 transition-all shrink-0 self-center" />
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-canvas border-t border-ink-200 flex items-center justify-between text-[11px] text-ink-500">
              <span className="flex items-center gap-2">
                <span>Navigate with mouse or enter</span>
              </span>
              <span>ESC to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GlobalSearchModal;
