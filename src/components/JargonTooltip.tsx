"use client";

import React, { useState, useRef, useEffect } from "react";
import glossaryData from "@/../content/data/glossary.json";
import { HelpCircle, X, ExternalLink } from "lucide-react";
import Link from "next/link";

interface GlossaryItem {
  term: string;
  shortDef: string;
  example: string;
}

const glossary = glossaryData as Record<string, GlossaryItem>;

interface TermProps {
  id: string;
  children: React.ReactNode;
}

export function Term({ id, children }: TermProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const info = glossary[id.toLowerCase()];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!info) {
    return <span className="underline decoration-dotted decoration-brand font-medium">{children}</span>;
  }

  return (
    <span
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-help text-ink-900 font-medium decoration-brand underline decoration-dotted decoration-2 underline-offset-4 hover:text-brand transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1 rounded-sm"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        {children}
      </button>

      {isOpen && (
        <span
          role="dialog"
          aria-label={info.term}
          className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 sm:w-80 p-4 bg-ink-900 text-surface rounded-lg shadow-xl border border-ink-700 animate-in fade-in zoom-in-95 duration-150 text-left block"
        >
          <span className="flex items-center justify-between gap-2 border-b border-ink-800 pb-2 mb-2">
            <span className="flex items-center gap-1.5 font-semibold text-sm text-brand-light">
              <HelpCircle className="w-4 h-4 text-brand-light shrink-0" />
              {info.term}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="text-ink-400 hover:text-surface transition-colors p-0.5 rounded"
              aria-label="Close decoder"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>

          <span className="block text-xs text-ink-200 leading-relaxed mb-2.5">
            {info.shortDef}
          </span>

          <span className="block bg-ink-800/80 rounded p-2 text-xs border border-ink-700/60 mb-2">
            <span className="block font-medium text-[11px] text-brand-border uppercase tracking-wide mb-0.5">
              Everyday Example
            </span>
            <span className="block text-ink-300 italic text-[11px] leading-normal">
              &quot;{info.example}&quot;
            </span>
          </span>

          <span className="flex justify-end pt-1">
            <Link
              href={`/glossary#${id}`}
              className="inline-flex items-center gap-1 text-[11px] text-ink-300 hover:text-brand-light transition-colors"
            >
              View in full Glossary <ExternalLink className="w-3 h-3" />
            </Link>
          </span>
        </span>
      )}
    </span>
  );
}

export default Term;
