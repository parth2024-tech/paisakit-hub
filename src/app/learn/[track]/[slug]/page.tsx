import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowRight, Clock, Calendar, CheckCircle, ChevronRight, ShieldCheck } from "lucide-react";
import { getAllArticles, getArticleBySlug, getArticlesByTrack } from "@/lib/mdx";
import tracksData from "@/../content/data/tracks.json";
import { Term } from "@/components/JargonTooltip";
import { ReadProgressBar } from "@/components/ReadProgressBar";
import { ArticleCompletionButton } from "@/components/ArticleCompletionButton";

interface Props {
  params: Promise<{ track: string; slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((art) => ({
    track: art.trackSlug,
    slug: art.frontmatter.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { track: trackSlug, slug } = await params;
  const article = getArticleBySlug(trackSlug, slug);
  if (!article) return { title: "Lesson Not Found" };

  return {
    title: `${article.frontmatter.title} | PaisaKit`,
    description: article.frontmatter.keyTakeaways[0] || "Zero-jargon personal finance guide.",
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.keyTakeaways[0] || "Zero-jargon personal finance guide.",
      type: "article",
      publishedTime: article.frontmatter.publishedAt,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { track: trackSlug, slug } = await params;
  const article = getArticleBySlug(trackSlug, slug);
  if (!article) notFound();

  const trackInfo = tracksData.find((t) => t.slug === trackSlug);
  const trackArticles = getArticlesByTrack(trackSlug);
  const currentIndex = trackArticles.findIndex((a) => a.frontmatter.slug === slug);
  const prevArticle = currentIndex > 0 ? trackArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < trackArticles.length - 1 ? trackArticles[currentIndex + 1] : null;

  return (
    <div>
      {/* Top sticky scroll progress bar with completion toggle */}
      <ReadProgressBar slug={slug} title={article.frontmatter.title} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-16 space-y-8">
        {/* Breadcrumb Trail */}
        <nav className="flex items-center gap-1.5 text-xs text-ink-500 font-medium overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-ink-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-ink-400 shrink-0" />
          <Link href="/learn" className="hover:text-ink-900 transition-colors">
            Learn
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-ink-400 shrink-0" />
          <Link href={`/learn/${trackSlug}`} className="hover:text-ink-900 transition-colors">
            {trackInfo?.title || trackSlug}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-ink-400 shrink-0" />
          <span className="text-ink-900 font-semibold truncate">
            Lesson {article.frontmatter.order}
          </span>
        </nav>

        {/* Article Header */}
        <header className="space-y-4 border-b border-ink-200 pb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-brand bg-brand-subtle border border-brand-border px-2.5 py-1 rounded">
              {trackInfo?.title || "Track"}
            </span>
            {article.frontmatter.verifiedForFY && (
              <span className="font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand" />
                Updated for {article.frontmatter.verifiedForFY}
              </span>
            )}
            <span className="text-ink-500 bg-ink-100 px-2 py-0.5 rounded font-medium">
              {article.frontmatter.difficulty}
            </span>
            <span className="text-ink-500 flex items-center gap-1 font-medium ml-auto">
              <Clock className="w-3.5 h-3.5" />
              {article.frontmatter.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-ink-900 tracking-tight leading-tight">
            {article.frontmatter.title}
          </h1>

          <p className="text-xs text-ink-500 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Published: {article.frontmatter.publishedAt} • Peer reviewed for young earners
          </p>
        </header>

        {/* Key Takeaways Callout Card */}
        {article.frontmatter.keyTakeaways && article.frontmatter.keyTakeaways.length > 0 && (
          <div className="bg-brand-subtle border border-brand-border rounded-lg p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-full bg-brand text-surface flex items-center justify-center shrink-0">
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-sm font-bold text-brand-dark uppercase tracking-wider">
                Key Takeaways in 30 Seconds
              </h2>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm text-ink-800">
              {article.frontmatter.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-brand font-bold shrink-0 mt-0.5">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Longform MDX Article Content */}
        <article className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-ink-900 prose-p:text-ink-800 prose-p:leading-relaxed prose-li:text-ink-800 prose-strong:text-ink-900 prose-table:text-xs sm:prose-table:text-sm">
          <MDXRemote
            source={article.content}
            components={{
              Term,
            }}
          />
        </article>

        {/* Mark Lesson Complete Action Bar */}
        <div className="pt-8 border-t border-ink-200">
          <div className="bg-surface border border-ink-200 rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-ink-900">Finished this lesson?</p>
              <p className="text-xs text-ink-500">
                Mark it as complete to update your learning track progress bar.
              </p>
            </div>

            <ArticleCompletionButton slug={slug} />
          </div>
        </div>

        {/* Next / Previous Lesson Navigation */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevArticle ? (
            <Link
              href={`/learn/${trackSlug}/${prevArticle.frontmatter.slug}`}
              className="p-4 rounded-lg border border-ink-200 bg-surface hover:border-brand transition-all flex flex-col justify-between group"
            >
              <span className="text-[11px] font-semibold text-ink-500 uppercase tracking-wider flex items-center gap-1 group-hover:text-brand">
                <ArrowLeft className="w-3.5 h-3.5" /> Previous Lesson
              </span>
              <span className="text-sm font-bold text-ink-900 group-hover:text-brand transition-colors mt-1">
                {prevArticle.frontmatter.title}
              </span>
            </Link>
          ) : (
            <div className="p-4 rounded-lg border border-ink-100 bg-canvas text-xs text-ink-400 flex items-center">
              Beginning of Track
            </div>
          )}

          {nextArticle ? (
            <Link
              href={`/learn/${trackSlug}/${nextArticle.frontmatter.slug}`}
              className="p-4 rounded-lg border border-ink-200 bg-surface hover:border-brand transition-all flex flex-col justify-between text-right group"
            >
              <span className="text-[11px] font-semibold text-ink-500 uppercase tracking-wider flex items-center justify-end gap-1 group-hover:text-brand">
                Next Lesson <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span className="text-sm font-bold text-ink-900 group-hover:text-brand transition-colors mt-1">
                {nextArticle.frontmatter.title}
              </span>
            </Link>
          ) : (
            <Link
              href={`/learn/${trackSlug}`}
              className="p-4 rounded-lg border border-brand bg-brand-subtle transition-all flex flex-col justify-between text-right group"
            >
              <span className="text-[11px] font-semibold text-brand uppercase tracking-wider flex items-center justify-end gap-1">
                Track Completed! <CheckCircle className="w-3.5 h-3.5" />
              </span>
              <span className="text-sm font-bold text-brand-dark mt-1">
                Review Track Curriculum
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
