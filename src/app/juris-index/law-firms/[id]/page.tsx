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

  return (
    <main className="min-h-screen bg-[#050402] selection:bg-[#CBAA69]/30 flex flex-col font-sans text-[#FFFFF0] overflow-x-hidden">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[600px] flex flex-col justify-center overflow-hidden border-b border-[#CBAA69]/20 pt-32 pb-16">
        
        {/* Cinematic Dark Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "radial-gradient(ellipse 90% 100% at 75% 40%, rgba(35,25,10,0.8) 0%, rgba(10,8,5,0.95) 50%, #050402 100%)",
          }}
        />
        <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(90deg, #CBAA69 0px, transparent 1px, transparent 80px)" }} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050402] to-transparent z-10 pointer-events-none" />

        {/* Top-left breadcrumb & navigation row */}
        <div className="absolute top-28 left-6 md:left-12 lg:left-16 z-20 flex gap-6 items-center text-[0.5rem] uppercase tracking-[0.3em] text-[#CBAA69]/70 font-medium">
          <Link href="/juris-index/law-firms" className="hover:text-[#CBAA69] transition-colors flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            LAW FIRM EXCELLENCE™
          </Link>
        </div>

        {/* Top-right decorative text */}
        <div className="absolute top-28 right-6 md:right-16 z-20 hidden md:flex gap-6 items-center text-[0.5rem] uppercase tracking-[0.3em] text-white/30 font-medium">
          <span>A STRONGER LEGAL WORLD. ALWAYS.</span>
        </div>

        <div className="relative z-20 w-full max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          
          {/* LEFT CONTENT COLUMN */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <p className="text-[0.55rem] uppercase tracking-[0.4em] text-[#CBAA69]/80 mb-6 font-medium">
              LAW FIRM EXCELLENCE™
            </p>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-white font-normal leading-[1.05] tracking-wide mb-6 uppercase drop-shadow-md" style={{ fontFamily: luxurySerif }}>
              {record.name}
            </h1>

            <p className="text-lg md:text-xl text-[#CBAA69] font-light tracking-[0.3em] uppercase mb-4 drop-shadow-sm" style={{ fontFamily: luxurySerif }}>
              RECOGNISED · {record.year}
            </p>

            <p className="text-base md:text-lg text-white/70 italic mb-12 tracking-wide font-light max-w-xl" style={{ fontFamily: luxurySerif }}>
              A mark of enduring excellence in the legal profession.
            </p>

            {/* Meta info row with ultra-thin gold dividers */}
            <div className="flex flex-wrap items-center gap-6 md:gap-10 mb-10 border-t border-b border-[#CBAA69]/20 py-5">
              <div className="flex flex-col gap-1.5">
                <span className="text-[0.5rem] uppercase tracking-[0.3em] text-[#CBAA69]/60 font-medium">RECORD ID</span>
                <span className="text-xs text-white/80 font-mono tracking-widest">{record.recognitionId}</span>
              </div>
              <div className="w-[1px] h-10 bg-[#CBAA69]/20 hidden sm:block" />
              <div className="flex flex-col gap-1.5">
                <span className="text-[0.5rem] uppercase tracking-[0.3em] text-[#CBAA69]/60 font-medium">STATUS</span>
                <span className="flex items-center gap-2 text-xs text-white/80 uppercase tracking-[0.2em] font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
                  {record.status === "active" ? "Active" : record.status}
                </span>
              </div>
              <div className="w-[1px] h-10 bg-[#CBAA69]/20 hidden sm:block" />
              <div className="flex flex-col gap-1.5">
                <span className="text-[0.5rem] uppercase tracking-[0.3em] text-[#CBAA69]/60 font-medium">RECOGNITION YEAR</span>
                <span className="text-xs text-white/80 tracking-widest">{record.year}</span>
              </div>
              <div className="w-[1px] h-10 bg-[#CBAA69]/20 hidden md:block" />
              <div className="flex flex-col gap-1.5">
                <span className="text-[0.5rem] uppercase tracking-[0.3em] text-[#CBAA69]/60 font-medium">DIVISION</span>
                <span className="text-xs text-white/80 tracking-widest">{record.division}</span>
              </div>
            </div>

            {/* Actions */}
            <FirmHeroActions
              recordId={record.id}
              recordName={record.name}
              recordDiv={record.division}
              recordYear={record.year}
            />
          </div>

          {/* RIGHT COLUMN - MEDALLION & TEXT */}
          <div className="lg:col-span-5 relative hidden lg:flex items-center justify-end pr-8">
            
            {/* The giant seal */}
            <div className="relative w-[360px] h-[360px] xl:w-[400px] xl:h-[400px] flex items-center justify-center group pointer-events-none">
              
              {/* Outer thin ring & subtle glow */}
              <div className="absolute inset-0 rounded-full border border-[#CBAA69]/40 shadow-[0_0_80px_rgba(203,170,105,0.1),inset_0_0_50px_rgba(203,170,105,0.05)] bg-gradient-to-br from-[#1a140a] via-[#0f0c06] to-[#050402]" />
              
              {/* Inner metallic ring */}
              <div className="absolute inset-[20px] rounded-full border border-[#CBAA69]/20 shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]" />
              
              {/* Content core */}
              <div className="absolute inset-[40px] rounded-full border border-[#CBAA69]/10 flex flex-col items-center justify-center gap-4 text-center">
                
                {/* Curved top text */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <path id="curve-top" d="M 15 50 A 35 35 0 1 1 85 50" fill="transparent" />
                  <text className="text-[0.38rem] font-medium uppercase fill-[#CBAA69]/80" style={{ letterSpacing: "0.45em" }}>
                    <textPath href="#curve-top" startOffset="50%" textAnchor="middle">THE JURIS STANDARD</textPath>
                  </text>
                </svg>

                {/* Curved bottom text */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <path id="curve-bottom" d="M 15 50 A 35 35 0 1 0 85 50" fill="transparent" />
                  <text className="text-[0.35rem] font-medium uppercase fill-[#CBAA69]/60" style={{ letterSpacing: "0.3em" }}>
                    <textPath href="#curve-bottom" startOffset="50%" textAnchor="middle">LAW FIRM EXCELLENCE</textPath>
                  </text>
                </svg>

                {/* Center logo */}
                <Landmark className="w-16 h-16 text-[#CBAA69]/90 drop-shadow-lg z-10" strokeWidth={1} />
                
                {/* Center Year */}
                <span className="text-2xl text-[#CBAA69] z-10 drop-shadow-sm tracking-wider font-normal mt-1" style={{ fontFamily: luxurySerif }}>
                  {record.year}
                </span>
              </div>
            </div>

            {/* Floating text - Top Right */}
            <div className="absolute top-10 -right-6 text-right select-none">
              <p className="text-[0.45rem] uppercase tracking-[0.45em] text-[#CBAA69]/50 font-medium leading-[2.5]">
                PEOPLE.<br/>FIRMS.<br/>IDEAS.<br/>IMPACT.
              </p>
            </div>
            
            {/* Floating text - Bottom Left */}
            <div className="absolute bottom-16 left-4 select-none">
              <p className="text-[0.45rem] uppercase tracking-[0.45em] text-[#CBAA69]/50 font-medium leading-[2.5]">
                EXCELLENCE<br/>RECOGNISED.<br/>A STRONGER<br/>LEGAL WORLD.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — THE RECOGNITION / INSTITUTION / STANDARD
      ═══════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#050402] border-b border-[#CBAA69]/20">
        <div className="w-full max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — THE RECOGNITION */}
          <div className="border-r border-b lg:border-b-0 border-[#CBAA69]/20 p-10 lg:p-12 flex flex-col gap-6">
            <span className="text-[0.55rem] uppercase tracking-[0.3em] text-[#CBAA69]/70 font-medium drop-shadow-sm">
              THE RECOGNITION
            </span>
            <blockquote className="text-lg lg:text-xl text-white/90 leading-[1.6] italic font-light" style={{ fontFamily: luxurySerif }}>
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
          <div className="border-r border-b lg:border-b-0 border-[#CBAA69]/20 p-10 lg:p-12 flex flex-col gap-6">
            <span className="text-[0.55rem] uppercase tracking-[0.3em] text-[#CBAA69]/70 font-medium drop-shadow-sm">
              THE INSTITUTION
            </span>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col xl:flex-row xl:items-start gap-8">
                <div className="flex items-start gap-3">
                  <Building2 className="w-3.5 h-3.5 text-[#CBAA69]/50 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="text-[0.5rem] font-medium uppercase tracking-[0.25em] text-white/40 block mb-1">Established</span>
                    <span className="text-xs text-white/80 font-normal">{record.firmInfo?.founded || "—"}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-3.5 h-3.5 text-[#CBAA69]/50 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="text-[0.5rem] font-medium uppercase tracking-[0.25em] text-white/40 block mb-1">Headquarters</span>
                    <span className="text-xs text-white/80 font-normal">{record.location || "—"}, {record.jurisdiction || "India"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-6 border-t border-[#CBAA69]/10">
                <FileText className="w-3.5 h-3.5 text-[#CBAA69]/50 mt-0.5 shrink-0" strokeWidth={1.5} />
                <div>
                  <span className="text-[0.5rem] font-medium uppercase tracking-[0.25em] text-white/40 block mb-2">Key Practice Areas</span>
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
          <div className="border-r border-b lg:border-b-0 border-[#CBAA69]/20 p-10 lg:p-12 flex flex-col gap-6">
            <span className="text-[0.55rem] uppercase tracking-[0.3em] text-[#CBAA69]/70 font-medium drop-shadow-sm">
              THE STANDARD
            </span>
            <div className="flex items-start gap-4">
              <BookOpen className="w-4 h-4 text-[#CBAA69]/50 mt-1 shrink-0" strokeWidth={1.5} />
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
          <div className="p-10 lg:p-12 flex flex-col gap-6 bg-[#080604]">
            <blockquote className="text-xl lg:text-2xl text-white/80 leading-[1.5] italic font-light flex-1 flex items-center drop-shadow-sm" style={{ fontFamily: luxurySerif }}>
              &ldquo;A stronger legal world is a more just and resilient society.&rdquo;
            </blockquote>
            <div className="border-t border-[#CBAA69]/20 pt-6">
              <span className="text-[0.55rem] uppercase tracking-[0.3em] text-[#CBAA69]/80 font-medium">
                THE JURIS STANDARD™
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — WITHIN THE JURIS STANDARD™
      ═══════════════════════════════════════════════════════ */}
      <section className="w-full bg-[#050402] border-b border-[#CBAA69]/20">
        <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16 py-14">
          <p className="text-[0.55rem] uppercase tracking-[0.3em] text-[#CBAA69]/70 mb-8 font-medium">
            WITHIN THE JURIS STANDARD™
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#CBAA69]/20">
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
                  idx < 3 ? "lg:border-r border-b lg:border-b-0 border-[#CBAA69]/10" : ""
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
      <section className="w-full bg-[#050402]">
        <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-[#CBAA69]/20 bg-[#060503]">

            {/* Col A — OFFICIAL VERIFICATION */}
            <div className="border-b lg:border-b-0 lg:border-r border-[#CBAA69]/20 p-10 flex flex-col gap-8">
              <span className="text-[0.55rem] uppercase tracking-[0.3em] text-[#CBAA69]/70 font-medium">
                OFFICIAL VERIFICATION
              </span>
              <div className="flex gap-6 items-start">
                {/* QR placeholder */}
                <div className="w-[85px] h-[85px] shrink-0 border border-[#CBAA69]/30 bg-white flex flex-col items-center justify-center p-2">
                  <QrCode className="w-full h-full text-black" strokeWidth={1} />
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
                      <span className="text-[0.5rem] uppercase tracking-[0.25em] text-[#CBAA69]/60 font-medium">{label}</span>
                      {custom ?? <span className="text-[0.65rem] text-white/90 font-medium tracking-widest uppercase">{value}</span>}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[0.55rem] text-white/40 uppercase tracking-[0.2em] font-light mt-auto">
                Scan to verify this record on The Juris Standard.
              </p>
            </div>

            {/* Col B — THE RECOGNITION VAULT™ */}
            <div className="border-b lg:border-b-0 lg:border-r border-[#CBAA69]/20 p-10 flex flex-col gap-8">
              <span className="text-[0.55rem] uppercase tracking-[0.3em] text-[#CBAA69]/70 font-medium">
                THE RECOGNITION VAULT™
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { Icon: Award, label: "Official Certificate", sub: "View / Download" },
                  { Icon: FileText, label: "Recognition Share Card", sub: "Create / Share" },
                  { Icon: Code2, label: "Website Seal™", sub: "Get / Install" },
                ].map(({ Icon, label, sub }) => (
                  <button
                    key={label}
                    className="flex flex-col items-center justify-center gap-3 p-5 border border-[#CBAA69]/20 bg-transparent hover:border-[#CBAA69]/50 hover:bg-white/[0.02] transition-all group text-center rounded-[1px]"
                  >
                    <Icon className="w-6 h-6 text-[#CBAA69]/40 group-hover:text-[#CBAA69]/80 transition-colors" strokeWidth={1.2} />
                    <span className="text-[0.55rem] uppercase tracking-widest text-white/70 group-hover:text-white font-medium transition-colors leading-[1.6]">
                      {label}
                    </span>
                    <span className="text-[0.45rem] uppercase tracking-widest text-white/30 font-light">{sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Col C — CITE THIS RECORD™ */}
            <div className="p-10 flex flex-col gap-6">
              <span className="text-[0.55rem] uppercase tracking-[0.3em] text-[#CBAA69]/70 font-medium">
                CITE THIS RECORD™
              </span>
              <div className="flex gap-4 items-start bg-transparent py-4">
                <span className="text-4xl text-[#CBAA69]/40 leading-none select-none font-serif">&ldquo;</span>
                <p className="text-[0.75rem] text-white/70 leading-[1.8] font-light italic mt-1" style={{ fontFamily: luxurySerif }}>
                  {citationText}
                </p>
              </div>
              <button className="flex items-center justify-center gap-3 w-full py-3 border border-[#CBAA69]/30 text-[#CBAA69]/80 text-[0.55rem] font-medium uppercase tracking-[0.25em] hover:bg-white/[0.02] hover:text-[#CBAA69] hover:border-[#CBAA69]/60 transition-all mt-auto rounded-[1px]">
                <Copy className="w-3.5 h-3.5" strokeWidth={1.2} />
                Copy Citation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Records */}
      {record.relatedRecords && record.relatedRecords.length > 0 && (
        <section className="w-full bg-[#050402] border-t border-[#CBAA69]/20">
          <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16 py-14">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-[1px] h-6 bg-[#CBAA69]/60" />
              <h2 className="text-[0.55rem] font-medium uppercase tracking-[0.3em] text-[#CBAA69]/80">
                RELATED RECORDS
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {record.relatedRecords.map((r) => (
                <Link
                  key={r.id}
                  href={`/juris-index/law-firms/${r.id}`}
                  className="flex items-center justify-between p-6 border border-[#CBAA69]/20 hover:bg-white/[0.01] hover:border-[#CBAA69]/50 transition-all group rounded-[1px]"
                >
                  <div>
                    <span className="text-[0.8rem] text-white/80 font-normal tracking-wide group-hover:text-white transition-colors">
                      {r.name}
                    </span>
                    <span className="text-[0.5rem] uppercase tracking-[0.25em] text-[#CBAA69]/60 block mt-1.5 font-medium">
                      {r.type}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#CBAA69]/40 group-hover:text-[#CBAA69]/80 transition-colors shrink-0" />
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
