// components/ServicesAndPricingSection.tsx
import React from "react";

interface ServicesAndPricingSectionProps {
  services?: string[];
  approaches?: string[];
  insuranceAccepted?: string[];
  feeDescription?: string;
}

export default function ServicesAndPricingSection({
  services = ["Anxiety", "Depression", "Trauma", "Grief", "Stress Management"],
  approaches = [
    "Behavioral Therapy",
    "Cognitive Behavioral Therapy (CBT)",
    "Mindfulness-Based Therapy",
  ],
  insuranceAccepted = ["Aetna", "United Healthcare", "Blue Cross Blue Shield"],
  feeDescription = "$75 – $125 per session",
}: ServicesAndPricingSectionProps) {
  return (
    <section className="bg-[#2C2C2C] text-gray-200 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Top Section: Services */}
        <div className="mb-12">
          <p className="uppercase tracking-widest text-sm text-gray-400 mb-6">
            Services
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {services.map((service, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-[#3a3a3a] text-white text-sm rounded-full"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Section: Approaches, Insurance, Fees */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-left">
          {/* Approaches */}
          <div>
            <h3 className="uppercase text-gray-300 text-sm font-semibold mb-4">
              Approaches
            </h3>
            <ul className="space-y-2">
              {approaches.map((approach, idx) => (
                <li key={idx} className="text-gray-200 text-sm">
                  {approach}
                </li>
              ))}
            </ul>
          </div>

          {/* Insurance Accepted */}
          <div>
            <h3 className="uppercase text-gray-300 text-sm font-semibold mb-4">
              Insurance Accepted
            </h3>
            <ul className="space-y-2">
              {insuranceAccepted.map((provider, idx) => (
                <li key={idx} className="text-gray-200 text-sm">
                  {provider}
                </li>
              ))}
            </ul>
          </div>

          {/* Fees */}
          <div>
            <h3 className="uppercase text-gray-300 text-sm font-semibold mb-4">
              Fees
            </h3>
            <p className="text-gray-200 text-sm">{feeDescription}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
