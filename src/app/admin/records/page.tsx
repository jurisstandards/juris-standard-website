"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight, Plus, Check, AlertCircle, Trash2, ExternalLink,
  Clock, CheckCircle2, XCircle, PauseCircle, ChevronDown,
  Building2, Mail, Phone, Globe, MapPin, Users, Briefcase, X, Loader2
} from "lucide-react";

interface JurisRecord {
  id: string; recognitionId: string; name: string; type: string;
  division: string; category: string; tier: string; year: string;
  location: string; jurisdiction: string; practiceAreas: string[];
  status: string; badge: string; logoType: string; whyThisRecord: string;
  firmInfo: { founded?: string; size?: string; description?: string };
  recognitionHistory: { year: string; division: string; category: string }[];
  relatedRecords: { name: string; type: string; id: string }[];
}

interface Application {
  id: string; firm_name: string; firm_type: string; year_established: string;
  headquarters_city: string; country: string; website_url: string; logo_url?: string;
  practice_areas: string[]; firm_size: string; num_partners: string; num_lawyers: string; offices: string;
  about_firm: string; achievements: string; key_areas_for_recognition: string; applying_for_division: string;
  contact_name: string; contact_email: string; contact_phone: string; contact_designation: string;
  status: string; admin_note?: string;
  assigned_division?: string; assigned_category?: string; assigned_year?: string;
  submitted_at: string; reviewed_at?: string;
}

const DIVISIONS = [
  "Law Firm Excellence™", "Litigation Masters™", "Corporate Elite™",
  "Women Leaders™", "Future Leaders™", "Legal Innovation Excellence™",
];
const CATEGORIES: Record<string, string[]> = {
  "Law Firm Excellence™": ["Principal Record", "Distinguished Law Firms", "Rising Law Firms"],
  "Litigation Masters™": ["Senior Counsel", "Established Advocates", "Rising Advocates"],
  "Corporate Elite™": ["Corporate Senior", "Corporate Partners", "Corporate Associates"],
  "Women Leaders™": ["Women Leaders 2027", "Distinguished Women", "Next Generation"],
  "Future Leaders™": ["Future Leaders 2027", "Emerging Leaders", "Rising Stars"],
  "Legal Innovation Excellence™": ["Innovation Excellence", "Legal Research", "Legal Technology"],
};

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

const EMPTY_RECORD = {
  name: "", type: "law_firm", division: "Law Firm Excellence™",
  category: "Principal Record", tier: "01", year: new Date().getFullYear().toString(),
  location: "", jurisdiction: "India", status: "active", whyThisRecord: "",
  practiceAreasStr: "", firmInfo: { founded: "", size: "", description: "" },
};

