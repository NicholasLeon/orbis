"use client"

import { User2Icon, ExternalLink } from "lucide-react";

export function PortfolioBadge() {
  return (
    <div className="fixed bottom-6 right-6 z-[60] group pointer-events-auto">
      <a 
        href="https://github.com/NicholasLeon/orbis" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl transition-all duration-500 hover:border-[#00f9ff]/40 hover:bg-[#00f9ff]/5 group"
      >
        <div className="flex flex-col items-end leading-none">
          <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest group-hover:text-[#00f9ff]/70 transition-colors mb-1">
            Portfolio Project
          </span>
          <span className="text-[10px] font-bold text-zinc-200">
            By Nicholas Leonard
          </span>
        </div>
        
        <div className="size-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 group-hover:border-[#00f9ff]/50 transition-all duration-500">
          <User2Icon size={14} className="text-zinc-400 group-hover:text-[#00f9ff]" />
        </div>
      </a>
    </div>
  );
}