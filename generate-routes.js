const fs = require('fs');
const path = require('path');
const routes = [
  { name: 'index', title: 'The Index™', desc: 'A research-driven institutional record of legal excellence.' },
  { name: 'methodology', title: 'Methodology', desc: 'Research-driven evaluation, editorial independence, professional verification.' },
  { name: 'intelligence', title: 'Legal Intelligence', desc: 'Legal market reports, dashboards, data cards, insights.' },
  { name: 'network', title: 'Global Legal Network', desc: 'Verified global legal network, lawyer profiles, collaboration.' },
  { name: 'awards', title: 'Honours & Awards', desc: 'Juris Standard Honours, prestige, recognition, integrity.' },
  { name: 'membership', title: 'Juris Standard Black™', desc: 'Private membership, exclusive access, intelligence, forums.' },
  { name: 'insights', title: 'Insights & Editorial', desc: 'Magazine/editorial articles, thought leadership, commentary.' },
  { name: 'about', title: 'About the Institution', desc: 'Institution vision, mission, legacy, global expansion, trust.' },
  { name: 'request-access', title: 'Request Access', desc: 'Apply for membership, nominate for awards, or request intelligence access.' },
  { name: 'login', title: 'Member Login', desc: 'Secure access for Juris Standard Black™ members.' }
];

routes.forEach(route => {
  const dirPath = path.join('src', 'app', route.name);
  fs.mkdirSync(dirPath, { recursive: true });
  
  const content = `import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function ${route.name.replace(/-/g, '')}Page() {
  return (
    <main className="min-h-screen bg-background selection:bg-gold-500/30 flex flex-col">
      <Navbar />
      <div className="flex-grow pt-32 pb-24 container mx-auto px-6 max-w-7xl">
        <SectionHeader title="${route.title}" subtitle="${route.desc}" />
        <div className="h-96 border border-white/5 bg-charcoal-900/50 flex items-center justify-center">
           <span className="text-white/30 uppercase tracking-[0.2em] text-sm">Content coming soon</span>
        </div>
      </div>
      <Footer />
    </main>
  );
}
`;
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), content);
});
console.log('Routes generated successfully.');
