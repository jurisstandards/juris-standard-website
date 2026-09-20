"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  FileText, ClipboardList, Users, Clock, CheckCircle2,
  TrendingUp, AlertCircle, ArrowRight, Building2, RefreshCw,
} from "lucide-react";

interface Stats {
  totalRecords: number;
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  totalUsers: number;
}

interface RecentApp {
  id: string;
  firm_name: string;
  firm_type: string;
  status: string;
  submitted_at: string;
  applying_for_division: string;
}

interface RecentRecord {
  id: string;
  name: string;
  division: string;
  category: string;
  year: string;
  status: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
  approved: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
  rejected: "bg-red-500/15 text-red-400 border border-red-500/25",
  on_hold: "bg-blue-500/15 text-blue-400 border border-blue-500/25",
  active: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
  inactive: "bg-white/5 text-white/30 border border-white/10",
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalRecords: 0, totalApplications: 0, pendingApplications: 0,
    approvedApplications: 0, totalUsers: 0,
  });
  const [recentApps, setRecentApps] = useState<RecentApp[]>([]);
  const [recentRecords, setRecentRecords] = useState<RecentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [recordsRes, appsRes] = await Promise.all([
        fetch("/api/admin/records"),
        fetch("/api/admin/applications"),
      ]);
      const records: RecentRecord[] = await recordsRes.json();
      const apps: RecentApp[] = await appsRes.json();

      const safeApps = Array.isArray(apps) ? apps : [];
      const safeRecords = Array.isArray(records) ? records : [];

      setStats({
        totalRecords: safeRecords.length,
        totalApplications: safeApps.length,
        pendingApplications: safeApps.filter(a => a.status === "pending").length,
        approvedApplications: safeApps.filter(a => a.status === "approved").length,
        totalUsers: 0,
      });
      setRecentApps(safeApps.slice(0, 5));
      setRecentRecords(safeRecords.slice(-5).reverse());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const statCards = [
    {
      label: "Total Records", value: stats.totalRecords, icon: FileText,
      color: "text-[#CBAA69]", bg: "bg-[#CBAA69]/8", link: "/admin/records",
    },
    {
      label: "Pending Review", value: stats.pendingApplications, icon: Clock,
      color: "text-amber-400", bg: "bg-amber-400/8", link: "/admin/applications",
      highlight: stats.pendingApplications > 0,
    },
    {
      label: "Applications", value: stats.totalApplications, icon: ClipboardList,
      color: "text-blue-400", bg: "bg-blue-400/8", link: "/admin/applications",
    },
    {
      label: "Approved", value: stats.approvedApplications, icon: CheckCircle2,
      color: "text-emerald-400", bg: "bg-emerald-400/8", link: "/admin/applications",
    },
  ];

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-light text-white tracking-wide">
            Dashboard
          </h1>
          <p className="text-[0.55rem] uppercase tracking-[0.25em] text-white/30 mt-1">
            Overview &amp; Quick Actions
          </p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 text-[0.55rem] uppercase tracking-[0.2em] text-white/40 border border-white/10 hover:border-white/25 hover:text-white/70 transition-all rounded-[3px]"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.link}
              className={`group relative p-5 rounded-lg border transition-all duration-200 ${
                card.highlight
                  ? "bg-amber-400/5 border-amber-400/25 hover:border-amber-400/40"
                  : "bg-[#0f0f0f] border-white/8 hover:border-white/15"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[0.5rem] uppercase tracking-[0.2em] text-white/35 mb-3">
                    {card.label}
                  </p>
                  <p className={`text-3xl font-light ${card.highlight ? "text-amber-400" : "text-white"}`}>
                    {loading ? "—" : card.value}
                  </p>
                </div>
                <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center`}>
                  <Icon className={`w-4.5 h-4.5 ${card.color}`} strokeWidth={1.5} />
                </div>
              </div>
              {card.highlight && stats.pendingApplications > 0 && (
                <div className="mt-3 flex items-center gap-1.5 text-[0.5rem] text-amber-400/70 uppercase tracking-widest">
                  <AlertCircle className="w-3 h-3" />
                  Requires attention
                </div>
              )}
              <ArrowRight className="absolute bottom-4 right-4 w-3.5 h-3.5 text-white/15 group-hover:text-white/40 transition-colors" />
            </Link>
          );
        })}
      </div>

      {/* Two Column: Recent Apps + Recent Records */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="bg-[#0c0c0c] border border-white/8 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
            <div className="flex items-center gap-3">
              <ClipboardList className="w-4 h-4 text-white/30" strokeWidth={1.5} />
              <p className="text-[0.6rem] uppercase tracking-[0.2em] text-white/60 font-medium">
                Recent Applications
              </p>
            </div>
            <Link
              href="/admin/applications"
              className="text-[0.5rem] uppercase tracking-widest text-[#CBAA69]/60 hover:text-[#CBAA69] transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {loading ? (
              <div className="px-5 py-8 text-center text-white/20 text-xs">Loading...</div>
            ) : recentApps.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <Building2 className="w-6 h-6 text-white/10 mx-auto mb-2" strokeWidth={1} />
                <p className="text-white/25 text-xs font-light">No applications yet</p>
              </div>
            ) : (
              recentApps.map((app) => (
                <div key={app.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/80 font-light truncate">{app.firm_name}</p>
                    <p className="text-[0.45rem] uppercase tracking-widest text-white/25 mt-0.5 truncate">
                      {app.applying_for_division}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-[2px] text-[0.45rem] uppercase tracking-widest whitespace-nowrap ${statusColors[app.status] || "text-white/30"}`}>
                    {app.status.replace("_", " ")}
                  </span>
                  <span className="text-[0.45rem] text-white/20 whitespace-nowrap">
                    {new Date(app.submitted_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Records */}
        <div className="bg-[#0c0c0c] border border-white/8 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-white/30" strokeWidth={1.5} />
              <p className="text-[0.6rem] uppercase tracking-[0.2em] text-white/60 font-medium">
                Recent Records
              </p>
            </div>
            <Link
              href="/admin/records"
              className="text-[0.5rem] uppercase tracking-widest text-[#CBAA69]/60 hover:text-[#CBAA69] transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {loading ? (
              <div className="px-5 py-8 text-center text-white/20 text-xs">Loading...</div>
            ) : recentRecords.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <FileText className="w-6 h-6 text-white/10 mx-auto mb-2" strokeWidth={1} />
                <p className="text-white/25 text-xs font-light">No records yet</p>
              </div>
            ) : (
              recentRecords.map((rec) => (
                <div key={rec.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/80 font-light truncate">{rec.name}</p>
                    <p className="text-[0.45rem] uppercase tracking-widest text-white/25 mt-0.5 truncate">
                      {rec.division} · {rec.year}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-[2px] text-[0.45rem] uppercase tracking-widest whitespace-nowrap ${statusColors[rec.status] || "text-white/30"}`}>
                    {rec.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-[#0c0c0c] border border-white/8 rounded-lg p-5">
        <p className="text-[0.55rem] uppercase tracking-[0.25em] text-white/35 mb-4">
          Quick Actions
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Create New Record", href: "/admin/records?tab=create", color: "text-[#CBAA69] border-[#CBAA69]/30 hover:bg-[#CBAA69]/8 hover:border-[#CBAA69]/50" },
            { label: "Review Pending", href: "/admin/applications?filter=pending", color: "text-amber-400 border-amber-400/30 hover:bg-amber-400/8 hover:border-amber-400/50" },
            { label: "View All Records", href: "/admin/records", color: "text-white/50 border-white/12 hover:bg-white/5 hover:border-white/25" },
            { label: "Manage Users", href: "/admin/users", color: "text-white/50 border-white/12 hover:bg-white/5 hover:border-white/25" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-[3px] text-[0.6rem] uppercase tracking-[0.15em] font-medium transition-all duration-150 ${action.color}`}
            >
              {action.label}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
