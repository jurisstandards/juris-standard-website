"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User, Mail, Calendar, Shield, Check, Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MyAccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<{
    id: string;
    email?: string;
    created_at?: string;
    user_metadata?: { full_name?: string };
  } | null>(null);
  const [profile, setProfile] = useState<{ role?: string; created_at?: string } | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUser(session.user);
      setDisplayName(session.user.user_metadata?.full_name || "");

      const { data } = await supabase
        .from("profiles")
        .select("role, created_at")
        .eq("id", session.user.id)
        .single();
      if (data) setProfile(data);
    };
    load();
  }, []);

  const handleSaveName = async () => {
    if (!user) return;
    setSaving(true);
    await supabase.auth.updateUser({ data: { full_name: displayName } });
    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const fieldClass = "w-full bg-[#080808] border border-[#CBAA69]/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#CBAA69]/50 placeholder:text-white/20 rounded-[2px]";
  const labelClass = "text-[0.48rem] uppercase tracking-[0.2em] text-white/30 block mb-1.5";

  return (
    <div className="p-10 flex flex-col gap-8 w-full max-w-4xl mx-auto h-full">
      {/* Header */}
      <div className="flex items-center gap-5 border-b border-[#1a1601]/40 pb-6 shrink-0">
        <User className="w-6 h-6 text-[#CBAA69]/50" strokeWidth={1.2} />
        <div>
          <h1 className="text-2xl font-serif text-white font-light tracking-wide">My Account</h1>
          <p className="text-[0.55rem] uppercase tracking-[0.25em] text-[#CBAA69]/60 mt-1 font-medium">
            MANAGE YOUR JURIS STANDARD ACCOUNT
          </p>
        </div>
      </div>

      {/* Account info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            icon: Mail,
            label: "Email",
            value: user?.email || "—",
          },
          {
            icon: Shield,
            label: "Role",
            value: profile?.role || "member",
          },
          {
            icon: Calendar,
            label: "Member Since",
            value: profile?.created_at
              ? new Date(profile.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "—",
          },
          {
            icon: User,
            label: "Account Status",
            value: "Active",
            highlight: true,
          },
        ].map(({ icon: Icon, label, value, highlight }) => (
          <div key={label} className="p-6 border border-[#CBAA69]/15 bg-[#0a0805] flex flex-col gap-3 rounded-[2px]">
            <div className="flex items-center gap-3">
              <Icon className="w-4 h-4 text-[#CBAA69]/70" strokeWidth={1.2} />
              <span className="text-[0.6rem] uppercase tracking-[0.25em] text-[#CBAA69]/80 font-medium">{label}</span>
            </div>
            <span className={`text-sm tracking-wide ${highlight ? "text-emerald-400 flex items-center gap-2 font-medium" : "text-white/90 font-light mt-0.5"}`}>
              {highlight && <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />}
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Edit display name */}
      <div className="border border-[#CBAA69]/15 bg-[#0a0805] p-8 flex flex-col gap-5 rounded-[2px] mt-2">
        <p className="text-[0.55rem] uppercase tracking-[0.25em] text-[#CBAA69]/80 font-medium mb-1">Update Display Name</p>
        <div>
          <label className={labelClass}>Display Name</label>
          <input
            className={fieldClass}
            placeholder="Your full name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={handleSaveName}
            disabled={saving}
            className="flex items-center justify-center gap-3 px-8 py-3 bg-[#CBAA69]/10 border border-[#CBAA69]/30 text-[#CBAA69] text-[0.55rem] font-medium uppercase tracking-[0.2em] hover:bg-[#CBAA69]/20 transition-all disabled:opacity-50 rounded-[1px]"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : saved ? <Check className="w-3.5 h-3.5" /> : null}
            {saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Sign out */}
      <div className="border border-red-900/20 bg-[#080505] p-8 flex flex-col gap-4 rounded-[2px] mt-2">
        <p className="text-[0.55rem] uppercase tracking-[0.25em] text-red-400/60 font-medium">Sign Out</p>
        <p className="text-xs text-white/40 leading-relaxed font-light">
          You will be signed out of your Juris Standard account and redirected to the homepage.
        </p>
        <button
          onClick={handleSignOut}
          className="flex items-center justify-center w-full sm:w-auto gap-3 mt-2 self-start px-8 py-3 border border-red-900/40 text-red-400/80 text-[0.55rem] font-medium uppercase tracking-[0.2em] hover:border-red-500/40 hover:bg-red-500/[0.05] hover:text-red-400 transition-all rounded-[1px]"
        >
          <LogOut className="w-3.5 h-3.5" strokeWidth={1.5} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
