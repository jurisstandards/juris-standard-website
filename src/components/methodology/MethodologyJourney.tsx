'use client';

import { useState, useEffect } from 'react';
import { Landmark, Scale, Compass, Award, Building2, MessageSquare, Menu, X, ArrowUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

import { MethodologyHero } from './MethodologyHero';
import { EditorialPhilosophy } from './EditorialPhilosophy';
import { EditorialPrinciples } from './EditorialPrinciples';
import { RecognitionFramework } from './RecognitionFramework';
import { EditorialConsiderations } from './EditorialConsiderations';
import { RecognitionProgrammes } from './RecognitionProgrammes';
import { EditorialGovernance } from './EditorialGovernance';
import { MethodologyFAQ } from './MethodologyFAQ';
import { EditorialOffice } from './EditorialOffice';

const navItems = [
  { id: 'philosophy', num: '01', line1: 'Editorial', line2: 'Philosophy', icon: Landmark },
  { id: 'principles', num: '02', line1: 'Editorial', line2: 'Principles', icon: Scale },
  { id: 'framework', num: '03', line1: 'Recognition', line2: 'Framework', icon: Compass },
  { id: 'considerations', num: '04', line1: 'Editorial', line2: 'Criteria', icon: Award },
  { id: 'programmes', num: '05', line1: 'Recognition', line2: 'Programmes', icon: Landmark },
  { id: 'governance', num: '06', line1: 'Editorial', line2: 'Governance', icon: Scale },
  { id: 'faq', num: '07', line1: 'Common', line2: 'FAQs', icon: MessageSquare },
  { id: 'office', num: '08', line1: 'Editorial', line2: 'Office', icon: Building2 }
];

export function MethodologyJourney() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = navItems.map(item => item.id);
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 100) {
            current = section;
          }
        }
      }
      
      if (current) {
        setActiveSection(current);
      } else if (window.scrollY < 300) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen">
      <MethodologyHero />

      <div className="w-full flex flex-col items-center">
        {/* Sticky Sleek Navigation Bar */}
        <div className="sticky top-[72px] z-40 w-full px-4 sm:px-6 lg:px-8 mb-8 flex justify-center">
          <div className="relative w-full max-w-[1360px]">
            {/* Background pill */}
            <div 
              className="w-full flex items-center rounded-[3px] overflow-hidden border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_20px_rgba(203,170,105,0.06)] backdrop-blur-2xl"
              style={{ background: 'linear-gradient(180deg, #100e0b 0%, #080706 100%)' }}
            >
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <div key={item.id} className="flex items-stretch flex-1">
                    {index > 0 && (
                      <div className="w-[1px] self-stretch bg-gradient-to-b from-transparent via-white/[0.07] to-transparent flex-shrink-0" />
                    )}
                    
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        "group relative flex flex-col items-center justify-center flex-1 py-2.5 px-1 sm:px-2 transition-all duration-300 overflow-hidden",
                        isActive ? "bg-[#CBAA69]/[0.12]" : "hover:bg-white/[0.03]"
                      )}
                    >
                      {/* Active Top Accent Line */}
                      {isActive && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-full bg-gradient-to-r from-transparent via-[#CBAA69] to-transparent shadow-[0_0_10px_#CBAA69]" />
                      )}

                      {/* Icon & Number Row */}
                      <div className="flex items-center gap-1.5 mb-1">
                        <item.icon
                          className={cn(
                            "w-3.5 h-3.5 transition-colors",
                            isActive ? "text-[#CBAA69]" : "text-white/35 group-hover:text-white/70"
                          )}
                          strokeWidth={1.5}
                        />
                        <span className={cn(
                          "text-[0.45rem] font-mono tracking-widest hidden sm:inline",
                          isActive ? "text-[#CBAA69] font-bold" : "text-white/20"
                        )}>
                          {item.num}
                        </span>
                      </div>

                      {/* Compact Label */}
                      <div className="flex flex-col items-center leading-none">
                        <span className={cn(
                          "text-[0.52rem] uppercase tracking-[0.14em] text-center transition-colors truncate max-w-full",
                          isActive ? "text-white font-semibold" : "text-white/40 group-hover:text-white/80"
                        )}>
                          {item.line1}
                        </span>
                        <span className={cn(
                          "text-[0.52rem] uppercase tracking-[0.14em] text-center transition-colors truncate max-w-full mt-0.5",
                          isActive ? "text-[#CBAA69] font-bold" : "text-[#CBAA69]/40 group-hover:text-[#CBAA69]/70"
                        )}>
                          {item.line2}
                        </span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content: Connected Sections */}
        <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16 flex flex-col space-y-6">
          
          <EditorialPhilosophy />

          {/* Section Connector 1 -> 2 */}
          <SectionConnector from="01" to="02" label="Guiding Pillars" />

          <EditorialPrinciples />

          {/* Section Connector 2 -> 3 */}
          <SectionConnector from="02" to="03" label="Methodological Process" />

          <RecognitionFramework />

          {/* Section Connector 3 -> 4 */}
          <SectionConnector from="03" to="04" label="Assessment Metrics" />

          <EditorialConsiderations />

          {/* Section Connector 4 -> 5 */}
          <SectionConnector from="04" to="05" label="Official Categories" />

          <RecognitionProgrammes />

          {/* Section Connector 5 -> 6 */}
          <SectionConnector from="05" to="06" label="Institutional Standards" />

          <EditorialGovernance />

          {/* Section Connector 6 -> 7 */}
          <SectionConnector from="06" to="07" label="Clarifications & Policies" />

          <MethodologyFAQ />

          {/* Section Connector 7 -> 8 */}
          <SectionConnector from="07" to="08" label="Support & Direct Access" />

          <EditorialOffice />
        </div>
      </div>

      {/* Mobile Navigation Floating Pill */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-[#110e0a]/95 backdrop-blur-xl border border-[#CBAA69]/30 text-white px-5 py-2.5 rounded-full flex items-center space-x-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4 text-[#CBAA69]" /> : <Menu className="w-4 h-4 text-[#CBAA69]" />}
          <span className="text-[0.65rem] font-semibold uppercase tracking-widest">
            {isMobileMenuOpen ? 'Close Index' : 'Jump to Section'}
          </span>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-center px-6">
          <div className="max-w-sm mx-auto w-full space-y-2">
            <span className="text-[0.55rem] uppercase tracking-[0.25em] text-[#CBAA69] block text-center mb-4 font-mono">
              METHODOLOGY INDEX
            </span>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-[3px] border transition-all ${
                    isActive ? 'bg-[#CBAA69]/15 border-[#CBAA69]/50 text-white' : 'border-white/[0.06] bg-white/[0.02] text-white/70'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-[#CBAA69]' : 'text-white/40'}`} />
                    <span className="text-xs font-serif uppercase tracking-wider">
                      {item.line1} {item.line2}
                    </span>
                  </div>
                  <span className="text-[0.55rem] font-mono text-[#CBAA69]/70">{item.num}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-10 h-10 bg-[#120f0a]/90 backdrop-blur-xl border border-[#CBAA69]/30 rounded-[3px] flex items-center justify-center text-[#CBAA69] hover:bg-[#CBAA69] hover:text-black transition-all duration-300 shadow-xl hidden md:flex"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// Elegant Visual Interconnector between Sections
function SectionConnector({ from, to, label }: { from: string; to: string; label: string }) {
  return (
    <div className="flex items-center justify-center py-1 relative pointer-events-none">
      <div className="flex items-center gap-3">
        <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-white/10" />
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-[#0c0a07] border border-white/[0.05] shadow-inner">
          <span className="text-[0.45rem] font-mono text-[#CBAA69]">{from}</span>
          <ChevronDown className="w-2.5 h-2.5 text-[#CBAA69]/60" />
          <span className="text-[0.45rem] font-mono text-[#CBAA69]">{to}</span>
          <span className="text-white/15 mx-1">|</span>
          <span className="text-[0.48rem] uppercase tracking-[0.2em] text-white/30 font-medium">
            {label}
          </span>
        </div>
        <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-white/10" />
      </div>
    </div>
  );
}
