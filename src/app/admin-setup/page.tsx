"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Shield, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function AdminSetupPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const handlePromote = async () => {
    if (!email) { setError("Enter your account email."); return; }
    setLoading(true); setError("");
    try {
      // Get current user
      const { data: { user }, error: authErr } = await supabase.auth.getUser();
      if (authErr || !user) { setError("Not logged in. Please login first."); setLoading(false); return; }
      if (user.email !== email) { setError("Email does not match your logged-in account."); setLoading(false); return; }

      // Call the API route to promote
      const res = await fetch("/api/admin/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}` },
        body: JSON.stringify({ user_id: user.id }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to promote."); setLoading(false); return; }
      setSuccess(true);
      setTimeout(() => { window.location.href = "/admin"; }, 1500);
    } catch (e) { setError(String(e)); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-8 font-sans">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-[2px] h-6 bg-[#CBAA69]" />
          <div>
            <p className="text-[0.5rem] uppercase tracking-[0.35em] text-[#CBAA69]/70">Juris Standard</p>
            <h1 className="text-sm font-semibold tracking-wider text-white">Admin Setup</h1>
          </div>
        </div>

        <div className="bg-[#0c0c0c] border border-white/8 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#CBAA69]/10 border border-[#CBAA69]/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#CBAA69]/70" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-base font-serif font-light text-white">Promote to Admin</h2>
              <p className="text-[0.5rem] uppercase tracking-widest text-white/30 mt-0.5">
                One-time setup for admin access
              </p>
            </div>
          </div>

          {success ? (
            <div className="flex items-center gap-3 py-6 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-light">Admin access granted!</p>
                <p className="text-[0.5rem] uppercase tracking-widest text-emerald-400/60 mt-0.5">Redirecting to dashboard...</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-xs text-white/45 font-light leading-relaxed">
                Enter the email of your logged-in account. This will set your profile role to{" "}
                <code className="text-[#CBAA69]/80 bg-[#CBAA69]/8 px-1.5 py-0.5 rounded text-[0.6rem]">admin</code>{" "}
                and grant access to the admin panel.
              </p>

              <div>
                <label className="text-[0.5rem] uppercase tracking-[0.2em] text-white/35 block mb-1.5">Your Account Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-[#0a0a0a] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#CBAA69]/40 placeholder:text-white/20 rounded-[3px]"
                  onKeyDown={e => e.key === "Enter" && handlePromote()}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                onClick={handlePromote}
                disabled={loading}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-[#CBAA69] to-[#B89552] text-[#050505] text-[0.65rem] font-bold uppercase tracking-[0.2em] hover:from-[#E8D099] hover:to-[#CBAA69] transition-all disabled:opacity-50 rounded-[3px]"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" strokeWidth={2} />}
                {loading ? "Granting Access..." : "Grant Admin Access"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>

              <div className="pt-2 border-t border-white/5">
                <p className="text-[0.45rem] uppercase tracking-widest text-white/20 text-center">
                  Not logged in?{" "}
                  <a href="/login" className="text-[#CBAA69]/50 hover:text-[#CBAA69] transition-colors">Login first</a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
