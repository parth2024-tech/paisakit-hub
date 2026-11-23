"use client";

import React, { useState, useEffect } from "react";
import { HelpCircle, ArrowRight, RotateCcw, X, Award } from "lucide-react";
import Link from "next/link";

interface Question {
  id: number;
  question: string;
  options: { label: string; isCorrect: boolean }[];
  explanation: string;
  recommendedTrack: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "When someone says they are sending you money on Google Pay or PhonePe, when do you enter your UPI PIN?",
    options: [
      { label: "Every time, to authenticate receipt of cash", isCorrect: false },
      { label: "Only if the amount is above ₹2,000", isCorrect: false },
      { label: "Never. UPI PIN is only needed to send money out", isCorrect: true },
      { label: "Only after scanning the buyer's QR code", isCorrect: false },
    ],
    explanation: "Entering your UPI PIN always debits your account. Receiving money never requires a PIN.",
    recommendedTrack: "banking-and-upi",
  },
  {
    id: 2,
    question: "If your employer offers a CTC of ₹10 Lakh per year, will your monthly in-hand bank credit equal ₹83,333?",
    options: [
      { label: "Yes, CTC is divided evenly across 12 calendar months", isCorrect: false },
      { label: "No, deductions like Employee PF, gratuity, and taxes reduce in-hand pay", isCorrect: true },
      { label: "Yes, unless you have voluntary insurance opt-outs", isCorrect: false },
      { label: "No, employers only pay 50% in cash and 50% in company stock", isCorrect: false },
    ],
    explanation: "CTC includes company overheads, retiral benefits, and taxes. In-hand is usually 70% to 85% of CTC.",
    recommendedTrack: "taxes-and-first-income",
  },
  {
    id: 3,
    question: "What happens if you pay only the 'Minimum Amount Due' on your credit card bill every month?",
    options: [
      { label: "Your debt is paid interest-free as a goodwill perk", isCorrect: false },
      { label: "The bank levies ~42% compounding annual interest on the remaining balance", isCorrect: true },
      { label: "Your CIBIL score automatically increases to 800", isCorrect: false },
      { label: "You get extra cashback reward points on the next bill", isCorrect: false },
    ],
    explanation: "Paying minimum due avoids late penalties but triggers 3.5%-4.0% monthly interest on the remainder.",
    recommendedTrack: "credit-and-debt",
  },
  {
    id: 4,
    question: "Why does keeping ₹1 Lakh in a regular savings account at 3% interest cause you to lose money over time?",
    options: [
      { label: "Because the bank charges hidden maintenance fees every day", isCorrect: false },
      { label: "Because inflation at ~5.5% outpaces the 3% interest, eroding purchasing power", isCorrect: true },
      { label: "Because savings accounts are subject to 50% mandatory capital tax", isCorrect: false },
      { label: "Because the government freezes accounts after 12 months of inactivity", isCorrect: false },
    ],
    explanation: "Real return = Interest (3%) - Inflation (5.5%) = -2.5% loss in buying power every year.",
    recommendedTrack: "investing-basics",
  },
  {
    id: 5,
    question: "Between an Active Mutual Fund (1.8% expense ratio) and an Index Fund (0.15% expense ratio), what does evidence show?",
    options: [
      { label: "Active fund managers always beat index funds by double digits", isCorrect: false },
      { label: "Over 80% of active large-cap managers fail to beat the Nifty 50 benchmark after fees", isCorrect: true },
      { label: "Index funds are illegal for retail investors in India", isCorrect: false },
      { label: "Active funds never charge any fees unless you make profit", isCorrect: false },
    ],
    explanation: "According to SPIVA reports, low-cost index funds outperform the vast majority of active funds over 5+ years.",
    recommendedTrack: "investing-basics",
  },
];

const TRACK_NAMES: Record<string, string> = {
  "banking-and-upi": "Track 1: Banking & UPI",
  "taxes-and-first-income": "Track 2: First Paycheck & Taxes",
  "credit-and-debt": "Track 3: Credit & Scams",
  "investing-basics": "Track 4: Investing 101",
};

