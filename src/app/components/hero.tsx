"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Background } from "./brand/background"; 

export default function Hero() {
  const router = useRouter();

  const scrollToFeatures = () => {
    const el = document.getElementById("feat");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 overflow-hidden">
      
      <div className="absolute inset-1 z-0">
        <Background />
      </div>

      <div className="relative z-10 flex flex-col items-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-16"
        >
          <h1 className="text-8xl md:text-[12rem] font-bold tracking-[-0.05em] text-white leading-none">
            ORBIS
          </h1>
          
          <div className="relative w-24 md:w-40 h-px bg-[#00f9ff]/30 mt-4">
             <motion.div 
               animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-0 w-8 h-full bg-[#00f9ff] shadow-[0_0_10px_#00f9ff]"
             />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-md text-[#8ffcff]/50 text-sm md:text-base mb-16 leading-relaxed font-light uppercase tracking-[0.2em] text-center"
        >
          Universal synchronization layer for enterprise teams.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-8"
        >
          <Button
            size="lg"
            onClick={() => router.push("/register")}
            className="h-12 px-12 bg-transparent border border-[#00f9ff] text-[#00f9ff] hover:bg-[#00f9ff] hover:text-black font-bold rounded-none transition-all duration-500 shadow-[0_0_20px_rgba(0,249,255,0.1)] uppercase tracking-widest text-[10px]"
          >
            Initialize
          </Button>

          <Button
            size="lg"
            variant="ghost"
            onClick={scrollToFeatures}
            className="h-12 px-12 text-[#8ffcff]/40 hover:text-white transition-all uppercase tracking-widest text-[10px]"
          >
            Core Specs
          </Button>
        </motion.div>
      </div>
    </section>
  );
}