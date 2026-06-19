"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LiveTicker } from "@/components/ui/LiveTicker";
import { CTAButton } from "@/components/ui/CTAButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IndexCard } from "@/components/ui/IndexCard";
import { IntelligenceCard } from "@/components/ui/IntelligenceCard";
import { AwardCard } from "@/components/ui/AwardCard";
import { InsightCard } from "@/components/ui/InsightCard";
import { MembershipCard } from "@/components/ui/MembershipCard";
import { HeroGlobe } from "@/components/ui/HeroGlobe";
import { Play, Globe, Gem, Scale, Users, TrendingUp, Zap, Megaphone, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";



export default function Home() {
  const isGlobeLoaded = useAppStore((state) => state.isGlobeLoaded);

  return (
    <main className="min-h-screen bg-background selection:bg-gold-500/30 overflow-hidden relative">
      {/* Global Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(197,160,89,0.08)_0%,_transparent_70%)] animate-pulse" />
        <div className="absolute bottom-[20%] left-[-10%] w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,_rgba(197,160,89,0.05)_0%,_transparent_70%)]" />
      </div>

      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative min-h-[100vh] flex items-center pt-40 pb-32 z-10">
        
        {/* Photorealistic 3D Globe - Expanded width to prevent hard clipping */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <HeroGlobe />
        </div>
        
        {/* Deep, premium shadow restricted strictly to the left half of the screen behind the text */}
        <div className="absolute top-0 left-0 w-[60%] h-full flex flex-col justify-center pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[150%] bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.8)_0%,transparent_70%)]" />
        </div>

        <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
          <div className="max-w-3xl">
            {isGlobeLoaded && (
              <>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="flex items-center space-x-4 mb-8"
                >
                  <div className="w-12 h-[1px] bg-gradient-to-r from-gold-500 to-transparent shadow-[0_0_20px_rgba(212,175,55,1)]" />
                  <div className="relative flex h-1.5 w-1.5 -ml-4 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-gold-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold-400 shadow-[0_0_15px_rgba(212,175,55,1)]"></span>
                  </div>
                  <span className="text-[0.7rem] uppercase tracking-[0.45em] text-white/90 font-medium">
                    The Global Standard For Legal Excellence
                  </span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                  className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.05] mb-8 tracking-tight drop-shadow-2xl"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-100 to-neutral-400 drop-shadow-sm">
                    Excellence is Measured.
                  </span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-100 to-gold-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] inline-block mt-2 pb-4 pr-4">
                    Legacy is Earned.
                  </span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                  className="text-neutral-300 text-lg md:text-xl max-w-2xl mb-12 leading-[1.8] font-light tracking-wide border-l border-gold-500/30 pl-6 shadow-sm"
                >
                  An independent institution for legal rankings, intelligence, recognition, and global professional influence.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                  className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
                >
                  <CTAButton href="/juris-index" variant="primary">Enter the Index</CTAButton>
                  <CTAButton href="/methodology" variant="outline">View Methodology</CTAButton>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
                  className="mt-16 flex items-center cursor-pointer group"
                >
                  <div className="relative w-16 h-16 rounded-full flex items-center justify-center">
                    {/* Outer spinning dashed ring */}
                    <div className="absolute inset-[-4px] rounded-full border border-dashed border-gold-500/30 animate-[spin_15s_linear_infinite] group-hover:border-gold-400/60 transition-colors duration-700 pointer-events-none" />
                    
                    {/* Core glass button */}
                    <div className="absolute inset-0 rounded-full border-[0.5px] border-gold-500/40 bg-[#050505]/60 backdrop-blur-md group-hover:border-gold-300 transition-all duration-700 shadow-[0_0_20px_rgba(212,175,55,0.15)] group-hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] group-hover:scale-105 flex items-center justify-center overflow-hidden">
                      {/* Inner glare sweep */}
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer pointer-events-none" />
                      <Play className="w-5 h-5 ml-1 text-gold-300 fill-gold-300 group-hover:text-gold-100 group-hover:fill-gold-100 relative z-10 transition-colors duration-700" />
                    </div>
                  </div>
                  
                  <div className="ml-8">
                    <span className="block text-[0.65rem] uppercase tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500 group-hover:from-white group-hover:to-gold-200 transition-all duration-700 font-medium drop-shadow-sm">
                      Watch Juris Standard Film
                    </span>
                    <div className="flex items-center mt-2.5 space-x-2">
                      <div className="w-1 h-1 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(212,175,55,0.9)]" />
                      <span className="block text-[0.6rem] tracking-[0.2em] text-gold-400 group-hover:text-gold-300 transition-colors duration-700 font-medium">1:25 MIN</span>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 2. Stats Bar - Premium Floating Glass Cards */}
      <section className="relative -mt-16 z-20">
        <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6">
            {[
              { value: "20K+", label: "Lawyers Evaluated" },
              { value: "5K+", label: "Law Firms Ranked" },
              { value: "150+", label: "Jurisdictions" },
              { value: "100+", label: "Practice Areas" },
              { value: "50M+", label: "Data Points" },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center justify-center p-8 bg-[#050505]/80 backdrop-blur-xl border border-white/10 hover:border-gold-500/40 rounded-[1px] shadow-2xl relative overflow-hidden group transition-all duration-700 hover:-translate-y-2 hover:bg-[#0a0a0a]/90 cursor-default"
              >
                {/* Hover top line glow */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[0_0_15px_rgba(212,175,55,1)]" />
                
                {/* Subtle corner accent */}
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="font-serif text-3xl lg:text-4xl xl:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-white via-[#FBF5B7] to-[#D4AF37] mb-3 group-hover:from-white group-hover:via-[#FBF5B7] group-hover:to-gold-300 transition-all duration-700 drop-shadow-[0_2px_10px_rgba(212,175,55,0.15)] group-hover:drop-shadow-[0_4px_15px_rgba(212,175,55,0.4)]">
                  {stat.value}
                </div>
                <div className="text-[0.6rem] xl:text-[0.65rem] font-medium uppercase tracking-[0.25em] text-neutral-400 group-hover:text-gold-200 transition-colors duration-700 text-center">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Juris Standard Index™ */}
      <section className="py-32 relative z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(197,160,89,0.05)_0%,_transparent_50%)] pointer-events-none" />
        <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 relative">
          <SectionHeader 
            title="The Juris Standard Index™" 
            subtitle="A research-driven institutional record of legal excellence."
            actionText="View All Indexes"
            actionHref="/juris-index"
            icon={<div className="w-4 h-4 border border-gold-400 flex items-center justify-center shadow-[0_0_10px_rgba(197,160,89,0.5)]"><div className="w-2 h-2 bg-gold-400" /></div>}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            <IndexCard delay={0} category="Corporate" title="Elite" href="/juris-index" icon={<img src="/icons/icon_diamond.png" alt="Diamond" className="w-[5.5rem] h-[5.5rem] object-cover mix-blend-lighten" style={{ WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 80%)', maskImage: 'radial-gradient(circle, black 50%, transparent 80%)' }} />} />
            <IndexCard delay={100} category="Litigation" title="Masters" href="/juris-index" icon={<img src="/icons/icon_scales.png" alt="Scales" className="w-[5.5rem] h-[5.5rem] object-cover mix-blend-lighten" style={{ WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 80%)', maskImage: 'radial-gradient(circle, black 50%, transparent 80%)' }} />} />
            <IndexCard delay={200} category="Arbitration" title="Leaders" href="/juris-index" icon={<img src="/icons/icon_leaders.png" alt="Leaders" className="w-[5.5rem] h-[5.5rem] object-cover mix-blend-lighten" style={{ WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 80%)', maskImage: 'radial-gradient(circle, black 50%, transparent 80%)' }} />} />
            <IndexCard delay={300} category="Law Firm" title="Rankings" href="/juris-index" icon={<img src="/icons/icon_trending.png" alt="Trending" className="w-[5.5rem] h-[5.5rem] object-cover mix-blend-lighten" style={{ WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 80%)', maskImage: 'radial-gradient(circle, black 50%, transparent 80%)' }} />} />
            <IndexCard delay={400} category="General Counsel" title="Power List" href="/juris-index" icon={<img src="/icons/icon_lightning.png" alt="Lightning" className="w-[5.5rem] h-[5.5rem] object-cover mix-blend-lighten" style={{ WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 80%)', maskImage: 'radial-gradient(circle, black 50%, transparent 80%)' }} />} />
            <IndexCard delay={500} category="Global" title="Influencers" href="/juris-index" icon={<img src="/icons/icon_megaphone.png" alt="Megaphone" className="w-[5.5rem] h-[5.5rem] object-cover mix-blend-lighten" style={{ WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 80%)', maskImage: 'radial-gradient(circle, black 50%, transparent 80%)' }} />} />
          </div>
        </div>
      </section>

      {/* 4. Legal Intelligence */}
      <section className="py-24 relative bg-charcoal-900/40 border-y border-white/5 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_right,_rgba(197,160,89,0.03)_0%,_transparent_70%)] pointer-events-none" />
        <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 relative">
          <SectionHeader 
            title="Legal Intelligence" 
            actionText="Explore Intelligence"
            actionHref="/intelligence"
            icon={<Globe className="w-6 h-6 text-gold-400 drop-shadow-[0_0_8px_rgba(197,160,89,0.6)]" />}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 p-10 md:p-14 rounded-xl bg-[#0f0f0f]/90 backdrop-blur-3xl border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-700 relative overflow-hidden group hover:border-gold-500/30 flex flex-col justify-between">
               
               {/* Elegant sweeping background graph */}
               <div className="absolute bottom-0 right-0 w-[110%] h-[70%] opacity-30 group-hover:opacity-60 transition-all duration-1000 pointer-events-none z-0 translate-x-[5%] translate-y-[10%] group-hover:translate-y-[5%]">
                  <svg className="w-full h-full" viewBox="0 0 200 100" fill="none" preserveAspectRatio="none">
                     <defs>
                       <linearGradient id="large-graph-area" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                         <stop stopColor="#D4AF37" stopOpacity="0.15" />
                         <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
                       </linearGradient>
                       <linearGradient id="large-graph-line" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                         <stop stopColor="#D4AF37" stopOpacity="0" />
                         <stop offset="0.3" stopColor="#D4AF37" stopOpacity="0.4" />
                         <stop offset="1" stopColor="#FFDF73" stopOpacity="0.8" />
                       </linearGradient>
                     </defs>
                     <path d="M0 100 L0 80 C 40 80, 60 90, 100 60 C 140 30, 160 40, 200 10 L 200 100 Z" fill="url(#large-graph-area)" />
                     <path d="M0 80 C 40 80, 60 90, 100 60 C 140 30, 160 40, 200 10" stroke="url(#large-graph-line)" strokeWidth="1.5" strokeLinecap="round" className="drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)]" />
                  </svg>
               </div>
               
               <div className="relative z-10 flex flex-col h-full justify-between">
                 <div>
                   <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-10">
                     <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse shadow-[0_0_8px_#D4AF37]" />
                     <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/70">
                       Global Report
                     </span>
                   </div>
                   
                   <h3 className="font-light text-4xl md:text-5xl text-white tracking-tight leading-[1.1] mb-6 max-w-md group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gold-200 transition-all duration-700">
                     Legal Market <br/>
                     <span className="font-serif italic text-gold-400">Overview 2024</span>
                   </h3>
                   <p className="text-white/50 mb-12 max-w-sm text-sm leading-relaxed tracking-wide font-light">
                     Independent research on legal markets, transactions, disputes, regulatory evolution, and professional growth.
                   </p>
                 </div>
                 
                 <Link href="/intelligence" className="group/btn inline-flex items-center justify-center self-start px-8 py-3.5 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-[0.2em] hover:bg-gold-400 transition-colors duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                    View Full Report
                    <ArrowRight className="ml-3 w-4 h-4 text-black/70 group-hover/btn:text-black group-hover/btn:translate-x-1 transition-all" />
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
      <section className="py-32 relative z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(197,160,89,0.06)_0%,_transparent_60%)] pointer-events-none" />
        <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Global Legal Network */}
            <div className="p-12 md:p-16 bg-gradient-to-br from-charcoal-900 to-black border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(197,160,89,0.15)_0%,_transparent_70%)] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold-400 mb-6 block drop-shadow-[0_0_8px_rgba(197,160,89,0.4)]">
                  The World's Most
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-white uppercase leading-tight mb-8">
                  Influential Legal<br />Network
                </h2>
                <p className="text-white/60 mb-14 max-w-sm text-sm leading-relaxed">
                  Connect, collaborate, and build influence within a verified global legal community.
                </p>
                <div className="grid grid-cols-2 gap-y-10 gap-x-6 mb-12">
                  <div>
                    <div className="font-serif text-3xl text-gold-400 mb-1 drop-shadow-[0_0_10px_rgba(197,160,89,0.3)]">20K+</div>
                    <div className="text-[0.6rem] uppercase tracking-widest text-white/50">Verified Lawyers</div>
                  </div>
                  <div>
                    <div className="font-serif text-3xl text-gold-400 mb-1 drop-shadow-[0_0_10px_rgba(197,160,89,0.3)]">5K+</div>
                    <div className="text-[0.6rem] uppercase tracking-widest text-white/50">Law Firms</div>
                  </div>
                  <div>
                    <div className="font-serif text-3xl text-gold-400 mb-1 drop-shadow-[0_0_10px_rgba(197,160,89,0.3)]">3K+</div>
                    <div className="text-[0.6rem] uppercase tracking-widest text-white/50">General Counsel</div>
                  </div>
                  <div>
                    <div className="font-serif text-3xl text-gold-400 mb-1 drop-shadow-[0_0_10px_rgba(197,160,89,0.3)]">150+</div>
                    <div className="text-[0.6rem] uppercase tracking-widest text-white/50">Countries</div>
                  </div>
                </div>
              </div>
              <div className="relative z-10">
                <CTAButton href="/network" variant="outline" showArrow>Explore Network</CTAButton>
              </div>
            </div>

            {/* Membership */}
            <div className="p-12 md:p-16 bg-gradient-to-br from-black via-charcoal-900 to-black border border-white/5 shadow-2xl relative overflow-hidden flex flex-col xl:flex-row gap-12 items-center justify-between">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(197,160,89,0.08)_0%,_transparent_80%)] pointer-events-none" />
               <div className="flex-1 relative z-10 w-full">
                 <h2 className="font-serif text-3xl md:text-4xl text-white uppercase leading-tight mb-3">
                   Juris Standard<br />
                   <span className="text-gold-400 drop-shadow-[0_0_15px_rgba(197,160,89,0.5)] block mt-1">Black™</span>
                 </h2>
                 <p className="text-[0.65rem] uppercase tracking-[0.25em] text-white/40 mb-10">Private Membership</p>
                 
                 <ul className="space-y-5 mb-12">
                   {['Exclusive Rankings Access', 'Private Intelligence Reports', 'Global Events & Summits', 'Members-Only Network', 'VIP Recognition', 'Early Access to Research'].map((feature, i) => (
                     <li key={i} className="flex items-center text-sm text-white/70">
                       <div className="w-1.5 h-1.5 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(197,160,89,0.8)] mr-4" />
                       {feature}
                     </li>
                   ))}
                 </ul>
                 <CTAButton href="/request-access" variant="primary">Request Access</CTAButton>
               </div>
               
               <div className="flex-1 w-full flex justify-center xl:justify-end relative z-10 animate-float">
                 <MembershipCard />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Recognition of Excellence */}
      <section className="py-24 bg-charcoal-900/50 border-t border-white/5 relative z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(197,160,89,0.04)_0%,_transparent_60%)] pointer-events-none" />
        <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 relative">
          <SectionHeader 
            title="Recognition of Excellence" 
            actionText="View All Awards"
            actionHref="/awards"
            icon={<div className="w-5 h-5 flex flex-col justify-between shadow-[0_0_10px_rgba(197,160,89,0.4)]"><div className="w-full h-1 bg-gold-400"/><div className="w-full h-1 bg-gold-400"/><div className="w-full h-1 bg-gold-400"/></div>}
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
      <section className="py-24 relative z-10">
        <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32">
          <SectionHeader 
            title="Latest Insights" 
            actionText="View All Insights"
            actionHref="/insights"
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
      <section className="py-24 border-t border-white/5 relative overflow-hidden z-10">
         <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 to-black pointer-events-none" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(197,160,89,0.1)_0%,_transparent_60%)] pointer-events-none" />
         
         <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 flex flex-col lg:flex-row items-center justify-between">
           <div className="max-w-2xl mb-12 lg:mb-0 text-center lg:text-left">
             <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gold-400 uppercase tracking-widest mb-6 drop-shadow-[0_0_15px_rgba(197,160,89,0.3)]">
               Stay Ahead.<br />Stay Influential.
             </h2>
             <p className="text-white/60 text-base max-w-md mx-auto lg:mx-0">
               Subscribe to our exclusive intelligence updates and gain the competitive edge.
             </p>
           </div>
           
           <div className="w-full lg:w-auto flex-1 max-w-lg flex flex-col sm:flex-row gap-0 rounded-sm bg-gradient-to-b from-[#1c1c1c] to-[#0a0a0a] border-t border-t-white/[0.08] border-x border-x-white/[0.03] border-b border-b-black shadow-[0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_50px_rgba(0,0,0,0.8)] focus-within:border-t-gold-500/40 focus-within:border-x-gold-500/20">
             <input 
               type="email" 
               placeholder="Enter your email address" 
               className="flex-1 bg-transparent border-none px-6 py-5 text-sm text-white placeholder-white/40 focus:outline-none focus:bg-white/[0.02] transition-all"
               suppressHydrationWarning
             />
             <button 
               className="bg-gold-500 text-charcoal-900 font-bold uppercase tracking-widest text-[0.65rem] px-10 py-5 hover:bg-gold-400 transition-colors border-l border-white/[0.08]"
               suppressHydrationWarning
             >
               Subscribe
             </button>
           </div>
         </div>
      </section>

      <Footer />
      <LiveTicker />
    </main>
  );
}
