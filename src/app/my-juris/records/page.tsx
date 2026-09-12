"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Trophy, ArrowRight, ExternalLink, Check } from "lucide-react";
import Link from "next/link";

interface JurisRecord {
  id: string;
  recognitionId: string;
  name: string;
  division: string;
  category: string;
  year: string;
  location: string;
  status: string;
}

export default function MyRecordsPage() {
  const [records, setRecords] = useState<JurisRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch records where linked_user_email matches (if column exists) or fall back to empty
      const { data } = await supabase
        .from("juris_records")
        .select("*")
        .or(`linked_user_email.eq.${user.email},linked_user_id.eq.${user.id}`)
        .order("year", { ascending: false });

      setRecords(data ?? []);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="p-10 flex flex-col gap-8 h-full">
      {/* Header */}
      <div className="flex items-center gap-5 border-b border-[#1a1601]/40 pb-6 shrink-0">
        <Trophy className="w-6 h-6 text-[#CBAA69]/50" strokeWidth={1.5} />
        <div>
          <h1 className="text-2xl font-serif text-white font-light tracking-wide">My Records</h1>
          <p className="text-[0.55rem] uppercase tracking-[0.25em] text-[#CBAA69]/60 mt-1 font-medium">
            YOUR OFFICIAL JURIS STANDARD RECOGNITIONS
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-4 py-10 text-white/30 text-sm">
          <div className="w-1.5 h-5 bg-[#CBAA69]/40 animate-pulse rounded-full" />
          Loading your records...
        </div>
      ) : records.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-6 text-center">
          <div className="w-16 h-16 rounded-full border border-[#CBAA69]/20 bg-[#CBAA69]/[0.02] flex items-center justify-center shadow-[inset_0_0_20px_rgba(203,170,105,0.05)]">
            <Trophy className="w-7 h-7 text-[#CBAA69]/40" strokeWidth={1} />
          </div>
          <div>
            <p className="text-base text-white/60 font-light mb-2">No official records yet.</p>
            <p className="text-xs text-white/30 tracking-wide max-w-sm mx-auto leading-relaxed">
              When a Juris Standard recognition is linked to your account, it will appear here.
            </p>
          </div>
          <Link
            href="/juris-index/law-firms"
            className="flex items-center gap-3 px-6 py-3 border border-[#CBAA69]/30 text-[#CBAA69] text-[0.65rem] font-semibold uppercase tracking-[0.2em] hover:bg-[#CBAA69]/10 transition-all rounded-sm mt-2"
          >
            Explore The Index <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {records.map((r) => (
            <div
              key={r.id}
              className="flex items-center gap-6 px-8 py-6 border border-[#CBAA69]/15 bg-[#0a0805] hover:border-[#CBAA69]/40 hover:bg-[#0c0a06] transition-all duration-300 rounded-[2px]"
            >
              <div className="w-10 h-10 rounded-full border border-[#CBAA69]/20 bg-transparent flex items-center justify-center shrink-0">
                <Trophy className="w-4 h-4 text-[#CBAA69]/80" strokeWidth={1.2} />
              </div>
              <div className="flex-1">
                <p className="text-base text-white/90 font-medium tracking-wide">{r.name}</p>
                <p className="text-[0.55rem] uppercase tracking-[0.25em] text-[#CBAA69]/70 mt-1 font-medium">
                  {r.division} <span className="text-white/20 mx-2">|</span> {r.category} <span className="text-white/20 mx-2">|</span> {r.year}
                </p>
              </div>
              <span className="flex items-center gap-2 text-[0.5rem] font-medium uppercase tracking-[0.25em] text-emerald-400/80 px-3 py-1.5 border border-emerald-400/20 bg-emerald-400/[0.03] rounded-[2px]">
                <Check className="w-3 h-3" strokeWidth={1.5} />
                Verified
              </span>
              <Link
                href={`/juris-index/law-firms/${r.id}`}
                className="p-2.5 text-[#CBAA69]/50 hover:text-white hover:bg-white/[0.02] rounded-full transition-all ml-2"
                title="View record"
              >
                <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
