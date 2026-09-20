"use client";

import { useState, useEffect, useCallback } from "react";
import { User, Calendar, Shield, RefreshCw, Search, Loader2, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Profile {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setUsers(data);
    else console.error(error);
    setLoading(false);
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const filtered = users.filter(u =>
    !search || u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const admins = users.filter(u => u.role === "admin").length;
  const regular = users.filter(u => u.role !== "admin").length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif font-light text-white tracking-wide">Users</h1>
          <p className="text-[0.55rem] uppercase tracking-[0.25em] text-white/30 mt-1">
            {users.length} total · {admins} admin · {regular} members
          </p>
        </div>
        <button onClick={fetchUsers}
          className="flex items-center gap-2 px-4 py-2 text-[0.55rem] uppercase tracking-[0.2em] text-white/40 border border-white/10 hover:border-white/25 hover:text-white/70 transition-all rounded-[3px]">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {/* Stat Chips */}
      <div className="flex items-center gap-3 mb-6">
        <div className="px-4 py-2 bg-[#0f0f0f] border border-white/8 rounded-[4px] flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-white/30" strokeWidth={1.5} />
          <span className="text-[0.55rem] uppercase tracking-[0.15em] text-white/50">{users.length} Total</span>
        </div>
        <div className="px-4 py-2 bg-[#CBAA69]/6 border border-[#CBAA69]/20 rounded-[4px] flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-[#CBAA69]/70" strokeWidth={1.5} />
          <span className="text-[0.55rem] uppercase tracking-[0.15em] text-[#CBAA69]/70">{admins} Admin</span>
        </div>
        <div className="px-4 py-2 bg-[#0f0f0f] border border-white/8 rounded-[4px] flex items-center gap-2">
          <User className="w-3.5 h-3.5 text-white/30" strokeWidth={1.5} />
          <span className="text-[0.55rem] uppercase tracking-[0.15em] text-white/50">{regular} Members</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" strokeWidth={1.5} />
        <input
          className="w-full bg-[#0c0c0c] border border-white/8 text-white text-sm pl-11 pr-4 py-3 focus:outline-none focus:border-[#CBAA69]/30 placeholder:text-white/20 rounded-[3px] transition-colors"
          placeholder="Search users by email..."
          value={search} onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-white/20 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center border border-white/6 rounded-lg bg-[#0c0c0c]">
          <Users className="w-8 h-8 text-white/10 mx-auto mb-3" strokeWidth={1} />
          <p className="text-white/30 text-sm font-light">{search ? "No users match your search." : "No users yet."}</p>
        </div>
      ) : (
        <div className="bg-[#0c0c0c] border border-white/8 rounded-lg overflow-hidden">
          <div className="grid grid-cols-[1fr_120px_140px_80px] gap-4 px-5 py-3 border-b border-white/6 bg-[#090909]">
            {["Account", "Role", "Joined", "Status"].map((h, i) => (
              <div key={i} className="text-[0.5rem] uppercase tracking-[0.15em] text-white/30 font-medium">{h}</div>
            ))}
          </div>
          <div className="divide-y divide-white/5">
            {filtered.map((user) => (
              <div key={user.id} className="grid grid-cols-[1fr_120px_140px_80px] gap-4 items-center px-5 py-4 hover:bg-white/[0.02] transition-colors">
                {/* Account */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 flex-none ${user.role === "admin" ? "bg-[#CBAA69]/10 border border-[#CBAA69]/20" : "bg-white/5 border border-white/10"}`}>
                    {user.role === "admin"
                      ? <Shield className="w-3.5 h-3.5 text-[#CBAA69]/70" strokeWidth={1.5} />
                      : <User className="w-3.5 h-3.5 text-white/35" strokeWidth={1.5} />
                    }
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-white/80 font-light truncate">{user.email}</p>
                    <p className="text-[0.4rem] font-mono text-white/18 mt-0.5 truncate">{user.id}</p>
                  </div>
                </div>
                {/* Role */}
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] text-[0.5rem] uppercase tracking-widest w-fit ${
                  user.role === "admin"
                    ? "bg-[#CBAA69]/10 text-[#CBAA69] border border-[#CBAA69]/20"
                    : "bg-white/5 text-white/40 border border-white/10"
                }`}>
                  {user.role === "admin" && <Shield className="w-3 h-3" />}
                  {user.role || "user"}
                </span>
                {/* Joined */}
                <div className="flex items-center gap-2 text-white/40 text-xs font-light">
                  <Calendar className="w-3.5 h-3.5 opacity-50 flex-shrink-0" />
                  {new Date(user.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </div>
                {/* Status */}
                <span className="flex items-center gap-1.5 text-[0.5rem] uppercase tracking-widest text-emerald-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
