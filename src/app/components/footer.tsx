"use client"

import Link from "next/link";
import { OrbisLogo } from "./brand/logo";
import { ExternalLink } from "lucide-react";

export default function Footer() {
  const handlePlaceholderClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Navigation triggered, but route is under maintenance.");
  };

  return (
    <footer className="border-t border-white/5 bg-black py-20 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00f9ff]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16">
          
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <OrbisLogo className="size-20 transition-transform duration-700 group-hover:rotate-180" />
              <span className="text-sm font-bold tracking-[0.3em] text-white uppercase italic">Orbis</span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed tracking-wide">
              Think, chat, and build together. A minimal space designed for teams who value focus and real-time collaboration.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-24">
            <div>
              <h5 className="text-[#00f9ff] text-[10px] font-bold tracking-[0.3em] uppercase mb-6">Product</h5>
              <ul className="space-y-4 text-[11px] font-bold tracking-widest uppercase">
                <li>
                  <a href="https://github.com/NicholasLeon/orbis/blob/main/documentation.md" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#00f9ff] transition-colors">Documentation</a>
                </li>
              </ul>
            </div>

            <div>
              <div>
                <h5 className="text-[#00f9ff] text-[10px] font-bold tracking-[0.3em] uppercase mb-6">Development</h5>
                <ul className="space-y-4 text-[11px] font-bold tracking-widest uppercase">
                  <li>
                    <a 
                      href="https://github.com/NicholasLeon/orbis" 
                      target="_blank" 
                      className="text-zinc-500 hover:text-[#00f9ff] transition-colors flex items-center gap-2"
                    >
                      Architecture <ExternalLink size={10} />
                    </a>
                  </li>
                  <li>
                    <Link 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        alert("This is a portfolio project. Data is encrypted and stored for demo purposes only.");
                      }} 
                      className="text-zinc-500 hover:text-[#00f9ff] transition-colors"
                    >
                      Project Privacy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h5 className="text-[#00f9ff] text-[10px] font-bold tracking-[0.3em] uppercase mb-6">Connect</h5>
              <ul className="space-y-4 text-[11px] font-bold tracking-widest uppercase">
                <li>
                  <a href="https://github.com/NicholasLeon" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-[#00f9ff] transition-colors">GitHub</a>
                </li>
                <li>
                  <a href="https://instagram.com/ncholslh" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-[#00f9ff] transition-colors">Instagram</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-bold tracking-[0.4em] text-zinc-700 uppercase">
          <p>© {new Date().getFullYear()} ORBIS</p>
          <div className="flex gap-6">
            <p className="text-[#00f9ff] font-normal">BUILD v1.0.0</p>
            <p className="text-[#00f9ff] font-normal">Status: On Development</p>
          </div>
        </div>
      </div>
    </footer>
  );
}