"use client"

import { useState } from "react";
import { Copy, Check, Share2, ChevronRight } from "lucide-react";

interface InviteSectionProps {
  inviteCode: string;
}

export function InviteSection({ inviteCode }: InviteSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const onCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-4 px-2">
      <div className="group flex flex-col gap-1">
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-900/50 cursor-pointer transition-all"
        >
          <div className="flex items-center gap-2">
            <ChevronRight 
              size={14} 
              className={`text-zinc-500 transition-transform duration-200 ${isOpen ? "rotate-90 text-blue-400" : ""}`} 
            />
            <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${isOpen ? "text-zinc-200" : "text-zinc-500"}`}>
              Invite Member
            </span>
          </div>
          <button
            onClick={onCopy}
            className={`p-1.5 rounded-md transition-all ${
              copied 
                ? "bg-emerald-500/10 text-emerald-400" 
                : "text-zinc-500 hover:bg-blue-500/10 hover:text-blue-400 opacity-0 group-hover:opacity-100"
            } ${isOpen ? "opacity-100" : ""}`}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
          </button>
        </div>

        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-16 opacity-100 mb-2" : "max-h-0 opacity-0"}`}>
          <div className="mx-2 p-3 rounded-xl bg-blue-500/[0.03] border border-blue-500/10 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-mono font-bold text-blue-300 tracking-[0.2em]">
                {inviteCode}
              </span>
              <span className="text-[8px] text-zinc-600 font-bold uppercase mt-0.5">
                Workspace Access Key
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}