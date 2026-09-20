import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowLeft, ArrowRight, BookOpen,
  FileText, Users, Scale, Landmark,
  Copy, Award, Code2, QrCode, MapPin, Building2, ExternalLink
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { FirmHeroActions } from "./FirmHeroActions";

interface JurisRecord {
  id: string;
  recognitionId: string;
  name: string;
  type: string;
  division: string;
  category: string;
  tier: string;
  year: string;
  location: string;
  jurisdiction: string;
  practiceAreas: string[];
  status: string;
  badge: string;
  logoType: string;
  whyThisRecord: string;
  firmInfo: { founded?: string; size?: string; description?: string };
  recognitionHistory: { year: string; division: string; category: string }[];
  relatedRecords: { name: string; type: string; id: string }[];
}

async function getRecord(id: string): Promise<JurisRecord | null> {
  try {
    const { data, error } = await supabase
      .from("juris_records")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;
    return data as JurisRecord;
  } catch {
    return null;
  }
}

export default async function JurisStandardRecordPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const record = await getRecord(id);
  if (!record) return notFound();

  const practiceAreasDisplay = record.practiceAreas?.length
    ? record.practiceAreas.slice(0, 4).join(" | ") + (record.practiceAreas.length > 4 ? " | and more" : "")
    : "Corporate & M&A | Banking & Finance | Dispute Resolution";

  const citationText = `The Juris Standard™. "${record.name} — ${record.division}™." ${record.year}. Juris Standard Record ${record.recognitionId}.`;
  
  const luxurySerif = "Playfair Display, Georgia, serif";

  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-[#CBAA69]/30 flex flex-col font-sans text-neutral-300 overflow-x-hidden">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full flex flex-col pt-28 pb-10 lg:pt-32 lg:pb-12 border-b border-[#1a1a1a]">
        
        {/* Cinematic Dark Background matching homepage/Corporate Elite */}
        <div className="absolute inset-0 z-0 bg-[#050505]">
           {/* Enhanced top-right gold glow */}
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(203,170,105,0.15)_0%,transparent_70%)] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
           {/* Enhanced center ambient glow */}
           <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(203,170,105,0.08)_0%,transparent_70%)] -translate-x-1/3 -translate-y-1/2 pointer-events-none" />
           {/* Base vignette */}
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)]" />
        </div>

        <div className="w-full px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto relative z-10 flex flex-col flex-1">
          
          {/* Top Bar for Back button */}
          <div className="flex justify-between items-center mb-8 border-b border-white/[0.05] pb-6">
            <Link href="/juris-index/legal-innovation" className="flex items-center gap-3 text-[0.6rem] uppercase tracking-widest text-white/50 hover:text-[#CBAA69] transition-colors font-medium">
              <ArrowLeft className="w-4 h-4" /> Back to Legal Innovation Excellence™
            </Link>
            <span className="text-[0.55rem] uppercase tracking-[0.4em] text-[#CBAA69]/30 hidden md:block">RECOGNISE. VERIFY. PRESERVE.</span>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-12 items-center lg:items-stretch flex-1">
            
            {/* LEFT CONTENT COLUMN */}
            <div className="lg:col-span-7 flex flex-col justify-center max-w-3xl flex-1">
              
              <div className="inline-flex items-center gap-4 mb-6">
                <span className="w-8 h-[1px] bg-gradient-to-r from-[#CBAA69] to-transparent" />
                <h4 className="text-[0.65rem] tracking-[0.3em] bg-gradient-to-r from-[#CBAA69] via-[#FDF2D5] to-[#CBAA69] bg-clip-text text-transparent uppercase font-semibold inline-block">
                  Legal Innovation Excellence™
                </h4>
              </div>
              
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl bg-gradient-to-b from-[#FFFFFF] via-[#EAEAEA] to-[#888888] bg-clip-text text-transparent tracking-wider uppercase mb-6 leading-[1.05] break-words drop-shadow-[0_2px_15px_rgba(255,255,255,0.1)]">
                {record.name}
              </h1>

              <div className="flex items-center gap-4 text-[0.6rem] tracking-[0.25em] uppercase mb-5">
                <span className="px-3 py-1 bg-gradient-to-r from-[#CBAA69]/20 to-[#CBAA69]/5 text-[#CBAA69] border border-[#CBAA69]/30 rounded-[2px] font-semibold shadow-[0_0_15px_rgba(203,170,105,0.1)] inline-flex">RECOGNISED · {record.year}</span>
              </div>

              <p className="font-serif italic text-xl md:text-2xl text-white/80 mb-8 max-w-xl">
                A mark of enduring excellence in the legal profession.
              </p>

              {/* Meta info block */}
              <div className="flex flex-wrap items-center justify-between gap-6 p-6 mb-8 bg-gradient-to-br from-[#CBAA69]/[0.08] to-transparent border border-[#CBAA69]/20 rounded-[4px] shadow-[inset_0_1px_0_0_rgba(203,170,105,0.1)] relative overflow-hidden">
                {/* Subtle gold glow inside meta box */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#CBAA69]/[0.03] to-transparent pointer-events-none" />
                
                <div className="flex flex-col gap-1.5 relative z-10">
                  <span className="text-[0.55rem] font-sans tracking-[0.25em] text-white/50 uppercase font-medium">Record ID</span>
                  <span className="text-[0.8rem] text-white/90 font-serif tracking-wider">{record.recognitionId}</span>
                </div>
                <div className="w-[1px] h-8 bg-[#CBAA69]/20 hidden sm:block relative z-10" />
                <div className="flex flex-col gap-1.5 relative z-10">
                  <span className="text-[0.55rem] font-sans tracking-[0.25em] text-white/50 uppercase font-medium">Status</span>
                  <span className="flex items-center gap-2 text-[0.8rem] text-white/90 uppercase tracking-widest font-serif">
                    <span className="w-2 h-2 rounded-full bg-[#CBAA69] shadow-[0_0_10px_rgba(203,170,105,0.6)]" />
                    {record.status === "active" ? "Active" : record.status}
                  </span>
                </div>
                <div className="w-[1px] h-8 bg-[#CBAA69]/20 hidden sm:block relative z-10" />
                <div className="flex flex-col gap-1.5 relative z-10">
                  <span className="text-[0.55rem] font-sans tracking-[0.25em] text-white/50 uppercase font-medium">Year</span>
                  <span className="text-[0.8rem] text-white/90 font-serif tracking-wider">{record.year}</span>
                </div>
                <div className="w-[1px] h-8 bg-[#CBAA69]/20 hidden md:block relative z-10" />
                <div className="flex flex-col gap-1.5 relative z-10">
                  <span className="text-[0.55rem] font-sans tracking-[0.25em] text-white/50 uppercase font-medium">Division</span>
                  <span className="text-[0.8rem] text-white/90 font-serif tracking-wider">{record.division}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-2">
                <FirmHeroActions
                  recordId={record.id}
                  recordName={record.name}
                  recordDiv={record.division}
                  recordYear={record.year}
                />
              </div>
            </div>

            {/* RIGHT COLUMN - MEDALLION & TEXT */}
            <div className="lg:col-span-5 relative hidden lg:flex flex-col items-center justify-center shrink-0 lg:w-[450px] py-4 border-l-0 lg:border-l lg:border-[#CBAA69]/10">
              
              <div className="flex flex-col items-center text-center w-full relative">
                <div className="w-[320px] h-[320px] xl:w-[380px] xl:h-[380px] relative mb-12 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#CBAA69]/20 via-[#CBAA69]/5 to-transparent rounded-full blur-3xl opacity-90" />
                  <img 
                    src="/logo/seal main.png" 
                    alt="The Juris Standard Seal" 
                    className="w-[85%] h-[85%] object-contain relative z-10 drop-shadow-2xl" 
                  />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 w-full mt-auto pt-8 border-t border-white/5">
                <span className="text-[0.55rem] font-sans tracking-[0.35em] text-[#CBAA69]/80 uppercase font-medium">INDEPENDENT · INSIGHTFUL · DEFINITIVE</span>
                <span className="text-[0.5rem] font-sans tracking-[0.35em] text-white/40 uppercase">PEOPLE · FIRMS · IDEAS · IMPACT</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — THE RECOGNITION / INSTITUTION / STANDARD
      ═══════════════════════════════════════════════════════ */}
      <section className="w-full bg-gradient-to-b from-[#0a0a0a] to-[#050505] border-b border-[#1a1a1a] py-10 lg:py-12">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* THE RECOGNITION (Span 6) */}
            <div className="lg:col-span-6 flex flex-col justify-center relative pr-0 lg:pr-12">
              <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(203,170,105,0.06)_0%,transparent_70%)] -translate-y-1/2 pointer-events-none" />
              
              <div className="inline-flex items-center gap-3 mb-6 relative z-10">
                <span className="w-6 h-[1px] bg-[#CBAA69]/50" />
                <span className="text-[0.55rem] font-sans uppercase tracking-[0.3em] text-[#CBAA69] font-medium">
                  THE RECOGNITION
                </span>
              </div>
              
              <p className="text-lg md:text-xl lg:text-[1.35rem] text-white/90 leading-[1.6] font-serif font-light relative z-10">
                &ldquo;{record.whyThisRecord || "Recognised for exceptional legal capability, enduring professional excellence and a distinguished contribution to the legal profession."}&rdquo;
              </p>
              
              <Link
                href="#"
                className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-[#CBAA69]/70 hover:text-[#CBAA69] transition-colors flex items-center gap-2 mt-8 relative z-10 w-max"
              >
                The Standard behind this recognition
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* THE INSTITUTION (Span 3) */}
            <div className="lg:col-span-3 flex flex-col lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-12">
              <span className="text-[0.55rem] font-sans uppercase tracking-[0.3em] text-white/30 font-medium mb-8">
                THE INSTITUTION
              </span>
              
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[0.5rem] font-sans uppercase tracking-[0.25em] text-white/30">Established</span>
                  <span className="text-[0.8rem] text-white/50 font-light">{record.firmInfo?.founded || "—"}</span>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <span className="text-[0.5rem] font-sans uppercase tracking-[0.25em] text-white/30">Headquarters</span>
                  <span className="text-[0.8rem] text-white/50 font-light">{record.location || "—"}, {record.jurisdiction || "India"}</span>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <span className="text-[0.5rem] font-sans uppercase tracking-[0.25em] text-white/30">Key Practice Areas</span>
                  <span className="text-[0.75rem] text-white/50 leading-[1.6] font-light">{practiceAreasDisplay}</span>
                </div>
              </div>
            </div>

            {/* THE STANDARD (Span 3) */}
            <div className="lg:col-span-3 flex flex-col lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-12">
              <span className="text-[0.55rem] font-sans uppercase tracking-[0.3em] text-white/30 font-medium mb-8">
                THE STANDARD
              </span>
              
              <p className="text-[0.75rem] text-white/40 leading-[1.8] font-light mb-6">
                Recognition reflects the Juris Standard&apos;s assessment of sustained professional excellence, capability and contribution to the legal profession.
              </p>
              
              <Link
                href="/methodology"
                className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors flex items-center gap-2 mt-auto w-max"
              >
                Our Methodology
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — WITHIN THE JURIS STANDARD™
      ═══════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#050505] border-b border-[#1a1a1a] py-10 lg:py-12">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <p className="text-[0.55rem] font-sans uppercase tracking-[0.3em] text-[#CBAA69] mb-6 font-medium">
            WITHIN THE JURIS STANDARD™
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { Icon: Users, title: "Recognised Professionals", href: "/juris-index/professionals" },
              { Icon: Scale, title: "Related Practice Areas", href: "#" },
              { Icon: Landmark, title: "Related Organisations", href: "#" },
              { Icon: FileText, title: "Other Records", href: "/juris-index/legal-innovation" },
            ].map(({ Icon, title, href }, idx) => (
              <Link
                key={idx}
                href={href}
                className="flex items-center gap-4 p-4 lg:p-5 bg-gradient-to-r from-white/[0.03] to-transparent border border-white/[0.05] hover:border-[#CBAA69]/40 hover:bg-white/[0.05] transition-all duration-300 rounded-[6px] group"
              >
                <div className="w-10 h-10 rounded-full bg-black/50 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-[#CBAA69]/40 transition-all">
                  <Icon className="w-4 h-4 text-white/40 group-hover:text-[#CBAA69] transition-colors" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.75rem] text-white/90 font-medium group-hover:text-white transition-colors">{title}</span>
                  <span className="text-[0.55rem] text-[#CBAA69]/50 uppercase tracking-[0.2em] font-medium flex items-center gap-1">Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — THE RECOGNITION VAULT DASHBOARD
      ═══════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#050505] py-10 lg:py-12">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          
          <div className="w-full bg-gradient-to-br from-[#080808] to-[#030303] border border-white/[0.05] rounded-[12px] flex flex-col lg:flex-row shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative">
            
            {/* Ambient inner top glow */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#CBAA69]/30 to-transparent z-10" />

            {/* Left: OFFICIAL VERIFICATION */}
            <div className="w-full lg:w-1/4 p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/5 bg-white/[0.01] flex flex-col relative z-20">
              <span className="text-[0.55rem] font-sans uppercase tracking-[0.3em] text-[#CBAA69] font-medium mb-8">
                OFFICIAL VERIFICATION
              </span>
              
              <div className="bg-white p-3 rounded-[6px] w-[110px] h-[110px] mb-10 shadow-xl flex items-center justify-center">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://jurisstandard.com/record/${record.recognitionId}`} alt="QR Code" className="w-full h-full opacity-90" />
              </div>
              
              <div className="flex flex-col gap-6 mt-auto">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[0.5rem] font-sans uppercase tracking-[0.25em] text-white/40">Record ID</span>
                  <span className="text-sm text-white/90 font-medium tracking-wider">{record.recognitionId}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[0.5rem] font-sans uppercase tracking-[0.25em] text-white/40">Status</span>
                  <span className="flex items-center gap-2 text-[0.7rem] text-emerald-400 font-medium tracking-widest uppercase">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Center: THE RECOGNITION VAULT */}
            <div className="w-full lg:w-2/4 p-12 lg:p-16 relative flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(203,170,105,0.06)_0%,transparent_100%)]">
              
              <div className="flex items-center gap-3 mb-10">
                <span className="w-2 h-2 rounded-full bg-[#CBAA69] shadow-[0_0_10px_rgba(203,170,105,0.8)] animate-pulse" />
                <span className="text-[0.65rem] font-sans uppercase tracking-[0.4em] text-[#CBAA69] font-semibold drop-shadow-[0_0_10px_rgba(203,170,105,0.5)]">
                  THE RECOGNITION VAULT™
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full relative z-10">
                {[
                  { Icon: Award, label: "Official Certificate", sub: "View / Download", href: `/juris-index/legal-innovation/${record.id}/certificate` },
                  { Icon: FileText, label: "Share Card", sub: "Create / Share", href: `/juris-index/legal-innovation/${record.id}/share` },
                  { Icon: Code2, label: "Website Seal", sub: "Get / Install", href: "#" },
                ].map(({ Icon, label, sub, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex flex-col items-center text-center gap-4 py-8 px-4 bg-[#050505] border border-[#CBAA69]/20 rounded-[8px] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(203,170,105,0.15)] hover:border-[#CBAA69]/60 hover:bg-[#0a0805] transition-all duration-300 group"
                  >
                    <Icon className="w-8 h-8 text-[#CBAA69]/50 group-hover:text-[#CBAA69] transition-colors" strokeWidth={1.2} />
                    <div className="flex flex-col gap-1.5 items-center">
                       <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-[#CBAA69]/90 group-hover:text-white transition-colors">{label}</span>
                       <span className="text-[0.5rem] uppercase tracking-[0.2em] text-[#CBAA69]/40 group-hover:text-[#CBAA69]/80 font-medium">{sub}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: CITE THIS RECORD */}
            <div className="w-full lg:w-1/4 p-10 lg:p-12 border-t lg:border-t-0 lg:border-l border-white/5 bg-white/[0.01] flex flex-col relative z-20">
              <span className="text-[0.55rem] font-sans uppercase tracking-[0.3em] text-[#CBAA69] font-medium mb-8">
                CITE THIS RECORD
              </span>
              
              <div className="flex gap-4 items-start bg-transparent py-2 flex-1">
                <span className="text-4xl text-[#CBAA69]/30 leading-none select-none font-serif">&ldquo;</span>
                <p className="text-[0.8rem] text-white/60 leading-[1.8] font-light italic mt-2 font-serif">
                  {citationText}
                </p>
              </div>
              
              <button className="flex items-center justify-center gap-2.5 w-full py-4 mt-8 bg-white/[0.03] border border-white/10 text-white/80 text-[0.6rem] font-medium uppercase tracking-[0.25em] hover:bg-white/[0.08] hover:text-[#CBAA69] hover:border-[#CBAA69]/50 transition-all rounded-[6px]">
                <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
                Copy Citation
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Related Records */}
      {record.relatedRecords && record.relatedRecords.length > 0 && (
        <section className="w-full bg-[#050505] border-t border-[#1a1a1a]">
          <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16 py-10 lg:py-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-[1px] h-6 bg-[#CBAA69]" />
              <h2 className="text-[0.55rem] font-medium uppercase tracking-[0.3em] text-white/50">
                RELATED RECORDS
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {record.relatedRecords.map((rel: any, idx: number) => (
                <Link
                  key={idx}
                  href={`/juris-index/${rel.type === 'firm' ? 'law-firms' : 'professionals'}/${rel.id}`}
                  className="flex flex-col p-6 bg-[#0a0a0a] border border-white/5 hover:border-[#CBAA69]/30 transition-colors group"
                >
                  <span className="text-[0.5rem] uppercase tracking-widest text-[#CBAA69]/60 mb-2 font-medium">
                    {rel.division}
                  </span>
                  <h3 className="text-lg text-white/90 font-serif tracking-wide group-hover:text-[#CBAA69] transition-colors mb-4">
                    {rel.name}
                  </h3>
                  <div className="flex items-center justify-between text-[0.6rem] text-white/40 uppercase tracking-widest mt-auto">
                    <span>{rel.year}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
