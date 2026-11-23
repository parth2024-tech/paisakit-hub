import React from "react";
import Link from "next/link";
import { Shield, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-ink-900 text-surface border-t border-ink-800 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-brand text-surface flex items-center justify-center font-bold text-sm">
                ₹
              </div>
              <span className="font-bold text-surface text-lg tracking-tight">PaisaKit</span>
            </div>
            <p className="text-xs text-ink-400 leading-relaxed">
              A zero-jargon finance knowledge base engineered for young adults starting their financial journey from zero.
            </p>
            <div className="pt-2 text-xs text-ink-400 flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-light" />
              <span>Independent & Ad-Free</span>
            </div>
          </div>

          {/* Quick Learning Tracks */}
          <div>
            <h4 className="text-xs font-semibold text-ink-300 uppercase tracking-wider mb-3">
              Learning Tracks
            </h4>
            <ul className="space-y-2 text-xs text-ink-400">
              <li>
                <Link href="/learn/banking-and-upi" className="hover:text-surface transition-colors">
                  Track 1: Banking & UPI
                </Link>
              </li>
              <li>
                <Link href="/learn/taxes-and-first-income" className="hover:text-surface transition-colors">
                  Track 2: First Paycheck & Taxes
                </Link>
              </li>
              <li>
                <Link href="/learn/credit-and-debt" className="hover:text-surface transition-colors">
                  Track 3: Credit & Scams
                </Link>
              </li>
              <li>
                <Link href="/learn/investing-basics" className="hover:text-surface transition-colors">
                  Track 4: Investing 101
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Resources */}
          <div>
            <h4 className="text-xs font-semibold text-ink-300 uppercase tracking-wider mb-3">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-ink-400">
              <li>
                <Link href="/updates" className="hover:text-surface transition-colors">
                  Daily News Feed (RSS)
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="hover:text-surface transition-colors">
                  Hover-to-Define Glossary
                </Link>
              </li>
              <li>
                <a
                  href="https://www.sebi.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-surface transition-colors"
                >
                  SEBI Investor Portal <ExternalLink className="w-3 h-3 text-ink-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://rbi.org.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-surface transition-colors"
                >
                  RBI Financial Education <ExternalLink className="w-3 h-3 text-ink-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div>
            <h4 className="text-xs font-semibold text-ink-300 uppercase tracking-wider mb-3">
              Governance & Policies
            </h4>
            <ul className="space-y-2 text-xs text-ink-400">
              <li>
                <Link href="/privacy" className="hover:text-surface transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-surface transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
            <div className="mt-4 p-3 rounded bg-ink-800/80 border border-ink-700/60 text-[11px] text-ink-400 leading-normal">
              Educational portal only. Not registered investment advice or financial advisory.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-500">
          <p>© {new Date().getFullYear()} PaisaKit. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Verified strictly against RBI, SEBI, and CBDT official frameworks.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
