import { NextResponse } from "next/server";
import { fetchFinanceFeeds } from "@/lib/rss";

export const revalidate = 10800; // Refresh every 3 hours

export async function GET() {
  try {
    const news = await fetchFinanceFeeds();
    return NextResponse.json({
      success: true,
      data: news,
      updatedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch feeds",
      },
      { status: 500 }
    );
  }
}
