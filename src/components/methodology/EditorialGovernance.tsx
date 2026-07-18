import { motion } from "framer-motion";
import { Landmark, Scale, FileCheck, ShieldAlert, Lock, Info } from "lucide-react";
import { CrystalIcon } from "./CrystalIcon";

const governanceItems = [
  {
    title: "Editorial Governance",
    icon: Landmark,
    content: "Editorial governance ensures that all Recognition Programmes operate within a consistent editorial framework. The Editorial Office is responsible for administering submissions, coordinating workflows, maintaining profiles and supporting the ongoing integrity of the Index."
  },
  {
    title: "Editorial Standards",
    icon: Scale,
    content: "Every decision is guided by four institutional standards: Independence, Consistency, Integrity, and Transparency. The Editorial Methodology and Recognition Framework remain publicly accessible."
  },
  {
    title: "Profile Management",
    icon: FileCheck,
    content: "Recognised profiles are maintained as editorial publications. Profile holders may request factual updates where appropriate. Substantive changes may require additional editorial review."
  },
  {
    title: "Information Standards",
    icon: Info,
    content: "Applicants are responsible for ensuring that submitted information is accurate, complete and current. The Editorial Office may request additional information where necessary."
  },
  {
    title: "Editorial Corrections",
    icon: ShieldAlert,
    content: "Where factual inaccuracies are identified in a published profile, correction requests may be submitted to the Editorial Office. Verified corrections will be incorporated through normal editorial updates."
  },
  {
    title: "Confidentiality",
    icon: Lock,
    content: "Information submitted during the editorial process is handled with appropriate confidentiality and used for editorial purposes in accordance with applicable privacy standards."
  }
];

export function EditorialGovernance() {
  return (
    <section id="governance" className="py-24 px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <CrystalIcon icon={Landmark} className="mx-auto mb-6" />
          <span className="text-gold-500 text-[0.65rem] font-bold uppercase tracking-[0.3em] block mb-4">Section 6</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white font-light tracking-tight mb-6">Editorial Governance & Policies</h2>
          <p className="text-white/50 text-lg font-light max-w-3xl mx-auto mb-8 leading-relaxed">
            This section establishes the governance standards that support the Juris Standard Editorial Methodology. It explains how editorial integrity is maintained, how professional information is managed, and how recognised profiles are administered.
          </p>
          <div className="w-16 h-[1px] bg-gold-500/50 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {governanceItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#0a0a0a]/40 border border-white/5 rounded-2xl p-8 hover:bg-[#111]/60 hover:border-white/10 transition-colors duration-500"
            >
              <div className="w-10 h-10 rounded-lg bg-black border border-white/5 flex items-center justify-center mb-6">
                <item.icon className="w-4 h-4 text-gold-500/60" />
              </div>
              <h3 className="text-lg font-serif text-white mb-3">{item.title}</h3>
              <p className="text-sm font-light text-white/50 leading-relaxed">
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* The Juris Standard Editorial Charter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative bg-black/80 backdrop-blur-2xl border border-gold-500/20 rounded-[2rem] p-10 md:p-16 text-center shadow-[inset_0_0_80px_rgba(212,175,55,0.05),0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Subtle moving glow inside the charter */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />
          
          <span className="text-gold-500 text-[0.65rem] font-bold uppercase tracking-[0.3em] block mb-6">Final Editorial Charter</span>
          
          <h3 className="text-3xl md:text-4xl font-serif text-white mb-8">
            The Juris Standard Editorial Charter
          </h3>
          
          <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-4xl mx-auto mb-8">
            Juris Standard is committed to recognising professional excellence through an editorial process founded upon independence, consistency, transparency and institutional integrity. Every recognition reflects an independent editorial opinion formed through structured review, responsible research and programme-specific editorial judgement.
          </p>
          
          <p className="text-white/80 text-lg font-medium leading-relaxed max-w-3xl mx-auto">
            Our objective is to build a trusted editorial institution that serves the legal profession with professionalism, fairness and long-term credibility.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
