import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CatalogueCard } from "@/components/ui/CatalogueCard";
import { CategoryList } from "@/components/ui/CategoryList";
import { Search, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function indexPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-gold-500/30 flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 lg:pt-40 pb-32 w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[1920px] mx-auto">
        
        {/* 1. HERO SECTION */}
        <div className="mb-24 md:mb-32 max-w-4xl">
          <div className="inline-flex items-center space-x-3 mb-6">
            <span className="w-8 h-[1px] bg-gold-500/50" />
            <span className="text-[0.65rem] md:text-[0.7rem] uppercase tracking-[0.3em] text-gold-400/90 font-medium">
              The Annual Editorial Catalogue
            </span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white/95 leading-[1.1] tracking-wide mb-8">
            EXPLORE THE JURIS STANDARD INDEX™
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 font-light tracking-wide max-w-2xl mb-12 leading-relaxed">
            The Global Editorial Benchmark of Excellence Across the Legal Profession. Explore the world's most distinguished legal professionals, leading law firms and editorial intelligence recognised through Juris Standard's independent editorial framework.
          </p>
          
          <div className="relative max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white/30" />
            </div>
            <input
              type="text"
              placeholder="Search by practice area, firm, or professional..."
              className="w-full bg-[#111] border border-white/10 rounded-sm py-4 pl-12 pr-4 text-white/90 placeholder:text-white/30 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all font-light tracking-wide"
            />
          </div>
        </div>

        {/* 2. FEATURED EDITORIAL COLLECTIONS */}
        <div className="mb-32">
          <div className="mb-12">
            <h2 className="text-[0.8rem] md:text-[0.9rem] uppercase tracking-[0.3em] text-gold-500 font-medium flex items-center">
              <span className="mr-3">⭐</span> Featured Editorial Collections
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* The two signature brands dominating the layout */}
            <CatalogueCard 
              title="LAW FIRM EXCELLENCE"
              description="The definitive recognition for institutions setting the highest standards of legal excellence."
              href="/juris-index/law-firms"
              isSignature={true}
              className="lg:col-span-2"
            />
            <CatalogueCard 
              title="CORPORATE ELITE"
              description="Recognising the world's most distinguished corporate legal professionals."
              href="/juris-index/professionals/corporate-elite"
              isSignature={true}
              className="lg:col-span-2"
            />
            
            {/* The remaining 6 featured collections */}
            <CatalogueCard 
              title="Litigation Masters"
              description="Recognising exceptional advocates and dispute resolution specialists."
              href="/juris-index/professionals/litigation-masters"
              className="lg:col-span-1"
            />
            <CatalogueCard 
              title="Arbitration Leaders"
              description="Recognising excellence in domestic and international arbitration."
              href="/juris-index/professionals/arbitration-leaders"
              className="lg:col-span-1"
            />
            <CatalogueCard 
              title="General Counsel"
              description="Recognising outstanding in-house legal leadership."
              href="/juris-index/professionals/general-counsel"
              className="lg:col-span-1"
            />
            <CatalogueCard 
              title="Women Leaders"
              description="Recognising influential women shaping the legal profession."
              href="/juris-index/professionals/women-leaders"
              className="lg:col-span-1"
            />
            <CatalogueCard 
              title="Future Leaders"
              description="Recognising the next generation of exceptional legal professionals."
              href="/juris-index/professionals/future-leaders"
              className="lg:col-span-2 lg:max-w-[70%]"
            />
            <CatalogueCard 
              title="Legal Innovators"
              description="Recognising individuals and organisations redefining the future of legal services."
              href="/juris-index/innovators"
              className="lg:col-span-2 lg:max-w-[70%] justify-self-end"
            />
          </div>
        </div>

        {/* 3. LAW FIRMS */}
        <CategoryList 
          sectionTitle="LAW FIRMS"
          groups={[
            {
              title: "Business & Corporate",
              items: [
                { name: "Corporate Excellence", href: "/juris-index/law-firms/corporate" },
                { name: "Banking & Finance Excellence", href: "/juris-index/law-firms/banking" },
                { name: "Capital Markets Excellence", href: "/juris-index/law-firms/capital-markets" },
                { name: "Mergers & Acquisitions Excellence", href: "/juris-index/law-firms/ma" },
                { name: "Private Equity & Venture Capital Excellence", href: "/juris-index/law-firms/pe-vc" }
              ]
            },
            {
              title: "Tax & Regulatory",
              items: [
                { name: "Direct Tax Excellence", href: "/juris-index/law-firms/direct-tax" },
                { name: "Indirect Tax Excellence", href: "/juris-index/law-firms/indirect-tax" },
                { name: "Competition & Antitrust Excellence", href: "/juris-index/law-firms/competition" },
                { name: "Regulatory & Compliance Excellence", href: "/juris-index/law-firms/regulatory" },
                { name: "Insolvency & Restructuring Excellence", href: "/juris-index/law-firms/insolvency" }
              ]
            },
            {
              title: "Disputes",
              items: [
                { name: "Dispute Resolution Excellence", href: "/juris-index/law-firms/dispute-resolution" },
                { name: "Arbitration Excellence", href: "/juris-index/law-firms/arbitration" },
                { name: "White Collar Defence Excellence", href: "/juris-index/law-firms/white-collar" }
              ]
            },
            {
              title: "Specialist Practice",
              items: [
                { name: "Real Estate Excellence", href: "/juris-index/law-firms/real-estate" },
                { name: "Infrastructure & Projects Excellence", href: "/juris-index/law-firms/projects" },
                { name: "Energy & Natural Resources Excellence", href: "/juris-index/law-firms/energy" },
                { name: "Technology, Media & Telecommunications", href: "/juris-index/law-firms/tmt" },
                { name: "Data Privacy & Cybersecurity", href: "/juris-index/law-firms/privacy" },
                { name: "Intellectual Property Excellence", href: "/juris-index/law-firms/ip" },
                { name: "Healthcare & Life Sciences Excellence", href: "/juris-index/law-firms/healthcare" },
                { name: "Employment & Labour Excellence", href: "/juris-index/law-firms/employment" },
                { name: "Insurance Excellence", href: "/juris-index/law-firms/insurance" },
                { name: "International Trade Excellence", href: "/juris-index/law-firms/trade" }
              ]
            },
            {
              title: "Institutional Excellence",
              items: [
                { name: "Full-Service Excellence", href: "/juris-index/law-firms/full-service" },
                { name: "Boutique Firm Excellence", href: "/juris-index/law-firms/boutique" },
                { name: "International Practice Excellence", href: "/juris-index/law-firms/international" },
                { name: "Regional Firm Excellence", href: "/juris-index/law-firms/regional" }
              ]
            }
          ]}
        />

        {/* 4. LEGAL PROFESSIONALS */}
        <CategoryList 
          sectionTitle="LEGAL PROFESSIONALS"
          groups={[
            {
              title: "Leadership",
              items: [
                { name: "Corporate Elite", href: "/juris-index/professionals/corporate-elite" },
                { name: "Litigation Masters", href: "/juris-index/professionals/litigation-masters" },
                { name: "Arbitration Leaders", href: "/juris-index/professionals/arbitration-leaders" },
                { name: "General Counsel", href: "/juris-index/professionals/general-counsel" },
                { name: "Women Leaders", href: "/juris-index/professionals/women-leaders" },
                { name: "Future Leaders", href: "/juris-index/professionals/future-leaders" },
                { name: "Legal Innovators", href: "/juris-index/innovators" }
              ]
            },
            {
              title: "Business & Corporate",
              items: [
                { name: "Corporate & Commercial Leaders", href: "/juris-index/professionals/corporate" },
                { name: "Banking & Finance Leaders", href: "/juris-index/professionals/banking" },
                { name: "Capital Markets Leaders", href: "/juris-index/professionals/capital-markets" },
                { name: "Mergers & Acquisitions Leaders", href: "/juris-index/professionals/ma" },
                { name: "Private Equity & Venture Capital Leaders", href: "/juris-index/professionals/pe-vc" }
              ]
            },
            {
              title: "Tax & Regulatory",
              items: [
                { name: "Direct Tax Leaders", href: "/juris-index/professionals/direct-tax" },
                { name: "Indirect Tax Leaders", href: "/juris-index/professionals/indirect-tax" },
                { name: "Competition & Antitrust Leaders", href: "/juris-index/professionals/competition" },
                { name: "Regulatory & Compliance Leaders", href: "/juris-index/professionals/regulatory" },
                { name: "Insolvency & Restructuring Leaders", href: "/juris-index/professionals/insolvency" }
              ]
            },
            {
              title: "Disputes",
              items: [
                { name: "White Collar Defence Leaders", href: "/juris-index/professionals/white-collar" }
              ]
            },
            {
              title: "Specialist Practice",
              items: [
                { name: "Real Estate Leaders", href: "/juris-index/professionals/real-estate" },
                { name: "Infrastructure & Projects Leaders", href: "/juris-index/professionals/projects" },
                { name: "Energy & Natural Resources Leaders", href: "/juris-index/professionals/energy" },
                { name: "Technology, Media & Telecommunications", href: "/juris-index/professionals/tmt" },
                { name: "Data Privacy & Cybersecurity Leaders", href: "/juris-index/professionals/privacy" },
                { name: "Intellectual Property Leaders", href: "/juris-index/professionals/ip" },
                { name: "Healthcare & Life Sciences Leaders", href: "/juris-index/professionals/healthcare" },
                { name: "Employment & Labour Leaders", href: "/juris-index/professionals/employment" },
                { name: "Insurance Leaders", href: "/juris-index/professionals/insurance" },
                { name: "International Trade Leaders", href: "/juris-index/professionals/trade" },
                { name: "Constitutional & Public Law Leaders", href: "/juris-index/professionals/constitutional" }
              ]
            }
          ]}
        />

        {/* 5, 6, 7. STRIP SECTIONS (Intelligence, Media/Tech, Archive) */}
        <div className="border-t border-white/10 pt-16 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8">
            
            {/* EDITORIAL INTELLIGENCE */}
            <div>
              <h3 className="text-[0.8rem] font-medium text-white/90 uppercase tracking-[0.2em] mb-8 pb-4 border-b border-white/5">
                EDITORIAL INTELLIGENCE
              </h3>
              <ul className="flex flex-col space-y-4">
                {["Annual Review", "Global Legal Intelligence", "Research Reports", "Market Insights", "Editorial Features", "Special Publications"].map((item, idx) => (
                  <li key={idx}>
                    <Link href="#" className="group flex items-center justify-between text-sm text-neutral-400 font-light tracking-wide hover:text-gold-300 transition-colors">
                      {item}
                      <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* LEGAL MEDIA & TECH */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-[0.8rem] font-medium text-white/90 uppercase tracking-[0.2em] mb-8 pb-4 border-b border-white/5">
                  LEGAL MEDIA
                </h3>
                <ul className="flex flex-col space-y-4">
                  {["Editorial Excellence", "Legal Publications", "Legal Journals", "Digital Legal Media", "Podcasts", "Research Publications"].map((item, idx) => (
                    <li key={idx}>
                      <Link href="#" className="group flex items-center text-sm text-neutral-400 font-light tracking-wide hover:text-gold-300 transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-[0.8rem] font-medium text-white/90 uppercase tracking-[0.2em] mb-8 pb-4 border-b border-white/5">
                  LEGAL TECH
                </h3>
                <ul className="flex flex-col space-y-4">
                  {["Innovation Excellence", "Artificial Intelligence", "Legal Research", "Contract Technology", "Practice Management", "Litigation Technology"].map((item, idx) => (
                    <li key={idx}>
                      <Link href="#" className="group flex items-center text-sm text-neutral-400 font-light tracking-wide hover:text-gold-300 transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* THE ARCHIVE */}
            <div>
              <h3 className="text-[0.8rem] font-medium text-white/40 uppercase tracking-[0.2em] mb-8 pb-4 border-b border-white/5">
                THE ARCHIVE
              </h3>
              <ul className="flex flex-col space-y-4">
                {["Current Edition", "Editorial Archive", "Historical Editions", "Institutional Publications"].map((item, idx) => (
                  <li key={idx}>
                    <Link href="#" className="text-sm text-neutral-500 font-light tracking-wide hover:text-white/80 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>
      
      <Footer />
    </main>
  );
}
