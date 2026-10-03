'use client';

import { HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "What is the Juris Standard Index?",
    a: "The Juris Standard Index is an independent editorial repository recognising professional excellence and institutional stature across the legal profession through structured assessment."
  },
  {
    q: "Does submission guarantee recognition?",
    a: "No. Submission initiates the formal editorial screening and research phases. Recognition is awarded solely based upon independent qualitative editorial evaluation."
  },
  {
    q: "May I submit for more than one Recognition Programme?",
    a: "Yes. Separate editorial submissions may be completed for different eligible categories (e.g. Law Firm Excellence alongside individual partner submissions). Each is evaluated independently."
  },
  {
    q: "Can supplementary information be requested?",
    a: "Yes. During the Editorial Screening or Research stages, the Editorial Office may request verification documents, matter details, or clarifying references."
  },
  {
    q: "How long does editorial review take?",
    a: "Review cycles typically span between 2 to 4 weeks depending on the Recognition Programme, verification requirements, and editorial calendar workloads."
  },
  {
    q: "Can recognised profiles be updated post-publication?",
    a: "Yes. Profile holders and managing partners may request verified factual updates (e.g. partner elevations, office expansion) through the Editorial Office."
  },
  {
    q: "Does recognition expire?",
    a: "Recognised records are dated by edition year (e.g. 2027) and permanently archived in the official Vault. They are reviewed periodically for ongoing accuracy."
  },
  {
    q: "How do I communicate with the Editorial Office?",
    a: "You may reach out directly via editorial@jurisstandard.com or consult the Editorial Office contacts in Section 08 below."
  }
];

export function MethodologyFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative z-10 scroll-mt-28">
      <div className="bg-[#090806]/90 backdrop-blur-2xl border border-white/[0.08] border-t-[#CBAA69]/30 rounded-[4px] p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/[0.06] gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-2 py-0.5 text-[0.6rem] font-bold tracking-[0.2em] uppercase bg-[#CBAA69]/10 text-[#CBAA69] border border-[#CBAA69]/25 rounded-[2px]">
                07
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[#CBAA69]/80 font-medium">
                SECTION 07 • COMMON INQUIRIES
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white font-light tracking-wide">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[0.15em] text-white/40 max-w-sm font-light leading-relaxed">
            Essential clarifications regarding submission, review criteria, and archival.
          </p>
        </div>

        {/* Compact 2-Column FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
          {faqs.map((faq, index) => {
            const isActive = openIndex === index;
            return (
              <div
                key={index}
                onClick={() => setOpenIndex(isActive ? null : index)}
                className={`group rounded-[3px] border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isActive
                    ? "bg-[#060504] border-[#CBAA69]/40 shadow-md"
                    : "bg-[#060504]/50 border-white/[0.06] hover:border-white/20 hover:bg-[#070605]"
                }`}
              >
                <div className="p-4 sm:px-5 sm:py-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-[0.55rem] font-mono text-[#CBAA69]/70 shrink-0">
                      Q{index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    <h3
                      className={`text-xs sm:text-[0.85rem] font-serif font-light leading-snug ${
                        isActive ? "text-white" : "text-white/80 group-hover:text-white"
                      }`}
                    >
                      {faq.q}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-white/30 shrink-0 transition-transform duration-300 ${
                      isActive ? "rotate-180 text-[#CBAA69]" : ""
                    }`}
                  />
                </div>

                {isActive && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-4 pt-1 border-t border-white/[0.04]">
                    <p className="text-neutral-300 text-xs sm:text-[0.8rem] font-light leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
