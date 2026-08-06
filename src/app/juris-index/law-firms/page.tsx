import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Search, Briefcase, Calendar, ShieldCheck, Lock, Award, Building2 } from "lucide-react";
import Link from "next/link";

export default function LawFirmExcellenceMasterPage() {
  return (
    <main className="min-h-screen bg-[#000000] selection:bg-[#C5A059]/30 flex flex-col font-sans text-[#FFFFF0]">
      <Navbar />
      
      {/* HERO SECTION - NO GRADIENTS, NO FLASHY EFFECTS */}
      <section className="relative w-full pt-40 pb-32 border-b border-[#222222] bg-[#000000]">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[2000px] mx-auto flex flex-col lg:flex-row justify-between items-start gap-24">
          
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#FFFFF0] leading-[1.05] tracking-wide mb-8 font-light">
              LAW FIRM <br/>
              <span className="font-medium text-[#C5A059]">
                EXCELLENCE<sup className="text-[0.4em] ml-2">™</sup>
              </span>
            </h1>
            
            <p className="text-base text-[#FFFFF0]/80 font-light leading-relaxed mb-12 max-w-xl">
              The flagship institutional product of The Juris Standard Index™. The world's most trusted digital institution for recognised law firms.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-sm font-medium tracking-widest text-[#FFFFF0]/50 uppercase">
                <span className="w-8 h-[1px] bg-[#C5A059]/50 block" />
                Institutional Search
              </div>
              
              <div className="flex items-center bg-[#111111] border border-[#333333] p-1 w-full max-w-xl">
                <div className="pl-4 pr-3 py-3">
                  <Search className="w-5 h-5 text-[#C5A059]" strokeWidth={1.5} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search by Law Firm Name, Practice Area, or Jurisdiction"
                  className="w-full bg-transparent border-none py-3 pr-4 text-sm text-[#FFFFF0] placeholder:text-[#FFFFF0]/30 focus:outline-none focus:ring-0"
                />
                <button className="px-8 py-3 bg-[#C5A059] text-black text-xs font-semibold tracking-widest uppercase hover:bg-[#D4AF37] transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
          
          {/* DIGITAL RECOGNITION PLAQUE (Visual Anchor) */}
          <div className="w-full lg:w-[500px] shrink-0">
             <div className="bg-[#111111] border border-[#222222] p-12 flex flex-col items-center text-center relative">
               <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-[#C5A059]/30" />
               <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#C5A059]/30" />
               <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-[#C5A059]/30" />
               <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-[#C5A059]/30" />
               
               <Award className="w-20 h-20 text-[#C5A059] mb-8" strokeWidth={0.5} />
               <h3 className="font-serif text-3xl text-[#FFFFF0] mb-4">Official Record</h3>
               <p className="text-xs text-[#FFFFF0]/60 uppercase tracking-widest leading-loose mb-8">
                 Law Firm Excellence™<br/>
                 Juris Standard Index
               </p>
               <div className="w-full h-[1px] bg-[#222222] mb-8" />
               <div className="flex items-center gap-2 text-[#C5A059] text-[0.65rem] uppercase tracking-widest">
                 <ShieldCheck className="w-4 h-4" /> Editorial Independence
               </div>
             </div>
          </div>

        </div>
      </section>

      {/* THE 5 INSTITUTIONAL PILLARS */}
      <section className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[2000px] mx-auto py-32 bg-[#000000]">
        
        <div className="flex flex-col gap-4 mb-24">
          <span className="text-xs font-semibold tracking-widest text-[#C5A059] uppercase">Architecture</span>
          <h2 className="font-serif text-4xl text-[#FFFFF0]">The Five Institutional Pillars</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Pillar 1: Recognised Law Firms */}
          <Link href="/juris-index/law-firms/directory" className="group bg-[#111111] p-12 border border-[#222222] hover:border-[#C5A059] transition-colors flex flex-col h-[320px]">
             <Building2 className="w-10 h-10 text-[#C5A059] mb-8" strokeWidth={1} />
             <h3 className="font-serif text-2xl text-[#FFFFF0] mb-4">Recognised Law Firms</h3>
             <p className="text-[0.7rem] text-[#FFFFF0]/60 uppercase tracking-widest leading-loose mb-auto">
               The master institutional directory containing every recognised law firm globally.
             </p>
             <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#C5A059] mt-8">
               Access Directory <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
             </div>
          </Link>

          {/* Pillar 2: Areas of Excellence */}
          <Link href="/juris-index/law-firms/areas" className="group bg-[#111111] p-12 border border-[#222222] hover:border-[#C5A059] transition-colors flex flex-col h-[320px]">
             <Briefcase className="w-10 h-10 text-[#C5A059] mb-8" strokeWidth={1} />
             <h3 className="font-serif text-2xl text-[#FFFFF0] mb-4">Areas of Excellence</h3>
             <p className="text-[0.7rem] text-[#FFFFF0]/60 uppercase tracking-widest leading-loose mb-auto">
               Explore recognised firms structured strictly by institutional practice collections.
             </p>
             <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#C5A059] mt-8">
               Explore Areas <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
             </div>
          </Link>

          {/* Pillar 3: Recognition Programmes */}
          <Link href="/juris-index/law-firms/programmes" className="group bg-[#111111] p-12 border border-[#222222] hover:border-[#C5A059] transition-colors flex flex-col h-[320px]">
             <Award className="w-10 h-10 text-[#C5A059] mb-8" strokeWidth={1} />
             <h3 className="font-serif text-2xl text-[#FFFFF0] mb-4">Recognition Programmes</h3>
             <p className="text-[0.7rem] text-[#FFFFF0]/60 uppercase tracking-widest leading-loose mb-auto">
               The highest honours: Law Firm Excellence™, Boutique, Emerging, and Hall of Distinction™.
             </p>
             <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#C5A059] mt-8">
               View Programmes <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
             </div>
          </Link>

          {/* Pillar 4: Annual Editions */}
          <Link href="/juris-index/law-firms/archive" className="group bg-[#111111] p-12 border border-[#222222] hover:border-[#C5A059] transition-colors flex flex-col h-[320px]">
             <Calendar className="w-10 h-10 text-[#C5A059] mb-8" strokeWidth={1} />
             <h3 className="font-serif text-2xl text-[#FFFFF0] mb-4">Annual Editions</h3>
             <p className="text-[0.7rem] text-[#FFFFF0]/60 uppercase tracking-widest leading-loose mb-auto">
               The permanent institutional publication archive preserving all historical recognition.
             </p>
             <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#C5A059] mt-8">
               View Archives <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
             </div>
          </Link>

          {/* Pillar 5: Recognition Centre */}
          <Link href="/juris-index/law-firms/centre" className="group bg-[#111111] p-12 border border-[#222222] hover:border-[#C5A059] transition-colors flex flex-col h-[320px] md:col-span-2 lg:col-span-1">
             <Lock className="w-10 h-10 text-[#C5A059] mb-8" strokeWidth={1} />
             <h3 className="font-serif text-2xl text-[#FFFFF0] mb-4">Recognition Centre</h3>
             <p className="text-[0.7rem] text-[#FFFFF0]/60 uppercase tracking-widest leading-loose mb-auto">
               The private portal for recognised firms to access certificates, verify status, and manage assets.
             </p>
             <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#C5A059] mt-8">
               Secure Login <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
             </div>
          </Link>

        </div>
      </section>
      
      <Footer />
    </main>
  );
}
