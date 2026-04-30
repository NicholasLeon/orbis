import { OrbisLogo } from "./brand/logo";

export default function Footer() {
  return (
    <footer className="border-t border-[#8ffcff]/10 bg-black py-20">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-6">
              <OrbisLogo className="size-18.5" />
              <span className="text-xl font-bold tracking-[0.2em] text-white uppercase">Orbis</span>
            </div>
            <p className="text-[#8ffcff]/40 text-sm leading-relaxed italic">
              Redefining enterprise synchronicity through minimal design and high-performance engineering.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-20">
            <div>
              <h5 className="text-[#00f9ff] text-[10px] font-bold tracking-[0.3em] uppercase mb-6">Platform</h5>
              <ul className="space-y-4 text-sm text-[#8ffcff]/60">
                <li className="hover:text-[#00f9ff] cursor-pointer transition-colors">Documentation</li>
                <li className="hover:text-[#00f9ff] cursor-pointer transition-colors">Security</li>
                <li className="hover:text-[#00f9ff] cursor-pointer transition-colors">Infrastructure</li>
              </ul>
            </div>
            <div>
              <h5 className="text-[#00f9ff] text-[10px] font-bold tracking-[0.3em] uppercase mb-6">Social</h5>
              <ul className="space-y-4 text-sm text-[#8ffcff]/60">
                <li className="hover:text-[#00f9ff] cursor-pointer transition-colors">GitHub</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-[#8ffcff]/5 flex justify-between items-center text-[9px] font-bold tracking-[0.4em] text-[#8ffcff]/20 uppercase">
          <p>© 2026 ORBIS PROTOCOL SYSTEM</p>
          <p>BUILD v1.0.0</p>
        </div>
      </div>
    </footer>
  );
}