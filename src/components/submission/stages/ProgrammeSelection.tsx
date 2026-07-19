import { useState } from "react";
import { useSubmissionStore } from "@/lib/submissionStore";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";

type PracticeAreaCategory = {
  category: string;
  items: string[];
};

export const LEGAL_PROFESSIONAL_PRACTICES: PracticeAreaCategory[] = [
  { category: "Corporate & Commercial", items: ["Corporate Advisory", "Corporate Governance", "Mergers & Acquisitions", "Joint Ventures", "Commercial Contracts", "Private Equity", "Venture Capital"] },
  { category: "Litigation", items: ["Commercial Litigation", "Civil Litigation", "Criminal Litigation", "Constitutional Litigation", "Consumer Litigation", "Appellate Litigation"] },
  { category: "Arbitration & ADR", items: ["Domestic Arbitration", "International Arbitration", "Investment Arbitration", "Mediation", "Conciliation"] },
  { category: "Tax", items: ["Direct Tax", "Indirect Tax (GST)", "Customs", "International Trade", "Transfer Pricing"] },
  { category: "Banking & Finance", items: ["Banking", "Project Finance", "Structured Finance", "Financial Services"] },
  { category: "Capital Markets", items: ["Equity Capital Markets", "Debt Capital Markets", "Securities Law", "Investment Funds"] },
  { category: "Competition & Antitrust", items: ["Competition Law", "Antitrust", "Merger Control"] },
  { category: "Regulatory & Compliance", items: ["Regulatory Advisory", "Compliance", "Investigations", "White Collar Crime & Investigations"] },
  { category: "Insolvency & Restructuring", items: ["Insolvency & Restructuring"] },
  { category: "Real Estate", items: ["RERA", "Land Acquisition", "Property Development"] },
  { category: "Infrastructure & Projects", items: ["Construction", "Infrastructure & Projects"] },
  { category: "Intellectual Property", items: ["Patents", "Trademarks", "Copyright", "Designs", "Trade Secrets"] },
  { category: "Technology, Media & Telecommunications", items: ["Artificial Intelligence", "Data Privacy & Cybersecurity", "FinTech & Digital Assets", "Technology, Media & Telecommunications"] },
  { category: "Employment & Labour", items: ["Employment & Labour"] },
  { category: "Healthcare & Life Sciences", items: ["Healthcare & Life Sciences"] },
  { category: "Energy & Natural Resources", items: ["Energy & Natural Resources"] },
  { category: "Insurance", items: ["Insurance"] },
  { category: "Constitutional & Public Law", items: ["Constitutional & Public Law"] },
  { category: "Environmental & Climate", items: ["Environmental & Climate"] },
  { category: "Aviation", items: ["Aviation"] },
  { category: "Maritime & Shipping", items: ["Maritime & Shipping"] },
  { category: "Sports Law", items: ["Sports Law"] },
  { category: "Media & Entertainment", items: ["Media & Entertainment"] },
  { category: "Family & Private Client", items: ["Family & Private Client"] },
  { category: "Corporate Legal", items: ["General Counsel", "Chief Legal Officer", "In-house Counsel", "Legal Operations"] },
  { category: "Academic & Research", items: ["Academic & Research"] }
];

export const LAW_FIRM_PRACTICES = [
  "Full-Service Practice", "Corporate & Commercial", "Litigation", "Arbitration & ADR", "Direct Tax", "Indirect Tax (GST)", "Customs & International Trade", "Banking & Finance", "Capital Markets", "Competition & Antitrust", "Regulatory & Compliance", "White Collar Crime & Investigations", "Insolvency & Restructuring", "Real Estate", "Infrastructure & Projects", "Construction", "Intellectual Property", "Technology, Media & Telecommunications", "Artificial Intelligence", "Data Privacy & Cybersecurity", "Employment & Labour", "Healthcare & Life Sciences", "Energy & Natural Resources", "Insurance", "Constitutional & Public Law", "Environmental & Climate", "Aviation", "Maritime & Shipping", "Sports Law", "Media & Entertainment", "Family & Private Client", "Private Equity & Venture Capital", "Government & Public Sector Advisory"
];

export const LEGAL_MEDIA_PRACTICES = [
  "Legal Journalism", "Editorial & Publishing", "Legal Research", "Professional Knowledge", "Digital Legal Media", "Podcasts", "Broadcast Media"
];

export const LEGAL_TECH_PRACTICES = [
  "Artificial Intelligence", "Legal Research Technology", "Practice Management", "Contract Technology", "Litigation Technology", "Compliance Technology", "Legal Operations", "Document Automation", "Knowledge Management", "Online Dispute Resolution", "Legal Analytics"
];

