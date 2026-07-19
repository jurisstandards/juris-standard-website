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

def apply_topdown_redesign(filename, index):
    filepath = os.path.join(directory, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the title
    title_match = re.search(r'<h2[^>]*>(.*?)</h2>', content)
    title = title_match.group(1) if title_match else filename.replace('.tsx', '')
    
    # 1. Replace the grid layout header with the new top-down header
    # The current header looks like:
    # <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-8 lg:gap-12 items-start">
    #   {/* Left Header Column */}
    #   <div className="flex flex-col items-start lg:sticky lg:top-[160px]">
    #     <div className="flex items-center space-x-3 mb-4">
    #       <div className="flex items-center justify-center w-6 h-6 rounded bg-gold-500/20 border border-gold-500/30">
    #         <span className="text-gold-400 font-serif text-xs font-bold">1</span>
    #       </div>
    #       <span className="text-gold-500 text-[0.65rem] font-bold uppercase tracking-[0.25em]">Section 1</span>
    #     </div>
    #     <h2 className="text-3xl lg:text-4xl font-serif text-white font-light tracking-tight leading-snug">Editorial Philosophy</h2>
    #   </div>
    #   
    #   {/* Right Content Column */}
    #   <div className="w-full space-y-8">

    old_header = r'<div className="grid grid-cols-1 lg:grid-cols-\[280px_1fr\] xl:grid-cols-\[320px_1fr\] gap-8 lg:gap-12 items-start">\s*\{/\*\s*Left Header Column\s*\*/\}\s*<div className="flex flex-col items-start lg:sticky lg:top-\[160px\]">\s*<div className="flex items-center space-x-3 mb-4">\s*<div className="flex items-center justify-center w-6 h-6 rounded bg-gold-500/20 border border-gold-500/30">\s*<span className="text-gold-400 font-serif text-xs font-bold">\d+</span>\s*</div>\s*<span className="text-gold-500 text-\[0\.65rem\] font-bold uppercase tracking-\[0\.25em\]">Section \d+</span>\s*</div>\s*<h2 className="text-3xl lg:text-4xl font-serif text-white font-light tracking-tight leading-snug">.*?</h2>\s*</div>\s*\{/\*\s*Right Content Column\s*\*/\}\s*<div className="w-full space-y-8">'

    new_header = f'''<div className="flex flex-col w-full">
            {'{/* Top Premium Header */}'}
            <div className="flex flex-col items-start mb-10 border-b border-white/5 pb-8">
              <div className="flex items-center space-x-4 mb-5">
                <div className="flex items-center justify-center w-8 h-8 rounded bg-gradient-to-br from-gold-500/20 to-gold-600/5 border border-gold-500/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                  <span className="text-gold-400 font-serif text-sm font-bold">{index}</span>
                </div>
                <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.3em] drop-shadow-sm">Section {index}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white font-light tracking-tight leading-tight">{title}</h2>
            </div>
            
            {'{/* Full-Width Content Column */}'}
            <div className="w-full space-y-8 max-w-5xl">'''
    
    content = re.sub(old_header, new_header, content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for i, f in enumerate(section_files, 1):
    apply_topdown_redesign(f, i)
    
print("Top-down redesign applied.")
