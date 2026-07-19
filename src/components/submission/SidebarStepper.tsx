import { useSubmissionStore, Stage, STAGE_ORDER } from "@/lib/submissionStore";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 'track_selection', label: "Track Selection" },
  { id: 'programme_selection', label: "Programme Selection" },
  { id: 'editorial_profile', label: "Editorial Profile" },
  { id: 'review', label: "Review & Submit" },
];

export function SidebarStepper() {
  const { currentStage, setStage } = useSubmissionStore();
  
  const currentIndex = STAGE_ORDER.indexOf(currentStage);

  if (currentStage === 'welcome' || currentStage === 'confirmation') {
    return null;
  }

  return (
    <div className="hidden lg:flex w-[280px] xl:w-[320px] flex-shrink-0 flex-col pt-32 pb-8 px-6 lg:pl-[80px] xl:pl-[95px] lg:pr-8 border-r border-white/5 bg-gradient-to-b from-[#0a0a0a] to-[#050505] fixed left-0 top-0 bottom-0 h-screen z-40 overflow-y-auto shadow-[4px_0_24px_rgba(0,0,0,0.4)]">
      
      <div className="mb-14">
        <h2 className="text-neutral-400 text-[0.6rem] font-medium uppercase tracking-[0.3em] mb-1.5">Submission Process</h2>
        <p className="text-gold-500/70 text-[0.55rem] font-bold tracking-[0.4em] uppercase">The Index 2026</p>
      </div>

      <div className="flex flex-col space-y-2 mt-4">
        {STEPS.map((step, index) => {
          const stepIndexInGlobal = STAGE_ORDER.indexOf(step.id as Stage);
          const isCompleted = currentIndex > stepIndexInGlobal;
          const isActive = currentStage === step.id;
          const isClickable = isCompleted && !isActive;
          
          return (
            <div 
              key={step.id} 
              onClick={() => isClickable && setStage(step.id as Stage)}
              className={cn(
                "relative flex flex-col py-4 pl-6 pr-4 border-l-[3px] transition-all duration-500 ease-out rounded-r-lg group",
                isActive 
                  ? "border-gold-500 bg-gradient-to-r from-gold-500/10 to-transparent" 
                  : isCompleted 
                    ? "border-gold-500/30 hover:border-gold-500/50 hover:bg-white/[0.02]" 
                    : "border-white/5 hover:border-white/10 hover:bg-white/[0.02]",
                isClickable ? "cursor-pointer" : "cursor-default"
              )}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={cn(
                  "text-[0.6rem] font-bold uppercase tracking-[0.25em] transition-colors duration-500",
                  isActive ? "text-gold-400" : isCompleted ? "text-gold-500/60" : "text-neutral-500 group-hover:text-neutral-400"
                )}>
                  Step 0{index + 1}
                </span>
                
                {isCompleted && (
                  <Check className="w-3.5 h-3.5 text-gold-500/60" strokeWidth={3} />
                )}
              </div>
              
              <span className={cn(
                "text-[0.95rem] font-medium tracking-wide transition-all duration-500",
                isActive ? "text-white drop-shadow-sm" : isCompleted ? "text-neutral-300" : "text-neutral-400 group-hover:text-neutral-300"
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
