import Parser from "rss-parser";

export interface FeedItem {
  id: string;
  title: string;
  link: string;
  source: string;
  pubDate: string;
  snippet: string;
  category: "Personal Finance" | "Economy" | "Banking" | "Policy";
}

const parser = new Parser({
  timeout: 6000,
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  },
});

const RSS_FEEDS = [
  {
    url: "https://finshots.in/archive/rss/",
    source: "Finshots Daily",
    category: "Personal Finance" as const,
  },
  {
    url: "https://www.livemint.com/rss/money",
    source: "LiveMint Personal Finance",
    category: "Personal Finance" as const,
  },
  {
    url: "https://www.business-standard.com/rss/finance-103.rss",
    source: "Business Standard",
    category: "Economy" as const,
  },
];

const FALLBACK_NEWS: FeedItem[] = [
  {
    id: "fb-1",
    title: "RBI keeps benchmark Repo Rate unchanged at 6.50% to balance growth and inflation",
    link: "https://rbi.org.in",
    source: "RBI Policy Desk",
    pubDate: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
    snippet: "The Monetary Policy Committee decided unanimously to hold rates, maintaining stability for existing home loan and personal loan floating rate EMIs.",
    category: "Policy",
  },
  {
    id: "fb-2",
    title: "NPCI introduces new UPI transaction limits for hospital and educational payments",
    link: "https://www.npci.org.in",
    source: "NPCI Updates",
    pubDate: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
    snippet: "Per-transaction caps for authorized hospitals and verified higher education institutions have been increased to ₹5 Lakh to simplify digital medical admissions.",
    category: "Banking",
  },
  {
    id: "fb-3",
    title: "Mutual Fund Industry SIP inflows breach record monthly marks among young earners",
    link: "https://www.amfiindia.com",
    source: "AMFI Monthly Bulletin",
    pubDate: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
    snippet: "Systematic Investment Plan contributions show steady compounding participation from tier-2 and tier-3 cities, driven by low-cost index funds.",
    category: "Personal Finance",
  },
  {
    id: "fb-4",
    title: "Income Tax Department upgrades AIS portal with real-time interest notification alerts",
    link: "https://incometax.gov.in",
    source: "Central Board of Direct Taxes",
    pubDate: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
    snippet: "Taxpayers can now view automated interest reporting from scheduled commercial banks prior to filing annual tax returns.",
    category: "Policy",
  },
  {
    id: "fb-5",
    title: "Why small finance banks offer 8%+ on fixed deposits and what depositors must verify",
    link: "https://rbi.org.in",
    source: "Banking Insights",
    pubDate: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
    snippet: "Higher rates help newer banks build retail deposit books. Depositors should verify DICGC insurance limits up to ₹5 Lakh per institution.",
    category: "Banking",
  },
  {
    id: "fb-6",
    title: "India's headline CPI inflation stabilizes within central bank target band",
    link: "https://mospi.gov.in",
    source: "Macroeconomic Digest",
    pubDate: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
    snippet: "Food price moderation and fuel supply balance keep retail consumer inflation steady, improving real purchasing power for salaried households.",
    category: "Economy",
  },
];

export async function fetchFinanceFeeds(): Promise<FeedItem[]> {
  const items: FeedItem[] = [];

  for (const feed of RSS_FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url);
      if (parsed.items && parsed.items.length > 0) {
        for (const rawItem of parsed.items.slice(0, 5)) {
          if (!rawItem.title) continue;

          // Clean HTML from snippet
          const rawSnippet = rawItem.contentSnippet || rawItem.content || rawItem.summary || "";
          const cleanSnippet = rawSnippet.replace(/<[^>]*>?/gm, "").slice(0, 180) + "...";

          items.push({
            id: rawItem.guid || rawItem.link || `${feed.source}-${Math.random()}`,
            title: rawItem.title.trim(),
            link: rawItem.link || "#",
            source: feed.source,
            pubDate: rawItem.pubDate
              ? new Date(rawItem.pubDate).toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
            snippet: cleanSnippet.trim(),
            category: feed.category,
          });
        }
      }
    } catch {
      // Graceful fallback on network/timeout error
    }
  }

  // If live feeds yielded items, return combined with fallback if count is low
  if (items.length >= 4) {
    return items;
  }

  return [...items, ...FALLBACK_NEWS];
}
