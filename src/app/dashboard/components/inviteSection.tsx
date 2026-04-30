// src/app/dashboard/components/invite-section.tsx
"use client"

import { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";

interface InviteSectionProps {
  inviteCode: string;
}

export function InviteSection({ inviteCode }: InviteSectionProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-4 px-2">
      <div 
        onClick={onCopy}
        className="group relative flex flex-col gap-1 p-2 border border-[#00f9ff]/10 bg-[#00f9ff]/5 hover:bg-[#00f9ff]/10 hover:border-[#00f9ff]/30 cursor-pointer transition-all duration-300 rounded-none"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Share2 size={10} className="text-[#00f9ff] opacity-50" />
            <span className="text-[9px] font-black text-[#00f9ff]/50 uppercase tracking-[0.2em]">
              Invite Member
            </span>
          </div>
          {copied ? (
            <Check size={12} className="text-emerald-400 animate-in zoom-in" />
          ) : (
            <Copy size={12} className="text-[#8ffcff]/20 group-hover:text-[#00f9ff] transition-colors" />
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-[#8ffcff] tracking-[0.15em]">
            {inviteCode}
          </span>
          <span className="text-[8px] text-[#00f9ff]/30 font-bold uppercase italic opacity-0 group-hover:opacity-100 transition-opacity">
            Copy Code
          </span>
        </div>

        <div className="absolute top-0 right-0 size-1 border-t border-r border-[#00f9ff]/40" />
      </div>
    </div>
  );
}