"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, User, Mail, Calendar, Shield } from "lucide-react";
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

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setUsers(data);
    } else {
      console.error(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <main className="min-h-screen bg-[#000000] text-[#FFFFF0] font-sans">
      {/* Admin Header */}
      <div className="border-b border-[#1a1a1a] bg-[#050505] px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-[2px] h-6 bg-[#CBAA69]" />
          <div>
            <div className="text-[0.5rem] uppercase tracking-[0.3em] text-[#CBAA69]/70 mb-0.5">JURIS STANDARD</div>
            <h1 className="text-sm font-semibold tracking-wider">ADMIN — USERS</h1>
          </div>
        </div>
        <Link href="/" className="text-[0.55rem] uppercase tracking-widest text-white/30 hover:text-[#CBAA69] transition-colors">
          ← BACK TO SITE
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-6 mb-10 border-b border-[#1a1a1a]">
          <Link href="/admin/records" className="pb-3 text-[0.6rem] uppercase tracking-[0.2em] text-white/30 hover:text-white/60 transition-colors border-b-2 border-transparent">
            MANAGE RECORDS
          </Link>
          <Link href="/admin/users" className="pb-3 text-[0.6rem] uppercase tracking-[0.2em] text-[#CBAA69] border-b-2 border-[#CBAA69] transition-colors">
            REGISTERED USERS
          </Link>
        </div>

        {/* Users List */}
        <div className="flex flex-col gap-3">
          {loading ? (
            <p className="text-white/30 text-sm italic">Loading users...</p>
          ) : users.length === 0 ? (
            <div className="p-8 border border-[#1a1a1a] bg-[#050505] text-center">
              <p className="text-white/40 text-sm font-light">No users registered yet.</p>
            </div>
          ) : (
            <div className="border border-[#1a1a1a] bg-[#080808] overflow-hidden rounded-[2px]">
              <table className="w-full text-left">
                <thead className="bg-[#050505] border-b border-[#1a1a1a]">
                  <tr>
                    <th className="px-6 py-4 text-[0.55rem] uppercase tracking-[0.15em] text-white/40 font-normal">Account</th>
                    <th className="px-6 py-4 text-[0.55rem] uppercase tracking-[0.15em] text-white/40 font-normal">Role</th>
                    <th className="px-6 py-4 text-[0.55rem] uppercase tracking-[0.15em] text-white/40 font-normal">Joined</th>
                    <th className="px-6 py-4 text-[0.55rem] uppercase tracking-[0.15em] text-white/40 font-normal">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a1a1a]">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                            <User className="w-3.5 h-3.5 text-white/40" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-white/80 font-light">{user.email}</span>
                            <span className="text-[0.45rem] font-mono text-white/20 mt-0.5">{user.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] text-[0.5rem] uppercase tracking-widest ${
                          user.role === 'admin' 
                            ? 'bg-[#CBAA69]/10 text-[#CBAA69] border border-[#CBAA69]/20' 
                            : 'bg-white/5 text-white/40 border border-white/10'
                        }`}>
                          {user.role === 'admin' ? <Shield className="w-3 h-3" /> : null}
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-white/50 text-xs font-light">
                          <Calendar className="w-3.5 h-3.5 opacity-50" />
                          {new Date(user.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-[0.5rem] uppercase tracking-widest text-emerald-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Verified
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
