"use client";

import { DIVISIONS, CATEGORIES, normalizeDivision, stripTM } from "@/lib/adminConstants";

export const dynamic = "force-dynamic";

import { useState, useEffect, useCallback } from "react";
import {
  CheckCircle2, XCircle, PauseCircle, Clock, ChevronDown,
  Building2, Mail, Phone, Globe, MapPin, Users, Trash2, X,
  Loader2, Filter, RefreshCw,
} from "lucide-react";

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

const STATUS_TABS = ["all", "pending", "approved", "rejected", "on_hold"] as const;
type StatusTab = typeof STATUS_TABS[number];

const statusColors: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  approved: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  rejected: "bg-red-500/15 text-red-400 border border-red-500/30",
  on_hold: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
};

const modalFieldClass = "w-full bg-[#15171c] border border-[#CBAA69]/35 text-white text-[0.95rem] px-4 py-3 focus:outline-none focus:border-[#CBAA69]/40 placeholder:text-white/40 rounded-[3px]";
const modalLabelClass = "text-[0.72rem] uppercase tracking-[0.2em] text-[#E3C888] block mb-1.5 font-medium";

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<StatusTab>("all");
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  const [approveModal, setApproveModal] = useState<Application | null>(null);
  const [placement, setPlacement] = useState({ division: DIVISIONS[0], category: CATEGORIES[DIVISIONS[0]][0], year: new Date().getFullYear().toString(), note: "" });
  const [approving, setApproving] = useState(false);
  const [rejectModal, setRejectModal] = useState<Application | null>(null);
  const [rejectNote, setRejectNote] = useState("");
  const [rejecting, setRejecting] = useState(false);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/applications");
      const data = await res.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchApplications(); }, [fetchApplications]);

  const filtered = activeTab === "all"
    ? applications
    : applications.filter(a => a.status === activeTab);

  const counts = STATUS_TABS.reduce((acc, tab) => {
    acc[tab] = tab === "all" ? applications.length : applications.filter(a => a.status === tab).length;
    return acc;
  }, {} as Record<StatusTab, number>);

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
      fetchApplications();
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

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this application permanently?")) return;
    await fetch(`/api/admin/applications?id=${id}`, { method: "DELETE" });
    fetchApplications();
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-serif font-medium text-white tracking-wide">Applications</h1>
          <p className="text-[0.76rem] uppercase tracking-[0.25em] text-white/65 mt-1">
            {applications.length} total · {counts.pending} pending review
          </p>
        </div>
        <button onClick={fetchApplications}
          className="flex items-center gap-2 px-4 py-2 text-[0.76rem] uppercase tracking-[0.2em] text-white/65 border border-white/15 hover:border-white/25 hover:text-white transition-all rounded-[3px]">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-1 border-b border-white/15 mb-6">
        {STATUS_TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`relative pb-3 px-4 text-[0.8rem] uppercase tracking-[0.2em] border-b-2 transition-all flex items-center gap-2 ${
              activeTab === tab
                ? "border-[#CBAA69] text-[#CBAA69]"
                : "border-transparent text-white/65 hover:text-white"
            }`}>
            {tab.replace("_", " ")}
            {counts[tab] > 0 && (
              <span className={`px-1.5 py-0.5 rounded-full text-[0.72rem] font-bold ${
                tab === "pending" ? "bg-amber-400/20 text-amber-400" : "bg-white/10 text-white/65"
              }`}>
                {counts[tab]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-white/65 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center border border-white/15 rounded-lg bg-[#1c1f26]">
          <Building2 className="w-8 h-8 text-white/65 mx-auto mb-3" strokeWidth={1} />
          <p className="text-white/65 text-[0.95rem] font-light">No applications found.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(app => (
            <div key={app.id} className="border border-white/15 bg-[#1c1f26] hover:border-white/15 rounded-lg overflow-hidden transition-colors">
              {/* Row */}
              <div className="flex items-center gap-4 px-5 py-4">
                <div className="w-9 h-9 rounded-full bg-[#CBAA69]/6 border border-[#CBAA69]/35 flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4 text-[#E3C888]" strokeWidth={1.2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.95rem] text-white/85 font-light truncate">{app.firm_name}</p>
                  <p className="text-[0.72rem] uppercase tracking-widest text-white/65 mt-0.5 truncate">
                    {app.firm_type} · {app.headquarters_city}, {app.country} · {stripTM(app.applying_for_division)}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-2.5 py-1 rounded-[3px] text-[0.72rem] uppercase tracking-widest ${statusColors[app.status] || "text-white/65 bg-white/[0.08] border border-white/15"}`}>
                    {app.status.replace("_", " ")}
                  </span>
                  <span className="text-[0.72rem] text-white/65">
                    {new Date(app.submitted_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                  <button onClick={() => setExpandedApp(expandedApp === app.id ? null : app.id)}
                    className="p-2 text-white/65 hover:text-white transition-colors rounded">
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedApp === app.id ? "rotate-180" : ""}`} />
                  </button>
                </div>
              </div>

              {/* Expanded */}
              {expandedApp === app.id && (
                <div className="border-t border-white/15 px-5 py-5 bg-[#252932]">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
                    {/* Firm Details */}
                    <div className="flex flex-col gap-2.5">
                      <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[#E3C888] mb-0.5">Firm Details</p>
                      {app.logo_url && <img src={app.logo_url} alt="Logo" className="h-7 object-contain self-start mb-1" />}
                      {([
                        [Building2, app.firm_type],
                        [MapPin, `${app.headquarters_city}, ${app.country}`],
                        [Globe, app.website_url],
                        [Users, `${app.num_partners || "?"} partners · ${app.num_lawyers || "?"} lawyers`],
                      ] as [React.ComponentType<{ className: string; strokeWidth: number }>, string][]).map(([Icon, val], i) => val ? (
                        <div key={i} className="flex items-start gap-2">
                          <Icon className="w-3.5 h-3.5 text-white/65 mt-0.5 shrink-0" strokeWidth={1.2} />
                          <span className="text-[0.85rem] text-white/80 font-light">{val}</span>
                        </div>
                      ) : null)}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {(app.practice_areas || []).map(a => (
                          <span key={a} className="px-2 py-0.5 text-[0.72rem] uppercase tracking-wider border border-[#CBAA69]/35 text-[#E3C888] rounded-[2px]">{a}</span>
                        ))}
                      </div>
                    </div>
                    {/* Why Apply */}
                    <div className="flex flex-col gap-3">
                      <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[#E3C888] mb-0.5">Why Apply</p>
                      {[["About", app.about_firm], ["Achievements", app.achievements], ["Key Areas", app.key_areas_for_recognition]].map(([title, val]) => (
                        <div key={title}>
                          <p className="text-[0.72rem] uppercase tracking-widest text-white/65 mb-1">{title}</p>
                          <p className="text-[0.85rem] text-white/80 font-light leading-relaxed">{val || "—"}</p>
                        </div>
                      ))}
                    </div>
                    {/* Contact */}
                    <div className="flex flex-col gap-2.5">
                      <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[#E3C888] mb-0.5">Contact</p>
                      {([
                        [Mail, app.contact_email],
                        [Phone, app.contact_phone],
                      ] as [React.ComponentType<{ className: string; strokeWidth: number }>, string][]).map(([Icon, val], i) => val ? (
                        <div key={i} className="flex items-start gap-2">
                          <Icon className="w-3.5 h-3.5 text-white/65 mt-0.5 shrink-0" strokeWidth={1.2} />
                          <span className="text-[0.85rem] text-white/80 font-light">{val}</span>
                        </div>
                      ) : null)}
                      <div>
                        <p className="text-[0.72rem] uppercase tracking-widest text-white/65 mb-0.5">Contact Person</p>
                        <p className="text-[0.85rem] text-white/70">{app.contact_name}</p>
                        <p className="text-[0.72rem] text-white/65">{app.contact_designation}</p>
                      </div>
                      {app.admin_note && (
                        <div className="mt-1 p-3 border border-amber-400/15 bg-amber-400/5 rounded-[3px]">
                          <p className="text-[0.72rem] uppercase tracking-widest text-amber-400/60 mb-1">Admin Note</p>
                          <p className="text-[0.85rem] text-amber-400/75 font-light">{app.admin_note}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/15">
                    {(app.status === "pending" || app.status === "on_hold") && (
                      <>
                        <button
                          onClick={() => {
                            setApproveModal(app);
                            const div = normalizeDivision(app.applying_for_division) || DIVISIONS[0];
                            setPlacement({ division: div, category: CATEGORIES[div][0], year: new Date().getFullYear().toString(), note: "" });
                          }}
                          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[0.76rem] uppercase tracking-[0.15em] hover:bg-emerald-500/18 transition-all rounded-[3px]">
                          <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.5} /> Approve & Publish
                        </button>
                        <button onClick={() => setRejectModal(app)}
                          className="flex items-center gap-2 px-4 py-2.5 border border-red-900/35 text-red-400/65 text-[0.76rem] uppercase tracking-[0.15em] hover:border-red-500/40 hover:text-red-400 transition-all rounded-[3px]">
                          <XCircle className="w-3.5 h-3.5" strokeWidth={1.5} /> Reject
                        </button>
                        {app.status !== "on_hold" && (
                          <button onClick={() => handleHold(app)}
                            className="flex items-center gap-2 px-4 py-2.5 border border-blue-900/30 text-blue-400/55 text-[0.76rem] uppercase tracking-[0.15em] hover:border-blue-500/30 hover:text-blue-400 transition-all rounded-[3px]">
                            <PauseCircle className="w-3.5 h-3.5" strokeWidth={1.5} /> Hold
                          </button>
                        )}
                      </>
                    )}
                    {app.status === "approved" && app.assigned_division && (
                      <p className="text-[0.85rem] text-emerald-400/65 font-light">
                        Placed in <strong className="text-emerald-400">{stripTM(app.assigned_division)}</strong> → {stripTM(app.assigned_category)} · {app.assigned_year}
                      </p>
                    )}
                    {app.status === "rejected" && (
                      <p className="text-[0.85rem] text-red-400/55 font-light">Application rejected</p>
                    )}
                    <button onClick={() => handleDelete(app.id)} className="ml-auto p-2 text-white/65 hover:text-red-400 transition-colors rounded">
                      <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Approve Modal */}
      {approveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#1c1f26] border border-[#CBAA69]/35 rounded-lg w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#CBAA69]/35">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#E3C888] mb-1">Place & Publish</p>
                <h2 className="text-base font-serif font-light text-white">{approveModal.firm_name}</h2>
              </div>
              <button onClick={() => setApproveModal(null)} className="text-white/65 hover:text-white transition-colors"><X className="w-5 h-5" strokeWidth={1.2} /></button>
            </div>
            <div className="px-6 py-5 flex flex-col gap-4">
              <div>
                <label className={modalLabelClass}>Division (from application)</label>
                {normalizeDivision(approveModal.applying_for_division) ? (
                  <div className="flex items-center justify-between w-full bg-[#CBAA69]/10 border border-[#CBAA69]/40 text-[#F0D898] text-[0.95rem] font-medium px-4 py-3 rounded-[3px]">
                    <span>{stripTM(placement.division)}</span>
                    <span className="text-[0.7rem] uppercase tracking-widest text-[#E3C888]/80">Auto-selected</span>
                  </div>
                ) : (
                  <select className={modalFieldClass} value={placement.division} onChange={e => setPlacement(p => ({ ...p, division: e.target.value, category: CATEGORIES[e.target.value]?.[0] || "" }))}>
                    {DIVISIONS.map(d => <option key={d} value={d}>{stripTM(d)}</option>)}
                  </select>
                )}
              </div>
              <div>
                <label className={modalLabelClass}>Category / Tier *</label>
                <select className={modalFieldClass} value={placement.category} onChange={e => setPlacement(p => ({ ...p, category: e.target.value }))}>
                  {(CATEGORIES[placement.division] || []).map(c => <option key={c} value={c}>{stripTM(c)}</option>)}
                </select>
              </div>
              <div>
                <label className={modalLabelClass}>Recognition Year *</label>
                <select className={modalFieldClass} value={placement.year} onChange={e => setPlacement(p => ({ ...p, year: e.target.value }))}>
                  {["2027", "2026", "2025"].map(y => <option key={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className={modalLabelClass}>Internal Note (not shown publicly)</label>
                <textarea className={`${modalFieldClass} min-h-[80px] resize-y`} placeholder="e.g. Strong M&A practice, verified..." value={placement.note} onChange={e => setPlacement(p => ({ ...p, note: e.target.value }))} />
              </div>
              <div className="p-4 bg-[#CBAA69]/5 border border-[#CBAA69]/35 rounded-[3px]">
                <p className="text-[0.72rem] uppercase tracking-widest text-[#E3C888] mb-1">Will be published as</p>
                <p className="text-[0.85rem] text-white/80">{approveModal.firm_name} → {stripTM(placement.division)} · {stripTM(placement.category)} · {placement.year}</p>
                <p className="text-[0.72rem] text-white/65 mt-0.5">Firm will be notified at {approveModal.contact_email}</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleApprove} disabled={approving}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#CBAA69] to-[#B89552] text-[#101217] text-[0.8rem] font-bold uppercase tracking-[0.2em] hover:from-[#E8D099] hover:to-[#CBAA69] transition-all disabled:opacity-50 rounded-[3px]">
                  {approving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />}
                  {approving ? "Publishing..." : "Approve & Publish"}
                </button>
                <button onClick={() => setApproveModal(null)} className="px-5 py-3.5 border border-white/15 text-white/65 text-[0.8rem] uppercase tracking-[0.2em] hover:border-white/25 hover:text-white transition-colors rounded-[3px]">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#1c1f26] border border-red-900/25 rounded-lg w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-red-900/18">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.3em] text-red-400/55 mb-1">Reject Application</p>
                <h2 className="text-base font-serif font-light text-white">{rejectModal.firm_name}</h2>
              </div>
              <button onClick={() => { setRejectModal(null); setRejectNote(""); }} className="text-white/65 hover:text-white transition-colors"><X className="w-5 h-5" strokeWidth={1.2} /></button>
            </div>
            <div className="px-6 py-5 flex flex-col gap-4">
              <div>
                <label className="text-[0.72rem] uppercase tracking-[0.2em] text-red-400/55 block mb-1.5 font-medium">Reason (internal note)</label>
                <textarea className="w-full bg-[#15171c] border border-red-900/25 text-white text-[0.95rem] px-4 py-3 focus:outline-none focus:border-red-500/30 placeholder:text-white/40 rounded-[3px] min-h-[100px] resize-y" placeholder="e.g. Does not meet minimum criteria..." value={rejectNote} onChange={e => setRejectNote(e.target.value)} />
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleReject} disabled={rejecting}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-red-900/45 text-red-400 text-[0.8rem] uppercase tracking-[0.2em] hover:bg-red-500/8 transition-all disabled:opacity-50 rounded-[3px]">
                  {rejecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" strokeWidth={1.5} />}
                  {rejecting ? "Rejecting..." : "Confirm Rejection"}
                </button>
                <button onClick={() => { setRejectModal(null); setRejectNote(""); }} className="px-5 py-3 border border-white/15 text-white/65 text-[0.8rem] uppercase tracking-[0.2em] hover:border-white/25 hover:text-white transition-colors rounded-[3px]">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
