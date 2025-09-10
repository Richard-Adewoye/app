// pages/index.tsx
import AboutPsychotherapistSection from "@/components/AboutPsychotherapySection";
import CallToActionSection from "@/components/CallToSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrolledNavbar from "@/components/ScrolledNavbar";
import ServicesAndPricingSection from "@/components/ServicesAndPricingSection";
import TriviaQuiz from "@/components/TriviaQuiz"; // 👈 import your quiz

export default function Home() {
  const quizData = [
    {
      questionText: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Rome"],
      correctAnswer: "Paris",
    },
    {
      questionText: "Which planet is known as the Red Planet?",
      options: ["Earth", "Venus", "Mars", "Jupiter"],
      correctAnswer: "Mars",
    },
    {
      questionText: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "George Orwell"],
      correctAnswer: "Harper Lee",
    },
  ];

  return (
    <div>
      <Header />
      <ScrolledNavbar
        logoSrc="/images/logo.png"
        name="Dr. Richard Adewoye"
        phone="(123) 456-7890"
        location="New York"
      />
      <main>
        <CallToActionSection />
        <AboutPsychotherapistSection />
        <ServicesAndPricingSection />

        {/* 👇 Add Trivia Section here */}
        <section className="py-16 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-8">
            Test Your Knowledge
          </h2>
          <TriviaQuiz quizData={quizData} />
        </section>

        <Footer
          clientPortalLink={""}
          requestAppointmentLink={""}
          name={""}
          phone={""}
          email={""}
          location={""}
          privacyNoticeLink={""}
          simplePracticeLink={""}
          privacyLink={""}
          termsLink={""}
          licenseLink={""}
        />
      </main>
    </div>
  );
}
