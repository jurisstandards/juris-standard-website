"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";
import { ArrowRight, AlertCircle, Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess("Login successful. Redirecting...");
        setTimeout(() => router.push("/my-juris"), 1000);
      }
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        // Explicitly create the profile record to ensure it appears in the Admin Panel
        if (data?.user) {
          await supabase.from("profiles").insert({
            id: data.user.id,
            email: data.user.email,
            role: "user"
          });
        }
        
        setSuccess("Registration successful! You can now log in.");
        setTimeout(() => setIsLogin(true), 2000);
      }
    }
    setLoading(false);
  };

  const fieldClass = "w-full bg-[#080808] border border-[#1e1e1e] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#CBAA69]/50 placeholder:text-white/20 rounded-[2px]";
  const labelClass = "text-[0.5rem] uppercase tracking-[0.2em] text-white/40 block mb-1.5 font-bold";

  return (
    <main className="min-h-screen bg-[#000000] selection:bg-[#CBAA69]/30 flex flex-col font-sans text-[#FFFFF0]">
      <Navbar />

      <div className="flex-grow flex items-center justify-center py-32 px-6">
        <div className="w-full max-w-[420px] flex flex-col">
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#CBAA69]/60" />
              <span className="text-[0.55rem] uppercase tracking-[0.3em] text-[#CBAA69] font-medium">
                MEMBER PORTAL
              </span>
              <div className="w-8 h-[1px] bg-[#CBAA69]/60" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-white font-light tracking-wide mb-3">
              {isLogin ? "Sign In" : "Create Account"}
            </h1>
            <p className="text-sm text-white/40 font-light">
              Secure access for Juris Standard members.
            </p>
          </div>

          {/* Form Box */}
          <div className="border border-[#1a1a1a] bg-[#050505] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#CBAA69]/40 to-transparent" />
            
            <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
              
              <div>
                <label className={labelClass}>Email Address</label>
                <input
                  type="email"
                  required
                  className={fieldClass}
                  placeholder="name@firm.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Password</label>
                <input
                  type="password"
                  required
                  className={fieldClass}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-xs mt-2 bg-red-400/5 p-3 border border-red-400/20">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 text-emerald-400 text-xs mt-2 bg-emerald-400/5 p-3 border border-emerald-400/20">
                  <Check className="w-4 h-4 shrink-0" /> {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex justify-center items-center gap-3 w-full py-4 bg-gradient-to-r from-[#CBAA69] to-[#B89552] text-[#050505] text-[0.7rem] font-bold uppercase tracking-[0.15em] hover:from-[#E8D099] hover:to-[#CBAA69] transition-all disabled:opacity-50 rounded-[2px]"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> AUTHENTICATING</>
                ) : (
                  <>{isLogin ? "SECURE LOGIN" : "REGISTER ACCOUNT"} <ArrowRight className="w-4 h-4" /></>
                )}
              </button>

            </form>

            {/* Toggle Mode */}
            <div className="border-t border-[#1a1a1a] bg-[#080808] p-5 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setSuccess("");
                }}
                className="text-[0.6rem] uppercase tracking-[0.15em] text-white/40 hover:text-[#CBAA69] transition-colors"
              >
                {isLogin ? "DON'T HAVE AN ACCOUNT? REGISTER" : "ALREADY HAVE AN ACCOUNT? SIGN IN"}
              </button>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
