// components/AboutPsychotherapistSection.tsx
import Image from "next/image";

interface Feature {
  icon: React.ReactNode;
  text: string;
}

interface AboutPsychotherapistSectionProps {
  features?: Feature[];
  aboutHeading?: string;
  description?: string;
  profileImageSrc?: string;
  profileName?: string;
  profileTitle?: string;
}

export default function AboutPsychotherapistSection({
  features = [
    { icon: "💬", text: "Offers Telehealth Appointments" },
    { icon: "📅", text: "Accepts Online Payments" },
    { icon: "✔️", text: "Accepts Insurance" },
    { icon: "🧑", text: "Accepting New Clients" },
  ],
  aboutHeading = "Psychotherapist",
  description = "Becoming a therapist was driven by wanting to help people unpack their emotional baggage and uncover new pathways. I find comfort in knowing that I have the ability to assist and be apart of your healing process.",
  profileImageSrc = "/images/pic-1.jpg",
  profileName = "Colette Cassidy, LMHC",
  profileTitle = "Psychotherapy",
}: AboutPsychotherapistSectionProps) {
  return (
    <section className="bg-[#F9F6F0] py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Features Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-16">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="text-3xl mb-2">{feature.icon}</div>
              <p className="text-gray-700 text-sm font-medium">{feature.text}</p>
            </div>
          ))}
        </div>

        {/* About Section */}
        <div className="mb-16">
          <p className="uppercase text-gray-500 tracking-wide text-xs">About</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">
            {aboutHeading}
          </h2>
          <p className="mt-6 text-gray-700 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-4">
            <Image
              src={profileImageSrc}
              alt={`${profileName} profile picture`}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{profileName}</h3>
          <p className="text-sm text-gray-600">{profileTitle}</p>
        </div>
      </div>
    </section>
  );
}
