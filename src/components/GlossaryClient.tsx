"use client";

import React, { useState, useMemo } from "react";
import { Search, Compass, Copy, Check } from "lucide-react";

interface GlossaryItem {
  term: string;
  shortDef: string;
  example: string;
}

interface Props {
  glossary: Record<string, GlossaryItem>;
}

export function GlossaryClient({ glossary }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string>("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const entries = useMemo(() => {
    return Object.entries(glossary).sort((a, b) => a[1].term.localeCompare(b[1].term));
  }, [glossary]);

  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    entries.forEach(([, item]) => {
      letters.add(item.term[0].toUpperCase());
    });
    return Array.from(letters).sort();
  }, [entries]);

  const filteredEntries = useMemo(() => {
    return entries.filter(([id, item]) => {
      const matchesSearch =
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDef.toLowerCase().includes(searchQuery.toLowerCase()) ||
        id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLetter =
        selectedLetter === "ALL" || item.term[0].toUpperCase() === selectedLetter;

      return matchesSearch && matchesLetter;
    });
  }, [entries, searchQuery, selectedLetter]);

  const handleCopyLink = (id: string) => {
    const url = `${window.location.origin}/glossary#${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Search Input & Alphabet Filter */}
      <div className="space-y-4 bg-surface p-6 rounded-lg border border-ink-200 shadow-xs">
        <div className="relative max-w-xl">
          <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by term or concept (e.g. Inflation, CIBIL, EMI)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-md border border-ink-300 bg-canvas text-ink-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </div>

        {/* Alphabet Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2">
          <button
            type="button"
            onClick={() => setSelectedLetter("ALL")}
            className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
              selectedLetter === "ALL"
                ? "bg-brand text-surface"
                : "bg-ink-100 text-ink-700 hover:bg-ink-200"
            }`}
          >
            All Terms ({entries.length})
          </button>

          {availableLetters.map((letter) => (
            <button
              key={letter}
              type="button"
              onClick={() => setSelectedLetter(letter)}
              className={`w-7 h-7 rounded text-xs font-bold transition-colors flex items-center justify-center ${
                selectedLetter === letter
                  ? "bg-brand text-surface"
                  : "bg-ink-100 text-ink-700 hover:bg-ink-200"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Items List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-ink-500 font-medium px-1">
          <span>Showing {filteredEntries.length} definitions</span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-brand hover:underline font-semibold"
            >
              Clear search
            </button>
          )}
        </div>

        {filteredEntries.length === 0 ? (
          <div className="bg-surface border border-ink-200 rounded-lg p-12 text-center">
            <Compass className="w-8 h-8 text-ink-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-ink-800">No definitions found.</p>
            <p className="text-xs text-ink-500 mt-1">
              Try searching for a different keyword or resetting your filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEntries.map(([id, item]) => (
              <div
                key={id}
                id={id}
                className="bg-surface border border-ink-200 rounded-lg p-5 flex flex-col justify-between scroll-mt-24 hover:border-brand transition-all hover:shadow-xs group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base font-bold text-ink-900 group-hover:text-brand transition-colors">
                      {item.term}
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleCopyLink(id)}
                      className="text-ink-400 hover:text-ink-700 p-1 rounded"
                      title="Copy link to this definition"
                    >
                      {copiedId === id ? (
                        <Check className="w-3.5 h-3.5 text-brand" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-ink-700 leading-relaxed mb-4">
                    {item.shortDef}
                  </p>
                </div>

                <div className="bg-canvas border border-ink-200/80 rounded-md p-3 text-xs">
                  <span className="block font-semibold text-[10px] text-brand uppercase tracking-wider mb-0.5">
                    Everyday Example
                  </span>
                  <p className="text-ink-600 italic">
                    &quot;{item.example}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GlossaryClient;
