"use client";

import { useEffect, useState } from "react";
import { Bookmark, Share2, ShieldCheck, Check } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface Props {
  recordId: string;
  recordName: string;
  recordDiv: string;
  recordYear: string;
}

export function FirmHeroActions({ recordId, recordName, recordDiv, recordYear }: Props) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const token = session.access_token;
      const res = await fetch("/api/my-juris/shortlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const list = await res.json();
        setSaved(list.some((i: { record_id: string }) => i.record_id === recordId));
      }
      setChecked(true);

      await fetch("/api/my-juris/recently-viewed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          record_id: recordId,
          record_name: recordName,
          record_div: recordDiv,
          record_year: recordYear,
        }),
      });
    };
    init();
  }, [recordId, recordName, recordDiv, recordYear]);

  const handleSave = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/login");
      return;
    }
    setSaving(true);
    const token = session.access_token;

    if (saved) {
      await fetch(`/api/my-juris/shortlist?record_id=${recordId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setSaved(false);
    } else {
      await fetch("/api/my-juris/shortlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          record_id: recordId,
          record_name: recordName,
          record_div: recordDiv,
          record_year: recordYear,
        }),
      });
      setSaved(true);
    }
    setSaving(false);
  };

  const buttonBaseClass = "flex flex-1 md:flex-none items-center justify-center gap-2.5 px-7 py-3.5 border text-[0.65rem] font-semibold uppercase tracking-[0.25em] transition-all duration-300 disabled:opacity-60 rounded-[4px]";

  return (
    <div className="flex flex-wrap gap-5 mt-2">
      {/* Save to My Juris */}
      <button
        onClick={handleSave}
        disabled={saving}
        className={`${buttonBaseClass} ${
          saved
            ? "border-[#CBAA69]/60 text-[#CBAA69] bg-[#CBAA69]/[0.05] shadow-[0_0_20px_rgba(203,170,105,0.1)]"
            : "border-white/10 text-white/70 hover:border-[#CBAA69]/40 hover:text-[#CBAA69] bg-transparent hover:bg-white/[0.02]"
        }`}
      >
        {saved ? (
          <Check className="w-4 h-4" strokeWidth={1.5} />
        ) : (
          <Bookmark className="w-4 h-4" strokeWidth={1.5} />
        )}
        {saved ? "Saved to My Juris™" : "Save to My Juris™"}
      </button>

      {/* Share */}
      <button
        onClick={() => {
          if (navigator.share) {
            navigator.share({ title: recordName, url: window.location.href });
          } else {
            navigator.clipboard.writeText(window.location.href);
          }
        }}
        className={`${buttonBaseClass} border-white/10 text-white/70 hover:border-[#CBAA69]/40 hover:text-[#CBAA69] bg-transparent hover:bg-white/[0.02]`}
      >
        <Share2 className="w-4 h-4" strokeWidth={1.5} />
        Share Recognition
      </button>

      {/* Verify */}
      <button className={`${buttonBaseClass} border-[#CBAA69]/40 text-[#CBAA69] bg-transparent hover:bg-[#CBAA69]/10 hover:border-[#CBAA69]/80`}>
        <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />
        Verify Record
      </button>
    </div>
  );
}
