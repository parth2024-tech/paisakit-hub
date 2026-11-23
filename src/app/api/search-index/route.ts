import { NextResponse } from "next/server";
import { getAllArticles } from "@/lib/mdx";
import glossaryData from "@/../content/data/glossary.json";
import tipsData from "@/../content/data/daily-tips.json";

export async function GET() {
  const articles = getAllArticles().map((a) => ({
    id: `art-${a.frontmatter.slug}`,
    type: "Article" as const,
    title: a.frontmatter.title,
    description: a.frontmatter.keyTakeaways[0] || a.frontmatter.title,
    url: `/learn/${a.trackSlug}/${a.frontmatter.slug}`,
    category: a.trackSlug,
  }));

  const terms = Object.entries(glossaryData).map(([id, item]) => ({
    id: `term-${id}`,
    type: "Glossary" as const,
    title: item.term,
    description: item.shortDef,
    url: `/glossary#${id}`,
    category: "Term",
  }));

  const tips = (tipsData as Array<{ id: number; title: string; snippet: string; tag: string }>).map((t) => ({
    id: `tip-${t.id}`,
    type: "Daily Tip" as const,
    title: t.title,
    description: t.snippet,
    url: `/#daily-tip`,
    category: t.tag,
  }));

  return NextResponse.json({
    items: [...articles, ...terms, ...tips],
  });
}
