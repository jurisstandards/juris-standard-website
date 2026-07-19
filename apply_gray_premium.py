import os
import re

directory = r'd:\jurisstandard\src\components\methodology'
section_files = [
    'EditorialPhilosophy.tsx',
    'EditorialPrinciples.tsx',
    'EditorialConsiderations.tsx',
    'RecognitionProgrammes.tsx',
    'EditorialGovernance.tsx',
    'MethodologyFAQ.tsx',
    'EditorialOffice.tsx'
]

def apply_premium_bg(filename):
    filepath = os.path.join(directory, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the current wrapper which is:
    # <div className="bg-gradient-to-br from-[#0a0a0a] to-[#000000] border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,1)] rounded-2xl p-6 lg:p-8 xl:p-10 relative overflow-hidden group">
    
    # Or in some files (if missed):
    # <div className="bg-[#050505] border border-white/10 rounded-xl p-8 lg:p-12 shadow-2xl relative overflow-hidden group">
    
    # We replace it with the new premium gray glassmorphism wrapper
    new_wrapper_cls = 'bg-[#111111]/90 backdrop-blur-3xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.03)] rounded-2xl p-6 lg:p-8 xl:p-10 relative overflow-hidden group'
    
    content = re.sub(
        r'bg-gradient-to-br from-\[#0a0a0a\] to-\[#000000\] border border-white/5 shadow-\[0_10px_40px_rgba\(0,0,0,1\)\] rounded-2xl p-6 lg:p-8 xl:p-10 relative overflow-hidden group',
        new_wrapper_cls,
        content
    )
    
    # Just in case it has the old old wrapper
    content = re.sub(
        r'bg-\[#050505\] border border-white/10 rounded-xl p-8 lg:p-12 shadow-2xl relative overflow-hidden group',
        new_wrapper_cls,
        content
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for f in section_files:
    apply_premium_bg(f)
    
print("Premium gray background applied to all cards.")
