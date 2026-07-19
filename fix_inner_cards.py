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

def apply_fixes(filename):
    filepath = os.path.join(directory, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # 1. Fix outer wrapper if it was missed
    # Find: <div className="w-full max-w-[1400px] mx-auto group relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 md:p-16 hover:border-gold-500/30 transition-all duration-1000 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
    # Replace with the standard tight wrapper.
    content = re.sub(
        r'<div\s+className="w-full max-w-\[1400px\] mx-auto group relative bg-\[#0a0a0a\]/80 backdrop-blur-xl border border-white/10 rounded-\[2rem\] p-10 md:p-16[^"]*">\s*<div className="absolute top-0 inset-x-0 h-\[1px\] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent group-hover:via-gold-400/50 transition-all duration-1000"\s*/>\s*<div\s+className="\s*mb-16"\s*>',
        r'''<div className="w-full max-w-[1400px] mx-auto">
        <div className="bg-gradient-to-br from-[#0a0a0a] to-[#000000] border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,1)] rounded-2xl p-6 lg:p-8 xl:p-10 relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent group-hover:via-gold-400/60 transition-colors duration-500 shadow-[0_0_20px_rgba(212,175,55,0.3)]" />''',
        content,
        flags=re.DOTALL
    )

    # 2. Fix the inner grid cards
    # Old inner wrapper: className="group relative bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 flex flex-col items-start hover:border-gold-500/40 hover:-translate-y-2 transition-all duration-700 shadow-xl hover:shadow-[0_20px_50px_rgba(212,175,55,0.05)]"
    content = re.sub(
        r'bg-\[#0a0a0a\]/60 backdrop-blur-xl border border-white/10 rounded-\[2rem\] p-10 flex flex-col items-start hover:border-gold-500/40 hover:-translate-y-2 transition-all duration-700 shadow-xl hover:shadow-\[0_20px_50px_rgba\(212,175,55,0\.05\)\]',
        r'bg-[#050505] border border-white/5 rounded-2xl p-6 flex flex-col hover:border-gold-500/40 hover:-translate-y-1 transition-all duration-500 shadow-xl hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)]',
        content
    )

    # 3. Fix the internal layout of the inner grid cards (Icon + Title in one row)
    # They currently look like:
    # <CrystalIcon icon={principle.icon} className="mb-8" />
    # <h3 className="...">
    #   {principle.title}
    # </h3>
    # 
    # Or similarly for other files.
    # We will use regex to group the icon and h3 into a flex row.
    
    # Generic regex for CrystalIcon followed by h3:
    pattern = r'(<CrystalIcon[^>]*?className="[^"]*?"[^>]*?/>)\s*(<h3[^>]*?>.*?</h3>)'
    
    def replacer(match):
        icon_str = match.group(1)
        h3_str = match.group(2)
        
        # Modify icon to have w-10 h-10 and no mb-8
        icon_str = re.sub(r'className="[^"]*"', r'className="w-10 h-10 flex-shrink-0"', icon_str)
        # Or if it already has w-10 h-10, just remove mb-8
        
        return f'<div className="flex flex-row items-center space-x-4 mb-4">\n                {icon_str}\n                {h3_str}\n              </div>'
    
    content = re.sub(pattern, replacer, content, flags=re.DOTALL)
    
    # Let's also fix text size inside these inner cards to be more compact
    content = re.sub(
        r'text-2xl font-serif font-light text-white mb-4',
        r'text-xl md:text-2xl font-serif font-light text-white',
        content
    )
    
    # Clean up empty w-16 h-1px lines that were left behind in EditorialPrinciples
    content = re.sub(r'<div className="w-16 h-\[1px\] bg-gold-500/50 mx-auto" />', '', content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")

for f in section_files:
    apply_fixes(f)
    
print("Inner cards fix complete.")
