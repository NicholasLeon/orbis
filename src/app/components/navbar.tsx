import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OrbisLogo }  from "./brand/logo";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex h-16 items-center justify-between px-10 border-b border-[#8ffcff]/10 bg-black/60 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <OrbisLogo className="w-28 h-28 md:w-18 md:h-18"/>
      </div>
      <div className="flex gap-6 items-center">
        <Link href="/login" className="text-sm font-medium text-[#8ffcff]/70 hover:text-[#00f9ff] transition-colors">
          Sign In
        </Link>
        <Link href="/register">
          <Button className="bg-[#00f9ff] hover:bg-[#8ffcff] text-black font-bold h-9 px-6 rounded-none transition-all duration-300 shadow-[0_0_15px_rgba(0,249,255,0.2)]">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
}