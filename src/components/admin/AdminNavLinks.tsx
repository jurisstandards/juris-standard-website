"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  badge?: number;
}

export default function AdminNavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item) => {
        const isActive = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3.5 py-3 rounded-md text-[0.82rem] uppercase tracking-[0.1em] font-semibold transition-all duration-150 group relative",
              isActive
                ? "bg-gradient-to-r from-[#CBAA69]/25 to-[#CBAA69]/5 text-[#F0D898] border-l-[3px] border-[#CBAA69] shadow-sm"
                : "text-white/75 hover:text-white hover:bg-white/[0.08] border-l-[3px] border-transparent"
            )}
          >
            <Icon
              className={cn(
                "w-[18px] h-[18px] flex-shrink-0 transition-colors",
                isActive ? "text-[#F0D898]" : "text-white/65 group-hover:text-white"
              )}
              strokeWidth={1.8}
            />
            <span>{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="ml-auto w-5 h-5 rounded-full bg-amber-400 text-[#101217] text-[0.72rem] font-bold flex items-center justify-center">
                {item.badge > 99 ? "99+" : item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </>
  );
}
