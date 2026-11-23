import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import tracksData from "@/../content/data/tracks.json";
import { getArticlesByTrack, getAllTracks } from "@/lib/mdx";
import { TrackProgressBar } from "@/components/TrackProgressBar";

interface Props {
  params: Promise<{ track: string }>;
}

export async function generateStaticParams() {
  const tracks = getAllTracks();
  return tracks.map((track) => ({ track }));
}

export async function generateMetadata({ params }: Props) {
  const { track: trackSlug } = await params;
  const track = tracksData.find((t) => t.slug === trackSlug);
  if (!track) return { title: "Track Not Found" };

  return {
    title: `${track.title} | PaisaKit`,
    description: track.shortDescription,
  };
}

export default async function TrackPage({ params }: Props) {
  const { track: trackSlug } = await params;
  const track = tracksData.find((t) => t.slug === trackSlug);
  if (!track) notFound();

  const articles = getArticlesByTrack(trackSlug);

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Back Link */}
      <Link
        href="/learn"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-600 hover:text-brand transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to All Tracks
      </Link>

      {/* Track Header Card */}
      <div className="bg-surface border border-ink-200 rounded-lg p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-brand uppercase tracking-wider bg-brand-subtle border border-brand-border px-2.5 py-1 rounded">
            {track.level}
          </span>
          <span className="text-xs text-ink-500 font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {track.estimatedTime}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">
          {track.title}
        </h1>

        <p className="text-sm sm:text-base text-ink-700 leading-relaxed max-w-2xl">
          {track.shortDescription}
        </p>

        {/* Client progress indicator */}
        <div className="pt-4 border-t border-ink-100">
          <TrackProgressBar
            totalLessons={articles.length}
            articleSlugs={articles.map((a) => a.frontmatter.slug)}
          />
        </div>
      </div>

      {/* Sequential Lessons List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-ink-900">
          Track Curriculum ({articles.length} Lessons)
        </h2>

        <div className="space-y-4">
          {articles.map((art, index) => (
            <article
              key={art.frontmatter.slug}
              className="group bg-surface border border-ink-200 rounded-lg p-5 sm:p-6 hover:border-brand transition-all hover:shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-md bg-ink-100 group-hover:bg-brand group-hover:text-surface text-ink-800 font-mono text-sm font-bold flex items-center justify-center shrink-0 transition-colors">
                    {index + 1}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-brand uppercase tracking-wider">
                      Lesson {index + 1} • {art.frontmatter.difficulty}
                    </span>
                    <h3 className="text-lg font-bold text-ink-900 group-hover:text-brand transition-colors">
                      <Link href={`/learn/${trackSlug}/${art.frontmatter.slug}`}>
                        {art.frontmatter.title}
                      </Link>
                    </h3>

                    {art.frontmatter.keyTakeaways.length > 0 && (
                      <p className="text-xs text-ink-600 line-clamp-2 pt-1 leading-relaxed">
                        {art.frontmatter.keyTakeaways[0]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-ink-100">
                  <span className="text-xs text-ink-500 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {art.frontmatter.readTime}
                  </span>

                  <Link
                    href={`/learn/${trackSlug}/${art.frontmatter.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-ink-900 text-surface text-xs font-bold group-hover:bg-brand transition-colors"
                  >
                    Start Lesson <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
