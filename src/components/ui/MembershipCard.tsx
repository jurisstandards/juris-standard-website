import { cn } from "@/lib/utils";

interface MembershipCardProps {
  className?: string;
}

export function MembershipCard({ className }: MembershipCardProps) {
  return (
    <div className={cn("relative p-[1px] bg-gradient-to-br from-gold-400 via-gold-600/20 to-black max-w-sm mx-auto shadow-[0_0_50px_rgba(197,160,89,0.3)] rounded-sm group hover:shadow-[0_0_80px_rgba(197,160,89,0.5)] transition-shadow duration-700", className)}>
      <div className="bg-gradient-to-br from-charcoal-900 to-black h-full p-8 relative overflow-hidden flex flex-col justify-between aspect-[3/4] rounded-sm">
        {/* Subtle background texture and sweeping light effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(197,160,89,0.25)_0%,_transparent_60%)] pointer-events-none" />
        <div className="absolute top-0 -left-[100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-45deg] group-hover:left-[100%] transition-all duration-1000 ease-in-out pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center pt-14">
          <span className="font-serif text-4xl tracking-widest text-gold-400 leading-none mb-2 text-center drop-shadow-[0_0_8px_rgba(197,160,89,0.6)]">
            JURIS
          </span>
          <span className="font-serif text-[0.65rem] tracking-[0.5em] text-white/60 uppercase text-center block mb-14 drop-shadow-sm">
            Standard
          </span>

          <h3 className="font-serif text-3xl text-white tracking-[0.25em] uppercase drop-shadow-md">
            Black™
          </h3>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent my-8 shadow-[0_0_10px_rgba(197,160,89,0.8)]" />
        </div>

        <div className="relative z-10 flex flex-col items-center pb-8 mt-auto">
           <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/50 mb-3 drop-shadow-sm">Member</p>
           <div className="w-full h-10 bg-black/80 border-y border-gold-500/20 flex items-center justify-center shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] relative">
             <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-gold-400/50 to-transparent absolute top-1/2 -translate-y-1/2" />
           </div>
        </div>
      </div>
    </div>
  );
}
