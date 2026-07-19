import os
import re

directory = r'd:\jurisstandard\src\components\methodology'
section_files = [
    'EditorialPhilosophy.tsx',
    'EditorialPrinciples.tsx',
    'RecognitionFramework.tsx',
    'EditorialConsiderations.tsx',
    'RecognitionProgrammes.tsx',
    'EditorialGovernance.tsx',
    'MethodologyFAQ.tsx',
    'EditorialOffice.tsx'
]

def apply_compression(filename):
    filepath = os.path.join(directory, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update the card wrapper to be tighter and more premium
    # Old: <div className="bg-[#050505] border border-white/10 rounded-xl p-8 lg:p-12 shadow-2xl relative overflow-hidden group">
    # New: <div className="bg-gradient-to-br from-[#0c0c0c] to-[#050505] border border-white/10 rounded-xl p-6 lg:p-10 shadow-2xl relative overflow-hidden group">
    content = re.sub(
        r'<div className="bg-\[#050505\] border border-white/10 rounded-xl p-8 lg:p-12 shadow-2xl relative overflow-hidden group">',
        r'<div className="bg-gradient-to-br from-[#0a0a0a] to-[#000000] border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,1)] rounded-2xl p-6 lg:p-8 xl:p-10 relative overflow-hidden group">',
        content
    )
    
    # Also update the subtle top glow for a richer premium feel
    content = re.sub(
        r'<div className="absolute top-0 inset-x-0 h-\[1px\] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent group-hover:via-gold-500/40 transition-colors duration-500" />',
        r'<div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent group-hover:via-gold-400/60 transition-colors duration-500 shadow-[0_0_20px_rgba(212,175,55,0.3)]" />',
        content
    )

    # 2. Update the Header layout to be tighter
    # Old: <div className="flex flex-col items-start mb-10 border-b border-white/5 pb-8">
    # New: <div className="flex flex-col items-start mb-6 border-b border-white/5 pb-6">
    content = re.sub(
        r'<div className="flex flex-col items-start mb-10 border-b border-white/5 pb-8">',
        r'<div className="flex flex-col items-start mb-6 border-b border-white/5 pb-6">',
        content
    )
    
    # Tighter space between badge and heading
    content = re.sub(
        r'<div className="flex items-center space-x-4 mb-5">',
        r'<div className="flex items-center space-x-3 mb-3">',
        content
    )

    # Make the badge look ultra premium (smaller, sleeker)
    # Old: <div className="flex items-center justify-center w-8 h-8 rounded bg-gradient-to-br from-gold-500/20 to-gold-600/5 border border-gold-500/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
    # New: <div className="flex items-center justify-center w-6 h-6 rounded-sm bg-gradient-to-br from-gold-500/20 to-gold-600/5 border border-gold-500/40 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
    content = re.sub(
        r'<div className="flex items-center justify-center w-8 h-8 rounded bg-gradient-to-br from-gold-500/20 to-gold-600/5 border border-gold-500/30 shadow-\[0_0_15px_rgba\(212,175,55,0\.15\)\]">',
        r'<div className="flex items-center justify-center w-6 h-6 rounded bg-gradient-to-br from-gold-500/20 to-gold-600/5 border border-gold-500/50 shadow-[0_0_10px_rgba(212,175,55,0.2)]">',
        content
    )
    
    # 3. Remove the max-w-5xl restriction on the content so it fills the right side
    # Old: <div className="w-full space-y-8 max-w-5xl">
    # New: <div className="w-full space-y-4 text-justify md:text-left">
    content = re.sub(
        r'<div className="w-full space-y-8 max-w-5xl">',
        r'<div className="w-full space-y-4">',
        content
    )
    
    # Make text paragraphs slightly smaller/tighter to save space, but readable
    # Many files have space-y-6 text-neutral-300 font-light leading-relaxed md:text-lg mb-16
    content = re.sub(
        r'space-y-6 text-neutral-300 font-light leading-relaxed md:text-lg mb-16',
        r'space-y-3 text-neutral-300 font-light leading-relaxed md:text-[1.05rem] mb-6',
        content
    )
    
    # Fix the quote/italic section at the bottom of Editorial Philosophy
    # Old: <div className="relative border-l-2 border-gold-500/40 pl-8 py-2 group-hover:border-gold-400 transition-colors duration-1000">
    # New: <div className="relative border-l-2 border-gold-500/60 pl-6 py-1 mt-6 group-hover:border-gold-400 transition-colors duration-500 bg-gradient-to-r from-gold-500/5 to-transparent">
    content = re.sub(
        r'<div className="relative border-l-2 border-gold-500/40 pl-8 py-2 group-hover:border-gold-400 transition-colors duration-1000">',
        r'<div className="relative border-l-[3px] border-gold-500/60 pl-6 py-3 mt-6 group-hover:border-gold-400 transition-colors duration-500 bg-gradient-to-r from-gold-500/10 to-transparent rounded-r-lg">',
        content
    )
    
    # Also adjust grid layout in RecognitionProgrammes etc if they exist. Let's make sure grid gaps are tighter.
    content = re.sub(r'gap-8 lg:gap-12', r'gap-6 lg:gap-8', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for f in section_files:
    apply_compression(f)
    
print("Compression and full-width applied.")
