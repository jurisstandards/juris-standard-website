import os
import re

filepath = r'd:\jurisstandard\src\components\methodology\RecognitionFramework.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the centered Compass icon
content = re.sub(
    r'<CrystalIcon icon=\{Compass\} className="mx-auto mb-6" />',
    r'',
    content
)

# 2. Left-align the introductory paragraph
content = re.sub(
    r'<p className="text-neutral-400 text-lg font-light max-w-2xl mx-auto mb-8">',
    r'<p className="text-neutral-300 font-light leading-relaxed md:text-[1.05rem] mb-6">',
    content
)

# 3. Compress the accordion items
# Decrease spacing between items
content = re.sub(
    r'<div className="space-y-6">',
    r'<div className="space-y-3">',
    content
)

# Make inactive bg transparent/black and active very sleek
content = re.sub(
    r'bg-\[#111\]/80 border-gold-500/40 shadow-\[0_10px_40px_rgba\(212,175,55,0\.05\)\]',
    r'bg-[#050505] border-gold-500/40 shadow-[0_5px_20px_rgba(212,175,55,0.1)]',
    content
)
content = re.sub(
    r'bg-\[#0a0a0a\]/60 border-white/10 hover:border-gold-500/20 hover:bg-\[#111\]/40',
    r'bg-black/20 border-white/5 hover:border-gold-500/20 hover:bg-[#111]/40',
    content
)
content = re.sub(
    r'duration-700',
    r'duration-500',
    content
)

# Tighten padding and icon size in the header
content = re.sub(
    r'px-8 py-6 flex items-center justify-between',
    r'px-6 py-4 flex items-center justify-between',
    content
)
content = re.sub(
    r'w-12 h-12 flex items-center justify-center rounded-xl',
    r'w-10 h-10 flex items-center justify-center rounded-xl',
    content
)
content = re.sub(
    r'space-x-6',
    r'space-x-5',
    content
)
content = re.sub(
    r'<stage.icon className=\{`w-5 h-5',
    r'<stage.icon className={`w-4 h-4',
    content
)
content = re.sub(
    r'text-xl md:text-2xl',
    r'text-lg md:text-xl',
    content
)

# Tighten padding in the expanded content
content = re.sub(
    r'px-8 pb-8 pl-\[6\.5rem\]',
    r'px-6 pb-6 pl-[4.75rem]',
    content
)
content = re.sub(
    r'text-white/80 font-medium mb-4',
    r'text-white/90 font-medium mb-3',
    content
)
content = re.sub(
    r'text-sm leading-relaxed space-y-4',
    r'text-sm md:text-[0.95rem] leading-relaxed space-y-3',
    content
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Section 3 optimized.")
