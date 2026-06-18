import Link from "next/link";

const footerLinks = {
  "The Index™": [
    { name: "Corporate Elite", href: "/juris-index" },
    { name: "Litigation Masters", href: "/juris-index" },
    { name: "Arbitration Leaders", href: "/juris-index" },
    { name: "Law Firm Rankings", href: "/juris-index" },
    { name: "GC Power List", href: "/juris-index" },
    { name: "Global Influencers", href: "/juris-index" },
  ],
  Intelligence: [
    { name: "Market Reports", href: "/intelligence" },
    { name: "Trends & Analysis", href: "/intelligence" },
    { name: "Deal Intelligence", href: "/intelligence" },
    { name: "Practice Insights", href: "/intelligence" },
    { name: "Jurisdiction Reports", href: "/intelligence" },
  ],
  Network: [
    { name: "Find Lawyers", href: "/network" },
    { name: "Find Firms", href: "/network" },
    { name: "Find GCs", href: "/network" },
    { name: "Connect", href: "/network" },
    { name: "Membership", href: "/membership" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Methodology", href: "/methodology" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "/request-access" },
    { name: "Media", href: "#" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Use", href: "#" },
    { name: "Ethics Policy", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12">
      <div className="w-full px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="flex flex-col items-start group mb-6">
              <span className="font-serif text-2xl tracking-widest text-gold-400 leading-none">
                JURIS
              </span>
              <span className="font-serif text-[0.65rem] tracking-[0.3em] text-white/70 uppercase leading-tight mt-1">
                Standard
              </span>
            </Link>
            <p className="text-white/40 text-xs leading-relaxed max-w-xs">
              Defining Excellence<br />in the Legal Profession.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white tracking-[0.1em] text-xs uppercase mb-6 font-semibold">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-gold-400 transition-colors text-xs"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-white/30 text-[0.65rem] uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Juris Standard. All rights reserved.</p>
          <p className="mt-4 md:mt-0 tracking-[0.2em]">Built for the Legal Elite.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gold-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-gold-400 transition-colors">X</a>
            <a href="#" className="hover:text-gold-400 transition-colors">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
