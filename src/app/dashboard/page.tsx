import { getAuthSession } from "@/lib/authSession";
import { getWorkspacesByUserId } from "@/services/workspaceServices";
import { redirect } from "next/navigation";
import { ShieldCheck, Activity } from "lucide-react";
import { JoinWorkspaceForm } from "./components/JoinForm";
import { CreateWorkspaceTrigger } from "./components/createPage/WorkspaceTrigger";
import { markAsRead } from "@/lib/notification";

export default async function DashboardPage() {
  const session = await getAuthSession(); 
  if (!session || !session) {
    redirect("/login");
  }
  const workspaces = await getWorkspacesByUserId(session.userId);

  if (workspaces.length > 0) {
    const active = workspaces[0];
    return (
      <div className="flex flex-col h-full bg-black items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00f9ff]/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#00f9ff]/5 blur-[100px] rounded-full -z-10" />
        
        <div className="space-y-8 text-center animate-in fade-in zoom-in duration-700">
          <div className="relative inline-flex">
            <div className="absolute inset-0 bg-[#00f9ff]/20 blur-xl rounded-full animate-pulse" />
            <div className="relative size-20 border border-[#00f9ff]/30 bg-black flex items-center justify-center">
              <ShieldCheck className="text-[#00f9ff] size-10 drop-shadow-[0_0_10px_rgba(0,249,255,0.5)]" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
               <Activity size={12} className="text-[#00f9ff] animate-pulse" />
               <span className="text-[10px] font-mono text-[#00f9ff] tracking-[0.4em] uppercase">System_Operational</span>
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-[0.5em] italic">
              {active.name}
            </h1>
            <div className="h-[1px] w-24 bg-[#00f9ff]/20 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-black relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00f9ff03_0%,transparent_70%)]" />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 z-10">
        <div className="max-w-md w-full space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
              You Don't Have Any Workspace
            </h2>
          </div>

          <div className="grid gap-10">
            <div className="space-y-4 text-center">
              <div className="flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#8ffcff]/10" />
                <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-[0.3em]">Create Workspace</span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#8ffcff]/10" />
              </div>
              <CreateWorkspaceTrigger /> 
            </div>

            <div className="space-y-4 text-center">
              <div className="flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#8ffcff]/10" />
                <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-[0.3em]">Join Workspace</span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#8ffcff]/10" />
              </div>
              <JoinWorkspaceForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}