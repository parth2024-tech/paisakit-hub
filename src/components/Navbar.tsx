"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Newspaper, Compass, Menu, X } from "lucide-react";
import { SavedDrawer } from "./SavedDrawer";
import { MoneyQuizModal } from "./MoneyQuizModal";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/updates", label: "Daily Updates", icon: Newspaper },
  { href: "/glossary", label: "Glossary", icon: Compass },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-surface/95 backdrop-blur-sm border-b border-ink-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group focus:outline-none">
          <div className="w-8 h-8 rounded-lg bg-ink-900 text-brand-light flex items-center justify-center font-bold text-base shadow-sm group-hover:bg-brand transition-colors">
            ₹
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-ink-900 text-base tracking-tight leading-tight group-hover:text-brand transition-colors">
              PaisaKit
            </span>
            <span className="text-[10px] text-ink-500 font-medium uppercase tracking-wider">
              Zero-Jargon Finance
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-brand-dark bg-brand-subtle font-semibold"
                    : "text-ink-600 hover:text-ink-900 hover:bg-ink-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:block">
            <MoneyQuizModal />
          </div>
          <SavedDrawer />

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-md text-ink-700 hover:bg-ink-100 border border-ink-200"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-ink-200 px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-150">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-2.5 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-brand-subtle text-brand-dark font-semibold"
                    : "text-ink-700 hover:bg-ink-50"
                }`}
              >
                <span>{link.label}</span>
                {link.icon && <link.icon className="w-4 h-4 text-ink-400" />}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-ink-200">
            <MoneyQuizModal />
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
