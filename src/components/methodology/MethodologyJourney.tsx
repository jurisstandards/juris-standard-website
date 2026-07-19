'use client';

import { useState, useEffect } from 'react';
import { Landmark, Scale, Compass, Award, Building2, MessageSquare, Menu, X, ArrowUp } from 'lucide-react';
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
import { CrystalIcon } from './CrystalIcon';

const navItems = [
  { id: 'philosophy', line1: 'Editorial', line2: 'Philosophy', icon: Landmark },
  { id: 'principles', line1: 'Editorial', line2: 'Principles', icon: Scale },
  { id: 'framework', line1: 'Recognition', line2: 'Framework', icon: Compass },
  { id: 'considerations', line1: 'Editorial', line2: 'Considerations', icon: Award },
  { id: 'programmes', line1: 'Recognition', line2: 'Programmes', icon: Landmark },
  { id: 'governance', line1: 'Editorial', line2: 'Governance', icon: Scale },
  { id: 'faq', line1: 'Frequently Asked', line2: 'Questions', icon: MessageSquare },
  { id: 'office', line1: 'Editorial', line2: 'Office', icon: Building2 }
];

export function MethodologyJourney() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show/hide scroll to top
      setShowScrollTop(window.scrollY > 500);

      // Determine active section
      const sections = navItems.map(item => item.id);
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is near the top of the viewport
          if (rect.top <= 200) {
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
        {/* Sticky Horizontal Navigation */}
        <div className="sticky top-[80px] z-40 w-full px-3 md:px-8 mb-16 flex justify-center">
          {/* Outer glow aura */}
          <div className="absolute pointer-events-none w-full max-w-[1440px] h-[120px] bg-gold-500/8 blur-3xl rounded-full" />
          
          <div 
            className="relative w-full max-w-[1440px] flex items-stretch"
            style={{
              background: 'linear-gradient(135deg, #111008 0%, #0d0d0d 50%, #111008 100%)',
              borderRadius: '20px',
              padding: '1px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.95), 0 0 0 1px rgba(212,175,55,0.25), 0 0 40px rgba(212,175,55,0.1), inset 0 1px 0 rgba(212,175,55,0.3)'
            }}
          >
            {/* Inner container */}
            <div 
              className="w-full flex items-center rounded-[19px] overflow-hidden"
              style={{ background: 'linear-gradient(180deg, #0f0f0f 0%, #080808 100%)' }}
            >
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <div key={item.id} className="flex items-stretch flex-1">
                    {/* Separator */}
                    {index > 0 && (
                      <div className="w-px self-stretch bg-gradient-to-b from-transparent via-gold-500/20 to-transparent flex-shrink-0" />
                    )}
                    
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="group relative flex flex-col items-center justify-center flex-1 py-5 px-2 transition-all duration-500 overflow-hidden"
                      style={isActive ? {
                        background: 'linear-gradient(180deg, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0.04) 100%)',
                        boxShadow: 'inset 0 1px 0 rgba(212,175,55,0.4), inset 0 -1px 0 rgba(212,175,55,0.1)'
                      } : {}}
                    >
                      {/* Hover bg */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'linear-gradient(180deg, rgba(212,175,55,0.08) 0%, transparent 100%)' }}
                      />

                      {/* Active top bar */}
                      {isActive && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-3/4 rounded-b-full"
                          style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)', boxShadow: '0 0 20px 4px rgba(212,175,55,0.6)' }}
                        />
                      )}

                      {/* Icon with glow platform */}
                      <div className="relative mb-3 flex items-center justify-center">
                        {isActive && (
                          <>
                            <div className="absolute w-12 h-12 rounded-full bg-gold-500/20 blur-lg" />
                            <div className="absolute w-8 h-8 rounded-full bg-gold-500/30 blur-md" />
                          </>
                        )}
                        {!isActive && (
                          <div className="absolute w-10 h-10 rounded-full bg-gold-500/0 group-hover:bg-gold-500/10 blur-lg transition-all duration-500" />
                        )}
                        <item.icon
                          className={cn(
                            "relative z-10 transition-all duration-500",
                            isActive
                              ? "w-9 h-9 md:w-10 md:h-10 text-gold-300 scale-110"
                              : "w-7 h-7 md:w-8 md:h-8 text-gold-500/50 group-hover:text-gold-400 group-hover:scale-105"
                          )}
                          strokeWidth={isActive ? 1.25 : 1.5}
                          style={isActive ? {
                            filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.9)) drop-shadow(0 4px 12px rgba(0,0,0,0.8))'
                          } : {
                            filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.6))'
                          }}
                        />
                      </div>

                      {/* Two-line label */}
                      <div className="flex flex-col items-center gap-[3px] z-10 relative">
                        <span className={cn(
                          "text-[0.5rem] md:text-[0.58rem] uppercase tracking-[0.22em] text-center leading-none transition-all duration-300",
                          isActive ? "text-white/90 font-bold" : "text-white/35 font-medium group-hover:text-white/65"
                        )}>
                          {item.line1}
                        </span>
                        <span className={cn(
                          "text-[0.55rem] md:text-[0.65rem] uppercase tracking-[0.18em] text-center leading-none transition-all duration-300",
                          isActive ? "text-gold-400 font-extrabold" : "text-gold-500/50 font-semibold group-hover:text-gold-400/80"
                        )}
                        style={isActive ? { textShadow: '0 0 15px rgba(212,175,55,0.6)' } : {}}>
                          {item.line2}
                        </span>
                      </div>

                      {/* Active bottom dot */}
                      {isActive && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold-400"
                          style={{ boxShadow: '0 0 8px 3px rgba(212,175,55,0.8)' }}
                        />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full px-4 md:px-8 relative z-10 pb-10 flex flex-col space-y-16">
          <EditorialPhilosophy />
          <EditorialPrinciples />
          <RecognitionFramework />
          <EditorialConsiderations />
          <RecognitionProgrammes />
          <EditorialGovernance />
          <MethodologyFAQ />
          <EditorialOffice />
        </div>
      </div>

      {/* Mobile Navigation Toggle */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-[#111]/90 backdrop-blur-xl border border-gold-500/30 text-gold-100 px-6 py-3 rounded-full flex items-center space-x-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          <span className="text-xs font-semibold uppercase tracking-widest">{isMobileMenuOpen ? 'Close Menu' : 'Methodology Index'}</span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-center px-6"
          >
            <nav className="space-y-4">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center space-x-4 p-4 rounded-xl border transition-all duration-300 ${
                      isActive ? 'bg-white/10 border-gold-500/40' : 'border-white/5 bg-transparent'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-gold-400' : 'text-gold-100/50'}`} />
                    <span className={`text-lg font-serif ${isActive ? 'text-gold-100' : 'text-gold-100/70'}`}>
                      {item.line1} {item.line2}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      

      {/* Scroll to Top Button */}
      
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-[#111]/80 backdrop-blur-xl border border-gold-500/20 rounded-full flex items-center justify-center text-gold-400 hover:border-gold-500/50 hover:bg-gold-500/10 border border-gold-500/20 transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.5)] hidden md:flex"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      
    </div>
  );
}
