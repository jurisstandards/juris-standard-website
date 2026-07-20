import { cn } from "@/lib/utils";
import Link from "next/link";

interface CategoryItem {
  name: string;
  href: string;
}

interface CategoryGroup {
  title: string;
  items: CategoryItem[];
}

interface CategoryListProps {
  sectionTitle: string;
  groups: CategoryGroup[];
  className?: string;
}

export function CategoryList({ sectionTitle, groups, className }: CategoryListProps) {
  return (
    <div className={cn("border-t border-white/10 pt-16 pb-20", className)}>
      <h2 className="font-serif text-3xl md:text-5xl text-white/95 tracking-wide uppercase mb-4">
        {sectionTitle}
      </h2>
      <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.25em] text-gold-500/70 mb-16">
        Editorial Collections
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-12 xl:gap-x-16 gap-y-16">
        {groups.map((group, groupIdx) => (
          <div key={groupIdx} className="flex flex-col">
            <h4 className="text-sm font-medium text-white/90 uppercase tracking-[0.15em] mb-6 border-b border-white/5 pb-4">
              {group.title}
            </h4>
            <ul className="flex flex-col space-y-3.5">
              {group.items.map((item, itemIdx) => (
                <li key={itemIdx} className="group/item flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/30 mt-1.5 mr-3 transition-colors group-hover/item:bg-gold-500 shadow-[0_0_8px_rgba(212,175,55,0)] group-hover/item:shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                  <Link 
                    href={item.href}
                    className="text-[0.9rem] font-light text-neutral-400 leading-snug tracking-wide transition-colors group-hover/item:text-gold-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
