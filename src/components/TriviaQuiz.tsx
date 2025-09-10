"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

interface TriviaQuizProps {
  quizData: Question[];
}

export default function TriviaQuiz({ quizData }: TriviaQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showRope, setShowRope] = useState(false); // 🚩 rope starts hidden

  const currentQuestion = quizData[currentQuestionIndex];

  const handleAnswer = (selected: string) => {
    if (isAnswerSelected) return;
    setIsAnswerSelected(true);

    if (selected === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
      setFeedbackMessage("✅ Correct!");
    } else {
      setFeedbackMessage(
        `❌ Incorrect! Correct answer: ${currentQuestion.correctAnswer}`
      );
    }

    // Rope fades in AFTER answer is clicked
    setShowRope(true);

    setTimeout(() => {
      if (currentQuestionIndex < quizData.length - 1) {
        // move to next question
        setCurrentQuestionIndex((prev) => prev + 1);
        setFeedbackMessage(null);
        setIsAnswerSelected(false);
        setShowRope(false); // rope hidden again until next answer
      } else {
        setQuizFinished(true);
      }
    }, 2000);
  };

  const alignments = ["items-start", "items-center", "items-end"];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white relative overflow-hidden px-4">
      <div
        className={`flex flex-col flex-grow justify-center ${alignments[currentQuestionIndex]} relative`}
      >
        <AnimatePresence mode="wait">
          {!quizFinished ? (
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 w-full max-w-md p-6 rounded-2xl backdrop-blur-lg bg-white/10 shadow-xl"
            >
              <h2 className="text-2xl font-semibold mb-4 text-center">
                {currentQuestion.questionText}
              </h2>
              <div className="grid gap-3">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    disabled={isAnswerSelected}
                    className={`px-4 py-2 rounded-lg border transition
                      ${
                        isAnswerSelected && option === currentQuestion.correctAnswer
                          ? "bg-green-600 text-white"
                          : isAnswerSelected
                          ? "bg-gray-700 text-gray-400"
                          : "bg-gray-800 hover:bg-gray-700"
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {feedbackMessage && (
                <p className="mt-4 text-sm">{feedbackMessage}</p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 text-center"
            >
              <h2 className="text-2xl font-bold">Quiz Finished!</h2>
              <p className="text-lg">
                Your score: {score} / {quizData.length}
              </p>
              <p>
                {score === quizData.length
                  ? "Perfect! You aced it."
                  : score > quizData.length / 2
                  ? "Nice work, you did well!"
                  : "Keep practicing, you’ll get it!"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rope appears AFTER answer, points to next */}
        <AnimatePresence>
          {showRope && !quizFinished && currentQuestionIndex < quizData.length - 1 && (
            <motion.svg
              key={`rope-${currentQuestionIndex}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute bottom-1/4 left-1/2 w-[400px] h-[200px] -translate-x-1/2 pointer-events-none"
              viewBox="0 0 400 200"
              fill="none"
            >
              <motion.path
                d={
                  currentQuestionIndex === 0
                    ? "M20 30 C 100 180, 200 20, 380 160"
                    : currentQuestionIndex === 1
                    ? "M20 160 C 150 20, 250 180, 380 40"
                    : "M20 80 C 120 160, 280 40, 380 120"
                }
                stroke="url(#glow)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="glow" x1="0" y1="0" x2="400" y2="0">
                  <stop offset="0%" stopColor="#00f0ff" />
                  <stop offset="100%" stopColor="#0088ff" />
                </linearGradient>
              </defs>
            </motion.svg>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
