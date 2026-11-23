import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://paisakit.vercel.app"),
  title: {
    default: "PaisaKit — Zero-Jargon Personal Finance Knowledge Hub",
    template: "%s | PaisaKit",
  },
  description:
    "A zero-jargon personal finance learning platform built for young adults starting from scratch. Clear daily habits, sequential learning tracks, and hover-to-define financial terms.",
  keywords: [
    "personal finance India",
    "zero jargon finance",
    "banking basics",
    "UPI safety rules",
    "first job CTC salary payslip",
    "CIBIL score improvement",
    "index fund investing for beginners",
    "money tips for young adults",
  ],
  authors: [{ name: "PaisaKit Editorial" }],
  creator: "PaisaKit",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "PaisaKit — Zero-Jargon Personal Finance Knowledge Hub",
    description:
      "A zero-jargon personal finance learning platform built for young adults starting from scratch. Clear daily habits, sequential learning tracks, and hover-to-define financial terms.",
    type: "website",
    locale: "en_IN",
    siteName: "PaisaKit",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-canvas text-ink-900 min-h-screen flex flex-col antialiased selection:bg-brand-border selection:text-brand-dark`}
      >
        <Navbar />
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
