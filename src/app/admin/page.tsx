"use client";
import { authFetch } from "@/lib/authFetch";

export const dynamic = "force-dynamic";

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
  inactive: "bg-white/[0.08] text-white/65 border border-white/15",
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
        authFetch("/api/admin/applications"),
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
      label: "Total Records", value: stats.totalRecords, icon: FileText, link: "/admin/records",
      grad: "from-[#CBAA69]/30 via-[#CBAA69]/10 to-[#252932]", border: "border-[#CBAA69]/45",
      iconBg: "bg-[#CBAA69]/25", iconColor: "text-[#F0D898]", num: "text-[#F6E3B0]",
    },
    {
      label: "Pending Review", value: stats.pendingApplications, icon: Clock, link: "/admin/applications",
      grad: "from-amber-500/30 via-amber-500/10 to-[#252932]", border: "border-amber-400/50",
      iconBg: "bg-amber-400/25", iconColor: "text-amber-300", num: "text-amber-200",
      highlight: stats.pendingApplications > 0,
    },
    {
      label: "Applications", value: stats.totalApplications, icon: ClipboardList, link: "/admin/applications",
      grad: "from-sky-500/30 via-sky-500/10 to-[#252932]", border: "border-sky-400/45",
      iconBg: "bg-sky-400/25", iconColor: "text-sky-300", num: "text-sky-100",
    },
    {
      label: "Approved", value: stats.approvedApplications, icon: CheckCircle2, link: "/admin/applications",
      grad: "from-emerald-500/30 via-emerald-500/10 to-[#252932]", border: "border-emerald-400/45",
      iconBg: "bg-emerald-400/25", iconColor: "text-emerald-300", num: "text-emerald-100",
    },
  ];

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-medium text-white tracking-wide">
            Dashboard
          </h1>
          <p className="text-[0.8rem] text-white/70 mt-1.5">
            Overview of records, applications and members at a glance.
          </p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-5 py-2.5 text-[0.8rem] font-medium text-white bg-white/10 border border-white/25 hover:bg-white/20 transition-all rounded-md"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.link}
              className={`group relative p-6 rounded-xl border bg-gradient-to-br ${card.grad} ${card.border} shadow-lg shadow-black/20 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[0.78rem] font-medium uppercase tracking-[0.12em] text-white/80 mb-3">
                    {card.label}
                  </p>
                  <p className={`text-4xl font-semibold ${card.num}`}>
                    {loading ? "—" : card.value}
                  </p>
                </div>
                <div className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${card.iconColor}`} strokeWidth={1.8} />
                </div>
              </div>
              {card.highlight && stats.pendingApplications > 0 && (
                <div className="mt-4 flex items-center gap-1.5 text-[0.76rem] font-medium text-amber-200">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Requires attention
                </div>
              )}
              <ArrowRight className="absolute bottom-5 right-5 w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </Link>
          );
        })}
      </div>

      {/* Two Column: Recent Apps + Recent Records */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="bg-[#1c1f26] border border-white/15 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/15">
            <div className="flex items-center gap-3">
              <ClipboardList className="w-4 h-4 text-white/65" strokeWidth={1.5} />
              <p className="text-[0.8rem] uppercase tracking-[0.2em] text-white/80 font-medium">
                Recent Applications
              </p>
            </div>
            <Link
              href="/admin/applications"
              className="text-[0.72rem] uppercase tracking-widest text-[#E3C888] hover:text-[#CBAA69] transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="divide-y divide-white/15">
            {loading ? (
              <div className="px-5 py-8 text-center text-white/65 text-[0.85rem]">Loading...</div>
            ) : recentApps.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <Building2 className="w-6 h-6 text-white/65 mx-auto mb-2" strokeWidth={1} />
                <p className="text-white/65 text-[0.85rem] font-light">No applications yet</p>
              </div>
            ) : (
              recentApps.map((app) => (
                <div key={app.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.05] transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.95rem] text-white/80 font-light truncate">{app.firm_name}</p>
                    <p className="text-[0.72rem] uppercase tracking-widest text-white/65 mt-0.5 truncate">
                      {app.applying_for_division}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-[2px] text-[0.72rem] uppercase tracking-widest whitespace-nowrap ${statusColors[app.status] || "text-white/65"}`}>
                    {app.status.replace("_", " ")}
                  </span>
                  <span className="text-[0.72rem] text-white/65 whitespace-nowrap">
                    {new Date(app.submitted_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Records */}
        <div className="bg-[#1c1f26] border border-white/15 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/15">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-white/65" strokeWidth={1.5} />
              <p className="text-[0.8rem] uppercase tracking-[0.2em] text-white/80 font-medium">
                Recent Records
              </p>
            </div>
            <Link
              href="/admin/records"
              className="text-[0.72rem] uppercase tracking-widest text-[#E3C888] hover:text-[#CBAA69] transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="divide-y divide-white/15">
            {loading ? (
              <div className="px-5 py-8 text-center text-white/65 text-[0.85rem]">Loading...</div>
            ) : recentRecords.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <FileText className="w-6 h-6 text-white/65 mx-auto mb-2" strokeWidth={1} />
                <p className="text-white/65 text-[0.85rem] font-light">No records yet</p>
              </div>
            ) : (
              recentRecords.map((rec) => (
                <div key={rec.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.05] transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.95rem] text-white/80 font-light truncate">{rec.name}</p>
                    <p className="text-[0.72rem] uppercase tracking-widest text-white/65 mt-0.5 truncate">
                      {rec.division} · {rec.year}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-[2px] text-[0.72rem] uppercase tracking-widest whitespace-nowrap ${statusColors[rec.status] || "text-white/65"}`}>
                    {rec.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-[#1c1f26] border border-white/15 rounded-lg p-5">
        <p className="text-[0.76rem] uppercase tracking-[0.25em] text-white/65 mb-4">
          Quick Actions
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Create New Record", href: "/admin/records?tab=create", color: "text-[#CBAA69] border-[#CBAA69]/30 hover:bg-[#CBAA69]/8 hover:border-[#CBAA69]/50" },
            { label: "Review Pending", href: "/admin/applications?filter=pending", color: "text-amber-400 border-amber-400/30 hover:bg-amber-400/8 hover:border-amber-400/50" },
            { label: "View All Records", href: "/admin/records", color: "text-white/80 border-white/15 hover:bg-white/[0.08] hover:border-white/25" },
            { label: "Manage Users", href: "/admin/users", color: "text-white/80 border-white/15 hover:bg-white/[0.08] hover:border-white/25" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-[3px] text-[0.8rem] uppercase tracking-[0.15em] font-medium transition-all duration-150 ${action.color}`}
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
