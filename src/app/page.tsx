"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LiveTicker } from "@/components/ui/LiveTicker";
import { CTAButton } from "@/components/ui/CTAButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { InstitutionalCard } from "@/components/ui/InstitutionalCard";
import { IntelligenceCard } from "@/components/ui/IntelligenceCard";
import { AwardCard } from "@/components/ui/AwardCard";
import { InsightCard } from "@/components/ui/InsightCard";
import { MembershipCard } from "@/components/ui/MembershipCard";
import { GlowingWorldMap } from "@/components/ui/GlowingWorldMap";
import { Play, Globe, Gem, Scale, Crown, TrendingUp, Zap, Megaphone, ArrowRight, ShieldCheck, Landmark, Users, Star, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";



export default function Home() {
  const isGlobeLoaded = useAppStore((state) => state.isGlobeLoaded);

  return (
    <main className="min-h-screen bg-background selection:bg-gold-500/30 overflow-hidden relative">
      {/* Global Ambient Glows Removed for Performance */}

      <Navbar />

      {/* 1. Hero Section & Stats Bar combined for layout precision */}
      <section className="relative min-h-[100vh] flex flex-col justify-center pt-24 pb-8 z-10 bg-[#050505] overflow-hidden">
        
        {/* Background Map Image exactly as originally uploaded */}
        <div className="absolute right-[-10%] md:right-[-5%] lg:right-[0%] top-1/2 -translate-y-1/2 w-[120%] md:w-[70%] lg:w-[65%] h-full flex items-center justify-center opacity-100 z-0 pointer-events-none">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* The Image Wrapper to keep dots aligned */}
            <div className="relative w-full h-auto max-h-[85vh] flex items-center justify-center">
              {/* The Image with a strong mask to eliminate ALL borders */}
              <img 
                src="/images/final-map.png" 
                alt="World Map" 
                className="w-full h-auto object-contain max-h-[85vh] opacity-90"
                style={{
                  maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 75%)', 
                  WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 75%)'
                }}
              />
              
              {/* Live Blinking Dots Overlay - Pixel Perfect Coordinates */}
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                {/* New York */}
                <div className="absolute top-[44.5%] left-[28.2%] flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute w-6 h-6 bg-gold-400 rounded-full animate-location-ping opacity-20" style={{ animationDelay: '0s' }}></div>
                  <div className="w-1.5 h-1.5 bg-gold-300 rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
                </div>
                {/* London */}
                <div className="absolute top-[33.9%] left-[47.6%] flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute w-6 h-6 bg-gold-400 rounded-full animate-location-ping opacity-20" style={{ animationDelay: '1.5s' }}></div>
                  <div className="w-1.5 h-1.5 bg-gold-300 rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
                </div>
                {/* Dubai */}
                <div className="absolute top-[51.2%] left-[61.5%] flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute w-6 h-6 bg-gold-400 rounded-full animate-location-ping opacity-20" style={{ animationDelay: '0.8s' }}></div>
                  <div className="w-1.5 h-1.5 bg-gold-300 rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
                </div>
                {/* Mumbai */}
                <div className="absolute top-[56.6%] left-[69.6%] flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute w-6 h-6 bg-gold-400 rounded-full animate-location-ping opacity-20" style={{ animationDelay: '2.1s' }}></div>
                  <div className="w-1.5 h-1.5 bg-gold-300 rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
                </div>
                {/* Singapore */}
                <div className="absolute top-[65.6%] left-[76.5%] flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute w-6 h-6 bg-gold-400 rounded-full animate-location-ping opacity-20" style={{ animationDelay: '0.4s' }}></div>
                  <div className="w-1.5 h-1.5 bg-gold-300 rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
                </div>
                {/* Sydney */}
                <div className="absolute top-[83.0%] left-[90.5%] flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute w-6 h-6 bg-gold-400 rounded-full animate-location-ping opacity-20" style={{ animationDelay: '2.5s' }}></div>
                  <div className="w-1.5 h-1.5 bg-gold-300 rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Left Side Shadow Gradient for text legibility */}
        <div className="absolute top-0 left-0 w-full md:w-[60%] h-full bg-gradient-to-r from-[#050505] via-[#050505]/95 to-transparent pointer-events-none z-0" />

        <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 mt-10">
          <div className="max-w-2xl lg:max-w-3xl">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-[1px] bg-gold-400" />
                  <span className="text-[0.60rem] uppercase tracking-[0.2em] text-gold-400 font-medium font-sans">
                    THE GLOBAL STANDARD FOR LEGAL EXCELLENCE
                  </span>
                </div>
                
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-4 tracking-tight drop-shadow-2xl max-w-[90%]">
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-100 to-neutral-400 drop-shadow-sm">
                    Excellence is Measured.
                  </span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-100 to-gold-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] inline-block pb-4 pr-4">
                    Legacy is Earned.
                  </span>
                </h1>
                
                <p className="text-neutral-300 text-sm md:text-base max-w-xl mb-8 leading-[1.6] font-light tracking-wide shadow-sm">
                  An independent institution for legal rankings, intelligence, <br className="hidden md:block" />
                  recognition, and global professional influence.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6">
                  <CTAButton href="/enter-the-index" variant="primary" showArrow>Enter the Index</CTAButton>
                  <Link href="/methodology" className="flex items-center text-[11px] font-semibold uppercase tracking-[2px] text-neutral-300 hover:text-gold-300 transition-all duration-300 group pb-1 border-b border-transparent hover:border-gold-300/30">
                    View Methodology 
                    <ArrowRight className="ml-2 w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                

                <div className="flex items-center space-x-3 mb-6">
                  <ShieldCheck className="w-4 h-4 text-gold-400" strokeWidth={1.5} />
                  <span className="text-[0.55rem] uppercase tracking-[0.25em] text-neutral-400 font-medium">
                    TRUSTED BY LEGAL LEADERS IN 150+ COUNTRIES
                  </span>
                </div>
                
                {/* Stats Bar */}
                <div className="w-full max-w-5xl bg-gradient-to-b from-[#161616]/90 to-[#0a0a0a]/95 backdrop-blur-2xl border border-white/5 border-t-white/10 rounded-2xl flex flex-col md:flex-row items-center justify-between p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative mb-8 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 via-transparent to-gold-500/5 pointer-events-none opacity-50" />
                  
                  {/* Subtle shimmer effect on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />

                  {[
                    { icon: Users, value: "20K+", label: "LAWYERS EVALUATED" },
                    { icon: Landmark, value: "5K+", label: "LAW FIRMS RANKED" },
                    { icon: Globe, value: "150+", label: "JURISDICTIONS" },
                    { icon: Scale, value: "100+", label: "PRACTICE AREAS" },
                    { icon: Star, value: "50M+", label: "DATA POINTS" },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center space-x-4 py-4 md:py-3 px-4 flex-1 border-b md:border-b-0 md:border-r border-white/5 last:border-0 relative z-10 transition-colors duration-300 hover:bg-white/[0.02] rounded-xl cursor-default">
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-gold-500/20 blur-md rounded-full" />
                        <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-gold-400 relative z-10 stroke-[1.5px]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-serif text-[1.3rem] md:text-[1.45rem] bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent leading-none mb-1.5 tracking-tight drop-shadow-sm">{stat.value}</span>
                        <span className="text-[0.45rem] md:text-[0.55rem] uppercase tracking-[0.2em] text-gold-500/70 font-semibold leading-none">{stat.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
          </div>
          

        </div>
      </section>

      {/* 3. The Juris Standard Index */}
      <section className="py-20 relative z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(197,160,89,0.05)_0%,_transparent_50%)] pointer-events-none" />
        <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 relative">
          <SectionHeader 
            title="The Juris Standard Index" 
            subtitle="A research-driven institutional record of legal excellence."
            actionText="View All Indexes"
            actionHref="/juris-index"
            icon={<Award className="w-6 h-6 text-gold-400" strokeWidth={1.5} />}
          />
          <div className="flex flex-col gap-6">
            {/* Tier 1: The Signature Brands */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InstitutionalCard 
                title="LAW FIRMS"
                subtitle="Recognising institutions that define excellence, leadership and professional distinction."
                collections={["Law Firm Excellence", "Corporate Excellence", "Dispute Resolution", "Banking & Finance"]}
                href="/juris-index/law-firms"
                isSignature={true}
                delay={0}
              />
              <InstitutionalCard 
                title="LEGAL PROFESSIONALS"
                subtitle="Recognising individuals whose excellence, influence and leadership shape the legal profession."
                collections={["Corporate Elite", "Litigation Masters", "Arbitration Leaders", "General Counsel"]}
                href="/juris-index/professionals"
                isSignature={true}
                delay={100}
              />
            </div>

            {/* Tier 2: The Ecosystem */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InstitutionalCard 
                title="LEGAL MEDIA"
                subtitle="Recognising organisations advancing legal journalism, publishing and public legal discourse."
                collections={["Editorial Excellence", "Legal Publications", "Digital Legal Media"]}
                href="/juris-index/media"
                delay={200}
              />
              <InstitutionalCard 
                title="LEGAL TECHNOLOGY & INNOVATION"
                subtitle="Recognising organisations transforming the future of legal services."
                collections={["Legal Innovation Excellence", "Artificial Intelligence", "Legal Research Platforms"]}
                href="/juris-index/technology"
                delay={300}
              />
            </div>

            {/* Tier 3: The Record */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InstitutionalCard 
                title="EDITORIAL INTELLIGENCE"
                subtitle="Independent research and legal intelligence published by Juris Standard."
                collections={["Annual Review", "Market Intelligence", "Industry Reports"]}
                href="/intelligence"
                delay={400}
              />
              <InstitutionalCard 
                title="INDEX ARCHIVE"
                subtitle="The permanent editorial record of the Juris Standard Index."
                collections={["Current Edition", "Previous Editions", "Recognition Archive"]}
                href="/archive"
                delay={500}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Legal Intelligence */}
      <section className="py-20 relative bg-charcoal-900/40 border-y border-white/5 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_right,_rgba(197,160,89,0.03)_0%,_transparent_70%)] pointer-events-none" />
        <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 relative">
          <SectionHeader 
            title="Legal Intelligence" 
            actionText="Explore Intelligence"
            actionHref="/intelligence"
            icon={<Globe className="w-6 h-6 text-gold-400" strokeWidth={1.5} />}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 p-10 md:p-14 rounded-xl bg-[#0f0f0f]/90 backdrop-blur-3xl border border-white/[0.05] shadow-lg transition-all duration-200 relative overflow-hidden group hover:border-gold-500/20 flex flex-col justify-between">
               
               {/* Premium Financial Terminal Background Graph */}
               <div className="absolute bottom-0 right-0 w-[110%] h-[80%] opacity-60 group-hover:opacity-80 transition-all duration-200 pointer-events-none z-0 translate-x-[2%] translate-y-[5%] group-hover:translate-y-[4%]">
                  <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                     <defs>
                       <linearGradient id="large-graph-area" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
                         <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
                       </linearGradient>
                       <linearGradient id="large-graph-line" x1="0" y1="0" x2="1" y2="0">
                         <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.1" />
                         <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.8" />
                         <stop offset="100%" stopColor="#FFDF73" stopOpacity="1" />
                       </linearGradient>
                       <filter id="glow-large" x="-20%" y="-20%" width="140%" height="140%">
                         <feGaussianBlur stdDeviation="2" result="blur" />
                         <feComposite in="SourceGraphic" in2="blur" operator="over" />
                       </filter>
                     </defs>
                     
                     {/* Strict Terminal X/Y Grid Background */}
                     <path d="M0 20 L200 20 M0 40 L200 40 M0 60 L200 60 M0 80 L200 80" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                     <path d="M40 0 L40 100 M80 0 L80 100 M120 0 L120 100 M160 0 L160 100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

                     {/* Filled Gradient Area */}
                     <path d="M0 100 L0 80 C 40 75, 60 85, 100 60 C 140 35, 160 40, 200 10 L 200 100 Z" fill="url(#large-graph-area)" />
                     
                     {/* Glowing Main Solid Line */}
                     <path d="M0 80 C 40 75, 60 85, 100 60 C 140 35, 160 40, 200 10" stroke="url(#large-graph-line)" strokeWidth="1.5" fill="none" filter="url(#glow-large)" />
                     
                     {/* Pulsing End Node */}
                     <circle cx="200" cy="10" r="3" fill="#FFDF73" filter="url(#glow-large)" />
                     <circle cx="200" cy="10" r="8" fill="none" stroke="#FFDF73" strokeWidth="1" strokeOpacity="0.5" className="animate-pulse" />
                  </svg>
               </div>
               
               <div className="relative z-10 flex flex-col h-full justify-between">
                 <div>
                   <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-10">
                     <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                     <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/70">
                       Global Report
                     </span>
                   </div>
                   
                   <h3 className="font-light text-4xl md:text-5xl text-white tracking-tight leading-[1.1] mb-6 max-w-md group-hover:text-gold-100 transition-all duration-200">
                     Legal Market <br/>
                     <span className="font-serif italic text-gold-400">Overview 2024</span>
                   </h3>
                   <p className="text-white/50 mb-12 max-w-sm text-sm leading-relaxed tracking-wide font-light">
                     Independent research on legal markets, transactions, disputes, regulatory evolution, and professional growth.
                   </p>
                 </div>
                 
                 <Link href="/intelligence" className="group/btn inline-flex items-center mt-8 md:mt-0 px-5 py-2 text-[14px] font-normal text-gold-300 border border-gold-500/40 bg-transparent hover:bg-gold-500/10 hover:text-gold-200 transition-colors duration-200 rounded-[1px] self-start">
                    <span>View Full Report</span>
                    <span className="ml-2 transform transition-transform duration-200 group-hover/btn:translate-x-1 font-light">&rarr;</span>
                 </Link>
               </div>
            </div>
            
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <IntelligenceCard category="M&A Legal Advisory" value="12.4%" subtitle="YoY Growth" />
              <IntelligenceCard category="Dispute Resolution" value="9.1%" subtitle="YoY Growth" />
              <IntelligenceCard category="Cross-Border Deals" value="18.7%" subtitle="YoY Growth" />
              <IntelligenceCard category="Legal Innovation" value="34.2%" subtitle="AI Adoption Increase" />
            </div>
          </div>
        </div>
      </section>

      {/* 5 & 6. Network & Membership */}
      <section className="py-20 relative z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(197,160,89,0.06)_0%,_transparent_60%)] pointer-events-none" />
        <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Global Legal Network */}
            <div className="p-6 md:p-8 bg-gradient-to-br from-charcoal-900 to-black border border-white/10 shadow-xl relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(197,160,89,0.15)_0%,_transparent_70%)] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="relative z-10">
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold-400 mb-3 block drop-shadow-[0_0_8px_rgba(197,160,89,0.4)]">
                  The World's Most
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-white uppercase leading-tight mb-4">
                  Influential Legal<br />Network
                </h2>
                <p className="text-white/60 mb-6 max-w-sm text-sm leading-relaxed">
                  Connect, collaborate, and build influence within a verified global legal community.
                </p>
                <div className="grid grid-cols-2 gap-y-6 gap-x-6 mb-8">
                  <div>
                    <div className="font-serif text-2xl md:text-3xl text-gold-400 mb-1 drop-shadow-[0_0_10px_rgba(197,160,89,0.3)]">20K+</div>
                    <div className="text-[0.6rem] uppercase tracking-widest text-white/50">Verified Lawyers</div>
                  </div>
                  <div>
                    <div className="font-serif text-2xl md:text-3xl text-gold-400 mb-1 drop-shadow-[0_0_10px_rgba(197,160,89,0.3)]">5K+</div>
                    <div className="text-[0.6rem] uppercase tracking-widest text-white/50">Law Firms</div>
                  </div>
                  <div>
                    <div className="font-serif text-2xl md:text-3xl text-gold-400 mb-1 drop-shadow-[0_0_10px_rgba(197,160,89,0.3)]">3K+</div>
                    <div className="text-[0.6rem] uppercase tracking-widest text-white/50">General Counsel</div>
                  </div>
                  <div>
                    <div className="font-serif text-2xl md:text-3xl text-gold-400 mb-1 drop-shadow-[0_0_10px_rgba(197,160,89,0.3)]">150+</div>
                    <div className="text-[0.6rem] uppercase tracking-widest text-white/50">Countries</div>
                  </div>
                </div>
              </div>
              <div className="relative z-10 mt-auto">
                <CTAButton href="/network" variant="outline" showArrow>Explore Network</CTAButton>
              </div>
            </div>

            {/* Membership */}
            <div className="p-6 md:p-8 bg-gradient-to-br from-black via-charcoal-900 to-black border border-white/5 shadow-xl relative overflow-hidden flex flex-col xl:flex-row gap-8 items-center justify-between">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(197,160,89,0.08)_0%,_transparent_80%)] pointer-events-none" />
               <div className="flex-1 relative z-10 w-full">
                 <h2 className="font-serif text-3xl md:text-4xl text-white uppercase leading-tight mb-2">
                   Juris Standard<br />
                   <span className="text-gold-400 drop-shadow-[0_0_15px_rgba(197,160,89,0.5)] block mt-1">Black</span>
                 </h2>
                 <p className="text-[0.65rem] uppercase tracking-[0.25em] text-white/40 mb-6">Private Membership</p>
                 
                 <ul className="space-y-3 mb-8">
                   {['Exclusive Rankings Access', 'Private Intelligence Reports', 'Global Events & Summits', 'Members-Only Network', 'VIP Recognition', 'Early Access to Research'].map((feature, i) => (
                     <li key={i} className="flex items-center text-sm text-white/70">
                       <div className="w-1.5 h-1.5 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(197,160,89,0.8)] mr-4" />
                       {feature}
                     </li>
                   ))}
                 </ul>
                 <div className="relative z-10 mt-auto">
                   <CTAButton href="/request-access" variant="outline" showArrow>Request Access</CTAButton>
                 </div>
               </div>
               
               <div className="flex-1 w-full flex justify-center xl:justify-end relative z-10 animate-float">
                 <MembershipCard />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Recognition of Excellence */}
      <section className="py-20 bg-charcoal-900/50 border-t border-white/5 relative z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(197,160,89,0.04)_0%,_transparent_60%)] pointer-events-none" />
        <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 relative">
          <SectionHeader 
            title="Recognition of Excellence" 
            actionText="View All Awards"
            actionHref="/awards"
            icon={<Star className="w-6 h-6 text-gold-400" strokeWidth={1.5} />}
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <AwardCard title="Lawyer of the Year" imageUrl="/trophies/trophy_lawyer.png" />
            <AwardCard title="Law Firm of the Year" imageUrl="/trophies/trophy_lawfirm.png" />
            <AwardCard title="40 Under 40 Rising Stars" imageUrl="/trophies/trophy_40under40.png" />
            <AwardCard title="Women Leaders in Law" imageUrl="/trophies/trophy_women.png" />
            <AwardCard title="Lifetime Achievement" imageUrl="/trophies/trophy_lifetime.png" />
            <AwardCard title="Legal Innovator" imageUrl="/trophies/trophy_innovator.png" />
          </div>
        </div>
      </section>

      {/* 8. Latest Insights */}
      <section className="py-20 relative z-10">
        <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32">
          <SectionHeader 
            title="Latest Insights" 
            actionText="View All Insights"
            actionHref="/insights"
            icon={<Megaphone className="w-6 h-6 text-gold-400" strokeWidth={1.5} />}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <InsightCard 
              category="Analysis"
              title="The Future of Legal Work in an AI-Driven World"
              date="May 15, 2024"
              readTime="8 min read"
              href="/insights"
            />
            <InsightCard 
              category="Report"
              title="India Legal Market Report 2024"
              date="May 10, 2024"
              readTime="Report"
              href="/insights"
            />
            <InsightCard 
              category="Interview"
              title="GC Spotlight: Driving Strategy from the Boardroom"
              date="May 8, 2024"
              readTime="12 min read"
              href="/insights"
            />
            <InsightCard 
              category="Trends"
              title="Arbitration Trends Shaping Global Disputes"
              date="May 5, 2024"
              readTime="6 min read"
              href="/insights"
            />
          </div>
        </div>
      </section>

      {/* 9. Newsletter Section */}
      <section className="py-20 border-t border-white/5 relative overflow-hidden z-10">
         <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 to-black pointer-events-none" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(197,160,89,0.1)_0%,_transparent_60%)] pointer-events-none" />
         
         <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 flex flex-col lg:flex-row items-center justify-between">
           <div className="max-w-2xl mb-12 lg:mb-0 text-center lg:text-left">
             <h2 className="font-serif text-4xl md:text-5xl text-white uppercase tracking-wide mb-4 drop-shadow-sm font-light">
               Stay Ahead.<br />Stay Influential.
             </h2>
             <p className="text-neutral-400 font-light text-base max-w-md mx-auto lg:mx-0">
               Subscribe to our exclusive intelligence updates and gain the competitive edge.
             </p>
           </div>
           
           <div className="w-full lg:w-auto flex-1 max-w-lg flex flex-col sm:flex-row gap-0 rounded-[1px] bg-transparent border border-white/10 overflow-hidden transition-all duration-200 hover:border-gold-500/30 focus-within:border-gold-500/50">
             <input 
               type="email" 
               placeholder="Enter your email address" 
               className="flex-1 bg-transparent border-none px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none transition-all"
               suppressHydrationWarning
             />
             <button 
               className="bg-gold-500/10 text-gold-300 font-normal text-[13px] px-8 py-3 hover:bg-gold-500/20 hover:text-gold-200 transition-colors border-l border-white/10"
               suppressHydrationWarning
             >
               Subscribe
             </button>
           </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
