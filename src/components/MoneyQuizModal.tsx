"use client";

import React, { useState } from "react";
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-xs">
          <div className="bg-surface w-full max-w-lg rounded-xl border border-ink-200 shadow-2xl p-6 sm:p-8 relative">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-ink-400 hover:text-ink-800 p-1"
              aria-label="Close Quiz"
            >
              <X className="w-5 h-5" />
            </button>

            {!isFinished ? (
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-semibold text-brand tracking-wider uppercase">
                    Money IQ Assessment
                  </span>
                  <span className="text-xs text-ink-500 font-medium">
                    Question {currentStep + 1} of {totalQuestions}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-ink-100 rounded-full mb-6 overflow-hidden">
                  <div
                    className="h-full bg-brand transition-all duration-200"
                    style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
                  />
                </div>

                <h3 className="text-lg font-bold text-ink-900 mb-5 leading-snug">
                  {currentQ.question}
                </h3>

                <div className="space-y-2.5 mb-6">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedAnswers[currentStep] === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectOption(currentStep, idx)}
                        className={`w-full text-left p-3.5 rounded-lg border text-sm font-medium transition-all ${
                          isSelected
                            ? "bg-brand-subtle border-brand text-brand-dark ring-1 ring-brand"
                            : "bg-surface border-ink-200 text-ink-800 hover:border-ink-400 hover:bg-ink-50"
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 ${
                            isSelected ? "bg-brand text-surface" : "bg-ink-100 text-ink-600"
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{option.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-ink-100">
                  <button
                    type="button"
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="px-3 py-1.5 rounded-md text-xs font-medium text-ink-600 hover:text-ink-900 disabled:opacity-30 disabled:pointer-events-none"
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
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-brand text-surface text-xs font-bold hover:bg-brand-dark transition-colors disabled:opacity-40 disabled:pointer-events-none"
                  >
                    {currentStep === totalQuestions - 1 ? "See Results" : "Next Question"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-2">
                <div className="w-12 h-12 bg-brand-subtle text-brand border border-brand-border rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-ink-900 mb-1">
                  Your Score: {score} / {totalQuestions}
                </h3>
                <p className="text-sm text-ink-600 mb-6">
                  {score === 5
                    ? "Exceptional! You have rock-solid foundational instincts."
                    : score >= 3
                    ? "Good foundation! A few critical traps need tightening."
                    : "Great time to start! You are in the right place to build confidence."}
                </p>

                <div className="bg-canvas border border-ink-200 rounded-lg p-5 text-left mb-6">
                  <p className="text-xs font-semibold text-brand uppercase tracking-wider mb-1">
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
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md bg-brand text-surface text-sm font-semibold hover:bg-brand-dark transition-colors"
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
