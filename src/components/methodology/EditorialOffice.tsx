import { Mail, Users, Headphones, Briefcase, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

const contacts = [
  { title: "Editorial Inquiries", role: "Assessment & Submissions", icon: Mail, email: "editorial@jurisstandard.com" },
  { title: "Profile Services", role: "Vault Curation & Verification", icon: Users, email: "support@jurisstandard.com" },
  { title: "Technical Support", role: "Portal & Account Access", icon: Headphones, email: "tech@jurisstandard.com" },
  { title: "Institutional Desk", role: "Global Partnerships & Media", icon: Briefcase, email: "partnerships@jurisstandard.com" }
];

export function EditorialOffice() {
  return (
    <section id="office" className="relative z-10 scroll-mt-28">
      <div className="bg-[#090806]/90 backdrop-blur-2xl border border-white/[0.08] border-t-[#CBAA69]/30 rounded-[4px] p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/[0.06] gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-2 py-0.5 text-[0.6rem] font-bold tracking-[0.2em] uppercase bg-[#CBAA69]/10 text-[#CBAA69] border border-[#CBAA69]/25 rounded-[2px]">
                08
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[#CBAA69]/80 font-medium">
                SECTION 08 • EDITORIAL OFFICE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white font-light tracking-wide">
              Editorial Office
            </h2>
          </div>
          <p className="text-xs uppercase tracking-[0.15em] text-white/40 max-w-sm font-light leading-relaxed">
            Direct channels for candidate inquiries, verification, and technical support.
          </p>
        </div>

        {/* 4 Compact Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-8">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="group bg-[#060504] border border-white/[0.07] hover:border-[#CBAA69]/40 rounded-[3px] p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between hover:bg-[#080706]"
            >
              <div>
                <div className="w-8 h-8 rounded-[2px] bg-[#120f0a] border border-[#CBAA69]/20 flex items-center justify-center mb-3 group-hover:border-[#CBAA69]/50 transition-colors">
                  <contact.icon className="w-3.5 h-3.5 text-[#CBAA69]" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-serif text-white font-light mb-0.5 group-hover:text-[#CBAA69] transition-colors">
                  {contact.title}
                </h3>
                <span className="text-[0.52rem] uppercase tracking-[0.15em] text-white/40 block mb-3 font-mono">
                  {contact.role}
                </span>
              </div>
              <a
                href={`mailto:${contact.email}`}
                className="text-xs text-[#CBAA69]/80 hover:text-white transition-colors truncate block pt-2 border-t border-white/[0.04] font-mono text-[0.68rem]"
              >
                {contact.email}
              </a>
            </div>
          ))}
        </div>

        {/* Compact, Luxury Final Action Panel */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-[#120f0a] via-[#090806] to-[#120f0a] border border-[#CBAA69]/30 rounded-[3px] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#CBAA69]/60 to-transparent" />
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-[#CBAA69]" />
              <span className="text-[0.55rem] uppercase tracking-[0.25em] text-[#CBAA69] font-bold">
                Candidacy Open
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-white font-light mb-2">
              Begin Your Editorial Journey
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm font-light max-w-xl leading-relaxed">
              If your institution or individual practice reflects the published criteria of the Juris Standard Index, proceed to formal profile submission.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/enter-the-index"
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#CBAA69] to-[#B89552] text-[#050505] text-[0.65rem] font-bold uppercase tracking-[0.2em] hover:from-[#E8D099] hover:to-[#CBAA69] transition-all flex items-center justify-center gap-2 rounded-[2px] shadow-[0_0_20px_rgba(203,170,105,0.2)]"
            >
              <span>Enter the Index</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/juris-index"
              className="w-full sm:w-auto px-6 py-3.5 bg-[#050504] border border-white/10 text-white/70 text-[0.65rem] font-medium uppercase tracking-[0.2em] hover:border-[#CBAA69]/50 hover:text-white transition-all text-center rounded-[2px]"
            >
              Explore Index
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
