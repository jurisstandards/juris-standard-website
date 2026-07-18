import { motion } from "framer-motion";
import { Building2, Mail, Users, Headphones, Briefcase, ChevronRight } from "lucide-react";
import Link from "next/link";
import { CrystalIcon } from "./CrystalIcon";

const contacts = [
  { title: "Editorial Enquiries", icon: Mail, email: "editorial@jurisstandard.com" },
  { title: "Profile Support", icon: Users, email: "support@jurisstandard.com" },
  { title: "Technical Support", icon: Headphones, email: "tech@jurisstandard.com" },
  { title: "Business Enquiries", icon: Briefcase, email: "partnerships@jurisstandard.com" }
];

export function EditorialOffice() {
  return (
    <section id="office" className="py-24 px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <CrystalIcon icon={Building2} className="mx-auto mb-6" />
          <span className="text-gold-500 text-[0.65rem] font-bold uppercase tracking-[0.3em] block mb-4">Section 8</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white font-light tracking-tight mb-6">Editorial Office</h2>
          <p className="text-white/50 text-lg font-light max-w-3xl mx-auto mb-8 leading-relaxed">
            The Editorial Office manages the administration of the Juris Standard Editorial Process. It does not provide legal advice.
          </p>
          <div className="w-16 h-[1px] bg-gold-500/50 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {contacts.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-[#0a0a0a]/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-gold-500/40 hover:-translate-y-2 transition-all duration-700 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-black border border-white/5 flex items-center justify-center mx-auto mb-6 group-hover:border-gold-500/30 transition-colors duration-500">
                <contact.icon className="w-5 h-5 text-white/40 group-hover:text-gold-400 transition-colors duration-500" />
              </div>
              <h3 className="font-serif text-white mb-2">{contact.title}</h3>
              <a href={`mailto:${contact.email}`} className="text-xs text-white/50 hover:text-gold-300 transition-colors truncate block">
                {contact.email}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Final CTA Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative bg-gradient-to-br from-[#111] to-black border border-gold-500/20 rounded-[3rem] p-12 md:p-20 text-center shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.05)_0%,transparent_60%)] pointer-events-none" />
          
          <h2 className="text-4xl md:text-6xl font-serif text-white font-light tracking-tight mb-8">
            Begin Your Editorial Journey
          </h2>
          
          <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12">
            If your professional work or institution reflects the standards described within the Juris Standard Editorial Methodology, you may begin your Editorial Submission.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/enter-the-index"
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-gold-600 to-gold-400 text-black text-[0.65rem] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500 w-full sm:w-auto"
            >
              Enter the Index
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => {
                document.getElementById('programmes')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-10 py-5 bg-transparent border border-white/20 text-white text-[0.65rem] md:text-xs font-semibold uppercase tracking-[0.2em] rounded-full hover:bg-white/5 hover:border-gold-500/50 transition-all duration-500 w-full sm:w-auto"
            >
              Explore Recognition Programmes
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
