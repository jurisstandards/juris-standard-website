import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2, MapPin, Building2, Briefcase, Award, ShieldCheck, QrCode, Crown } from "lucide-react";
import Link from "next/link";

// In a real app, this data would be fetched based on the params.id
const mockProfile = {
  name: "Priya Sharma",
  organisation: "Reliance Industries Limited",
  leadershipLevel: "Group General Counsel",
  jurisdiction: "Mumbai, India",
  citation: "Recognised for exceptional leadership in corporate governance and strategic risk management, driving sustainable growth across diverse global portfolios.",
  overview: "Priya Sharma serves as the Group General Counsel at Reliance Industries, where she oversees a vast international legal team. Her expertise spans complex regulatory compliance, multi-jurisdictional M&A, and establishing robust corporate governance frameworks that align with international best practices.",
  functionalDomains: ["Corporate Governance", "Mergers & Acquisitions", "Risk Management"],
  timeline: [
    { year: "2024", title: "In-House Counsel Excellence™", detail: "Tier 1 Recognition" },
    { year: "2023", title: "In-House Counsel Excellence™", detail: "Tier 1 Recognition" },
  ],
  verificationId: "IHC-2024-PS7712",
  status: "OFFICIALLY RECOGNISED"
};

export default function InHouseCounselProfilePage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-[#020202] selection:bg-gold-500/30 flex flex-col font-sans text-neutral-300">
      <Navbar />
      
      {/* 1. INSTITUTIONAL HEADER & CITATION */}
      <section className="relative w-full pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden border-b border-gold-500/10">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0a] to-[#020202]" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.05)_0%,_transparent_50%)] pointer-events-none" />

        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[1200px] mx-auto relative z-20">
          
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold-500 border border-gold-500/30 px-3 py-1 bg-gold-500/5">IN-HOUSE COUNSEL EXCELLENCE™</span>
            <span className="text-[0.6rem] uppercase tracking-[0.3em] text-white/40">OFFICIAL RECORD</span>
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Portrait Placeholder */}
            <div className="w-48 h-64 bg-[#111] border border-white/10 shrink-0 relative overflow-hidden group shadow-2xl">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1)_0%,_transparent_60%)] pointer-events-none" />
               <div className="w-full h-full flex items-center justify-center text-white/10 group-hover:scale-105 transition-transform duration-700">
                 <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
               </div>
            </div>

            <div className="flex flex-col">
              <h1 className="font-serif text-4xl md:text-5xl text-white/95 leading-tight tracking-wide mb-4">
                {mockProfile.name}
              </h1>
              
              <div className="flex flex-col gap-3 mb-8 text-sm">
                <div className="flex items-center gap-3 text-neutral-400">
                  <Crown className="w-4 h-4 text-gold-500/70" />
                  <span className="text-[0.65rem] uppercase tracking-widest font-semibold text-gold-500/90">{mockProfile.leadershipLevel}</span>
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Building2 className="w-4 h-4 text-white/50" />
                    <span className="font-medium tracking-wide">{mockProfile.organisation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-400">
                    <MapPin className="w-4 h-4 text-white/50" />
                    <span className="tracking-wide">{mockProfile.jurisdiction}</span>
                  </div>
                </div>
              </div>

              {/* Editorial Citation */}
              <div className="pl-6 border-l-2 border-gold-500/50 mb-8">
                <h4 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-500 mb-3">EDITORIAL CITATION</h4>
                <p className="text-lg text-white/80 font-light leading-relaxed italic">
                  "{mockProfile.citation}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[1200px] mx-auto py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 flex flex-col gap-16">
          
          {/* Professional Overview */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 mb-6 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-gold-500/50"></span> PROFESSIONAL OVERVIEW
            </h3>
            <p className="text-sm text-neutral-400 leading-loose font-light">
              {mockProfile.overview}
            </p>
          </section>

          {/* Functional Excellence Domains */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 mb-6 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-gold-500/50"></span> FUNCTIONAL EXCELLENCE DOMAINS
            </h3>
            <div className="flex flex-wrap gap-3">
              {mockProfile.functionalDomains.map(domain => (
                <div key={domain} className="flex items-center gap-3 px-5 py-3 border border-white/10 bg-[#0a0a0a] rounded-sm">
                  <Briefcase className="w-4 h-4 text-gold-500/80" />
                  <span className="text-[0.7rem] uppercase tracking-widest text-white/90">{domain}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Recognition Timeline */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 mb-6 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-gold-500/50"></span> RECOGNITION TIMELINE
            </h3>
            <div className="flex flex-col gap-0 relative">
              <div className="absolute left-[11px] top-4 bottom-4 w-[1px] bg-white/10 z-0" />
              {mockProfile.timeline.map((item, idx) => (
                <div key={idx} className="relative z-10 flex gap-6 pb-8 last:pb-0">
                  <div className="w-6 h-6 rounded-full bg-[#050505] border border-gold-500/50 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  </div>
                  <div>
                    <span className="font-serif text-xl text-gold-500 block mb-1">{item.year}</span>
                    <h4 className="text-sm font-medium text-white/90 uppercase tracking-widest mb-1">{item.title}</h4>
                    <p className="text-xs text-neutral-500">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar Column (Verification & Assets) */}
        <div className="flex flex-col gap-8">
          
          {/* Verification Status */}
          <div className="p-8 bg-[#0a0a0a] border border-gold-500/20 rounded-sm relative overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.05)]">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold-500/0 via-gold-500 to-gold-500/0" />
            <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/80 mb-6 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-500" /> VERIFICATION
            </h3>
            
            <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-white/10">
              <div>
                <span className="text-[0.55rem] uppercase tracking-widest text-neutral-500 block mb-1">STATUS</span>
                <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-semibold tracking-widest">{mockProfile.status}</span>
                </div>
              </div>
              <div>
                <span className="text-[0.55rem] uppercase tracking-widest text-neutral-500 block mb-1">RECOGNITION ID</span>
                <span className="text-sm font-medium text-white/90 tracking-widest">{mockProfile.verificationId}</span>
              </div>
            </div>

            <div className="flex justify-center mb-4">
               {/* Mock QR Code */}
               <div className="w-24 h-24 bg-white p-2 rounded-sm flex items-center justify-center">
                 <QrCode className="w-full h-full text-black" strokeWidth={1} />
               </div>
            </div>
            <p className="text-[0.6rem] text-center text-neutral-500 leading-relaxed">
              Scan to verify official recognition status on the Juris Standard Index.
            </p>
          </div>

          {/* Recognition Assets */}
          <div className="p-8 bg-[#050505] border border-white/5 rounded-sm">
            <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/80 mb-6 flex items-center gap-2">
              <Award className="w-4 h-4 text-gold-500" /> RECOGNITION ASSETS
            </h3>
            <p className="text-[0.65rem] text-neutral-400 leading-relaxed mb-6">
              Official digital and physical assets are available exclusively to recognised individuals.
            </p>
            <Link href="#" className="block w-full text-center text-[0.65rem] uppercase tracking-[0.2em] text-black bg-gold-500 hover:bg-gold-400 transition-colors px-4 py-3 font-semibold rounded-sm">
              ACCESS ASSETS
            </Link>
          </div>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}
