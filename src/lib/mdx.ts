import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ARTICLES_PATH = path.join(process.cwd(), "content/articles");

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  track: string;
  order: number;
  readTime: string;
  difficulty: string;
  publishedAt: string;
  keyTakeaways: string[];
}

export interface ArticleData {
  frontmatter: ArticleFrontmatter;
  content: string;
  trackSlug: string;
  filePath: string;
}

export function getAllTracks(): string[] {
  if (!fs.existsSync(ARTICLES_PATH)) return [];
  const entries = fs.readdirSync(ARTICLES_PATH, { withFileTypes: true });
  return entries.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
}

export function getArticlesByTrack(track: string): ArticleData[] {
  const trackDir = path.join(ARTICLES_PATH, track);
  if (!fs.existsSync(trackDir)) return [];

  const files = fs.readdirSync(trackDir).filter((file) => file.endsWith(".mdx"));

  const articles = files.map((fileName) => {
    const fullPath = path.join(trackDir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const wordCount = content.split(/\s+/g).length;
    const computedReadTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    const frontmatter: ArticleFrontmatter = {
      title: data.title || "Untitled Article",
      slug: data.slug || fileName.replace(/\.mdx$/, ""),
      track: data.track || track,
      order: data.order ?? 99,
      readTime: data.readTime || computedReadTime,
      difficulty: data.difficulty || "Beginner",
      publishedAt: data.publishedAt || new Date().toISOString().split("T")[0],
      keyTakeaways: Array.isArray(data.keyTakeaways) ? data.keyTakeaways : [],
    };

    return {
      frontmatter,
      content,
      trackSlug: track,
      filePath: fullPath,
    };
  });

  return articles.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export function getAllArticles(): ArticleData[] {
  const tracks = getAllTracks();
  const allArticles: ArticleData[] = [];

  for (const track of tracks) {
    const trackArticles = getArticlesByTrack(track);
    allArticles.push(...trackArticles);
  }

  return allArticles;
}

export function getArticleBySlug(track: string, slug: string): ArticleData | null {
  const articles = getArticlesByTrack(track);
  const found = articles.find((article) => article.frontmatter.slug === slug);
  return found || null;
}
