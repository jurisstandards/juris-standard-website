import { motion } from "framer-motion";
import { Scale, Award, Shield, BookOpen } from "lucide-react";
import { CrystalIcon } from "./CrystalIcon";

const principles = [
  {
    title: "Independence",
    icon: Scale,
    content: "Editorial decisions are made independently and remain free from commercial influence, advertising relationships, sponsorships or external pressure. Every submission is assessed according to the same published editorial framework."
  },
  {
    title: "Merit",
    icon: Award,
    content: "Recognition reflects demonstrated professional achievement, legal expertise, leadership, innovation and meaningful contribution to the legal profession. No single factor determines recognition."
  },
  {
    title: "Integrity",
    icon: Shield,
    content: "Every editorial decision is approached with consistency, fairness and institutional responsibility. Information is reviewed objectively using established editorial standards."
  },
  {
    title: "Transparency",
    icon: BookOpen,
    content: "Juris Standard publishes its editorial principles, methodology and recognition framework to encourage transparency and confidence in its editorial process."
  }
];

export function EditorialPrinciples() {
  return (
    <section id="principles" className="py-24 px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 text-[0.65rem] font-bold uppercase tracking-[0.3em] block mb-4">Section 2</span>
          <h2 className="text-3xl md:text-5xl font-serif text-white font-light tracking-tight mb-6">Editorial Principles</h2>
          <div className="w-16 h-[1px] bg-gold-500/50 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {principles.map((principle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="group relative bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 flex flex-col items-start hover:border-gold-500/40 hover:-translate-y-2 transition-all duration-700 shadow-xl hover:shadow-[0_20px_50px_rgba(212,175,55,0.05)]"
            >
              {/* Top accent line */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/0 to-transparent group-hover:via-gold-400/50 transition-all duration-700" />
              
              <CrystalIcon icon={principle.icon} className="mb-8" />
              
              <h3 className="text-2xl font-serif font-light text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gold-200 transition-all duration-500 drop-shadow-sm">
                {principle.title}
              </h3>
              
              <p className="text-white/50 text-sm md:text-base font-light leading-relaxed group-hover:text-white/70 transition-colors duration-700">
                {principle.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
