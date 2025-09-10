// components/ScrolledNavbar.tsx
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";

interface ScrolledNavbarProps {
  logoSrc: string;
  name?: string;
  location?: string;
  phone?: string;
  clientPortalLink?: string;
  requestAppointmentLink?: string;
}

export default function ScrolledNavbar({
  logoSrc,
  name = "Colette Cassidy, LMHC",
  location = "New York",
  phone = "212.300.5907",
  clientPortalLink = "/client-portal",
  requestAppointmentLink = "/request-appointment",
}: ScrolledNavbarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200); // threshold
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full bg-[#F9F6F0] border-b border-gray-300 z-50 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-3 gap-4">
        {/* Left: Logo & Info */}
        <div className="flex items-center gap-3">
          <Image
            src={logoSrc}
            alt={`${name} logo`}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">{name}</span>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span>{location}</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" aria-hidden="true" />
                <a href={`tel:${phone}`} aria-label={`Call ${phone}`}>
                  {phone}
                </a>
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" aria-hidden="true" />
                <Link href="/contact" aria-label="Go to contact page">
                  Contact
                </Link>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Buttons */}
        <div className="flex gap-3">
          <Link
            href={clientPortalLink}
            className="bg-green-900 text-white px-4 py-2 rounded-md text-sm font-medium shadow hover:bg-green-800 transition-colors"
          >
            Client Portal
          </Link>
          <Link
            href={requestAppointmentLink}
            className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium shadow hover:bg-gray-900 transition-colors"
          >
            Request Appointment
          </Link>
        </div>
      </div>
    </nav>
  );
}
