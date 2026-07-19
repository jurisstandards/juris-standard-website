import os
import re

directory = r'd:\jurisstandard\src\components\methodology'

# Regex patterns to remove animation props (handling multiline props safely by matching balanced braces if possible, 
# or just non-greedy match till closing brace. Since framer motion props often have nested braces like {{ opacity: 0 }},
# we should use a custom logic or simple regex for typical cases.)
# To safely remove {{...}} we can match `prop={{.*?}}` assuming no deep nesting, or just use a simple replacer.
props_to_remove = [
    r'initial=\{\{.*?\}\}',
    r'animate=\{\{.*?\}\}',
    r'whileInView=\{\{.*?\}\}',
    r'viewport=\{\{.*?\}\}',
    r'transition=\{\{.*?\}\}',
    r'exit=\{\{.*?\}\}',
    r'variants=\{\{.*?\}\}',
    
    # Also handle single braces if any
    r'initial=\{.*?\}',
    r'animate=\{.*?\}',
    r'whileInView=\{.*?\}',
    r'viewport=\{.*?\}',
    r'transition=\{.*?\}',
    r'exit=\{.*?\}',
    r'variants=\{.*?\}',
    
    # And string props
    r'initial="[^"]+"',
    r'animate="[^"]+"',
    r'exit="[^"]+"',
]

tags = ['div', 'h1', 'h2', 'h3', 'h4', 'p', 'span', 'section', 'button', 'ul', 'li', 'a']

for filename in os.listdir(directory):
    if not filename.endswith('.tsx'):
        continue
    filepath = os.path.join(directory, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # 1. Remove Framer Motion imports
    content = re.sub(r'import\s+\{.*motion.*\}\s+from\s+[\'"]framer-motion[\'"];?\n?', '', content)
    content = re.sub(r'import\s+motion\s+from\s+[\'"]framer-motion[\'"];?\n?', '', content)
    
    # Remove AnimatePresence wrapper
    content = re.sub(r'<AnimatePresence[^>]*>', '', content)
    content = re.sub(r'</AnimatePresence>', '', content)

    # 2. Rename motion tags
    for tag in tags:
        content = content.replace(f'<motion.{tag}', f'<{tag}')
        content = content.replace(f'</motion.{tag}>', f'</{tag}>')

    # 3. Remove animation props
    for prop in props_to_remove:
        content = re.sub(prop + r'\s*', '', content, flags=re.DOTALL)
        
    # 4. Adjust spacing
    content = re.sub(r'py-32', 'py-10', content)
    content = re.sub(r'py-24', 'py-10', content)
    content = re.sub(r'py-20', 'py-10', content)
    content = re.sub(r'py-16', 'py-10', content)
    
    content = re.sub(r'pt-32', 'pt-10', content)
    content = re.sub(r'pb-32', 'pb-10', content)
    content = re.sub(r'pt-24', 'pt-10', content)
    content = re.sub(r'pb-24', 'pb-10', content)
    
    # Fix the wrapper gap in MethodologyJourney
    if filename == 'MethodologyJourney.tsx':
        content = content.replace('gap-32', 'gap-10')
        content = content.replace('space-y-32', 'space-y-10')
        content = content.replace('space-y-24', 'space-y-10')
        content = content.replace('pt-32', 'pt-10')
        # Also MethodologyJourney's sticky desktop navigation sidebar
        # Let's make it look more optimized / premium.
        content = content.replace('border border-white/10 rounded-2xl p-6 shadow-2xl', 'border border-gold-500/20 rounded-2xl p-8 shadow-[0_0_40px_rgba(212,175,55,0.05)] bg-[#050505]/90')
        content = content.replace('text-white/40 text-[0.65rem] uppercase tracking-widest font-semibold', 'text-gold-500 text-[0.65rem] uppercase tracking-[0.3em] font-bold')
        content = content.replace('bg-white/5', 'bg-gold-500/10 border border-gold-500/20')
        content = content.replace('hover:bg-white/5', 'hover:bg-gold-500/5 hover:border-gold-500/10 border border-transparent')
        content = content.replace('text-white', 'text-gold-100')
        content = content.replace('text-white/60', 'text-neutral-400')
        # Remove active indicator layoutId
        content = re.sub(r'<div[^>]*layoutId="activeSection"[^>]*>.*?</div>', '', content, flags=re.DOTALL)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {filename}')

print('Done.')
