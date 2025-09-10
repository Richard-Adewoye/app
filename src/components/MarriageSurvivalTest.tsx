// components/MarriageSurvivalTest.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";

export interface Option {
  text: string;
  isCorrect?: boolean; // used for scoring if available
}

export interface Question {
  id: number;
  section: "Personality" | "Adverse Childhood Experiences" | "Relationship Exposure" | string;
  questionText: string;
  options: Option[];
}

export type QuizData = Question[];

interface MarriageSurvivalTestProps {
  quizData: QuizData;
  /**
   * CTA shown on results (optional)
   */
  resultCtaLabel?: string;
  resultCtaHref?: string;
  /**
   * Disclaimer text displayed on results screen (defaults to footer disclaimer)
   */
  disclaimerText?: string;
}

export default function MarriageSurvivalTest({
  quizData,
  resultCtaLabel = "Explore Resources",
  resultCtaHref = "/resources",
  disclaimerText = "THE CLIENT PORTAL IS NOT TO BE USED FOR EMERGENCY SITUATIONS. IF YOU OR OTHERS ARE IN IMMEDIATE DANGER OR EXPERIENCING A MEDICAL EMERGENCY, CALL 911 IMMEDIATELY.",
}: MarriageSurvivalTestProps) {
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // store index of chosen option for each question, -1 = unanswered
  const [answers, setAnswers] = useState<number[]>(
    () => new Array(quizData.length).fill(-1)
  );
  const [isAnswerLocked, setIsAnswerLocked] = useState(false); // prevents multiple clicks while animating
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);

  // safe guard
  if (!Array.isArray(quizData) || quizData.length === 0) {
    return <div className="p-6 text-center text-red-400">No quiz data provided.</div>;
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const progress = Math.round(((currentQuestionIndex) / quizData.length) * 100);

  const handleStart = () => {
    setStarted(true);
    // ensure initial state (no answers)
    setCurrentQuestionIndex(0);
    setAnswers(new Array(quizData.length).fill(-1));
    setQuizComplete(false);
    setShowFeedback(null);
    setIsAnswerLocked(false);
  };

  const handleSelect = (optionIndex: number) => {
    if (isAnswerLocked) return;
    setIsAnswerLocked(true);

    // record answer
    setAnswers((prev) => {
      const copy = [...prev];
      copy[currentQuestionIndex] = optionIndex;
      return copy;
    });

    // optional feedback
    const option = currentQuestion.options[optionIndex];
    if (option?.isCorrect) {
      setShowFeedback("Good choice.");
    } else {
      setShowFeedback("Thanks — noted.");
    }

    // briefly show feedback, then advance (or finish)
    setTimeout(() => {
      setShowFeedback(null);
      setIsAnswerLocked(false);
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex((i) => i + 1);
      } else {
        setQuizComplete(true);
      }
    }, 900); // short pause so feedback registers but flow is snappy
  };

  const score = answers.reduce((acc, chosenIdx, qi) => {
    if (chosenIdx < 0) return acc;
    const opt = quizData[qi].options[chosenIdx];
    return acc + (opt?.isCorrect ? 1 : 0);
  }, 0);

  // simple qualitative summary based on percent correct (if isCorrect flags exist)
  const percent = quizData.length > 0 ? Math.round((score / quizData.length) * 100) : 0;
  const qualitative =
    percent >= 80 ? "Strong relationship resilience"
      : percent >= 50 ? "Moderate relationship resilience"
      : "Consider professional guidance — there's room to grow";

  // keyboard handling: 1..n select shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!started || quizComplete) return;
    const key = e.key;
    const numeric = parseInt(key, 10);
    if (!isNaN(numeric) && numeric >= 1 && numeric <= currentQuestion.options.length) {
      handleSelect(numeric - 1);
    }
    // Enter to start
    if (!started && key === "Enter") handleStart();
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="min-h-screen flex items-center justify-center bg-[#F9F6F0] px-4 py-12"
      aria-live="polite"
    >
      <div className="w-full max-w-3xl">
        {/* Intro */}
        {!started && (
          <section className="bg-white rounded-2xl p-8 shadow-md text-center transition-shadow">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-3">
              Marriage Survival Test
            </h1>
            <p className="text-gray-600 mb-6">
              A short, private quiz to reflect on relationship strengths and challenges.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleStart}
                className="px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-900 transition"
                aria-label="Begin marriage survival test"
              >
                Begin
              </button>
              <Link href="/" className="px-6 py-3 rounded-lg bg-white border border-gray-200 text-gray-700">
                Back to site
              </Link>
            </div>
          </section>
        )}

        {/* Quiz content */}
        {started && !quizComplete && (
          <section className="bg-white rounded-2xl p-6 shadow-md">
            {/* progress bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Question {currentQuestionIndex + 1} of {quizData.length}</span>
                <span>{Math.round(((currentQuestionIndex) / quizData.length) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-black rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestionIndex) / quizData.length) * 100}%` }}
                  aria-hidden
                />
              </div>
            </div>

            {/* question block */}
            <div className="mb-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                {currentQuestion.questionText}
              </h2>
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">
                {currentQuestion.section}
              </p>
            </div>

            {/* options (role radiogroup for accessibility) */}
            <div
              role="radiogroup"
              aria-labelledby={`question-${currentQuestion.id}`}
              className="grid gap-3"
            >
              {currentQuestion.options.map((opt, oi) => {
                const chosen = answers[currentQuestionIndex] === oi;
                const isDisabled = isAnswerLocked;
                return (
                  <button
                    key={oi}
                    role="radio"
                    aria-checked={chosen}
                    aria-label={`${opt.text}${opt.isCorrect ? " (correct)" : ""}`}
                    tabIndex={0}
                    onClick={() => handleSelect(oi)}
                    disabled={isDisabled}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
                      ${chosen ? "bg-black text-white" : "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50"}
                      ${isDisabled ? "opacity-80 cursor-not-allowed" : ""}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="mr-2">{opt.text}</span>
                      <span className="text-xs text-gray-400">{/* placeholder for tiny meta */}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* inline feedback */}
            {showFeedback && (
              <p className="mt-3 text-sm text-gray-600" role="status">{showFeedback}</p>
            )}

            {/* simple keyboard hint */}
            <p className="mt-4 text-xs text-gray-400">Tip: press number keys (1–{currentQuestion.options.length}) to answer quickly.</p>
          </section>
        )}

        {/* RESULTS */}
        {quizComplete && (
          <section className="bg-white rounded-2xl p-8 shadow-md text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Results</h2>
            <p className="text-gray-600 mb-4">You scored {score} out of {quizData.length} ({percent}%)</p>
            <p className="text-gray-700 font-medium mb-6">{qualitative}</p>

            <div className="flex justify-center gap-4 mb-6">
              <Link href={resultCtaHref} className="px-5 py-3 rounded-lg bg-black text-white hover:bg-gray-900 transition">
                {resultCtaLabel}
              </Link>
              <button
                onClick={() => {
                  // restart
                  setStarted(false);
                  setAnswers(new Array(quizData.length).fill(-1));
                  setCurrentQuestionIndex(0);
                  setQuizComplete(false);
                  setShowFeedback(null);
                }}
                className="px-5 py-3 rounded-lg bg-white border border-gray-200 text-gray-700"
              >
                Restart
              </button>
            </div>

            <p className="text-xs text-gray-500 max-w-prose mx-auto">{disclaimerText}</p>
          </section>
        )}
      </div>
    </div>
  );
}
