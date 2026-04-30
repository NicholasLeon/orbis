"use client"

import { useActionState } from "react";
import { registerAction } from "@/lib/authAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { OrbisLogo } from "@/app/components/brand/logo";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, null);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black px-4 font-sans selection:bg-[#00f9ff] selection:text-black">
      <div className="w-full max-w-[380px] space-y-10">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <OrbisLogo className="size-15" />
          <div className="space-y-1 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tighter text-white uppercase">Initialize</h1>
            <p className="text-sm text-[#8ffcff]/40 font-light">Create a new identity in Orbis OS.</p>
          </div>
        </div>

        <form action={formAction} className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#00f9ff] uppercase tracking-[0.2em]">Full Name</label>
              <Input 
                name="name" 
                placeholder="Your Name" 
                className="h-12 border-[#8ffcff]/10 bg-black text-white rounded-none focus-visible:ring-0 focus-visible:border-[#00f9ff] transition-all placeholder:text-[#8ffcff]/20"
                required 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#00f9ff] uppercase tracking-[0.2em]">Email Address</label>
              <Input 
                name="email" 
                type="email" 
                placeholder="Email" 
                className="h-12 border-[#8ffcff]/10 bg-black text-white rounded-none focus-visible:ring-0 focus-visible:border-[#00f9ff] transition-all placeholder:text-[#8ffcff]/20"
                required 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#00f9ff] uppercase tracking-[0.2em]">Password</label>
              <Input 
                name="password" 
                type="password" 
                className="h-12 border-[#8ffcff]/10 bg-black text-white rounded-none focus-visible:ring-0 focus-visible:border-[#00f9ff] transition-all"
                required 
              />
            </div>
          </div>

          {state?.error && (
            <div className="text-[11px] font-bold text-red-500 bg-red-500/5 border-l-2 border-red-500 p-4 uppercase tracking-wider">
              Error: {state.error}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full h-12 bg-[#00f9ff] hover:bg-white text-black font-black rounded-none transition-all duration-500 shadow-[0_0_20px_rgba(0,249,255,0.1)]"
          >
            {isPending ? "PROCESSING..." : "SIGN UP"}
          </Button>
        </form>

        <p className="text-center md:text-left text-[11px] font-medium text-[#8ffcff]/30 uppercase tracking-[0.1em]">
          Already registered?{" "}
          <Link href="/login" className="text-[#00f9ff] hover:text-white transition-colors">
            Login Phase
          </Link>
        </p>
      </div>
    </div>
  );
}