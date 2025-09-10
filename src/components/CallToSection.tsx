// components/CallToActionSection.tsx
import Image from "next/image";
import Link from "next/link";

interface CallToActionSectionProps {
  quote?: string;
  subText?: string;
  clientPortalLink?: string;
  requestAppointmentLink?: string;
  backgroundImage?: string;
}

export default function CallToActionSection({
  quote = "It always seems impossible until it's done.",
  subText = "Are you ready to take the next step towards positive change, mental wellness, positive growth and healing?",
  clientPortalLink = "/client-portal",
  requestAppointmentLink = "/request-appointment",
  backgroundImage = "/images/bg-1.jpg", // fallback local asset
}: CallToActionSectionProps) {
  return (
    <section className="relative w-full">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={backgroundImage}
          alt="Background of lush green leaves"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto text-center px-6 py-20 sm:py-28">
        {/* Quote */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug">
          {quote}
        </h2>

        {/* Sub-text */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-gray-200">
          {subText}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={clientPortalLink}
            className="bg-white text-black px-6 py-3 rounded-md font-medium shadow hover:bg-gray-100 transition-colors text-sm sm:text-base"
          >
            Client Portal
          </Link>
          <Link
            href={requestAppointmentLink}
            className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium shadow hover:bg-gray-800 transition-colors text-sm sm:text-base"
          >
            Request Appointment
          </Link>
        </div>
      </div>
    </section>
  );
}
