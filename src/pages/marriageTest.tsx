// pages/marriage-survival-test.tsx
import MarriageSurvivalTest, { QuizData } from "@/components/MarriageSurvivalTest";

const quizData: QuizData = [
  {
    id: 1,
    section: "Personality",
    questionText: "We resolve disagreements by...",
    options: [
      { text: "Talking calmly", isCorrect: true },
      { text: "Shouting or stonewalling", isCorrect: false },
      { text: "Avoiding the topic", isCorrect: false },
    ],
  },
  {
    id: 2,
    section: "Relationship Exposure",
    questionText: "How often do you spend quality time together weekly?",
    options: [
      { text: "Several times a week", isCorrect: true },
      { text: "Once a week", isCorrect: false },
      { text: "Rarely", isCorrect: false },
    ],
  },
  {
    id: 3,
    section: "Adverse Childhood Experiences",
    questionText: "Do past family issues affect your reactions now?",
    options: [
      { text: "Yes, often", isCorrect: false },
      { text: "Sometimes", isCorrect: true },
      { text: "Not really", isCorrect: false },
    ],
  },
];

export default function Page() {
  return <MarriageSurvivalTest quizData={quizData} resultCtaHref="/courses" />;
}
