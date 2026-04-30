"use client";
import { motion } from "framer-motion";
import { MessageSquare, Hash, Zap, ShieldCheck, Box, Puzzle } from "lucide-react";

const features = [
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: "Real-time Messaging",
    desc: "Engineered for sub-100ms latency, ensuring your team stays in sync without delays."
  },
  {
    icon: <Hash className="w-5 h-5" />,
    title: "Project Channels",
    desc: "Hierarchical workspaces designed to organize complex enterprise communication."
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Interaction Flow",
    desc: "Intuitive UX patterns that reduce cognitive load and increase team velocity."
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Approval Engine",
    desc: "Unified system for leave requests, internal permissions, and formal documentation."
  },
  {
    icon: <Box className="w-5 h-5" />,
    title: "Custom Utilities",
    desc: "Modular internal tools tailored specifically to your company's operational needs."
  },
  {
    icon: <Puzzle className="w-5 h-5" />,
    title: "Ecosystem Connect",
    desc: "Extensive API support to integrate Orbis with your existing software stack."
  }
];

export default function Features() {
  return (
    <section id="feat" className="py-40 bg-black border-t border-[#8ffcff]/5">
      <div className="max-w-7xl mx-auto px-10">
        <div className="mb-24 space-y-4">
          <h2 className="text-[#00f9ff] text-[10px] font-bold tracking-[0.5em] uppercase">Architecture</h2>
          <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
            Core capabilities for <br /> high-stakes teams.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#8ffcff]/10 border border-[#8ffcff]/10">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-12 bg-black hover:bg-[#00f9ff]/[0.02] transition-colors duration-700 group"
            >
              <div className="w-10 h-10 border border-[#00f9ff]/30 flex items-center justify-center mb-8 text-[#00f9ff] group-hover:border-[#00f9ff] transition-colors duration-500">
                {f.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-4 tracking-tight">{f.title}</h4>
              <p className="text-[#8ffcff]/40 leading-relaxed text-sm font-light">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}