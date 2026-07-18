'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, Scale, Compass, Award, Building2, MessageSquare, Menu, X, ArrowUp } from 'lucide-react';

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
  { id: 'philosophy', label: 'Editorial Philosophy', icon: Landmark },
  { id: 'principles', label: 'Editorial Principles', icon: Scale },
  { id: 'framework', label: 'Recognition Framework', icon: Compass },
  { id: 'considerations', label: 'Editorial Considerations', icon: Award },
  { id: 'programmes', label: 'Recognition Programmes', icon: Landmark },
  { id: 'governance', label: 'Editorial Governance', icon: Scale },
  { id: 'faq', label: 'Frequently Asked Questions', icon: MessageSquare },
  { id: 'office', label: 'Editorial Office', icon: Building2 }
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

      <div className="flex relative max-w-[1400px] mx-auto w-full px-4 md:px-8">
        
        {/* Sticky Desktop Navigation */}
        <div className="hidden lg:block w-72 shrink-0 py-24 relative z-20">
          <div className="sticky top-32 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            <span className="text-white/40 text-[0.65rem] uppercase tracking-widest font-semibold block mb-6 px-4">Methodology Index</span>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-500 group relative overflow-hidden ${
                      isActive ? 'bg-white/5' : 'hover:bg-white/5'
                    }`}
                  >
                    {/* Active highlight bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold-400 to-gold-600 rounded-l-xl"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    <item.icon className={`w-4 h-4 transition-colors duration-500 shrink-0 ${isActive ? 'text-gold-400' : 'text-white/30 group-hover:text-gold-500/50'}`} />
                    <span className={`text-sm text-left transition-colors duration-500 ${isActive ? 'text-white font-medium' : 'text-white/50 font-light group-hover:text-white/80'}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full lg:w-[calc(100%-18rem)] relative z-10 pb-32">
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
          className="bg-[#111]/90 backdrop-blur-xl border border-gold-500/30 text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          <span className="text-xs font-semibold uppercase tracking-widest">{isMobileMenuOpen ? 'Close Menu' : 'Methodology Index'}</span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
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
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-gold-400' : 'text-white/50'}`} />
                    <span className={`text-lg font-serif ${isActive ? 'text-white' : 'text-white/70'}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-[#111]/80 backdrop-blur-xl border border-gold-500/20 rounded-full flex items-center justify-center text-gold-400 hover:border-gold-500/50 hover:bg-white/5 transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.5)] hidden md:flex"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
