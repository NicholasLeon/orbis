"use client"

import { useState, KeyboardEvent } from "react";
import { Plus, SendHorizontal, Smile } from "lucide-react";

interface ChannelInputProps {
  channelName: string;
  onSendMessage: (content: string) => void;
}

export function ChannelInput({ channelName, onSendMessage }: ChannelInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (value.trim()) {
      onSendMessage(value);
      setValue("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-black/20 border-t border-[#8ffcff]/5">
      <div className="relative flex items-center group">
        <button className="absolute left-4 text-[#8ffcff]/40 hover:text-[#00f9ff] transition-colors">
          <Plus size={20} />
        </button>
        
        <input 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`MESSAGE #${channelName.toUpperCase()}`}
          className="w-full h-12 bg-white/5 border border-[#8ffcff]/10 pl-12 pr-24 text-[11px] font-medium tracking-widest text-[#8ffcff] placeholder:text-[#8ffcff]/20 focus:outline-none focus:border-[#00f9ff]/50 focus:bg-white/[0.08] transition-all rounded-none"
        />

        <div className="absolute right-4 flex items-center gap-3">
          <button className="text-[#8ffcff]/40 hover:text-[#00f9ff] transition-colors">
            <Smile size={18} />
          </button>
          <button 
            onClick={handleSend}
            className="p-1.5 bg-[#00f9ff] text-black hover:bg-[#8ffcff] transition-all shadow-[0_0_10px_rgba(0,249,255,0.2)]"
          >
            <SendHorizontal size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}