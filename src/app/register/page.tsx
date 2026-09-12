"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowRight, ArrowLeft, Check, Loader2, Upload, X,
  Building2, MapPin, Award, User, Mail, Phone, Globe, AlertCircle
} from "lucide-react";
import Link from "next/link";

const PRACTICE_AREAS = [
  "Arbitration & ADR", "Aviation", "Banking & Finance", "Capital Markets",
  "Competition & Antitrust", "Constitutional & Public Law", "Corporate & Commercial",
  "Data Privacy & Cybersecurity", "Direct Tax", "Employment & Labour",
  "Energy & Natural Resources", "Environmental & Climate", "Family & Private Client",
  "Healthcare & Life Sciences", "Indirect Tax (GST)", "Infrastructure & Projects",
  "Insolvency & Restructuring", "Insurance", "Intellectual Property",
  "Litigation", "Maritime & Shipping", "Media & Entertainment",
  "Private Equity & Venture Capital", "Real Estate", "Regulatory & Compliance",
  "Technology & TMT", "White Collar Crime & Investigations"
];

const DIVISIONS = [
  "Law Firm Excellence™",
  "Corporate Elite™",
  "Litigation Masters™",
  "Women Leaders™",
  "Future Leaders™",
  "Legal Innovation Excellence™",
];

interface FormData {
  // Step 1 — Identity
  firm_name: string;
  firm_type: string;
  year_established: string;
  headquarters_city: string;
  country: string;
  website_url: string;
  // Step 2 — Practice
  practice_areas: string[];
  firm_size: string;
  num_partners: string;
  num_lawyers: string;
  offices: string;
  // Step 3 — Why Apply
  about_firm: string;
  achievements: string;
  key_areas_for_recognition: string;
  applying_for_division: string;
  // Step 4 — Contact
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  contact_designation: string;
  // Logo
  logo_url: string;
}

const EMPTY_FORM: FormData = {
  firm_name: "", firm_type: "Law Firm", year_established: "",
  headquarters_city: "", country: "India", website_url: "",
  practice_areas: [], firm_size: "Full Service",
  num_partners: "", num_lawyers: "", offices: "",
  about_firm: "", achievements: "", key_areas_for_recognition: "",
  applying_for_division: "Law Firm Excellence™",
  contact_name: "", contact_email: "", contact_phone: "",
  contact_designation: "", logo_url: "",
};

const STEPS = ["Firm Identity", "Practice & Expertise", "Why Apply", "Contact Details"];

