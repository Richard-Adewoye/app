// components/Footer.tsx
import React from "react";
import { Mail, Phone } from "lucide-react";

interface FooterProps {
  clientPortalLink: string;
  requestAppointmentLink: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  privacyNoticeLink: string;
  simplePracticeLink: string;
  privacyLink: string;
  termsLink: string;
  licenseLink: string;
  disclaimerText?: string;
}

const Footer: React.FC<FooterProps> = ({
  clientPortalLink,
  requestAppointmentLink,
  name,
  phone,
  email,
  location,
  privacyNoticeLink,
  simplePracticeLink,
  privacyLink,
  termsLink,
  licenseLink,
  disclaimerText = "THE CLIENT PORTAL IS NOT TO BE USED FOR EMERGENCY SITUATIONS. IF YOU OR OTHERS ARE IN IMMEDIATE DANGER OR EXPERIENCING A MEDICAL EMERGENCY, CALL 911 IMMEDIATELY.",
}) => {
  return (
    <footer className="w-full">
      {/* --- Top CTA Section --- */}
      <section className="bg-[#F9F6F0] py-8">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href={clientPortalLink}
            className="px-6 py-3 bg-green-900 text-white rounded-lg hover:bg-green-800 transition"
          >
            Client Portal
          </a>
          <a
            href={requestAppointmentLink}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Request Appointment
          </a>
        </div>
      </section>

      {/* --- Main Footer Section --- */}
      <section className="bg-[#555B5D] text-white py-10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          {/* Branding & Contact */}
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="flex justify-center items-center gap-2">
              <Phone className="w-4 h-4" aria-hidden="true" />
              {phone}
            </p>
            <a
              href={`mailto:${email}`}
              className="flex justify-center items-center gap-2 hover:underline"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Contact
            </a>
            <p>{location}</p>
            <a
              href={privacyNoticeLink}
              className="block mt-2 text-sm hover:underline"
            >
              Notice of Privacy Practices
            </a>
          </div>

          {/* Powered By + Legal */}
          <div className="space-y-2">
            <p className="text-sm">
              Powered by{" "}
              <a
                href={simplePracticeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                SimplePractice
              </a>
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <a href={privacyLink} className="hover:underline">
                Privacy
              </a>
              <a href={termsLink} className="hover:underline">
                Terms
              </a>
              <a href={licenseLink} className="hover:underline">
                License Agreement
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-300 mt-6 px-4">{disclaimerText}</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
