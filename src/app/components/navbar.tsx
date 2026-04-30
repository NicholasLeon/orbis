import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OrbisLogo } from "./brand/logo";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none">
      <div className="w-full max-w-7xl h-14 md:h-16 flex items-center justify-between px-6 md:px-10 border border-white/5 bg-black/40 backdrop-blur-xl rounded-full pointer-events-auto transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">

        <div className="flex items-center gap-3 group">
          <Link href="/" className="flex items-center gap-2">
            <div className="transition-transform duration-500 group-hover:rotate-[360deg]">
              <OrbisLogo className="size-6 md:size-20" />
            </div>
            <span className="text-[11px] md:text-sm font-bold uppercase tracking-[0.4em] text-white italic">
              Orbis
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <Link 
            href="/login" 
            className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-[#00f9ff] transition-colors duration-300"
          >
            Sign In
          </Link>
          
          <Link href="/register">
            <Button className="relative group bg-[#00f9ff] hover:bg-[#00f9ff]/90 text-black font-black text-[10px] md:text-xs uppercase tracking-widest h-8 md:h-10 px-5 md:px-8 rounded-full transition-all duration-500 overflow-hidden shadow-[0_0_20px_rgba(0,249,255,0.3)]">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative">Get Started</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}