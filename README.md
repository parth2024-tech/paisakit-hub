# PaisaKit — Zero-Jargon Personal Finance Knowledge Hub

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.7-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

A high-contrast, zero-jargon personal finance learning platform built specifically for young adults starting from scratch. Instead of overwhelming readers with stock tickers or complex spreadsheets, PaisaKit focuses on clarity, daily habits, and bite-sized learning.

---

## Core Features

- **Daily 1-Minute Money Tip**: Rotating, high-impact tip card selected deterministically each day with next/shuffle, clipboard copy, and native WhatsApp sharing.
- **4 Sequential Learning Tracks**:
  - **Track 1: Banking & UPI** (Savings vs Current, UPI safety & fraud defense, Emergency funds).
  - **Track 2: First Paycheck & Taxes** (CTC vs in-hand breakdown, Old vs New tax regime, Form 16 & ITR).
  - **Track 3: Credit & Scams** (Debit vs Credit, CIBIL 750+ roadmap, "No-Cost" EMI math).
  - **Track 4: Investing 101** (Inflation, Index funds vs Active funds, Age 20 vs 30 compounding).
- **Hover-to-Define Jargon Decoder**: Interactive `<Term id="...">` popup component inside articles that shows 1-sentence plain-English definitions and everyday Indian examples.
- **Live "Stay Updated" News Feed**: Automated RSS news aggregator fetching from Finshots, LiveMint, and RBI updates with 3-hour ISR caching.
- **Searchable A–Z Glossary**: Interactive dictionary with instant search and alphabet filter pills.
- **"Test Your Money IQ" Quiz**: 5-question interactive assessment recommending which learning track to start with.
- **Local-First Progress & Bookmarks**: Browser `localStorage` tracking completed lessons and saved tips without mandatory signup.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js 15 (App Router, Server Components & RSC) |
| **Styling** | Tailwind CSS + `@tailwindcss/typography` |
| **Content Engine** | MDX (`next-mdx-remote`) + `gray-matter` |
| **News Ingestion** | `rss-parser` with Next.js ISR route handlers |
| **Icons** | `lucide-react` |
| **Persistence** | Browser `localStorage` (Local-first) |

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## Verification & Guardrails

Run project verification via the deterministic `Justfile`:
```bash
just verify
```
This runs:
- `gitleaks protect --staged` (zero secret leakage check)
- `sg scan` (AST structural linting)
- `ase-init --validate` (TypeScript type check & ESLint audit)

---

## License
MIT
