// components/Header.tsx
import { Mail } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#faf9f6] text-gray-700">
      {/* Top Section */}
      <div className="flex flex-col items-center py-6 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-serif italic text-gray-800">
          Dr. Richard Adewoye
        </h1>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          Richard Adewoye, LCSW - Licensed Clinical Social Worker
        </p>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center items-center gap-2 text-xs md:text-sm text-gray-600 mt-2">
          <span>New York</span>
          <span className="mx-1">•</span>
          <span>(123) 456-7890</span>
          <span className="mx-1">•</span>
          <Link
            href="/contact"
            className="flex items-center gap-1 hover:text-gray-900 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Contact
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="border-t border-gray-200">
        <ul className="flex justify-center gap-6 py-3 text-sm md:text-base font-medium">
          <li>
            <Link
              href="/"
              className="hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-gray-900 transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="hover:text-gray-900 transition-colors"
            >
              Services
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
