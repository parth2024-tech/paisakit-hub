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
      className="relative inline"
      onMouseEnter={() => {
        // Only trigger hover on non-touch devices
        if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
          setIsOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
          setIsOpen(false);
        }
      }}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className="cursor-pointer text-ink-900 font-semibold decoration-brand underline decoration-dotted decoration-2 underline-offset-4 hover:text-brand transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1 rounded-xs inline"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        {children}
      </button>

      {isOpen && (
        <>
          {/* Desktop Hover Popover (Screen widths >= 640px) */}
          <div
            role="dialog"
            aria-label={info.term}
            className="hidden sm:block absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 sm:w-80 p-4 bg-ink-900 text-surface rounded-lg shadow-2xl border border-ink-700 animate-in fade-in zoom-in-95 duration-150 text-left cursor-default"
          >
            <div className="flex items-center justify-between gap-2 border-b border-ink-800 pb-2 mb-2">
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
            </div>

            <p className="text-xs text-ink-200 leading-relaxed mb-2.5">
              {info.shortDef}
            </p>

            <div className="bg-ink-800/90 rounded p-2 text-xs border border-ink-700/60 mb-2">
              <span className="block font-semibold text-[10px] text-brand-border uppercase tracking-wide mb-0.5">
                Everyday Example
              </span>
              <p className="text-ink-300 italic text-[11px] leading-normal">
                &quot;{info.example}&quot;
              </p>
            </div>

            <div className="flex justify-end pt-1">
              <Link
                href={`/glossary#${id}`}
                className="inline-flex items-center gap-1 text-[11px] text-ink-300 hover:text-brand-light transition-colors"
              >
                View in full Glossary <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Mobile Tap-to-Define Bottom Sheet (Screen widths < 640px) */}
          <div
            className="sm:hidden fixed inset-0 z-50 flex flex-col justify-end bg-ink-900/60 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="w-full bg-surface text-ink-900 rounded-t-2xl p-5 shadow-2xl border-t border-ink-200 animate-in slide-in-from-bottom duration-250"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag Handle Bar */}
              <div className="w-12 h-1.5 bg-ink-300 rounded-full mx-auto mb-4" />

              <div className="flex items-center justify-between gap-3 border-b border-ink-100 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-brand-subtle text-brand flex items-center justify-center font-bold">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-ink-900">{info.term}</h4>
                    <span className="text-[10px] font-semibold text-brand uppercase tracking-wider">
                      Plain-English Definition
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-ink-400 hover:text-ink-900 rounded-md bg-ink-100"
                  aria-label="Close decoder"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm text-ink-700 leading-relaxed mb-4">
                {info.shortDef}
              </p>

              <div className="bg-canvas border border-ink-200 rounded-lg p-3.5 mb-5">
                <span className="block font-bold text-xs text-brand uppercase tracking-wider mb-1">
                  Everyday Indian Example
                </span>
                <p className="text-xs text-ink-700 italic leading-relaxed">
                  &quot;{info.example}&quot;
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <Link
                  href={`/glossary#${id}`}
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-ink-600 hover:text-brand font-semibold inline-flex items-center gap-1"
                >
                  Open in A-Z Glossary <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 rounded-md bg-ink-900 text-surface text-xs font-bold"
                >
                  Got It
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </span>
  );
}

export default Term;
