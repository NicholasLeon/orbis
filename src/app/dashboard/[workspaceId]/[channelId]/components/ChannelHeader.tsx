"use client"

import { Hash } from "lucide-react";

export function ChannelHeader({ name }: { name: string }) {
  return (
    <header className="flex h-14 items-center justify-between px-6 border-b border-[#8ffcff]/10 bg-black/40 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center size-6 border border-[#00f9ff]/30 bg-[#00f9ff]/5">
          <Hash size={14} className="text-[#00f9ff]" />
        </div>
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#00f9ff] drop-shadow-[0_0_8px_rgba(0,249,255,0.3)]">
          {name}
        </h2>
      </div>
    </header>
  );
}