export function ProgrammeSelection() {
  const { 
    selectedTrack, 
    setStage, 
    isNavigatingBack,
    selectedPracticeAreas,
    setPracticeAreas,
    primaryPracticeArea,
    setPrimaryPracticeArea,
    otherPracticeArea,
    setOtherPracticeArea
  } = useSubmissionStore();

  const handleToggleArea = (area: string) => {
    if (selectedPracticeAreas.includes(area)) {
      setPracticeAreas(selectedPracticeAreas.filter(a => a !== area));
      if (primaryPracticeArea === area) setPrimaryPracticeArea(null);
    } else {
      setPracticeAreas([...selectedPracticeAreas, area]);
      // If it's the first one they select, auto-set as primary
      if (selectedPracticeAreas.length === 0 && selectedTrack === 'professional') {
        setPrimaryPracticeArea(area);
      }
    }
  };

  const handleToggleOther = () => {
    if (selectedPracticeAreas.includes("Other")) {
      setPracticeAreas(selectedPracticeAreas.filter(a => a !== "Other"));
      setOtherPracticeArea('');
      if (primaryPracticeArea === "Other") setPrimaryPracticeArea(null);
    } else {
      setPracticeAreas([...selectedPracticeAreas, "Other"]);
    }
  };

  const canContinue = selectedPracticeAreas.length > 0 && 
    (selectedTrack !== 'professional' || primaryPracticeArea !== null) && 
    (!selectedPracticeAreas.includes("Other") || otherPracticeArea.trim() !== "");

  const renderCheckboxItem = (label: string, isSelected: boolean, onClick: () => void) => (
    <div 
      key={label}
      onClick={onClick}
      className={`group flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'bg-gold-500/10 border-gold-500/50' 
          : 'bg-[#111] border-white/5 hover:border-white/20 hover:bg-[#161616]'
      }`}
    >
      <div className={`w-5 h-5 rounded-[4px] border flex items-center justify-center mr-3 transition-colors ${
        isSelected ? 'bg-gold-500 border-gold-500' : 'border-white/20 group-hover:border-white/40 bg-black/50'
      }`}>
        {isSelected && <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />}
      </div>
      <span className={`text-sm ${isSelected ? 'text-gold-100 font-medium' : 'text-neutral-300'}`}>
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col justify-center min-h-screen pt-32 pb-24 px-6 lg:px-12 relative z-10 w-full">
      <div className="w-full flex flex-col">
        <motion.div
          initial={isNavigatingBack ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <span className="text-gold-500 text-[0.65rem] font-bold uppercase tracking-[0.3em] block mb-4">
              Step 2 of 4
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white uppercase tracking-wide font-light drop-shadow-sm mb-4">
              Select Practice Areas
            </h2>
            <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-2xl mb-2">
              {selectedTrack === 'professional' ? "Select your areas of practice. You may choose multiple, but you must designate one as your Primary Practice Area." :
               selectedTrack === 'firm' ? "Highlight your firm's strongest practice areas." : 
               "Choose the categories that best represent your expertise."}
            </p>
          </div>
          
          <button
            onClick={() => setStage('track_selection')}
            className="group inline-flex items-center text-neutral-400 hover:text-white transition-colors text-xs uppercase tracking-widest font-semibold pb-1"
          >
            <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </motion.div>

        <motion.div
          initial={isNavigatingBack ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="w-full"
        >
          {/* PROFESSIONAL TRACK */}
          {selectedTrack === 'professional' && (
            <div className="space-y-12">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {LEGAL_PROFESSIONAL_PRACTICES.map((group) => (
                  <div key={group.category} className="break-inside-avoid bg-[#0a0a0a] border border-white/5 rounded-xl p-5">
                    <h3 className="text-gold-400/80 font-serif text-lg mb-4">{group.category}</h3>
                    <div className="flex flex-col space-y-2">
                      {group.items.map(item => renderCheckboxItem(
                        item, 
                        selectedPracticeAreas.includes(item), 
                        () => handleToggleArea(item)
                      ))}
                    </div>
                  </div>
                ))}
                <div className="break-inside-avoid bg-[#0a0a0a] border border-white/5 rounded-xl p-5">
                  <h3 className="text-gold-400/80 font-serif text-lg mb-4">Other</h3>
                  {renderCheckboxItem("Other (Specify)", selectedPracticeAreas.includes("Other"), handleToggleOther)}
                  {selectedPracticeAreas.includes("Other") && (
                    <input
                      type="text"
                      value={otherPracticeArea}
                      onChange={(e) => setOtherPracticeArea(e.target.value)}
                      placeholder="Please specify..."
                      className="mt-3 w-full bg-[#111] border border-white/10 rounded-md p-3 text-sm text-white focus:outline-none focus:border-gold-500/50"
                    />
                  )}
                </div>
              </div>

              {selectedPracticeAreas.length > 0 && (
                <div className="bg-[#0a0a0a] border border-gold-500/20 rounded-xl p-6 mt-8 max-w-2xl">
                  <h3 className="text-white font-serif text-xl mb-2">Primary Practice Area</h3>
                  <p className="text-neutral-400 text-sm mb-4">Please select one from your chosen areas.</p>
                  <select 
                    value={primaryPracticeArea || ''} 
                    onChange={(e) => setPrimaryPracticeArea(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-gold-500/50"
                  >
                    <option value="" disabled>Select Primary Area</option>
                    {selectedPracticeAreas.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* FIRM TRACK */}
          {selectedTrack === 'firm' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {LAW_FIRM_PRACTICES.map(item => renderCheckboxItem(
                item, 
                selectedPracticeAreas.includes(item), 
                () => handleToggleArea(item)
              ))}
              {renderCheckboxItem("Other (Specify)", selectedPracticeAreas.includes("Other"), handleToggleOther)}
              {selectedPracticeAreas.includes("Other") && (
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                  <input
                    type="text"
                    value={otherPracticeArea}
                    onChange={(e) => setOtherPracticeArea(e.target.value)}
                    placeholder="Please specify other practice areas..."
                    className="w-full max-w-xl bg-[#0a0a0a] border border-white/10 rounded-md p-3 text-sm text-white focus:outline-none focus:border-gold-500/50"
                  />
                </div>
              )}
            </div>
          )}

          {/* MEDIA TRACK */}
          {selectedTrack === 'media' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {LEGAL_MEDIA_PRACTICES.map(item => renderCheckboxItem(
                item, 
                selectedPracticeAreas.includes(item), 
                () => handleToggleArea(item)
              ))}
              {renderCheckboxItem("Other (Specify)", selectedPracticeAreas.includes("Other"), handleToggleOther)}
              {selectedPracticeAreas.includes("Other") && (
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                  <input
                    type="text"
                    value={otherPracticeArea}
                    onChange={(e) => setOtherPracticeArea(e.target.value)}
                    placeholder="Please specify other areas..."
                    className="w-full max-w-xl bg-[#0a0a0a] border border-white/10 rounded-md p-3 text-sm text-white focus:outline-none focus:border-gold-500/50"
                  />
                </div>
              )}
            </div>
          )}

          {/* INNOVATION TRACK */}
          {selectedTrack === 'innovation' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {LEGAL_TECH_PRACTICES.map(item => renderCheckboxItem(
                item, 
                selectedPracticeAreas.includes(item), 
                () => handleToggleArea(item)
              ))}
              {renderCheckboxItem("Other (Specify)", selectedPracticeAreas.includes("Other"), handleToggleOther)}
              {selectedPracticeAreas.includes("Other") && (
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                  <input
                    type="text"
                    value={otherPracticeArea}
                    onChange={(e) => setOtherPracticeArea(e.target.value)}
                    placeholder="Please specify other areas..."
                    className="w-full max-w-xl bg-[#0a0a0a] border border-white/10 rounded-md p-3 text-sm text-white focus:outline-none focus:border-gold-500/50"
                  />
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Floating Action Pill */}
        <AnimatePresence>
          {canContinue && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-12 left-0 right-12 lg:right-24 z-50 flex justify-end pointer-events-none"
            >
              <div className="flex pointer-events-auto items-center p-2 bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.15)] overflow-hidden">
                <div className="pl-6 pr-4 py-2 border-r border-white/10">
                  <span className="text-neutral-300 text-sm font-medium">
                    {selectedPracticeAreas.length} <span className="hidden sm:inline">area(s) selected</span>
                  </span>
                </div>
                
                <button
                  onClick={() => setStage('editorial_profile')}
                  className="group relative inline-flex items-center justify-center px-8 py-3 ml-2 font-semibold uppercase tracking-[0.2em] text-[0.65rem] md:text-xs transition-all duration-300 rounded-full overflow-hidden bg-gold-500/10 text-white border border-gold-500/30 hover:border-gold-400 hover:bg-gold-500/20"
                >
                  <span className="relative z-10 flex items-center">
                    Continue
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