export function MoneyQuizModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setIsFinished(false);
  };

  const handleSelectOption = (qIndex: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const currentQ = QUIZ_QUESTIONS[currentStep];
  const totalQuestions = QUIZ_QUESTIONS.length;

  // Calculate score and track recommendation
  const score = Object.entries(selectedAnswers).reduce((acc, [qIdx, optIdx]) => {
    const q = QUIZ_QUESTIONS[Number(qIdx)];
    if (q && q.options[optIdx]?.isCorrect) {
      return acc + 1;
    }
    return acc;
  }, 0);

  // Find track with first mistake or lowest familiarity
  const recommendedSlug = (() => {
    for (let i = 0; i < totalQuestions; i++) {
      const selected = selectedAnswers[i];
      if (selected === undefined || !QUIZ_QUESTIONS[i].options[selected]?.isCorrect) {
        return QUIZ_QUESTIONS[i].recommendedTrack;
      }
    }
    return "investing-basics";
  })();

  return (
    <>
      <button
        type="button"
        onClick={() => {
          resetQuiz();
          setIsOpen(true);
        }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-ink-900 text-surface text-sm font-semibold hover:bg-ink-800 transition-colors shadow-sm"
      >
        <HelpCircle className="w-4 h-4 text-brand-light" />
        Test Your Money IQ (2 Mins)
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink-900/70 backdrop-blur-xs overflow-y-auto"
          onClick={() => setIsOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quiz-question-title"
            onClick={(e) => e.stopPropagation()}
            className="bg-surface w-full max-w-lg max-h-[92dvh] sm:max-h-[88dvh] rounded-2xl border border-ink-200 shadow-2xl flex flex-col relative overflow-hidden my-auto animate-in zoom-in-95 fade-in duration-150"
          >
            {!isFinished ? (
              <>
                {/* Fixed Sticky Header: Never scrolls away, ensuring question is always 100% visible */}
                <div className="shrink-0 bg-surface px-5 pt-4 pb-3 sm:px-6 sm:pt-5 border-b border-ink-100">
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-brand uppercase tracking-wider px-2 py-0.5 rounded bg-brand-subtle border border-brand-border">
                        Money IQ
                      </span>
                      <span className="text-xs text-ink-500 font-semibold">
                        Question {currentStep + 1} of {totalQuestions}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="p-1.5 text-ink-400 hover:text-ink-800 hover:bg-ink-100 rounded-md transition-colors"
                      aria-label="Close Quiz"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-ink-100 rounded-full mb-3 overflow-hidden">
                    <div
                      className="h-full bg-brand transition-all duration-200 rounded-full"
                      style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
                    />
                  </div>

                  {/* Question Title Permanently Pinned in Header */}
                  <h3
                    id="quiz-question-title"
                    className="text-sm sm:text-base md:text-lg font-bold text-ink-900 leading-snug"
                  >
                    {currentQ.question}
                  </h3>
                </div>

                {/* Scrollable Options List */}
                <div className="flex-1 overflow-y-auto px-5 py-3.5 sm:px-6 sm:py-4 space-y-2.5">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedAnswers[currentStep] === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectOption(currentStep, idx)}
                        className={`w-full text-left p-3 sm:p-3.5 rounded-lg border text-xs sm:text-sm font-medium transition-all ${
                          isSelected
                            ? "bg-brand-subtle border-brand text-brand-dark ring-1 ring-brand"
                            : "bg-surface border-ink-200 text-ink-800 hover:border-ink-400 hover:bg-ink-50"
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold ${
                              isSelected ? "bg-brand text-surface" : "bg-ink-100 text-ink-600"
                            }`}
                          >
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="leading-snug">{option.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Sticky Action Footer */}
                <div className="shrink-0 px-5 py-3 sm:px-6 sm:py-3.5 bg-canvas border-t border-ink-100 flex items-center justify-between">
                  <button
                    type="button"
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="px-3 py-1.5 rounded-md text-xs font-semibold text-ink-600 hover:text-ink-900 hover:bg-ink-100 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    disabled={selectedAnswers[currentStep] === undefined}
                    onClick={() => {
                      if (currentStep < totalQuestions - 1) {
                        setCurrentStep((prev) => prev + 1);
                      } else {
                        setIsFinished(true);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-brand text-surface text-xs font-bold hover:bg-brand-dark transition-colors disabled:opacity-40 disabled:pointer-events-none shadow-xs"
                  >
                    {currentStep === totalQuestions - 1 ? "See Results" : "Next Question"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 text-center relative">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-ink-400 hover:text-ink-800 hover:bg-ink-100 p-1.5 rounded-md transition-colors"
                  aria-label="Close Quiz"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="w-12 h-12 bg-brand-subtle text-brand border border-brand-border rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-ink-900 mb-1">
                  Your Score: {score} / {totalQuestions}
                </h3>
                <p className="text-xs sm:text-sm text-ink-600 mb-6">
                  {score === 5
                    ? "Exceptional! You have rock-solid foundational instincts."
                    : score >= 3
                    ? "Good foundation! A few critical traps need tightening."
                    : "Great time to start! You are in the right place to build confidence."}
                </p>

                <div className="bg-canvas border border-ink-200 rounded-lg p-5 text-left mb-6">
                  <p className="text-[10px] font-bold text-brand uppercase tracking-wider mb-1">
                    Recommended Starting Track
                  </p>
                  <p className="text-base font-bold text-ink-900 mb-2">
                    {TRACK_NAMES[recommendedSlug]}
                  </p>
                  <p className="text-xs text-ink-600 leading-relaxed mb-4">
                    Based on your responses, starting with this track will plug your most dangerous financial blind spots immediately.
                  </p>

                  <Link
                    href={`/learn/${recommendedSlug}`}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md bg-brand text-surface text-xs sm:text-sm font-semibold hover:bg-brand-dark transition-colors"
                  >
                    Start {TRACK_NAMES[recommendedSlug]} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-1.5 text-xs text-ink-600 hover:text-ink-900 font-medium"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MoneyQuizModal;
