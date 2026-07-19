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

def apply_card_redesign(filename, index):
    filepath = os.path.join(directory, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the title
    title_match = re.search(r'<h2[^>]*>(.*?)</h2>', content)
    title = title_match.group(1) if title_match else filename.replace('.tsx', '')
    
    # 1. Replace the old wrapper with the new crisp solid black wrapper
    # It looks like:
    # <div className="w-full max-w-[1400px] mx-auto">
    #   <div
    #     className="group relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 md:p-16 hover:border-gold-500/30 transition-all duration-1000 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
    #   >
    #     <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent group-hover:via-gold-400/50 transition-all duration-1000" />
    
    old_wrapper_pattern = r'<div className="w-full max-w-\[1400px\] mx-auto[^>]*>\s*<div[^>]*group relative bg-\[#0a0a0a\]/80 backdrop-blur-xl[^>]*>\s*<div className="absolute top-0[^>]*/>'
    new_wrapper = r'''<div className="w-full max-w-[1400px] mx-auto">
        <div className="bg-[#050505] border border-white/10 rounded-xl p-8 lg:p-12 shadow-2xl relative overflow-hidden group">
          {/* Subtle top glow */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent group-hover:via-gold-500/40 transition-colors duration-500" />'''
    content = re.sub(old_wrapper_pattern, new_wrapper, content, flags=re.DOTALL)
    
    # 2. Replace the centered header with a left-aligned, grid layout container for the content
    old_header = r'<div className="flex flex-col items-center justify-center text-center mb-12 border-b border-white/5 pb-10 w-full">\s*<div className="flex items-center justify-center w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">\s*<span className="text-gold-400 font-serif text-xl">\d+</span>\s*</div>\s*(?:<span[^>]*>.*?</span>\s*)?<h2 className="text-3xl md:text-5xl font-serif text-white font-light tracking-tight">.*?</h2>\s*</div>'
    
    new_header = f'''<div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-8 lg:gap-12 items-start">
            {'{/* Left Header Column */}'}
            <div className="flex flex-col items-start lg:sticky lg:top-[160px]">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-6 h-6 rounded bg-gold-500/20 border border-gold-500/30">
                  <span className="text-gold-400 font-serif text-xs font-bold">{index}</span>
                </div>
                <span className="text-gold-500 text-[0.65rem] font-bold uppercase tracking-[0.25em]">Section {index}</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-serif text-white font-light tracking-tight leading-snug">{title}</h2>
            </div>
            
            {'{/* Right Content Column */}'}
            <div className="w-full space-y-8">'''
    
    content = re.sub(old_header, new_header, content, flags=re.DOTALL)
    
    # Close the grid layout properly at the end of the card wrapper.
    # The card wrapper ends with `</div>\s*</div>\s*</section>`
    content = re.sub(r'</div>\s*</div>\s*</section>', '</div>\n          </div>\n        </div>\n      </div>\n    </section>', content)

    # 3. Text Alignment & Typography fixes inside the content
    content = re.sub(r'text-center', '', content)
    content = re.sub(r'text-white/60', 'text-neutral-300', content)
    content = re.sub(r'text-white/50', 'text-neutral-400', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for i, f in enumerate(section_files, 1):
    apply_card_redesign(f, i)
    
print("Redesign applied.")