export default function AdminRecordsPage() {
  const [records, setRecords] = useState<JurisRecord[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [form, setForm] = useState({ ...EMPTY_RECORD });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [mainTab, setMainTab] = useState<"records" | "applications">("records");
  const [recordsTab, setRecordsTab] = useState<"list" | "create">("list");
  const [approveModal, setApproveModal] = useState<Application | null>(null);
  const [placement, setPlacement] = useState({ division: "Law Firm Excellence™", category: "Principal Record", year: new Date().getFullYear().toString(), note: "" });
  const [approving, setApproving] = useState(false);
  const [rejectModal, setRejectModal] = useState<Application | null>(null);
  const [rejectNote, setRejectNote] = useState("");
  const [rejecting, setRejecting] = useState(false);
  const [expandedApp, setExpandedApp] = useState<string | null>(null);

  const fetchRecords = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/records");
      setRecords(await res.json());
    } catch (e) { console.error(e); }
  }, []);

  const fetchApplications = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/applications");
      const data = await res.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => { fetchRecords(); fetchApplications(); }, [fetchRecords, fetchApplications]);

  const pendingCount = applications.filter(a => a.status === "pending").length;

  const handlePublish = async () => {
    if (!form.name || !form.location) { setError("Name and Location are required."); return; }
    setSaving(true); setError("");
    const id = slugify(form.name);
    const recognitionId = `JS-${form.division?.slice(0, 3).toUpperCase().replace(/ /g, "")}-${form.year}-${String(records.length + 1).padStart(3, "0")}`;
    const record: JurisRecord = {
      id, recognitionId, name: form.name || "", type: form.type || "law_firm",
      division: form.division || "Law Firm Excellence™", category: form.category || "Principal Record",
      tier: form.tier || "01", year: form.year || new Date().getFullYear().toString(),
      location: form.location || "", jurisdiction: form.jurisdiction || "India",
      practiceAreas: (form.practiceAreasStr || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      status: form.status || "active", badge: `RECOGNISED - ${form.year}`, logoType: "text",
      whyThisRecord: form.whyThisRecord || "", firmInfo: form.firmInfo || {},
      recognitionHistory: [], relatedRecords: [],
    };
    try {
      const res = await fetch("/api/admin/records", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(record) });
      if (!res.ok) throw new Error(await res.text());
      setSaved(true); setTimeout(() => setSaved(false), 3000);
      setForm({ ...EMPTY_RECORD }); setRecordsTab("list"); fetchRecords();
    } catch (e) { setError(String(e)); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Delete record "${id}"?`)) return;
    await fetch(`/api/admin/records?id=${id}`, { method: "DELETE" });
    fetchRecords();
  };

  const handleApprove = async () => {
    if (!approveModal) return;
    setApproving(true);
    try {
      const res = await fetch("/api/admin/applications/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          application_id: approveModal.id,
          assigned_division: placement.division,
          assigned_category: placement.category,
          assigned_year: placement.year,
          admin_note: placement.note,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setApproveModal(null);
      fetchApplications(); fetchRecords();
    } catch (e) { alert("Error: " + String(e)); }
    setApproving(false);
  };

  const handleReject = async () => {
    if (!rejectModal) return;
    setRejecting(true);
    try {
      await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: rejectModal.id, status: "rejected", admin_note: rejectNote }),
      });
      setRejectModal(null); setRejectNote("");
      fetchApplications();
    } catch (e) { alert("Error: " + String(e)); }
    setRejecting(false);
  };

  const handleHold = async (app: Application) => {
    await fetch("/api/admin/applications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: app.id, status: "on_hold" }),
    });
    fetchApplications();
  };

  const handleDeleteApp = async (id: string) => {
    if (!confirm("Delete this application permanently?")) return;
    await fetch(`/api/admin/applications?id=${id}`, { method: "DELETE" });
    fetchApplications();
  };

  const statusColors: Record<string, string> = {
    pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    approved: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    rejected: "text-red-400 bg-red-400/10 border-red-400/20",
    on_hold: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  };
  const statusIcons: Record<string, React.ReactNode> = {
    pending: <Clock className="w-3 h-3" />,
    approved: <CheckCircle2 className="w-3 h-3" />,
    rejected: <XCircle className="w-3 h-3" />,
    on_hold: <PauseCircle className="w-3 h-3" />,
  };

  const fieldClass = "w-full bg-[#080808] border border-[#1e1e1e] text-white text-sm px-4 py-3 focus:outline-none focus:border-[#CBAA69]/50 placeholder:text-white/20 rounded-[2px]";
  const labelClass = "text-[0.5rem] uppercase tracking-[0.2em] text-white/40 block mb-1.5";
  const modalLabelClass = "text-[0.5rem] uppercase tracking-[0.2em] text-[#CBAA69]/70 block mb-1.5 font-medium";
  const modalFieldClass = "w-full bg-[#070503] border border-[#CBAA69]/15 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#CBAA69]/40 placeholder:text-white/20 rounded-[2px]";

  return (
    <main className="min-h-screen bg-[#000000] text-[#FFFFF0] font-sans">
      <div className="border-b border-[#1a1a1a] bg-[#050505] px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-[2px] h-6 bg-[#CBAA69]" />
          <div>
            <div className="text-[0.5rem] uppercase tracking-[0.3em] text-[#CBAA69]/70 mb-0.5">JURIS STANDARD</div>
            <h1 className="text-sm font-semibold tracking-wider">ADMIN PANEL</h1>
          </div>
        </div>
        <Link href="/" className="text-[0.55rem] uppercase tracking-widest text-white/30 hover:text-[#CBAA69] transition-colors">
          ← BACK TO SITE
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="flex items-center gap-1 mb-10 border-b border-[#1a1a1a]">
          <button onClick={() => setMainTab("records")}
            className={`pb-3 px-4 text-[0.6rem] uppercase tracking-[0.2em] border-b-2 transition-colors ${mainTab === "records" ? "border-[#CBAA69] text-[#CBAA69]" : "border-transparent text-white/30 hover:text-white/60"}`}>
            MANAGE RECORDS ({records.length})
          </button>
          <button onClick={() => setMainTab("applications")}
            className={`pb-3 px-4 text-[0.6rem] uppercase tracking-[0.2em] border-b-2 transition-colors flex items-center gap-2 ${mainTab === "applications" ? "border-[#CBAA69] text-[#CBAA69]" : "border-transparent text-white/30 hover:text-white/60"}`}>
            APPLICATIONS
            {pendingCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-yellow-400 text-[#050505] text-[0.5rem] font-bold flex items-center justify-center">{pendingCount}</span>
            )}
          </button>
          <Link href="/admin/users" className="pb-3 px-4 text-[0.6rem] uppercase tracking-[0.2em] border-b-2 border-transparent text-white/30 hover:text-white/60 transition-colors">
            REGISTERED USERS
          </Link>
        </div>

        {mainTab === "records" && (
          <>
            <div className="flex items-center gap-0 border-b border-[#1a1a1a] mb-8">
              {(["list", "create"] as const).map(t => (
                <button key={t} onClick={() => setRecordsTab(t)}
                  className={`px-6 py-3 text-[0.6rem] uppercase tracking-[0.2em] border-b-2 transition-colors ${recordsTab === t ? "border-white text-white" : "border-transparent text-white/30 hover:text-white/60"}`}>
                  {t === "list" ? `ALL RECORDS (${records.length})` : "+ CREATE NEW RECORD"}
                </button>
              ))}
            </div>
            {recordsTab === "list" && (
              <div className="flex flex-col gap-3">
                {records.length === 0 && <p className="text-white/30 text-sm italic">No records yet.</p>}
                {records.map(r => (
                  <div key={r.id} className="flex items-center gap-4 px-5 py-4 border border-[#1a1a1a] bg-[#080808] hover:border-[#CBAA69]/20 transition-colors">
                    <div className="flex-1">
                      <div className="text-sm text-white/80 font-light">{r.name}</div>
                      <div className="text-[0.45rem] uppercase tracking-widest text-white/30 mt-0.5">{r.division} · {r.category} · {r.year} · {r.recognitionId}</div>
                    </div>
                    <span className={`text-[0.45rem] uppercase tracking-widest px-2.5 py-1 rounded-[2px] ${r.status === "active" ? "bg-emerald-400/10 text-emerald-400" : "bg-white/5 text-white/30"}`}>{r.status}</span>
                    <Link href={`/juris-index/law-firms/${r.id}`} target="_blank" className="p-2 text-white/20 hover:text-[#CBAA69] transition-colors"><ExternalLink className="w-3.5 h-3.5" /></Link>
                    <button onClick={() => handleDelete(r.id)} className="p-2 text-white/20 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
                <button onClick={() => setRecordsTab("create")}
                  className="mt-4 flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#CBAA69] to-[#B89552] text-[#050505] text-[0.65rem] font-bold uppercase tracking-[0.15em] hover:from-[#E8D099] hover:to-[#CBAA69] transition-all self-start rounded-[2px]">
                  <Plus className="w-4 h-4" /> CREATE NEW RECORD
                </button>
              </div>
            )}
            {recordsTab === "create" && (
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className={labelClass}>Name *</label>
                    <input className={fieldClass} placeholder="e.g. Khaitan & Co" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                    {form.name && <div className="mt-1.5 text-[0.45rem] text-white/30 font-mono">URL: /juris-index/law-firms/{slugify(form.name)}</div>}
                  </div>
                  <div><label className={labelClass}>Type</label>
                    <select className={fieldClass} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                      <option value="law_firm">Law Firm</option><option value="professional">Professional</option><option value="organisation">Organisation</option>
                    </select>
                  </div>
                  <div><label className={labelClass}>Division</label>
                    <select className={fieldClass} value={form.division} onChange={e => setForm(f => ({ ...f, division: e.target.value, category: CATEGORIES[e.target.value]?.[0] || "" }))}>
                      {DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div><label className={labelClass}>Category</label>
                    <select className={fieldClass} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                      {(CATEGORIES[form.division || "Law Firm Excellence™"] || []).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div><label className={labelClass}>Year</label>
                    <input className={fieldClass} type="number" placeholder="2027" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} />
                  </div>
                  <div><label className={labelClass}>Location *</label>
                    <input className={fieldClass} placeholder="e.g. Mumbai" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                  </div>
                  <div><label className={labelClass}>Jurisdiction</label>
                    <input className={fieldClass} placeholder="e.g. India" value={form.jurisdiction} onChange={e => setForm(f => ({ ...f, jurisdiction: e.target.value }))} />
                  </div>
                  <div><label className={labelClass}>Status</label>
                    <select className={fieldClass} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                      <option value="active">Active</option><option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="md:col-span-2"><label className={labelClass}>Practice Areas (comma-separated)</label>
                    <input className={fieldClass} placeholder="Corporate & Commercial, Banking & Finance" value={form.practiceAreasStr} onChange={e => setForm(f => ({ ...f, practiceAreasStr: e.target.value }))} />
                  </div>
                  <div className="md:col-span-2"><label className={labelClass}>Why This Record</label>
                    <textarea className={`${fieldClass} min-h-[100px] resize-y`} placeholder="Official reason..." value={form.whyThisRecord} onChange={e => setForm(f => ({ ...f, whyThisRecord: e.target.value }))} />
                  </div>
                  <div><label className={labelClass}>Founded (year)</label>
                    <input className={fieldClass} placeholder="e.g. 1911" value={form.firmInfo?.founded || ""} onChange={e => setForm(f => ({ ...f, firmInfo: { ...f.firmInfo, founded: e.target.value } }))} />
                  </div>
                  <div><label className={labelClass}>Size</label>
                    <select className={fieldClass} value={form.firmInfo?.size || ""} onChange={e => setForm(f => ({ ...f, firmInfo: { ...f.firmInfo, size: e.target.value } }))}>
                      <option value="">Select size</option><option>Full Service</option><option>Specialist</option><option>Boutique</option><option>Mid Size</option>
                    </select>
                  </div>
                  <div className="md:col-span-2"><label className={labelClass}>About / Description</label>
                    <textarea className={`${fieldClass} min-h-[80px] resize-y`} value={form.firmInfo?.description || ""} onChange={e => setForm(f => ({ ...f, firmInfo: { ...f.firmInfo, description: e.target.value } }))} />
                  </div>
                </div>
                {error && <div className="flex items-center gap-2 text-red-400 text-xs"><AlertCircle className="w-4 h-4" /> {error}</div>}
                {saved && <div className="flex items-center gap-2 text-emerald-400 text-xs"><Check className="w-4 h-4" /> Record published!</div>}
                <div className="flex items-center gap-4">
                  <button onClick={handlePublish} disabled={saving}
                    className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#CBAA69] to-[#B89552] text-[#050505] text-[0.7rem] font-bold uppercase tracking-[0.15em] hover:from-[#E8D099] hover:to-[#CBAA69] transition-all disabled:opacity-50 rounded-[2px]">
                    {saving ? "PUBLISHING..." : "PUBLISH"} <ArrowRight className="w-4 h-4" />
                  </button>
                  <button onClick={() => { setForm({ ...EMPTY_RECORD }); setRecordsTab("list"); }}
                    className="px-6 py-4 border border-[#1e1e1e] text-white/40 text-[0.7rem] uppercase tracking-[0.15em] hover:border-white/20 hover:text-white/70 transition-colors rounded-[2px]">
                    CANCEL
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {mainTab === "applications" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-serif font-light text-white">Firm Applications</h2>
                <p className="text-[0.5rem] uppercase tracking-[0.2em] text-white/30 mt-1">{applications.length} total · {pendingCount} pending review</p>
              </div>
            </div>
            {applications.length === 0 && (
              <div className="text-center py-16 border border-[#1a1a1a] bg-[#050505] rounded-[2px]">
                <Briefcase className="w-8 h-8 text-white/10 mx-auto mb-3" strokeWidth={1} />
                <p className="text-white/30 text-sm font-light">No applications yet.</p>
                <p className="text-[0.5rem] uppercase tracking-widest text-white/20 mt-1">Applications submitted via /register will appear here.</p>
              </div>
            )}
            {applications.map(app => (
              <div key={app.id} className="border border-[#1a1a1a] bg-[#080808] hover:border-[#CBAA69]/15 transition-colors rounded-[2px] overflow-hidden">
                <div className="flex items-center gap-4 px-6 py-5">
                  <div className="w-10 h-10 rounded-full bg-[#CBAA69]/5 border border-[#CBAA69]/15 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-[#CBAA69]/60" strokeWidth={1.2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/90 font-light truncate">{app.firm_name}</p>
                    <p className="text-[0.45rem] uppercase tracking-widest text-white/30 mt-0.5">
                      {app.firm_type} · {app.headquarters_city}, {app.country} · Applied for {app.applying_for_division}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 border rounded-[2px] text-[0.45rem] uppercase tracking-widest ${statusColors[app.status] || "text-white/40 bg-white/5 border-white/10"}`}>
                      {statusIcons[app.status]}{app.status.replace("_", " ")}
                    </span>
                    <span className="text-[0.45rem] text-white/30">{new Date(app.submitted_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <button onClick={() => setExpandedApp(expandedApp === app.id ? null : app.id)} className="p-2 text-white/30 hover:text-white transition-colors">
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedApp === app.id ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                </div>
                {expandedApp === app.id && (
                  <div className="border-t border-[#1a1a1a] px-6 py-6 bg-[#050505]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="flex flex-col gap-3">
                        <p className="text-[0.5rem] uppercase tracking-[0.2em] text-[#CBAA69]/60 mb-1">Firm Details</p>
                        {app.logo_url && <img src={app.logo_url} alt="Logo" className="h-8 object-contain self-start mb-2" />}
                        {([
                          [Building2, app.firm_type],
                          [MapPin, `${app.headquarters_city}, ${app.country}`],
                          [Globe, app.website_url],
                          [Users, `${app.num_partners || "?"} partners · ${app.num_lawyers || "?"} lawyers`]
                        ] as any[]).map(([Icon, val], i) => val ? (
                          <div key={i} className="flex items-start gap-2">
                            <Icon className="w-3.5 h-3.5 text-white/30 mt-0.5 shrink-0" strokeWidth={1.2} />
                            <span className="text-xs text-white/60 font-light">{val}</span>
                          </div>
                        ) : null)}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(app.practice_areas || []).map(a => (
                            <span key={a} className="px-2 py-0.5 text-[0.4rem] uppercase tracking-wider border border-[#CBAA69]/15 text-[#CBAA69]/60 rounded-[2px]">{a}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <p className="text-[0.5rem] uppercase tracking-[0.2em] text-[#CBAA69]/60 mb-1">Why Apply</p>
                        <div>
                          <p className="text-[0.45rem] uppercase tracking-widest text-white/30 mb-1">About</p>
                          <p className="text-xs text-white/60 font-light leading-relaxed">{app.about_firm || "—"}</p>
                        </div>
                        <div>
                          <p className="text-[0.45rem] uppercase tracking-widest text-white/30 mb-1">Achievements</p>
                          <p className="text-xs text-white/60 font-light leading-relaxed">{app.achievements || "—"}</p>
                        </div>
                        <div>
                          <p className="text-[0.45rem] uppercase tracking-widest text-white/30 mb-1">Key Areas</p>
                          <p className="text-xs text-white/60 font-light leading-relaxed">{app.key_areas_for_recognition || "—"}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <p className="text-[0.5rem] uppercase tracking-[0.2em] text-[#CBAA69]/60 mb-1">Contact</p>
                        {([
                          [Mail, app.contact_email],
                          [Phone, app.contact_phone]
                        ] as any[]).map(([Icon, val], i) => val ? (
                          <div key={i} className="flex items-start gap-2">
                            <Icon className="w-3.5 h-3.5 text-white/30 mt-0.5 shrink-0" strokeWidth={1.2} />
                            <span className="text-xs text-white/60 font-light">{val}</span>
                          </div>
                        ) : null)}
                        <div className="mt-1">
                          <p className="text-[0.45rem] uppercase tracking-widest text-white/30 mb-0.5">Contact Person</p>
                          <p className="text-xs text-white/70">{app.contact_name}</p>
                          <p className="text-[0.5rem] text-white/40">{app.contact_designation}</p>
                        </div>
                        {app.admin_note && (
                          <div className="mt-2 p-3 border border-yellow-400/15 bg-yellow-400/5 rounded-[2px]">
                            <p className="text-[0.45rem] uppercase tracking-widest text-yellow-400/60 mb-1">Admin Note</p>
                            <p className="text-xs text-yellow-400/80 font-light">{app.admin_note}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {(app.status === "pending" || app.status === "on_hold") ? (
                      <div className="flex items-center gap-3 pt-4 border-t border-[#1a1a1a]">
                        <button onClick={() => { setApproveModal(app); setPlacement({ division: app.applying_for_division || "Law Firm Excellence™", category: CATEGORIES[app.applying_for_division || "Law Firm Excellence™"]?.[0] || "Principal Record", year: new Date().getFullYear().toString(), note: "" }); }}
                          className="flex items-center gap-2 px-6 py-2.5 bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-[0.55rem] uppercase tracking-[0.2em] hover:bg-emerald-400/20 transition-all rounded-[2px]">
                          <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} /> APPROVE & PUBLISH
                        </button>
                        <button onClick={() => setRejectModal(app)}
                          className="flex items-center gap-2 px-5 py-2.5 border border-red-900/40 text-red-400/70 text-[0.55rem] uppercase tracking-[0.2em] hover:border-red-500/40 hover:text-red-400 transition-all rounded-[2px]">
                          <XCircle className="w-4 h-4" strokeWidth={1.5} /> REJECT
                        </button>
                        {app.status !== "on_hold" && (
                          <button onClick={() => handleHold(app)}
                            className="flex items-center gap-2 px-5 py-2.5 border border-blue-900/30 text-blue-400/60 text-[0.55rem] uppercase tracking-[0.2em] hover:border-blue-500/30 hover:text-blue-400 transition-all rounded-[2px]">
                            <PauseCircle className="w-4 h-4" strokeWidth={1.5} /> PUT ON HOLD
                          </button>
                        )}
                        <button onClick={() => handleDeleteApp(app.id)} className="ml-auto p-2 text-white/20 hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between pt-4 border-t border-[#1a1a1a]">
                        {app.status === "approved" && app.assigned_division && (
                          <p className="text-xs text-emerald-400/70 font-light">Placed in <strong className="text-emerald-400">{app.assigned_division}</strong> → {app.assigned_category} · {app.assigned_year}</p>
                        )}
                        {app.status === "rejected" && <p className="text-xs text-red-400/70 font-light">Rejected</p>}
                        <button onClick={() => handleDeleteApp(app.id)} className="ml-auto p-2 text-white/20 hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {approveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#070503] border border-[#CBAA69]/20 rounded-[2px] w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between px-8 py-6 border-b border-[#CBAA69]/10">
              <div>
                <p className="text-[0.5rem] uppercase tracking-[0.3em] text-[#CBAA69]/60 mb-1">Place & Publish</p>
                <h2 className="text-lg font-serif font-light text-white">{approveModal.firm_name}</h2>
              </div>
              <button onClick={() => setApproveModal(null)} className="text-white/30 hover:text-white transition-colors">
                <X className="w-5 h-5" strokeWidth={1.2} />
              </button>
            </div>
            <div className="px-8 py-6 flex flex-col gap-5">
              <div>
                <label className={modalLabelClass}>Division *</label>
                <select className={modalFieldClass} value={placement.division} onChange={e => setPlacement(p => ({ ...p, division: e.target.value, category: CATEGORIES[e.target.value]?.[0] || "" }))}>
                  {DIVISIONS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className={modalLabelClass}>Category / Tier *</label>
                <select className={modalFieldClass} value={placement.category} onChange={e => setPlacement(p => ({ ...p, category: e.target.value }))}>
                  {(CATEGORIES[placement.division] || []).map(c => <option key={c}>{c}</option>)}
                </select>
                <p className="text-[0.45rem] text-white/25 mt-1">
                  {placement.category === "Principal Record" && "→ Tier 01 — Highest visibility"}
                  {placement.category === "Distinguished Law Firms" && "→ Tier 02 — Distinguished"}
                  {placement.category === "Rising Law Firms" && "→ Tier 03 — Rising"}
                </p>
              </div>
              <div>
                <label className={modalLabelClass}>Recognition Year *</label>
                <select className={modalFieldClass} value={placement.year} onChange={e => setPlacement(p => ({ ...p, year: e.target.value }))}>
                  {["2027", "2026", "2025"].map(y => <option key={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className={modalLabelClass}>Internal Note (not shown publicly)</label>
                <textarea className={`${modalFieldClass} min-h-[80px] resize-y`} placeholder="e.g. Strong M&A practice, verified by council review..." value={placement.note} onChange={e => setPlacement(p => ({ ...p, note: e.target.value }))} />
              </div>
              <div className="p-4 bg-[#CBAA69]/5 border border-[#CBAA69]/15 rounded-[2px]">
                <p className="text-[0.45rem] uppercase tracking-widest text-[#CBAA69]/60 mb-1">Will be published as</p>
                <p className="text-xs text-white/70">{approveModal.firm_name} → {placement.division} · {placement.category} · {placement.year}</p>
                <p className="text-[0.45rem] text-white/30 mt-0.5">Firm will be notified at {approveModal.contact_email}</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleApprove} disabled={approving}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#CBAA69] to-[#B89552] text-[#050505] text-[0.6rem] font-medium uppercase tracking-[0.2em] hover:from-[#E8D099] hover:to-[#CBAA69] transition-all disabled:opacity-50 rounded-[2px]">
                  {approving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />}
                  {approving ? "PUBLISHING..." : "APPROVE & PUBLISH NOW"}
                </button>
                <button onClick={() => setApproveModal(null)} className="px-6 py-3.5 border border-[#1e1e1e] text-white/40 text-[0.6rem] uppercase tracking-[0.2em] hover:border-white/20 hover:text-white/70 transition-colors rounded-[2px]">CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#070503] border border-red-900/30 rounded-[2px] w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-8 py-6 border-b border-red-900/20">
              <div>
                <p className="text-[0.5rem] uppercase tracking-[0.3em] text-red-400/60 mb-1">Reject Application</p>
                <h2 className="text-base font-serif font-light text-white">{rejectModal.firm_name}</h2>
              </div>
              <button onClick={() => { setRejectModal(null); setRejectNote(""); }} className="text-white/30 hover:text-white transition-colors">
                <X className="w-5 h-5" strokeWidth={1.2} />
              </button>
            </div>
            <div className="px-8 py-6 flex flex-col gap-4">
              <div>
                <label className="text-[0.5rem] uppercase tracking-[0.2em] text-red-400/60 block mb-1.5 font-medium">Reason (internal note)</label>
                <textarea className={`${fieldClass} min-h-[100px] resize-y border-red-900/30 focus:border-red-500/30`} placeholder="e.g. Does not meet minimum criteria..." value={rejectNote} onChange={e => setRejectNote(e.target.value)} />
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleReject} disabled={rejecting}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-red-900/50 text-red-400 text-[0.6rem] uppercase tracking-[0.2em] hover:bg-red-500/10 transition-all disabled:opacity-50 rounded-[2px]">
                  {rejecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" strokeWidth={1.5} />}
                  {rejecting ? "REJECTING..." : "CONFIRM REJECTION"}
                </button>
                <button onClick={() => { setRejectModal(null); setRejectNote(""); }} className="px-6 py-3 border border-[#1e1e1e] text-white/40 text-[0.6rem] uppercase tracking-[0.2em] hover:border-white/20 hover:text-white/70 transition-colors rounded-[2px]">CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
