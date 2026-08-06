import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Search, Briefcase, Calendar, ShieldCheck, Award, Building2, MapPin, Zap } from "lucide-react";
import Link from "next/link";

export default function LegalInnovationPortalPage() {
  return (
    <main className="min-h-screen bg-[#000000] selection:bg-[#C5A059]/30 flex flex-col font-sans text-[#FFFFF0]">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="relative w-full pt-40 pb-32 border-b border-[#222222] bg-[#000000]">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[2000px] mx-auto flex flex-col lg:flex-row justify-between items-start gap-24">
          
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#FFFFF0] leading-[1.05] tracking-wide mb-8 font-light">
              LEGAL INNOVATION <br/>
              <span className="font-medium text-[#C5A059]">
                EXCELLENCE<sup className="text-[0.4em] ml-2">™</sup>
              </span>
            </h1>
            
            {/* Editorial Foreword */}
            <div className="p-8 bg-[#111111] border border-[#222222] mb-12">
              <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#C5A059] mb-6">EDITORIAL FOREWORD</h3>
              <p className="text-sm text-[#FFFFF0]/80 font-light leading-relaxed mb-6">
                "Legal Innovation Excellence™ focuses on the organisations advancing the legal ecosystem, not just software vendors. It is the official institutional record of those driving technological and operational transformation within the legal profession globally."
              </p>
              <div className="w-8 h-[1px] bg-[#C5A059]/50" />
            </div>

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
                  placeholder="Search by Organisation, Domain, or Market"
                  className="w-full bg-transparent border-none py-3 pr-4 text-sm text-[#FFFFF0] placeholder:text-[#FFFFF0]/30 focus:outline-none focus:ring-0"
                />
                <button className="px-8 py-3 bg-[#C5A059] text-black text-xs font-semibold tracking-widest uppercase hover:bg-[#D4AF37] transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
          
          {/* DIGITAL RECOGNITION PLAQUE (Visual Anchor & Verification) */}
          <div className="w-full lg:w-[400px] shrink-0">
             <div className="bg-[#111111] border border-[#222222] p-10 flex flex-col relative">
               <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FFFFF0] mb-2">Recognition Verification</h3>
               <p className="text-[0.7rem] uppercase tracking-widest text-[#C5A059] mb-8">Official Database</p>
               
               <p className="text-xs text-[#FFFFF0]/60 leading-relaxed mb-8">
                 Verify the official status and standing of any organisation recognised within the Legal Innovation Excellence™ index.
               </p>

               <div className="flex flex-col gap-2">
                 <input 
                   type="text" 
                   placeholder="ENTER RECOGNITION ID"
                   className="w-full bg-[#000000] border border-[#333333] py-4 px-4 text-xs text-[#FFFFF0] placeholder:text-[#FFFFF0]/30 focus:outline-none focus:border-[#C5A059] uppercase"
                 />
                 <button className="w-full py-4 bg-[#C5A059] text-black text-xs font-semibold tracking-widest uppercase hover:bg-[#D4AF37] transition-colors">
                   Verify Status
                 </button>
               </div>
             </div>
          </div>

        </div>
      </section>

      {/* THE INSTITUTIONAL COLLECTIONS */}
      <section className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[2000px] mx-auto py-32 bg-[#000000]">
        
        <div className="flex flex-col gap-4 mb-24">
          <span className="text-xs font-semibold tracking-widest text-[#C5A059] uppercase">Architecture</span>
          <h2 className="font-serif text-4xl text-[#FFFFF0]">Institutional Collections</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Collection 1 */}
          <Link href="/juris-index/legal-innovation/organisations" className="group bg-[#111111] p-12 border border-[#222222] hover:border-[#C5A059] transition-colors flex flex-col h-[320px]">
             <Search className="w-10 h-10 text-[#C5A059] mb-8" strokeWidth={1} />
             <h3 className="font-serif text-2xl text-[#FFFFF0] mb-4">Recognised Organisations</h3>
             <p className="text-[0.7rem] text-[#FFFFF0]/60 uppercase tracking-widest leading-loose mb-auto">
               The official annual institutional record of organisations advancing legal innovation.
             </p>
             <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#C5A059] mt-8">
               Access Record <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
             </div>
          </Link>

          {/* Collection 2 */}
          <div className="group bg-[#111111] p-12 border border-[#222222] hover:border-[#C5A059] transition-colors flex flex-col h-[320px]">
             <Zap className="w-10 h-10 text-[#C5A059] mb-8" strokeWidth={1} />
             <h3 className="font-serif text-2xl text-[#FFFFF0] mb-4">Innovation Domains</h3>
             <p className="text-[0.7rem] text-[#FFFFF0]/60 uppercase tracking-widest leading-loose mb-4">
               Categorising innovation across specific functional solutions.
             </p>
             <div className="flex flex-wrap gap-2 mt-auto">
                {["AI for Legal", "Legal Research", "Contract Lifecycle", "e-Discovery"].map(domain => (
                  <span key={domain} className="text-[0.6rem] text-[#FFFFF0]/80 px-3 py-1.5 border border-[#333333] bg-[#000000] uppercase tracking-wider">
                    {domain}
                  </span>
                ))}
              </div>
          </div>

          {/* Collection 3 */}
          <div className="group bg-[#111111] p-12 border border-[#222222] hover:border-[#C5A059] transition-colors flex flex-col h-[320px]">
             <Briefcase className="w-10 h-10 text-[#C5A059] mb-8" strokeWidth={1} />
             <h3 className="font-serif text-2xl text-[#FFFFF0] mb-4">Organisation Categories</h3>
             <p className="text-[0.7rem] text-[#FFFFF0]/60 uppercase tracking-widest leading-loose mb-4">
               Exploring the type of entity delivering the innovation.
             </p>
             <div className="flex flex-wrap gap-2 mt-auto">
                {["Legal Tech Companies", "AI Companies", "Alternative Legal Services"].map(cat => (
                  <span key={cat} className="text-[0.6rem] text-[#FFFFF0]/80 px-3 py-1.5 border border-[#333333] bg-[#000000] uppercase tracking-wider">
                    {cat}
                  </span>
                ))}
              </div>
          </div>

          {/* Collection 4 */}
          <Link href="/juris-index/legal-innovation/markets" className="group bg-[#111111] p-12 border border-[#222222] hover:border-[#C5A059] transition-colors flex flex-col h-[320px]">
             <Building2 className="w-10 h-10 text-[#C5A059] mb-8" strokeWidth={1} />
             <h3 className="font-serif text-2xl text-[#FFFFF0] mb-4">Browse by Market</h3>
             <p className="text-[0.7rem] text-[#FFFFF0]/60 uppercase tracking-widest leading-loose mb-auto">
               Discover solutions built for Law Firms, Corporate Legal Departments, Judiciary, or Financial Services.
             </p>
             <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#C5A059] mt-8">
               Browse Markets <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
             </div>
          </Link>

          {/* Collection 5 */}
          <Link href="/juris-index/legal-innovation/jurisdictions" className="group bg-[#111111] p-12 border border-[#222222] hover:border-[#C5A059] transition-colors flex flex-col h-[320px]">
             <MapPin className="w-10 h-10 text-[#C5A059] mb-8" strokeWidth={1} />
             <h3 className="font-serif text-2xl text-[#FFFFF0] mb-4">Browse by Jurisdiction</h3>
             <p className="text-[0.7rem] text-[#FFFFF0]/60 uppercase tracking-widest leading-loose mb-auto">
               Geographic discovery across global tech hubs (India, Singapore, UK, US).
             </p>
             <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#C5A059] mt-8">
               Browse Jurisdictions <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
             </div>
          </Link>

          {/* Collection 6 */}
          <Link href="/juris-index/legal-innovation/archive" className="group bg-[#111111] p-12 border border-[#222222] hover:border-[#C5A059] transition-colors flex flex-col h-[320px]">
             <Calendar className="w-10 h-10 text-[#C5A059] mb-8" strokeWidth={1} />
             <h3 className="font-serif text-2xl text-[#FFFFF0] mb-4">Annual Editions</h3>
             <p className="text-[0.7rem] text-[#FFFFF0]/60 uppercase tracking-widest leading-loose mb-auto">
               Permanent institutional archive. Recognition history is preserved forever.
             </p>
             <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#C5A059] mt-8">
               View Archive <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
             </div>
          </Link>

          {/* Collection 7 */}
          <div className="group bg-[#111111] p-12 border border-[#222222] hover:border-[#C5A059] transition-colors flex flex-col h-[320px] md:col-span-2 lg:col-span-3">
             <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full h-full">
               <div className="flex flex-col">
                 <ShieldCheck className="w-10 h-10 text-[#C5A059] mb-8" strokeWidth={1} />
                 <h3 className="font-serif text-2xl text-[#FFFFF0] mb-4">Recognition Assets</h3>
                 <p className="text-[0.7rem] text-[#FFFFF0]/60 uppercase tracking-widest leading-loose max-w-lg mb-8">
                   Every recognised Organisation receives official Institutional Certificates, Digital Recognition Plaques, and Verification Badges.
                 </p>
                 <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#C5A059]">
                   Access Assets <ArrowRight className="w-4 h-4" />
                 </div>
               </div>
               <div className="w-full lg:w-1/3 bg-[#000000] border border-[#333333] p-8 flex items-center justify-center h-full">
                 <Award className="w-16 h-16 text-[#C5A059]" strokeWidth={0.5} />
               </div>
             </div>
          </div>

        </div>
      </section>
      
      <Footer />
    </main>
  );
}
