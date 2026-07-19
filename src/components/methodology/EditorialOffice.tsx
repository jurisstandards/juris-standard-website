import { Building2, Mail, Users, Headphones, Briefcase, ChevronRight } from "lucide-react";
import Link from "next/link";
import { CrystalIcon } from "./CrystalIcon";

const contacts = [
  { title: "Editorial Enquiries", icon: Mail, email: "editorial@jurisstandard.com" },
  { title: "Profile Support", icon: Users, email: "support@jurisstandard.com" },
  { title: "Technical Support", icon: Headphones, email: "tech@jurisstandard.com" },
  { title: "Business Enquiries", icon: Briefcase, email: "partnerships@jurisstandard.com" }
];

export function EditorialOffice() {
  return (
    <section id="office" className="py-10 px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 scroll-mt-24">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="bg-[#111111]/90 backdrop-blur-3xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.03)] rounded-2xl p-6 lg:p-8 xl:p-10 relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent group-hover:via-gold-400/60 transition-colors duration-500 shadow-[0_0_20px_rgba(212,175,55,0.3)]" />
          
          
          <div className="flex flex-col w-full">
            {/* Top Premium Header */}
            <div className="flex flex-col items-start mb-6 border-b border-white/5 pb-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center justify-center w-6 h-6 rounded bg-gradient-to-br from-gold-500/20 to-gold-600/5 border border-gold-500/50 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                  <span className="text-gold-400 font-serif text-sm font-bold">8</span>
                </div>
                <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.3em] drop-shadow-sm">Section 8</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white font-light tracking-tight leading-tight">Editorial Office</h2>
            </div>
            
            {/* Full-Width Content Column */}
            <div className="w-full space-y-4">
          <p className="text-neutral-300 font-light leading-relaxed md:text-[1.05rem] mb-6">
            The Editorial Office manages the administration of the Juris Standard Editorial Process. It does not provide legal advice.
          </p>
          
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="group bg-[#050505] border border-white/5 rounded-2xl p-6 hover:border-gold-500/40 hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)] hover:-translate-y-1 transition-all duration-500 flex flex-col "
            >
              <div className="w-12 h-12 rounded-xl bg-black border border-white/5 flex items-center justify-center shrink-0 mb-0 group-hover:border-gold-500/30 transition-colors duration-500">
                <contact.icon className="w-5 h-5 text-white/40 group-hover:text-gold-400 transition-colors duration-500" />
              </div>
              <h3 className="font-serif text-white mb-2">{contact.title}</h3>
              <a href={`mailto:${contact.email}`} className="text-xs text-neutral-400 hover:text-gold-300 transition-colors truncate block">
                {contact.email}
              </a>
            </div>
          ))}
        </div>

        {/* Final CTA Panel (Ultra Compact Luxury) */}
        <div
          className="relative bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group"
        >
          {/* Animated background elements */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent group-hover:via-gold-400/80 transition-all duration-700 opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(212,175,55,0.05)_0%,transparent_60%)] pointer-events-none" />
          
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-serif text-white font-light tracking-tight mb-3 group-hover:text-gold-100 transition-colors">
              Begin Your Editorial Journey
            </h2>
            <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-lg">
              If your professional work or institution reflects the standards described within the Juris Standard Editorial Methodology, you may begin your Editorial Submission.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 shrink-0 w-full md:w-auto mt-6 md:mt-0">
            <Link
              href="/enter-the-index"
              className="group/btn relative inline-flex items-center justify-center px-10 py-5 bg-transparent border border-gold-500/30 text-gold-400 text-[0.65rem] md:text-xs font-bold uppercase tracking-[0.2em] rounded-none hover:bg-gold-500/10 hover:border-gold-500 hover:text-gold-200 transition-all duration-500 w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500/0 via-gold-500/10 to-gold-500/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center">
                Enter the Index
                <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </Link>
            <button
              onClick={() => {
                document.getElementById('programmes')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group/btn2 relative inline-flex items-center justify-center px-10 py-5 bg-[#0a0a0a] border border-white/10 text-white/70 text-[0.65rem] md:text-xs font-semibold uppercase tracking-[0.2em] rounded-none hover:border-white/30 hover:text-white transition-all duration-500 w-full sm:w-auto shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/btn2:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10">Explore Programmes</span>
            </button>
          </div>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
}
