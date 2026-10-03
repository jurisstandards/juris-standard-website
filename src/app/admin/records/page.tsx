"use client";

import { DIVISIONS, CATEGORIES, stripTM, tierForCategory } from "@/lib/adminConstants";

export const dynamic = "force-dynamic";

import { useState, useEffect, useCallback } from "react";
import {
  Plus, Check, AlertCircle, Trash2, ExternalLink, ArrowRight,
  RefreshCw, Search, Loader2, FileText, Eye, EyeOff,
} from "lucide-react";

interface JurisRecord {
  id: string; recognitionId: string; name: string; type: string;
  division: string; category: string; tier: string; year: string;
  location: string; jurisdiction: string; practiceAreas: string[];
  status: string; badge: string; logoType: string; whyThisRecord: string;
  sort_order: number | null;
  is_visible: boolean;
  firmInfo: { founded?: string; size?: string; description?: string };
  recognitionHistory: { year: string; division: string; category: string }[];
  relatedRecords: { name: string; type: string; id: string }[];
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

const EMPTY_RECORD = {
  name: "", type: "law_firm", division: DIVISIONS[0],
  category: CATEGORIES[DIVISIONS[0]][0], tier: "01", year: new Date().getFullYear().toString(),
  location: "", jurisdiction: "India", status: "active", whyThisRecord: "",
  practiceAreasStr: "", firmInfo: { founded: "", size: "", description: "" },
};

const fieldClass = "w-full bg-[#15171c] border border-white/15 text-white text-[0.95rem] px-4 py-3 focus:outline-none focus:border-[#CBAA69]/40 placeholder:text-white/40 rounded-[3px] transition-colors";
const labelClass = "text-[0.72rem] uppercase tracking-[0.2em] text-white/65 block mb-1.5";

export default function AdminRecordsPage() {
  const [records, setRecords] = useState<JurisRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "create">("list");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ ...EMPTY_RECORD });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/records");
      setRecords(await res.json());
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchRecords(); }, [fetchRecords]);

  const filtered = records.filter(r =>
    !search || r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.division.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase())
  );

  const handlePublish = async () => {
    if (!form.name || !form.location) { setError("Name and Location are required."); return; }
    setSaving(true); setError("");
    const id = slugify(form.name);
    const recognitionId = `JS-${form.division?.slice(0, 3).toUpperCase().replace(/ /g, "")}-${form.year}-${String(records.length + 1).padStart(3, "0")}`;
    const record: JurisRecord = {
      id, recognitionId, name: form.name, type: form.type,
      division: form.division, category: form.category,
      tier: tierForCategory(form.division, form.category), year: form.year,
      location: form.location, jurisdiction: form.jurisdiction,
      practiceAreas: (form.practiceAreasStr || "").split(",").map(s => s.trim()).filter(Boolean),
      status: form.status, badge: `RECOGNISED - ${form.year}`, logoType: "text",
      whyThisRecord: form.whyThisRecord, firmInfo: form.firmInfo,
      sort_order: null, is_visible: true,
      recognitionHistory: [], relatedRecords: [],
    };
    try {
      const res = await fetch("/api/admin/records", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!res.ok) throw new Error(await res.text());
      setSaved(true); setTimeout(() => setSaved(false), 3000);
      setForm({ ...EMPTY_RECORD }); setView("list"); fetchRecords();
    } catch (e) { setError(String(e)); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Delete record "${id}"?`)) return;
    await fetch(`/api/admin/records?id=${id}`, { method: "DELETE" });
    fetchRecords();
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-serif font-medium text-white tracking-wide">Records</h1>
          <p className="text-[0.76rem] uppercase tracking-[0.25em] text-white/65 mt-1">
            {records.length} total published records
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchRecords}
            className="flex items-center gap-2 px-4 py-2 text-[0.76rem] uppercase tracking-[0.2em] text-white/65 border border-white/15 hover:border-white/25 hover:text-white transition-all rounded-[3px]">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={() => setView(view === "create" ? "list" : "create")}
            className="flex items-center gap-2 px-5 py-2 bg-[#CBAA69]/12 border border-[#CBAA69]/35 text-[#CBAA69] text-[0.8rem] uppercase tracking-[0.15em] hover:bg-[#CBAA69]/20 hover:border-[#CBAA69]/55 transition-all rounded-[3px]">
            <Plus className="w-3.5 h-3.5" />
            {view === "create" ? "Cancel" : "Create New Record"}
          </button>
        </div>
      </div>

      {view === "list" && (
        <>
          {/* Search */}
          <div className="relative mb-5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/65" strokeWidth={1.5} />
            <input
              className="w-full bg-[#1c1f26] border border-white/15 text-white text-[0.95rem] pl-11 pr-4 py-3 focus:outline-none focus:border-[#CBAA69]/30 placeholder:text-white/40 rounded-[3px] transition-colors"
              placeholder="Search records by name, division, category..."
              value={search} onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Table */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 text-white/65 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center border border-white/15 rounded-lg bg-[#1c1f26]">
              <FileText className="w-8 h-8 text-white/65 mx-auto mb-3" strokeWidth={1} />
              <p className="text-white/65 text-[0.95rem] font-light">{search ? "No records match your search." : "No records yet."}</p>
            </div>
          ) : (
          <div className="bg-[#1c1f26] border border-white/15 rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-[1fr_180px_60px_80px_100px_90px] gap-4 px-5 py-3 border-b border-white/15 bg-[#252932]">
                {["Name", "Division · Category", "Year", "Status", "Pos.", "Actions"].map((h, i) => (
                  <div key={i} className="text-[0.72rem] uppercase tracking-[0.15em] text-white/65 font-medium">{h}</div>
                ))}
              </div>
              <div className="divide-y divide-white/15">
                {filtered.map(r => (
                  <RecordRow key={r.id} r={r} onRefresh={fetchRecords} />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {view === "create" && (
        <div className="bg-[#1c1f26] border border-white/15 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-serif font-light text-white">Create New Record</h2>
              <p className="text-[0.72rem] uppercase tracking-widest text-white/65 mt-0.5">
                Manually publish a new recognition record
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className={labelClass}>Name *</label>
              <input className={fieldClass} placeholder="e.g. Khaitan & Co" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              {form.name && <p className="mt-1 text-[0.72rem] text-white/65 font-mono">URL: /juris-index/law-firms/{slugify(form.name)}</p>}
            </div>
            <div>
              <label className={labelClass}>Type</label>
              <select className={fieldClass} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                <option value="law_firm">Law Firm</option>
                <option value="professional">Professional</option>
                <option value="organisation">Organisation</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Division</label>
              <select className={fieldClass} value={form.division} onChange={e => setForm(f => ({ ...f, division: e.target.value, category: CATEGORIES[e.target.value]?.[0] || "" }))}>
                {DIVISIONS.map(d => <option key={d} value={d}>{stripTM(d)}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <select className={fieldClass} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {(CATEGORIES[form.division] || []).map(c => <option key={c} value={c}>{stripTM(c)}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Year</label>
              <input className={fieldClass} type="number" placeholder="2027" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Location *</label>
              <input className={fieldClass} placeholder="e.g. Mumbai" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Jurisdiction</label>
              <input className={fieldClass} placeholder="e.g. India" value={form.jurisdiction} onChange={e => setForm(f => ({ ...f, jurisdiction: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select className={fieldClass} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Founded (year)</label>
              <input className={fieldClass} placeholder="e.g. 1911" value={form.firmInfo?.founded || ""} onChange={e => setForm(f => ({ ...f, firmInfo: { ...f.firmInfo, founded: e.target.value } }))} />
            </div>
            <div>
              <label className={labelClass}>Size</label>
              <select className={fieldClass} value={form.firmInfo?.size || ""} onChange={e => setForm(f => ({ ...f, firmInfo: { ...f.firmInfo, size: e.target.value } }))}>
                <option value="">Select size</option>
                <option>Full Service</option><option>Specialist</option>
                <option>Boutique</option><option>Mid Size</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Practice Areas (comma-separated)</label>
              <input className={fieldClass} placeholder="Corporate & Commercial, Banking & Finance" value={form.practiceAreasStr} onChange={e => setForm(f => ({ ...f, practiceAreasStr: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Why This Record</label>
              <textarea className={`${fieldClass} min-h-[90px] resize-y`} placeholder="Official recognition rationale..." value={form.whyThisRecord} onChange={e => setForm(f => ({ ...f, whyThisRecord: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>About / Description</label>
              <textarea className={`${fieldClass} min-h-[75px] resize-y`} value={form.firmInfo?.description || ""} onChange={e => setForm(f => ({ ...f, firmInfo: { ...f.firmInfo, description: e.target.value } }))} />
            </div>
          </div>

          {error && <div className="flex items-center gap-2 text-red-400 text-[0.85rem] mt-4"><AlertCircle className="w-4 h-4" />{error}</div>}
          {saved && <div className="flex items-center gap-2 text-emerald-400 text-[0.85rem] mt-4"><Check className="w-4 h-4" />Record published successfully!</div>}

          <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/15">
            <button onClick={handlePublish} disabled={saving}
              className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#CBAA69] to-[#B89552] text-[#101217] text-[0.84rem] font-bold uppercase tracking-[0.15em] hover:from-[#E8D099] hover:to-[#CBAA69] transition-all disabled:opacity-50 rounded-[3px]">
              {saving ? "Publishing..." : "Publish Record"}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => { setForm({ ...EMPTY_RECORD }); setView("list"); }}
              className="px-5 py-3.5 border border-white/15 text-white/65 text-[0.84rem] uppercase tracking-[0.15em] hover:border-white/25 hover:text-white transition-colors rounded-[3px]">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Per-row component with inline position + visibility controls ──────────────
function RecordRow({ r, onRefresh }: { r: JurisRecord; onRefresh: () => void }) {
  const [pos, setPos] = useState(r.sort_order !== null ? String(r.sort_order) : "");
  const [saving, setSaving] = useState(false);

  const patchRecord = async (payload: Record<string, unknown>) => {
    setSaving(true);
    await fetch("/api/admin/records", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: r.id, ...payload }),
    });
    setSaving(false);
    onRefresh();
  };

  const handlePosBlur = () => {
    const num = pos.trim();
    const parsed = num === "" ? null : parseInt(num, 10);
    if (isNaN(parsed as number) && num !== "") return;
    patchRecord({ sort_order: num === "" ? "" : parsed });
  };

  const handleDelete = async () => {
    if (!confirm(`Delete record "${r.name}"?`)) return;
    await fetch(`/api/admin/records?id=${r.id}`, { method: "DELETE" });
    onRefresh();
  };

  return (
    <div className="grid grid-cols-[1fr_180px_60px_80px_100px_90px] gap-4 items-center px-5 py-3.5 hover:bg-white/[0.05] transition-colors">
      {/* Name + ID */}
      <div>
        <p className="text-[0.95rem] text-white/80 font-light">{r.name}</p>
        <p className="text-[0.72rem] font-mono text-white/65 mt-0.5">{r.recognitionId}</p>
      </div>

      {/* Division · Category */}
      <div>
        <p className="text-[0.85rem] text-white/80 font-light truncate">{r.division}</p>
        <p className="text-[0.72rem] text-white/65 truncate">{r.category}</p>
      </div>

      {/* Year */}
      <p className="text-[0.85rem] text-white/80">{r.year}</p>

      {/* Status */}
      <span className={`px-2 py-0.5 rounded-[2px] text-[0.72rem] uppercase tracking-widest whitespace-nowrap ${
        r.status === "active"
          ? "bg-emerald-500/12 text-emerald-400 border border-emerald-500/25"
          : "bg-white/[0.08] text-white/65 border border-white/15"
      }`}>
        {r.status}
      </span>

      {/* Position input */}
      <div className="flex items-center gap-1.5">
        <input
          type="number"
          min={1}
          value={pos}
          onChange={e => setPos(e.target.value)}
          onBlur={handlePosBlur}
          placeholder="—"
          className="w-14 bg-[#15171c] border border-white/15 text-white text-[0.8rem] text-center px-2 py-1.5 focus:outline-none focus:border-[#CBAA69]/40 placeholder:text-white/30 rounded-[3px] transition-colors"
          title="Display position (1 = first)"
        />
        {/* Visibility toggle */}
        <button
          onClick={() => patchRecord({ is_visible: !r.is_visible })}
          disabled={saving}
          title={r.is_visible ? "Visible — click to hide" : "Hidden — click to show"}
          className={`p-1.5 rounded transition-colors ${
            r.is_visible
              ? "text-emerald-400 hover:text-white/65"
              : "text-white/25 hover:text-emerald-400"
          }`}
        >
          {r.is_visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 justify-end">
        <a
          href={`/juris-index/${r.type === "law_firm" || r.type === "Law Firm" ? "law-firms" : r.division?.toLowerCase().includes("legal innovation") ? "legal-innovation" : `professionals/${r.division?.toLowerCase().replace(/[™\s]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")}`}/${r.id}`}
          target="_blank"
          className="p-1.5 text-white/65 hover:text-[#CBAA69] transition-colors rounded"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <button
          onClick={handleDelete}
          className="p-1.5 text-white/65 hover:text-red-400 transition-colors rounded"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
