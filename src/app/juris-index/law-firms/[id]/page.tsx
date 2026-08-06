import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, ShieldCheck, MapPin, Building2, Download, Award, CheckCircle2, QrCode } from "lucide-react";
import Link from "next/link";

// Mock data based on the PDF requirements
const mockFirm = {
  name: "Khaitan & Co",
  headquarters: "Mumbai, India",
  citation: "Recognised for unparalleled institutional authority and a definitive track record in shaping complex cross-border corporate frameworks.",
  overview: "Khaitan & Co is one of India's oldest and most prestigious full-service law firms. With a legacy spanning over a century, the institution has consistently maintained its position at the forefront of the global legal market, advising multinational corporations, financial institutions, and sovereign entities on their most critical strategic matters.",
  areasOfExcellence: ["Corporate & Commercial", "Dispute Resolution & Litigation", "Private Equity", "Banking & Finance"],
  industryFocus: ["Financial Services", "Technology", "Infrastructure", "Healthcare"],
  leadership: ["Haigreve Khaitan", "Rabindra Jhunjhunwala", "Sudhir Bassi"],
  officeNetwork: ["Mumbai", "New Delhi", "Bengaluru", "Kolkata", "Chennai", "Singapore"],
  representativeMatters: [
    "Advised a global consortium on a $12 billion infrastructure acquisition.",
    "Represented a sovereign wealth fund in a complex multi-jurisdictional tax dispute.",
    "Structured the corporate governance framework for a leading tech unicorn's IPO."
  ],
  recognitionTimeline: [
    { year: "2024", edition: "Law Firm Excellence™" },
    { year: "2023", edition: "Law Firm Excellence™" },
    { year: "2022", edition: "Law Firm Excellence™" },
  ],
  verificationId: "LFE-2024-KCO01"
};

