import os
import re

directory = r'd:\jurisstandard\src\components\methodology'

# 1. Update MethodologyJourney.tsx
journey_path = os.path.join(directory, 'MethodologyJourney.tsx')
with open(journey_path, 'r', encoding='utf-8') as f:
    journey_content = f.read()

# Replace the layout in MethodologyJourney.tsx
journey_new_content = re.sub(
    r'<div className="flex relative max-w-\[1400px\] mx-auto w-full px-4 md:px-8">.*?</div>\s*</div>\s*</div>\s*</div>\s*{/\* Mobile Navigation Toggle',
    r'''<div className="w-full flex flex-col items-center">
        {/* Sticky Horizontal Navigation */}
        <div className="sticky top-28 z-40 w-full px-4 md:px-8 mb-10">
          <div className="max-w-[1400px] mx-auto bg-[#0a0a0a]/90 backdrop-blur-xl border border-gold-500/20 rounded-full p-2 shadow-[0_10px_40px_rgba(212,175,55,0.05)] flex items-center overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <span className="text-gold-500 text-[0.65rem] uppercase tracking-[0.2em] font-bold px-6 whitespace-nowrap hidden xl:block border-r border-gold-500/20 mr-2 shrink-0">Methodology Index</span>
            <nav className="flex space-x-1 px-2 shrink-0">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap ${
                      isActive ? 'bg-gold-500/10 border border-gold-500/20' : 'hover:bg-gold-500/5 hover:border-gold-500/10 border border-transparent'
                    }`}
                  >
                    <item.icon className={`w-3.5 h-3.5 transition-colors duration-300 ${isActive ? 'text-gold-400' : 'text-gold-100/30'}`} />
                    <span className={`text-xs transition-colors duration-300 ${isActive ? 'text-gold-100 font-medium' : 'text-gold-100/60 font-light'}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full relative z-10 pb-10 flex flex-col space-y-10">
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

      {/* Mobile Navigation Toggle''',
    journey_content,
    flags=re.DOTALL
)

with open(journey_path, 'w', encoding='utf-8') as f:
    f.write(journey_new_content)


# 2. Standardize all 8 section components
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

def standardize_section(filename, index):
    filepath = os.path.join(directory, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the title to use in the header
    title_match = re.search(r'<h2[^>]*>(.*?)</h2>', content)
    title = title_match.group(1) if title_match else filename.replace('.tsx', '')

    # Standardize width
    content = re.sub(r'max-w-[4567]xl mx-auto', 'w-full max-w-[1400px] mx-auto', content)
    
    # Standardize wrapper cards if not already a premium card
    # We want a beautiful symmetrical centered card. 
    # Let's replace the padding and wrapper if needed.
    
    # We'll just replace the ENTIRE header with our unified one.
    # In EditorialPhilosophy, it looks like: <div className="flex items-center space-x-6 mb-10 border-b border-white/5 pb-8">...</div>
    # In others, it's just: <h2 className="...">...</h2>
    
    new_header = f'''<div className="flex flex-col items-center justify-center text-center mb-12 border-b border-white/5 pb-10 w-full">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
              <span className="text-gold-400 font-serif text-xl">{index}</span>
            </div>
            <span className="text-gold-500 text-[0.65rem] font-bold uppercase tracking-[0.3em] block mb-3">Section {index}</span>
            <h2 className="text-3xl md:text-5xl font-serif text-white font-light tracking-tight">{title}</h2>
          </div>'''

    if filename == 'EditorialPhilosophy.tsx':
        content = re.sub(
            r'<div className="flex items-center space-x-6 mb-10 border-b border-white/5 pb-8">.*?</div>\s*</div>',
            new_header,
            content,
            flags=re.DOTALL
        )
    else:
        # For others, just replace the standalone <h2>
        content = re.sub(
            r'<h2[^>]*>.*?</h2>',
            new_header,
            content,
            flags=re.DOTALL,
            count=1 # Only replace the main title
        )
        
        # We also need to remove any stray `<span className="text-gold-500... ">Section X</span>` above it
        content = re.sub(r'<span[^>]*>Section\s*\d*</span>', '', content, flags=re.IGNORECASE)

    # Make the descriptions centered as well if we want total symmetry
    # Many files have <p className="... max-w-3xl mx-auto ...">
    content = re.sub(r'text-left', 'text-center', content)
    
    # Let's make sure the wrapper is a premium card.
    # `group relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 md:p-16 hover:border-gold-500/30 transition-all duration-1000 shadow-[0_20px_60px_rgba(0,0,0,0.8)]`
    if 'bg-[#0a0a0a]/80' not in content:
        # Wrap the inner content of the section
        # We look for `<div className="max-w-[1400px] mx-auto">` and replace it with the premium card container
        content = re.sub(
            r'<div className="w-full max-w-\[1400px\] mx-auto">',
            r'''<div className="w-full max-w-[1400px] mx-auto group relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 md:p-16 hover:border-gold-500/30 transition-all duration-1000 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent group-hover:via-gold-400/50 transition-all duration-1000" />''',
            content
        )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for i, f in enumerate(section_files, 1):
    standardize_section(f, i)
    
print("Redesign script created.")
