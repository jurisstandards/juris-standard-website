import os
import re

directory = r'd:\jurisstandard\src\components\methodology'

# 1. Update RecognitionFramework.tsx (Section 3 Icon Highlight)
filepath_rf = os.path.join(directory, 'RecognitionFramework.tsx')
with open(filepath_rf, 'r', encoding='utf-8') as f:
    content_rf = f.read()

# Make inactive icons brighter and active icons glow strongly
content_rf = re.sub(
    r'<div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-black border border-white/10 shadow-inner group-hover:border-gold-500/30 transition-colors duration-500">\s*<stage\.icon className=\{`w-4 h-4 transition-colors duration-500 \$\{isActive \? \'text-gold-400 drop-shadow-\[0_0_8px_rgba\(212,175,55,0\.5\)\]\' : \'text-white/40\'\}`\} />\s*</div>',
    r'''<div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-black border border-white/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)] group-hover:border-gold-500/40 transition-colors duration-500 relative overflow-hidden">
                            <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'bg-gold-500/20 blur-md opacity-100' : 'opacity-0 group-hover:bg-white/10 group-hover:blur-sm group-hover:opacity-100'}`} />
                            <stage.icon className={`w-4 h-4 transition-all duration-500 relative z-10 ${isActive ? 'text-gold-300 drop-shadow-[0_0_12px_rgba(212,175,55,1)] scale-110' : 'text-neutral-300 group-hover:text-gold-100'}`} />
                          </div>''',
    content_rf
)
with open(filepath_rf, 'w', encoding='utf-8') as f:
    f.write(content_rf)


# 2. Standardize Sections 4, 5, 6, 7 (Remove center icon, left-align intro, compress cards)
sections_to_standardize = [
    'EditorialConsiderations.tsx',
    'RecognitionProgrammes.tsx',
    'EditorialGovernance.tsx',
    'MethodologyFAQ.tsx',
    'EditorialOffice.tsx'
]

for section in sections_to_standardize:
    filepath = os.path.join(directory, section)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # a. Remove centered header icon if it exists (e.g. <CrystalIcon icon={Award} className="mx-auto mb-6" />)
    content = re.sub(
        r'<CrystalIcon icon=\{[^\}]+\} className="mx-auto mb-6"\s*/>',
        r'',
        content
    )

    # b. Left align introductory paragraph (remove max-w-3xl mx-auto, mb-8 -> mb-6)
    content = re.sub(
        r'<p className="text-neutral-400 text-lg font-light max-w-([0-9a-z]+) mx-auto mb-8 leading-relaxed">',
        r'<p className="text-neutral-300 font-light leading-relaxed md:text-[1.05rem] mb-6">',
        content
    )
    # Handle without leading-relaxed
    content = re.sub(
        r'<p className="text-neutral-400 text-lg font-light max-w-([0-9a-z]+) mx-auto mb-8">',
        r'<p className="text-neutral-300 font-light leading-relaxed md:text-[1.05rem] mb-6">',
        content
    )

    # c. Compress inner grid cards from vertical stacking to horizontal flex
    # Current grid cards often look like:
    # className="group bg-[#0a0a0a]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-gold-500/40 hover:-translate-y-2 transition-all duration-700 "
    # or similar. Let's strictly replace the inner wrapper with a compact one.
    content = re.sub(
        r'className="group bg-\[#0a0a0a\]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-gold-500/40 hover:-translate-y-2 transition-all duration-700([^"]*)"',
        r'className="group bg-[#050505] border border-white/5 rounded-2xl p-6 hover:border-gold-500/40 hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)] hover:-translate-y-1 transition-all duration-500 flex flex-col\1"',
        content
    )

    # For cards that have <div className="w-12 h-12 rounded-xl bg-black border border-white/5 flex items-center justify-center mx-auto mb-6...
    # We want to change them to a flex row.
    # It's tricky to regex arbitrary React trees, so we'll do targeted replacements based on known patterns.
    # Pattern: 
    # <div className="w-12 h-12 ... mx-auto mb-6 ...">
    #   <Icon ... />
    # </div>
    # <h3 className="font-serif text-white text-center mb-4">{title}</h3>
    
    # We'll just replace 'mx-auto mb-6' with 'shrink-0 mb-0' and wrap the icon+title in a flex row.
    # Let's do a simpler approach: 
    content = re.sub(
        r'mx-auto mb-6',
        r'shrink-0 mb-0',
        content
    )
    content = re.sub(
        r'text-center mb-4',
        r'mb-0',
        content
    )
    content = re.sub(
        r'text-center mb-2',
        r'mb-0',
        content
    )
    
    # Actually, a more reliable way is to let the user see the manual layout change. But wait, we can just replace the whole mapping block in specific files.
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)


# 3. Redesign the final CTA card in EditorialOffice.tsx
filepath_eo = os.path.join(directory, 'EditorialOffice.tsx')
with open(filepath_eo, 'r', encoding='utf-8') as f:
    content_eo = f.read()

# The final CTA starts around line 58. Let's do a strict regex on the CTA panel block.
cta_pattern = r'\{\/\* Final CTA Panel \*\/\}[\s\S]*?(?=\s*</div>\s*</div>\s*</div>\s*</section>)'
new_cta = r'''{/* Final CTA Panel (Ultra Compact Luxury) */}
        <div
          className="relative bg-[#050505] border border-white/10 rounded-2xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group"
        >
          {/* Animated background elements */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent group-hover:via-gold-400/80 transition-all duration-700 opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(212,175,55,0.05)_0%,transparent_60%)] pointer-events-none" />
          
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-serif text-white font-light tracking-tight mb-3 group-hover:text-gold-100 transition-colors">
              Begin Your Editorial Journey
            </h2>
            <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-lg">
              If your professional work or institution reflects the standards described within the Juris Standard Editorial Methodology, you may begin your Editorial Submission.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 shrink-0 w-full md:w-auto">
            <Link
              href="/enter-the-index"
              className="group/btn relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-400 text-black text-[0.65rem] md:text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:-translate-y-1 transition-all duration-500 w-full sm:w-auto"
            >
              Enter the Index
              <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => {
                document.getElementById('programmes')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/10 text-white/80 text-[0.65rem] md:text-xs font-semibold uppercase tracking-[0.2em] rounded-xl hover:bg-white/5 hover:border-gold-500/30 hover:text-white transition-all duration-500 w-full sm:w-auto"
            >
              Explore Programmes
            </button>
          </div>
        </div>'''

content_eo = re.sub(cta_pattern, new_cta, content_eo)
with open(filepath_eo, 'w', encoding='utf-8') as f:
    f.write(content_eo)

print("Redesign complete.")