export default function InstitutionalFirmProfilePage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-[#000000] selection:bg-[#C5A059]/30 flex flex-col font-sans text-[#FFFFF0]">
      <Navbar />
      
      {/* 1. INSTITUTIONAL HEADER & CITATION */}
      <section className="w-full pt-40 pb-24 border-b border-[#222222] bg-[#000000]">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[1200px] mx-auto">
          
          <div className="flex items-center gap-4 text-xs font-semibold tracking-widest text-[#C5A059] uppercase mb-12">
            <span className="w-8 h-[1px] bg-[#C5A059]/50 block" />
            Official Institutional Profile
          </div>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-start">
            
            {/* Firm Details */}
            <div className="flex flex-col flex-grow">
              <h1 className="font-serif text-5xl md:text-6xl text-[#FFFFF0] leading-tight tracking-wide mb-6">
                {mockFirm.name}
              </h1>
              
              <div className="flex items-center gap-4 text-sm tracking-widest uppercase text-[#FFFFF0]/50 mb-12">
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                {mockFirm.headquarters}
              </div>

              {/* Editorial Citation */}
              <div className="border-l border-[#C5A059] pl-8 py-2 mb-12">
                <h4 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-4">Editorial Citation</h4>
                <p className="font-serif text-xl md:text-2xl text-[#FFFFF0]/90 leading-relaxed">
                  "{mockFirm.citation}"
                </p>
              </div>
            </div>

            {/* Verification Block (Digital Plaque Style) */}
            <div className="w-full lg:w-[320px] shrink-0 p-10 bg-[#111111] border border-[#222222] flex flex-col relative">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[#C5A059]" />
              <Award className="w-8 h-8 text-[#C5A059] mb-6" strokeWidth={1} />
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FFFFF0] mb-2">Verified Status</h3>
              <p className="text-[0.7rem] uppercase tracking-widest text-[#C5A059] mb-8">Officially Recognised</p>
              
              <div className="flex flex-col gap-4 mb-8">
                <div>
                  <span className="text-[0.6rem] uppercase tracking-widest text-[#FFFFF0]/40 block mb-1">Recognition ID</span>
                  <span className="text-sm tracking-widest text-[#FFFFF0]">{mockFirm.verificationId}</span>
                </div>
                <div>
                  <span className="text-[0.6rem] uppercase tracking-widest text-[#FFFFF0]/40 block mb-1">Programme</span>
                  <span className="text-sm tracking-widest text-[#FFFFF0]">Law Firm Excellence™</span>
                </div>
              </div>

              <div className="mt-auto flex justify-center p-4 bg-white">
                <QrCode className="w-24 h-24 text-black" strokeWidth={1} />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[1200px] mx-auto py-24 grid grid-cols-1 lg:grid-cols-3 gap-24">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 flex flex-col gap-24">
          
          {/* Institutional Overview */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-8 flex items-center gap-4">
              Institutional Overview
            </h3>
            <p className="text-sm md:text-base text-[#FFFFF0]/70 leading-loose font-light">
              {mockFirm.overview}
            </p>
          </section>

          {/* Areas of Excellence */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-8">
              Areas of Excellence
            </h3>
            <div className="flex flex-wrap gap-4">
              {mockFirm.areasOfExcellence.map(area => (
                <div key={area} className="px-6 py-4 border border-[#333333] bg-[#111111]">
                  <span className="text-xs uppercase tracking-widest text-[#FFFFF0]/90">{area}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Representative Matters */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-8">
              Representative Matters
            </h3>
            <div className="flex flex-col gap-6">
              {mockFirm.representativeMatters.map((matter, idx) => (
                <div key={idx} className="pb-6 border-b border-[#222222] last:border-0 last:pb-0">
                  <p className="text-sm text-[#FFFFF0]/80 leading-loose font-light">
                    {matter}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Recognition Timeline */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-8">
              Recognition Timeline
            </h3>
            <div className="flex flex-col">
              {mockFirm.recognitionTimeline.map((item, idx) => (
                <div key={idx} className="flex gap-8 py-6 border-t border-[#222222] first:border-0 first:pt-0">
                  <span className="font-serif text-2xl text-[#C5A059] w-24 shrink-0">{item.year}</span>
                  <div className="flex flex-col">
                    <span className="text-sm uppercase tracking-widest text-[#FFFFF0]">{item.edition}</span>
                    <span className="text-[0.65rem] uppercase tracking-widest text-[#FFFFF0]/50 mt-2 flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-[#C5A059]" /> Officially Renewed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar Column */}
        <div className="flex flex-col gap-16">
          
          {/* Industry Focus */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-6">Industry Focus</h3>
            <ul className="flex flex-col gap-4">
              {mockFirm.industryFocus.map((ind, idx) => (
                <li key={idx} className="text-sm text-[#FFFFF0]/70 font-light tracking-wide">{ind}</li>
              ))}
            </ul>
          </section>

          {/* Leadership */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-6">Leadership</h3>
            <ul className="flex flex-col gap-4">
              {mockFirm.leadership.map((leader, idx) => (
                <li key={idx} className="text-sm text-[#FFFFF0]/70 font-light tracking-wide">{leader}</li>
              ))}
            </ul>
          </section>

          {/* Office Network */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-6">Office Network</h3>
            <ul className="flex flex-col gap-4">
              {mockFirm.officeNetwork.map((office, idx) => (
                <li key={idx} className="text-sm text-[#FFFFF0]/70 font-light tracking-wide flex items-center gap-3">
                  <MapPin className="w-3 h-3 text-[#C5A059]/50" /> {office}
                </li>
              ))}
            </ul>
          </section>

          {/* Recognition Assets & Downloads */}
          <section className="p-8 bg-[#111111] border border-[#333333]">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-6 flex items-center gap-3">
               Recognition Assets
            </h3>
            <p className="text-[0.65rem] uppercase tracking-widest text-[#FFFFF0]/50 leading-loose mb-8">
              Official assets and downloads are strictly available to recognised institutions via the Recognition Centre.
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
