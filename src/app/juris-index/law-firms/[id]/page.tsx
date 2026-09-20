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
  
  // High-end serif font fallback for maximum elegance
  const luxurySerif = "Playfair Display, Georgia, serif";

    <main className="min-h-screen bg-[#0a0a0a] selection:bg-[#CBAA69]/30 flex flex-col font-sans text-neutral-300 overflow-x-hidden">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[600px] flex flex-col pt-32 pb-16 lg:pt-36 lg:pb-16 border-b border-[#1a1a1a]">
        
        {/* Cinematic Dark Background matching homepage/Corporate Elite */}
        <div className="absolute inset-0 z-0 bg-[#050505]">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)]" />
           <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
        </div>

        <div className="w-full px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto relative z-10 flex flex-col flex-1">
          
          {/* Top Bar for Back button */}
          <div className="flex justify-between items-center mb-12 border-b border-white/[0.05] pb-6">
            <Link href="/juris-index/law-firms" className="flex items-center gap-3 text-[0.6rem] uppercase tracking-widest text-white/50 hover:text-[#CBAA69] transition-colors font-medium">
              <ArrowLeft className="w-4 h-4" /> Back to Law Firm Excellence™
            </Link>
            <span className="text-[0.55rem] uppercase tracking-[0.4em] text-white/30 hidden md:block">RECOGNISE. VERIFY. PRESERVE.</span>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-12 items-center lg:items-stretch flex-1">
            
            {/* LEFT CONTENT COLUMN */}
            <div className="lg:col-span-7 flex flex-col justify-center max-w-3xl flex-1">
              
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-6 h-[1px] bg-[#CBAA69]/50" />
                <h4 className="text-[0.65rem] tracking-[0.3em] text-[#CBAA69] uppercase font-medium">Law Firm Excellence™</h4>
              </div>
              
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white tracking-wider uppercase mb-6 leading-[1.05] break-words">
                {record.name}
              </h1>

              <div className="flex items-center gap-4 text-[0.6rem] tracking-[0.25em] uppercase mb-4">
                <span className="px-3 py-1 bg-[#CBAA69]/10 text-[#CBAA69] border border-[#CBAA69]/20 rounded-sm font-semibold">RECOGNISED · {record.year}</span>
              </div>

              <p className="font-serif italic text-xl md:text-2xl text-white/80 mb-12 max-w-xl">
                A mark of enduring excellence in the legal profession.
              </p>

              {/* Meta info row */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-6 mb-10 border-t border-b border-white/5 py-6">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[0.55rem] font-sans tracking-[0.2em] text-white/30 uppercase">Record ID</span>
                  <span className="text-[0.8rem] text-white/80 font-serif">{record.recognitionId}</span>
                </div>
                <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
                <div className="flex flex-col gap-1.5">
                  <span className="text-[0.55rem] font-sans tracking-[0.2em] text-white/30 uppercase">Status</span>
                  <span className="flex items-center gap-2 text-[0.8rem] text-white/80 uppercase tracking-widest font-serif">
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
                    {record.status === "active" ? "Active" : record.status}
                  </span>
                </div>
                <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
                <div className="flex flex-col gap-1.5">
                  <span className="text-[0.55rem] font-sans tracking-[0.2em] text-white/30 uppercase">Recognition Year</span>
                  <span className="text-[0.8rem] text-white/80 font-serif">{record.year}</span>
                </div>
                <div className="w-[1px] h-8 bg-white/10 hidden md:block" />
                <div className="flex flex-col gap-1.5">
                  <span className="text-[0.55rem] font-sans tracking-[0.2em] text-white/30 uppercase">Division</span>
                  <span className="text-[0.8rem] text-white/80 font-serif">{record.division}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-auto">
                <FirmHeroActions
                  recordId={record.id}
                  recordName={record.name}
                  recordDiv={record.division}
                  recordYear={record.year}
                />
              </div>
            </div>

            {/* RIGHT COLUMN - MEDALLION & TEXT */}
            <div className="lg:col-span-5 relative hidden lg:flex flex-col items-center justify-center shrink-0 lg:w-[450px] py-4 border-l-0 lg:border-l lg:border-white/5">
              
              <div className="flex flex-col items-center text-center w-full relative">
                <div className="w-[320px] h-[320px] xl:w-[380px] xl:h-[380px] relative mb-12 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#CBAA69]/5 rounded-full blur-3xl opacity-50" />
                  <img 
                    src="/logo/seal main.png" 
                    alt="The Juris Standard Seal" 
                    className="w-[85%] h-[85%] object-contain relative z-10 drop-shadow-2xl" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 w-full gap-8 px-6 text-center mt-auto">
                <div className="flex flex-col gap-1.5 border-r border-white/5 pr-4">
                  <span className="text-[0.45rem] tracking-[0.3em] text-[#CBAA69]/70 uppercase">INDEPENDENT.</span>
                  <span className="text-[0.45rem] tracking-[0.3em] text-[#CBAA69]/70 uppercase">INSIGHTFUL.</span>
                  <span className="text-[0.45rem] tracking-[0.3em] text-[#CBAA69]/70 uppercase">DEFINITIVE.</span>
                </div>
                <div className="flex flex-col gap-1.5 pl-4 justify-center">
                  <span className="text-[0.45rem] tracking-[0.3em] text-white/30 uppercase">PEOPLE.</span>
                  <span className="text-[0.45rem] tracking-[0.3em] text-white/30 uppercase">FIRMS.</span>
                  <span className="text-[0.45rem] tracking-[0.3em] text-white/30 uppercase">IDEAS.</span>
                  <span className="text-[0.45rem] tracking-[0.3em] text-white/30 uppercase">IMPACT.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — THE RECOGNITION / INSTITUTION / STANDARD
      ═══════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#050505] border-b border-[#1a1a1a]">
        <div className="w-full max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — THE RECOGNITION */}
          <div className="border-r border-b lg:border-b-0 border-white/5 p-10 lg:p-12 flex flex-col gap-6">
            <span className="text-[0.55rem] font-sans uppercase tracking-[0.3em] text-[#CBAA69] font-medium drop-shadow-sm">
              THE RECOGNITION
            </span>
            <blockquote className="text-lg lg:text-xl text-white/80 leading-[1.6] italic font-serif">
              &ldquo;{record.whyThisRecord || "Recognised for exceptional legal capability, enduring professional excellence and a distinguished contribution to the legal profession."}&rdquo;
            </blockquote>
            <Link
              href="#"
              className="text-[0.55rem] font-medium uppercase tracking-[0.2em] text-[#CBAA69]/70 hover:text-[#CBAA69] transition-colors flex items-center gap-2 mt-auto pt-6"
            >
              The Standard behind this recognition
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Col 2 — THE INSTITUTION */}
          <div className="border-r border-b lg:border-b-0 border-white/5 p-10 lg:p-12 flex flex-col gap-6">
            <span className="text-[0.55rem] font-sans uppercase tracking-[0.3em] text-[#CBAA69] font-medium drop-shadow-sm">
              THE INSTITUTION
            </span>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col xl:flex-row xl:items-start gap-8">
                <div className="flex items-start gap-3">
                  <Building2 className="w-3.5 h-3.5 text-[#CBAA69]/70 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="text-[0.5rem] font-sans font-medium uppercase tracking-[0.25em] text-white/40 block mb-1">Established</span>
                    <span className="text-xs text-white/80 font-normal">{record.firmInfo?.founded || "—"}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-3.5 h-3.5 text-[#CBAA69]/70 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="text-[0.5rem] font-sans font-medium uppercase tracking-[0.25em] text-white/40 block mb-1">Headquarters</span>
                    <span className="text-xs text-white/80 font-normal">{record.location || "—"}, {record.jurisdiction || "India"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-6 border-t border-white/5">
                <FileText className="w-3.5 h-3.5 text-[#CBAA69]/70 mt-0.5 shrink-0" strokeWidth={1.5} />
                <div>
                  <span className="text-[0.5rem] font-sans font-medium uppercase tracking-[0.25em] text-white/40 block mb-2">Key Practice Areas</span>
                  <span className="text-xs text-white/70 leading-[1.8] font-normal">{practiceAreasDisplay}</span>
                </div>
              </div>
            </div>
            <Link
              href="#"
              className="text-[0.55rem] font-medium uppercase tracking-[0.2em] text-[#CBAA69]/70 hover:text-[#CBAA69] transition-colors flex items-center gap-2 mt-auto pt-6"
            >
              View Institution
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Col 3 — THE STANDARD */}
          <div className="border-r border-b lg:border-b-0 border-white/5 p-10 lg:p-12 flex flex-col gap-6">
            <span className="text-[0.55rem] font-sans uppercase tracking-[0.3em] text-[#CBAA69] font-medium drop-shadow-sm">
              THE STANDARD
            </span>
            <div className="flex items-start gap-4">
              <BookOpen className="w-4 h-4 text-[#CBAA69]/70 mt-1 shrink-0" strokeWidth={1.5} />
              <p className="text-[0.85rem] text-white/70 leading-[1.8] font-light">
                Recognition reflects the Juris Standard&apos;s assessment of sustained professional excellence, capability and contribution to the legal profession.
              </p>
            </div>
            <Link
              href="/methodology"
              className="text-[0.55rem] font-medium uppercase tracking-[0.2em] text-[#CBAA69]/70 hover:text-[#CBAA69] transition-colors flex items-center gap-2 mt-auto pt-6"
            >
              Our Approach &amp; Methodology
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Col 4 — PULL QUOTE */}
          <div className="p-10 lg:p-12 flex flex-col gap-6 bg-[#0a0a0a]">
            <blockquote className="text-xl lg:text-2xl text-white/80 leading-[1.5] italic font-serif flex-1 flex items-center drop-shadow-sm">
              &ldquo;A stronger legal world is a more just and resilient society.&rdquo;
            </blockquote>
            <div className="border-t border-white/5 pt-6">
              <span className="text-[0.55rem] font-sans uppercase tracking-[0.3em] text-white/50 font-medium">
                THE JURIS STANDARD™
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — WITHIN THE JURIS STANDARD™
      ═══════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#050505] border-b border-[#1a1a1a]">
        <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16 py-14">
          <p className="text-[0.55rem] font-sans uppercase tracking-[0.3em] text-[#CBAA69] mb-8 font-medium">
            WITHIN THE JURIS STANDARD™
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/5">
            {[
              {
                Icon: Users,
                title: "Recognised Professionals",
                desc: "Explore recognised individuals associated with this institution",
                href: "/juris-index/professionals",
              },
              {
                Icon: Scale,
                title: "Related Practice Areas",
                desc: "Explore relevant practice areas within the Standard",
                href: "#",
              },
              {
                Icon: Landmark,
                title: "Related Organisations",
                desc: "Explore connected recognised organisations",
                href: "#",
              },
              {
                Icon: FileText,
                title: "Other Records",
                desc: "Explore other relevant Juris Standard records",
                href: "/juris-index/law-firms",
              },
            ].map(({ Icon, title, desc, href }, idx) => (
              <Link
                key={idx}
                href={href}
                className={`flex flex-col gap-4 p-8 lg:p-10 hover:bg-white/[0.02] transition-all duration-300 group ${
                  idx < 3 ? "lg:border-r border-b lg:border-b-0 border-white/5" : ""
                }`}
              >
                <Icon className="w-5 h-5 text-[#CBAA69]/40 group-hover:text-[#CBAA69]/80 transition-colors" strokeWidth={1.5} />
                <div>
                  <p className="text-[0.8rem] text-white/80 font-normal group-hover:text-white transition-colors leading-snug mb-2">
                    {title}
                  </p>
                  <p className="text-[0.65rem] text-white/50 leading-[1.6] font-light group-hover:text-white/70">{desc} <ArrowRight className="w-3 h-3 inline ml-1 text-[#CBAA69]/50 group-hover:text-[#CBAA69]/80 group-hover:translate-x-1 transition-transform" /></p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — BOTTOM 3-COLUMN STRIP
      ═══════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#0a0a0a]">
        <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-white/5 bg-[#050505]">

            {/* Col A — OFFICIAL VERIFICATION */}
            <div className="border-b lg:border-b-0 lg:border-r border-white/5 p-10 flex flex-col gap-8">
              <span className="text-[0.55rem] font-sans uppercase tracking-[0.3em] text-[#CBAA69] font-medium">
                OFFICIAL VERIFICATION
              </span>
              <div className="flex gap-6 items-start">
                {/* QR placeholder */}
                <div className="w-[85px] h-[85px] shrink-0 border border-white/10 bg-white flex flex-col items-center justify-center p-2">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://jurisstandard.com/record/${record.recognitionId}`} alt="QR Code" className="w-full h-full opacity-90" />
                </div>
                {/* Verification table */}
                <div className="flex flex-col gap-4 flex-1">
                  {[
                    { label: "RECORD ID", value: record.recognitionId },
                    { label: "RECOGNITION", value: record.division },
                    { label: "YEAR", value: record.year },
                    {
                      label: "STATUS",
                      value: null,
                      custom: (
                        <span className="flex items-center gap-2 text-[0.65rem] text-emerald-400/90 font-medium tracking-widest uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Active
                        </span>
                      ),
                    },
                  ].map(({ label, value, custom }) => (
                    <div key={label} className="flex flex-col gap-1 text-left">
                      <span className="text-[0.5rem] font-sans uppercase tracking-[0.25em] text-white/40 font-medium">{label}</span>
                      {value ? (
                        <span className="text-[0.65rem] text-white/80 font-normal leading-snug tracking-wider">{value}</span>
                      ) : (
                        custom
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Col B — THE RECOGNITION VAULT™ */}
            <div className="border-b lg:border-b-0 lg:border-r border-white/5 p-10 flex flex-col gap-8">
              <span className="text-[0.55rem] font-sans uppercase tracking-[0.3em] text-[#CBAA69] font-medium">
                THE RECOGNITION VAULT™
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { Icon: Award, label: "Official Certificate", sub: "View / Download", href: `/juris-index/law-firms/${record.id}/certificate` },
                  { Icon: FileText, label: "Recognition Share Card", sub: "Create / Share", href: `/juris-index/law-firms/${record.id}/share` },
                  { Icon: Code2, label: "Website Seal™", sub: "Get / Install", href: "#" },
                ].map(({ Icon, label, sub, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex flex-col items-center justify-center gap-3 p-5 border border-white/5 bg-[#0a0a0a] hover:border-[#CBAA69]/50 hover:bg-white/[0.02] transition-all group text-center rounded-[1px]"
                  >
                    <Icon className="w-6 h-6 text-[#CBAA69]/40 group-hover:text-[#CBAA69]/80 transition-colors" strokeWidth={1.2} />
                    <span className="text-[0.55rem] uppercase tracking-widest text-white/70 group-hover:text-white font-medium transition-colors leading-[1.6]">
                      {label}
                    </span>
                    <span className="text-[0.45rem] uppercase tracking-widest text-white/30 font-light">{sub}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Col C — CITE THIS RECORD™ */}
            <div className="p-10 flex flex-col gap-6 bg-[#0a0a0a]">
              <span className="text-[0.55rem] font-sans uppercase tracking-[0.3em] text-[#CBAA69] font-medium">
                CITE THIS RECORD™
              </span>
              <div className="flex gap-4 items-start bg-transparent py-4">
                <span className="text-4xl text-[#CBAA69]/40 leading-none select-none font-serif">&ldquo;</span>
                <p className="text-[0.75rem] text-white/70 leading-[1.8] font-light italic mt-1 font-serif">
                  {citationText}
                </p>
              </div>
              <button className="flex items-center justify-center gap-3 w-full py-3 border border-white/10 text-white/70 text-[0.55rem] font-medium uppercase tracking-[0.25em] hover:bg-white/[0.02] hover:text-[#CBAA69] hover:border-[#CBAA69]/60 transition-all mt-auto rounded-[1px]">
                <Copy className="w-3.5 h-3.5" strokeWidth={1.2} />
                Copy Citation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Records */}
      {record.relatedRecords && record.relatedRecords.length > 0 && (
        <section className="w-full bg-[#050505] border-t border-[#1a1a1a]">
          <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16 py-14">
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
