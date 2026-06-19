"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, ChevronRight } from "lucide-react";

export function IntelligenceAlert() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);

  const ALERTS = [
    "The 2024 APAC Cross-Border Litigation Report is now available.",
    "Global M&A Advisory Index has been updated for Q3.",
    "New methodology verified for Top Tier 1 Corporate Law Firms.",
    "Regulatory Compliance shifts reported in European Markets.",
    "Private Equity Exits data visualization is live in the Index."
  ];

  useEffect(() => {
    // Initial delay before showing the first alert
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Auto dismiss after 5 seconds
    const dismissTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(dismissTimer);
  }, [isVisible, currentAlertIndex]);

  useEffect(() => {
    if (isVisible) return;

    // When it becomes hidden, wait 10 seconds then show the next alert
    const nextAlertTimer = setTimeout(() => {
      setCurrentAlertIndex((prev) => (prev + 1) % ALERTS.length);
      setIsVisible(true);
    }, 10000);

    return () => clearTimeout(nextAlertTimer);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // smooth apple-like spring
          className="fixed bottom-[140px] right-8 z-[90] w-80 sm:w-[380px] rounded-xl bg-[#0f0f0f]/90 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden group cursor-pointer"
        >
          {/* Subtle glowing highlight */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
          
          <div className="p-5 flex items-start">
            <div className="mt-1 flex-shrink-0 relative">
              <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-md animate-pulse" />
              <div className="relative w-8 h-8 rounded-full bg-black/60 border border-gold-500/30 flex items-center justify-center">
                <Bell className="w-3.5 h-3.5 text-gold-400" />
              </div>
            </div>
            
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-gold-500/90">
                  Live Intelligence
                </span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsVisible(false);
                  }}
                  className="text-white/30 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <h4 className="text-[0.85rem] font-medium text-white/90 mb-2 leading-relaxed">
                {ALERTS[currentAlertIndex]}
              </h4>
              <div className="flex items-center text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/40 group-hover:text-gold-400 transition-colors">
                View Report
                <ChevronRight className="w-3 h-3 ml-1" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
