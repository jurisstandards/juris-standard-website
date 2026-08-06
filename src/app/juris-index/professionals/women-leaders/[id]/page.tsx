import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2, MapPin, Building2, ShieldCheck, QrCode, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

const mockProfile = {
  name: "Meera Subramanian",
  organisation: "Shardul Amarchand Mangaldas & Co",
  leadershipRole: "Senior Partner",
  jurisdiction: "Mumbai, India",
  citation: "Recognised for unparalleled leadership and influence in reshaping corporate governance standards and mentoring the next generation of legal talent.",
  overview: "Meera Subramanian is a Senior Partner renowned for her commanding presence in complex corporate law and M&A. As a formidable leader within the Indian legal market, her profound impact on both her clients and the broader legal community cements her status as an institutional pillar.",
  leadershipDomains: ["Corporate Law", "General Counsel Advisory", "ESG & Sustainability"],
  timeline: [
    { year: "2024", title: "Women Leaders in Law™", detail: "Recognised" },
  ],
  verificationId: "WLL-2024-MS422"
};

export default function WomenLeadersProfilePage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-[#000000] selection:bg-[#C5A059]/30 flex flex-col font-sans text-[#FFFFF0]">
      <Navbar />
      
      {/* 1. INSTITUTIONAL HEADER & CITATION */}
      <section className="w-full pt-40 pb-24 border-b border-[#222222] bg-[#000000]">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[1200px] mx-auto">
          
          <div className="flex items-center gap-4 text-xs font-semibold tracking-widest text-[#C5A059] uppercase mb-12">
            <span className="w-8 h-[1px] bg-[#C5A059]/50 block" />
            WOMEN LEADERS IN LAW™ • OFFICIAL RECORD
          </div>

          <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-start">
            
            {/* Portrait Placeholder */}
            <div className="w-48 h-64 bg-[#111111] border border-[#222222] shrink-0 flex items-center justify-center relative">
               <svg className="w-20 h-20 text-[#333333]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
               <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C5A059]" />
            </div>

            {/* Details */}
            <div className="flex flex-col flex-grow">
              <h1 className="font-serif text-4xl md:text-5xl text-[#FFFFF0] leading-tight tracking-wide mb-6">
                {mockProfile.name}
              </h1>
              
              <div className="flex flex-col gap-4 text-sm tracking-widest uppercase text-[#FFFFF0]/60 mb-12">
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-[#C5A059] font-semibold">{mockProfile.leadershipRole}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="w-4 h-4" />
                  {mockProfile.organisation}
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  {mockProfile.jurisdiction}
                </div>
              </div>

              {/* Editorial Citation */}
              <div className="border-l border-[#C5A059] pl-8 py-2">
                <h4 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-4">Editorial Citation</h4>
                <p className="font-serif text-lg md:text-xl text-[#FFFFF0]/90 leading-relaxed italic">
                  "{mockProfile.citation}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[1200px] mx-auto py-24 grid grid-cols-1 lg:grid-cols-3 gap-24">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 flex flex-col gap-24">
          
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-8">Professional Overview</h3>
            <p className="text-sm text-[#FFFFF0]/70 leading-loose font-light">
              {mockProfile.overview}
            </p>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-8">Leadership Domains</h3>
            <div className="flex flex-wrap gap-4">
              {mockProfile.leadershipDomains.map(domain => (
                <div key={domain} className="px-6 py-4 border border-[#333333] bg-[#111111]">
                  <span className="text-xs uppercase tracking-widest text-[#FFFFF0]/90">{domain}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-8">Recognition Timeline</h3>
            <div className="flex flex-col">
              {mockProfile.timeline.map((item, idx) => (
                <div key={idx} className="flex gap-8 py-6 border-t border-[#222222] first:border-0 first:pt-0">
                  <span className="font-serif text-2xl text-[#C5A059] w-24 shrink-0">{item.year}</span>
                  <div className="flex flex-col">
                    <span className="text-sm uppercase tracking-widest text-[#FFFFF0]">{item.title}</span>
                    <span className="text-[0.65rem] uppercase tracking-widest text-[#FFFFF0]/50 mt-2 flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-[#C5A059]" /> {item.detail}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar Column */}
        <div className="flex flex-col gap-16">
          
          {/* Verification Block */}
          <div className="w-full p-10 bg-[#111111] border border-[#222222] flex flex-col relative">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#C5A059]" />
            <ShieldCheck className="w-8 h-8 text-[#C5A059] mb-6" strokeWidth={1} />
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FFFFF0] mb-2">Verification</h3>
            <p className="text-[0.7rem] uppercase tracking-widest text-[#C5A059] mb-8">Officially Recognised</p>
            
            <div className="flex flex-col gap-4 mb-8">
              <div>
                <span className="text-[0.6rem] uppercase tracking-widest text-[#FFFFF0]/40 block mb-1">Recognition ID</span>
                <span className="text-sm tracking-widest text-[#FFFFF0]">{mockProfile.verificationId}</span>
              </div>
            </div>

            <div className="mt-auto flex justify-center p-4 bg-white">
              <QrCode className="w-24 h-24 text-black" strokeWidth={1} />
            </div>
          </div>

          <section className="p-8 bg-[#111111] border border-[#333333]">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-6 flex items-center gap-3">
               Recognition Assets
            </h3>
            <p className="text-[0.65rem] uppercase tracking-widest text-[#FFFFF0]/50 leading-loose mb-8">
              Official assets and downloads are strictly available to recognised leaders via the Recognition Centre.
            </p>
            <Link href="#" className="flex items-center justify-between text-xs uppercase tracking-widest text-[#FFFFF0] border border-[#C5A059] p-4 hover:bg-[#C5A059] hover:text-black transition-colors">
              Access Assets <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}
