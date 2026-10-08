"use client";
import { useState, useEffect } from "react";
import { authFetch } from "@/lib/authFetch";
import { Plus, Trash2, Edit3, Save, X, RefreshCw } from "lucide-react";

type MagazinePage = {
  id?: string;
  page_number: number;
  heading: string;
  content: string;
};

export default function AdminMagazine() {
  const [pages, setPages] = useState<MagazinePage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<MagazinePage | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await authFetch("/api/admin/magazine");
      const data = await res.json();
      setPages(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await authFetch("/api/admin/magazine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (!res.ok) throw new Error("Failed to save");
      setEditing(null);
      fetchPages();
    } catch (e) {
      alert("Error: " + String(e));
    }
    setSaving(false);
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Delete this page?")) return;
    try {
      await authFetch(`/api/admin/magazine?id=${id}`, { method: "DELETE" });
      fetchPages();
    } catch (e) {
      alert("Error: " + String(e));
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-medium text-white tracking-wide">Magazine Pages</h1>
          <p className="text-[0.76rem] uppercase tracking-[0.25em] text-white/65 mt-1">
            Manage the content for the official digital magazine
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={fetchPages} className="flex items-center gap-2 px-4 py-2 text-[0.76rem] uppercase tracking-[0.2em] text-white/65 border border-white/15 hover:border-white/25 hover:text-white transition-all rounded-[3px]">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
          <button 
            onClick={() => setEditing({ page_number: pages.length + 1, heading: "", content: "" })}
            className="flex items-center gap-2 px-4 py-2 bg-[#CBAA69] text-black font-semibold text-[0.76rem] uppercase tracking-[0.2em] rounded-[3px] hover:bg-[#e0c484] transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Page
          </button>
        </div>
      </div>

      {editing && (
        <div className="mb-8 p-6 bg-[#1a1d24] border border-[#CBAA69]/30 rounded-lg">
          <h2 className="text-xl font-serif text-[#CBAA69] mb-4">{editing.id ? "Edit Page" : "New Page"}</h2>
          
          <div className="grid gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-1">Page Number</label>
              <input 
                type="number" 
                value={editing.page_number} 
                onChange={e => setEditing({...editing, page_number: parseInt(e.target.value) || 0})}
                className="w-full bg-[#111] border border-white/10 p-2 text-sm text-white rounded outline-none focus:border-[#CBAA69]/50" 
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-1">Heading</label>
              <input 
                type="text" 
                value={editing.heading} 
                onChange={e => setEditing({...editing, heading: e.target.value})}
                className="w-full bg-[#111] border border-white/10 p-2 text-sm text-white rounded outline-none focus:border-[#CBAA69]/50" 
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-1">Content (Markdown supported)</label>
              <textarea 
                rows={10}
                value={editing.content} 
                onChange={e => setEditing({...editing, content: e.target.value})}
                className="w-full bg-[#111] border border-white/10 p-2 text-sm text-white rounded outline-none focus:border-[#CBAA69]/50 font-mono" 
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button 
              onClick={() => setEditing(null)}
              className="px-4 py-2 text-xs uppercase tracking-widest text-white/60 hover:text-white"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-[#CBAA69] text-black font-semibold text-xs uppercase tracking-widest rounded hover:bg-[#e0c484] transition-colors"
            >
              {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Page
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {pages.length === 0 && !loading && (
          <div className="p-12 text-center border border-white/10 border-dashed rounded-lg text-white/40">
            No magazine pages found. Ensure the "magazine_pages" table exists or add a page to create mock data.
          </div>
        )}
        {pages.map(page => (
          <div key={page.id} className="p-5 bg-[#14161b] border border-white/10 rounded-lg flex items-start justify-between hover:border-white/20 transition-all">
            <div>
              <div className="text-[0.65rem] uppercase tracking-widest text-[#CBAA69] mb-1">Page {page.page_number}</div>
              <h3 className="text-lg font-serif text-white/90 mb-2">{page.heading}</h3>
              <p className="text-xs text-white/40 line-clamp-2 max-w-2xl">{page.content}</p>
            </div>
            <div className="flex gap-2 ml-4">
              <button 
                onClick={() => setEditing(page)}
                className="p-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleDelete(page.id)}
                className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
