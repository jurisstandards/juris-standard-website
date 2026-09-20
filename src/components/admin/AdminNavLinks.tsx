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
              "flex items-center gap-3 px-3 py-2.5 rounded-[4px] text-[0.65rem] uppercase tracking-[0.15em] font-medium transition-all duration-150 group relative",
              isActive
                ? "bg-[#CBAA69]/10 text-[#CBAA69] border-l-2 border-[#CBAA69] pl-[10px]"
                : "text-white/45 hover:text-white/80 hover:bg-white/5 border-l-2 border-transparent"
            )}
          >
            <Icon
              className={cn(
                "w-4 h-4 flex-shrink-0 transition-colors",
                isActive ? "text-[#CBAA69]" : "text-white/30 group-hover:text-white/60"
              )}
              strokeWidth={1.5}
            />
            <span>{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="ml-auto w-5 h-5 rounded-full bg-amber-400 text-[#050505] text-[0.5rem] font-bold flex items-center justify-center">
                {item.badge > 99 ? "99+" : item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </>
  );
}