export default function RegisterPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/login?redirect=/register");
      } else {
        setUser(session.user);
        setForm(f => ({ ...f, contact_email: session.user.email || "" }));
      }
      setLoading(false);
    });
  }, [router]);

  const togglePracticeArea = (area: string) => {
    setForm(f => ({
      ...f,
      practice_areas: f.practice_areas.includes(area)
        ? f.practice_areas.filter(a => a !== area)
        : [...f.practice_areas, area],
    }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    const ext = file.name.split(".").pop();
    const fileName = `logos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: upErr } = await supabase.storage.from("firm-assets").upload(fileName, file, { upsert: true });
    if (!upErr) {
      const { data: { publicUrl } } = supabase.storage.from("firm-assets").getPublicUrl(fileName);
      setForm(f => ({ ...f, logo_url: publicUrl }));
    }
    setUploadingLogo(false);
  };

  const validateStep = (): boolean => {
    setError("");
    if (step === 0) {
      if (!form.firm_name.trim()) { setError("Firm name is required."); return false; }
      if (!form.headquarters_city.trim()) { setError("Headquarters city is required."); return false; }
      if (!form.year_established.trim()) { setError("Year established is required."); return false; }
    }
    if (step === 1) {
      if (form.practice_areas.length === 0) { setError("Select at least one practice area."); return false; }
    }
    if (step === 2) {
      if (!form.about_firm.trim() || form.about_firm.length < 50) { setError("Please provide a brief description of at least 50 characters."); return false; }
      if (!form.key_areas_for_recognition.trim()) { setError("Please describe key areas for recognition."); return false; }
    }
    if (step === 3) {
      if (!form.contact_name.trim()) { setError("Contact name is required."); return false; }
      if (!form.contact_email.trim()) { setError("Contact email is required."); return false; }
      if (!form.contact_designation.trim()) { setError("Designation is required."); return false; }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) setStep(s => s + 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    setError("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setError("Session expired. Please log in again."); setSubmitting(false); return; }

      const res = await fetch("/api/admin/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Submission failed");
      setSubmitted(true);
    } catch (err: unknown) {
      setError(String(err));
    }
    setSubmitting(false);
  };

  const fieldClass = "w-full bg-[#080808] border border-[#1e1e1e] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#CBAA69]/50 placeholder:text-white/20 rounded-[2px] transition-colors";
  const labelClass = "text-[0.5rem] uppercase tracking-[0.2em] text-[#CBAA69]/70 block mb-1.5 font-medium";

  if (loading) return (
    <main className="min-h-screen bg-[#000] flex items-center justify-center">
      <Loader2 className="w-6 h-6 text-[#CBAA69] animate-spin" />
    </main>
  );

  if (submitted) return (
    <main className="min-h-screen bg-[#000000] text-[#FFFFF0] font-sans flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-8 py-24">
        <div className="max-w-lg text-center flex flex-col items-center gap-8">
          <div className="w-20 h-20 rounded-full border border-[#CBAA69]/30 bg-[#CBAA69]/5 flex items-center justify-center">
            <Check className="w-8 h-8 text-[#CBAA69]" strokeWidth={1.2} />
          </div>
          <div>
            <p className="text-[0.55rem] uppercase tracking-[0.3em] text-[#CBAA69]/70 mb-3">Application Received</p>
            <h1 className="text-3xl font-serif font-light tracking-wide text-white mb-4">Thank You, {form.firm_name}</h1>
            <p className="text-sm text-white/50 leading-relaxed font-light max-w-sm mx-auto">
              Your application for recognition has been received. Our council will review it and you will be notified at <span className="text-[#CBAA69]">{form.contact_email}</span> once a decision has been made.
            </p>
          </div>
          <div className="border border-[#CBAA69]/15 bg-[#0a0805] px-8 py-6 w-full text-left rounded-[2px]">
            <p className="text-[0.5rem] uppercase tracking-[0.2em] text-[#CBAA69]/60 mb-3">Application Summary</p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Firm</span>
                <span className="text-white/80">{form.firm_name}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Division Applied</span>
                <span className="text-white/80">{form.applying_for_division}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Status</span>
                <span className="text-yellow-400">Under Review</span>
              </div>
            </div>
          </div>
          <Link href="/" className="text-[0.55rem] uppercase tracking-[0.2em] text-white/30 hover:text-[#CBAA69] transition-colors">
            ← Return to Homepage
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );

  return (
    <main className="min-h-screen bg-[#000000] text-[#FFFFF0] font-sans flex flex-col overflow-x-hidden">
      <Navbar />

      {/* Header */}
      <div className="border-b border-[#1a1a1a] bg-[#050505] pt-24 pb-10 px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-[0.55rem] uppercase tracking-[0.3em] text-[#CBAA69]/70 mb-3">Juris Standard — Official Application</p>
          <h1 className="text-3xl md:text-4xl font-serif font-light tracking-wide text-white mb-2">Apply for Recognition</h1>
          <p className="text-sm text-white/40 font-light">Complete the four sections below to submit your firm for consideration.</p>
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full px-8 md:px-16 py-12">
        {/* Step Indicator */}
        <div className="flex items-center gap-0 mb-12 overflow-x-auto">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center shrink-0">
              <div className={`flex items-center gap-2.5 px-4 py-2 rounded-[2px] transition-all ${
                i === step ? "bg-[#CBAA69]/10 border border-[#CBAA69]/30" :
                i < step ? "opacity-60" : "opacity-30"
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[0.5rem] font-medium ${
                  i < step ? "bg-[#CBAA69] text-[#050505]" :
                  i === step ? "border border-[#CBAA69] text-[#CBAA69]" : "border border-white/20 text-white/40"
                }`}>
                  {i < step ? <Check className="w-3 h-3" /> : i + 1}
                </div>
                <span className={`text-[0.55rem] uppercase tracking-[0.15em] whitespace-nowrap font-medium ${
                  i === step ? "text-[#CBAA69]" : "text-white/40"
                }`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className="w-8 h-[1px] bg-white/10 shrink-0" />}
            </div>
          ))}
        </div>

        {/* STEP 0: Firm Identity */}
        {step === 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="w-5 h-5 text-[#CBAA69]/60" strokeWidth={1.2} />
              <h2 className="text-lg font-serif font-light text-white">Firm Identity</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className={labelClass}>Official Firm Name *</label>
                <input className={fieldClass} placeholder="e.g. Khaitan & Co" value={form.firm_name}
                  onChange={e => setForm(f => ({ ...f, firm_name: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Firm Type *</label>
                <select className={fieldClass} value={form.firm_type} onChange={e => setForm(f => ({ ...f, firm_type: e.target.value }))}>
                  <option>Law Firm</option>
                  <option>Chambers</option>
                  <option>In-House Legal Department</option>
                  <option>Boutique</option>
                  <option>Consultancy</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Year Established *</label>
                <input className={fieldClass} placeholder="e.g. 1911" type="number" value={form.year_established}
                  onChange={e => setForm(f => ({ ...f, year_established: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Headquarters City *</label>
                <input className={fieldClass} placeholder="e.g. Mumbai" value={form.headquarters_city}
                  onChange={e => setForm(f => ({ ...f, headquarters_city: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Country</label>
                <input className={fieldClass} placeholder="e.g. India" value={form.country}
                  onChange={e => setForm(f => ({ ...f, country: e.target.value }))} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Firm Website URL</label>
                <div className="flex items-center border border-[#1e1e1e] bg-[#080808] rounded-[2px] focus-within:border-[#CBAA69]/50 transition-colors">
                  <Globe className="w-4 h-4 text-white/20 ml-4 shrink-0" strokeWidth={1.2} />
                  <input className="flex-1 bg-transparent text-sm text-white px-3 py-3 focus:outline-none placeholder:text-white/20"
                    placeholder="https://www.yourfirm.com" value={form.website_url}
                    onChange={e => setForm(f => ({ ...f, website_url: e.target.value }))} />
                </div>
              </div>
              {/* Logo Upload */}
              <div className="md:col-span-2">
                <label className={labelClass}>Firm Logo (PNG, SVG, JPG)</label>
                {form.logo_url ? (
                  <div className="flex items-center gap-4 p-4 border border-[#CBAA69]/20 bg-[#0a0805] rounded-[2px]">
                    <img src={form.logo_url} alt="Logo" className="h-10 object-contain" />
                    <span className="text-xs text-white/50 flex-1">Logo uploaded</span>
                    <button onClick={() => setForm(f => ({ ...f, logo_url: "" }))} className="text-white/30 hover:text-red-400 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center gap-3 p-8 border border-dashed border-[#1e1e1e] bg-[#080808] rounded-[2px] cursor-pointer hover:border-[#CBAA69]/30 transition-colors">
                    {uploadingLogo ? <Loader2 className="w-5 h-5 text-[#CBAA69] animate-spin" /> : <Upload className="w-5 h-5 text-white/30" strokeWidth={1.2} />}
                    <span className="text-xs text-white/30">{uploadingLogo ? "Uploading..." : "Click to upload your firm logo"}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} disabled={uploadingLogo} />
                  </label>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: Practice & Expertise */}
        {step === 1 && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-[#CBAA69]/60" strokeWidth={1.2} />
              <h2 className="text-lg font-serif font-light text-white">Practice & Expertise</h2>
            </div>
            <div>
              <label className={labelClass}>Key Practice Areas * (select all that apply)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {PRACTICE_AREAS.map(area => (
                  <button key={area} type="button" onClick={() => togglePracticeArea(area)}
                    className={`text-left px-3 py-2.5 text-[0.55rem] uppercase tracking-[0.1em] border rounded-[2px] transition-all ${
                      form.practice_areas.includes(area)
                        ? "bg-[#CBAA69]/10 border-[#CBAA69]/40 text-[#CBAA69]"
                        : "border-[#1e1e1e] text-white/40 hover:border-white/20 hover:text-white/60"
                    }`}>
                    {form.practice_areas.includes(area) && <Check className="w-2.5 h-2.5 inline mr-1" />}
                    {area}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
              <div>
                <label className={labelClass}>Firm Size</label>
                <select className={fieldClass} value={form.firm_size} onChange={e => setForm(f => ({ ...f, firm_size: e.target.value }))}>
                  <option>Full Service</option>
                  <option>Specialist</option>
                  <option>Boutique</option>
                  <option>Mid Size</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Other Offices (comma-separated cities)</label>
                <input className={fieldClass} placeholder="e.g. Delhi, Bengaluru, Chennai" value={form.offices}
                  onChange={e => setForm(f => ({ ...f, offices: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Number of Partners</label>
                <input className={fieldClass} type="number" placeholder="e.g. 45" value={form.num_partners}
                  onChange={e => setForm(f => ({ ...f, num_partners: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Number of Lawyers</label>
                <input className={fieldClass} type="number" placeholder="e.g. 300" value={form.num_lawyers}
                  onChange={e => setForm(f => ({ ...f, num_lawyers: e.target.value }))} />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Why Apply */}
        {step === 2 && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-5 h-5 text-[#CBAA69]/60" strokeWidth={1.2} />
              <h2 className="text-lg font-serif font-light text-white">Why Apply for Recognition</h2>
            </div>
            <div>
              <label className={labelClass}>Applying for Division *</label>
              <select className={fieldClass} value={form.applying_for_division}
                onChange={e => setForm(f => ({ ...f, applying_for_division: e.target.value }))}>
                {DIVISIONS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Brief About the Firm * (minimum 50 characters)</label>
              <textarea className={`${fieldClass} min-h-[120px] resize-y`}
                placeholder="Describe your firm's history, culture, and what sets it apart in the legal profession..."
                value={form.about_firm} onChange={e => setForm(f => ({ ...f, about_firm: e.target.value }))} />
              <p className="text-[0.45rem] text-white/25 mt-1">{form.about_firm.length} characters</p>
            </div>
            <div>
              <label className={labelClass}>Notable Achievements & Recognitions *</label>
              <textarea className={`${fieldClass} min-h-[100px] resize-y`}
                placeholder="e.g. Ranked by Chambers Asia-Pacific, IFLR1000, prior industry awards, landmark transactions..."
                value={form.achievements} onChange={e => setForm(f => ({ ...f, achievements: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Key Areas for which you seek Recognition *</label>
              <textarea className={`${fieldClass} min-h-[100px] resize-y`}
                placeholder="Explain why your firm deserves to be recognised by Juris Standard in this division..."
                value={form.key_areas_for_recognition} onChange={e => setForm(f => ({ ...f, key_areas_for_recognition: e.target.value }))} />
            </div>
          </div>
        )}

        {/* STEP 3: Contact Details */}
        {step === 3 && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <User className="w-5 h-5 text-[#CBAA69]/60" strokeWidth={1.2} />
              <h2 className="text-lg font-serif font-light text-white">Contact Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className={labelClass}>Contact Person Name *</label>
                <input className={fieldClass} placeholder="Full name" value={form.contact_name}
                  onChange={e => setForm(f => ({ ...f, contact_name: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Designation / Role *</label>
                <input className={fieldClass} placeholder="e.g. Managing Partner, Head of Business Development" value={form.contact_designation}
                  onChange={e => setForm(f => ({ ...f, contact_designation: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Contact Phone</label>
                <div className="flex items-center border border-[#1e1e1e] bg-[#080808] rounded-[2px] focus-within:border-[#CBAA69]/50 transition-colors">
                  <Phone className="w-4 h-4 text-white/20 ml-4 shrink-0" strokeWidth={1.2} />
                  <input className="flex-1 bg-transparent text-sm text-white px-3 py-3 focus:outline-none placeholder:text-white/20"
                    placeholder="+91 98765 43210" value={form.contact_phone}
                    onChange={e => setForm(f => ({ ...f, contact_phone: e.target.value }))} />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Contact Email *</label>
                <div className="flex items-center border border-[#1e1e1e] bg-[#080808] rounded-[2px] focus-within:border-[#CBAA69]/50 transition-colors">
                  <Mail className="w-4 h-4 text-white/20 ml-4 shrink-0" strokeWidth={1.2} />
                  <input className="flex-1 bg-transparent text-sm text-white px-3 py-3 focus:outline-none placeholder:text-white/20"
                    placeholder="contact@yourfirm.com" value={form.contact_email} type="email"
                    onChange={e => setForm(f => ({ ...f, contact_email: e.target.value }))} />
                </div>
              </div>
            </div>

            {/* Review Summary */}
            <div className="border border-[#CBAA69]/15 bg-[#0a0805] p-6 rounded-[2px] mt-2">
              <p className="text-[0.5rem] uppercase tracking-[0.25em] text-[#CBAA69]/60 mb-4">Application Summary</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {[
                  ["Firm Name", form.firm_name],
                  ["Division Applied", form.applying_for_division],
                  ["Headquarters", form.headquarters_city + (form.country ? `, ${form.country}` : "")],
                  ["Firm Type", form.firm_type],
                  ["Practice Areas", `${form.practice_areas.length} selected`],
                  ["Firm Size", form.firm_size],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col">
                    <span className="text-[0.45rem] uppercase tracking-widest text-white/30">{k}</span>
                    <span className="text-xs text-white/70 mt-0.5">{v || "—"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-xs mt-4 p-3 border border-red-900/30 bg-red-950/10 rounded-[2px]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#1a1a1a]">
          <button
            onClick={() => step === 0 ? router.push("/") : setStep(s => s - 1)}
            className="flex items-center gap-2 px-6 py-3 border border-[#1e1e1e] text-white/40 text-[0.6rem] uppercase tracking-[0.2em] hover:border-white/20 hover:text-white/70 transition-all rounded-[2px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {step === 0 ? "BACK TO SITE" : "PREVIOUS"}
          </button>

          {step < STEPS.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-[#CBAA69]/10 border border-[#CBAA69]/30 text-[#CBAA69] text-[0.6rem] uppercase tracking-[0.2em] hover:bg-[#CBAA69]/20 hover:border-[#CBAA69]/60 transition-all rounded-[2px]"
            >
              NEXT STEP <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#CBAA69] to-[#B89552] text-[#050505] text-[0.6rem] font-medium uppercase tracking-[0.2em] hover:from-[#E8D099] hover:to-[#CBAA69] transition-all disabled:opacity-50 rounded-[2px]"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {submitting ? "SUBMITTING..." : "SUBMIT APPLICATION"} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
