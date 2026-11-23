import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, ChevronRight } from "lucide-react";
import tracksData from "@/../content/data/tracks.json";
import { getArticlesByTrack } from "@/lib/mdx";
import { TrackCard } from "@/components/TrackCard";

export const metadata = {
  title: "Structured Learning Tracks | PaisaKit",
  description: "Curated sequential reading paths for young adults starting personal finance from scratch.",
};

export default function LearnOverviewPage() {
  const tracksWithArticles = tracksData.map((t) => {
    const articles = getArticlesByTrack(t.slug);
    return {
      ...t,
      articles,
      articleSlugs: articles.map((a) => a.frontmatter.slug),
    };
  });

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-ink-200 pb-6">
        <span className="text-xs font-bold text-brand uppercase tracking-wider">
          Curated Curriculum
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight mt-1 mb-2">
          Personal Finance Learning Tracks
        </h1>
        <p className="text-sm sm:text-base text-ink-600 max-w-2xl leading-relaxed">
          Four sequential, zero-jargon reading paths. Start from the basics of banking and taxes before venturing into credit cards and index fund investing.
        </p>
      </div>

      {/* Grid of Tracks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tracksWithArticles.map((track) => (
          <TrackCard
            key={track.slug}
            track={track}
            articleSlugs={track.articleSlugs}
          />
        ))}
      </div>

      {/* Track Lesson Deep Dives */}
      <div className="space-y-8 pt-6">
        <h2 className="text-xl font-bold text-ink-900 border-b border-ink-200 pb-3">
          All Lessons by Track
        </h2>

        <div className="space-y-8">
          {tracksWithArticles.map((track) => (
            <section
              key={track.slug}
              className="bg-surface border border-ink-200 rounded-lg p-6 sm:p-7 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-ink-100 pb-4">
                <div>
                  <span className="text-xs font-semibold text-brand uppercase tracking-wider">
                    {track.level}
                  </span>
                  <h3 className="text-xl font-bold text-ink-900">
                    <Link href={`/learn/${track.slug}`} className="hover:text-brand transition-colors">
                      {track.title}
                    </Link>
                  </h3>
                </div>

                <Link
                  href={`/learn/${track.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:text-brand-dark"
                >
                  View Track Details <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="divide-y divide-ink-100">
                {track.articles.map((art, idx) => (
                  <div
                    key={art.frontmatter.slug}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded bg-ink-100 text-ink-700 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                        {idx + 1}
                      </span>
                      <div>
                        <Link
                          href={`/learn/${track.slug}/${art.frontmatter.slug}`}
                          className="text-sm font-bold text-ink-900 group-hover:text-brand transition-colors"
                        >
                          {art.frontmatter.title}
                        </Link>
                        <p className="text-xs text-ink-500 mt-0.5 line-clamp-1">
                          {art.frontmatter.keyTakeaways[0] || "Foundational lesson"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 text-xs text-ink-500 pl-9 sm:pl-0">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {art.frontmatter.readTime}
                      </span>
                      <Link
                        href={`/learn/${track.slug}/${art.frontmatter.slug}`}
                        className="text-brand font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        Read <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
