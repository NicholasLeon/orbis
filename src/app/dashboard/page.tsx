import { getAuthSession } from "@/lib/authSession";
import { getWorkspacesByUserId } from "@/services/workspaceServices";
import { getDashboardStats } from "@/services/dashboardServices";
import { redirect } from "next/navigation";
import { ShieldCheck, MessageSquare, Users, Zap, Clock, Plus, DoorOpen } from "lucide-react";
import { JoinWorkspaceForm } from "./components/JoinForm";
import { CreateWorkspaceTrigger } from "./components/createPage/WorkspaceTrigger";

function formatTimeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
}

export default async function DashboardPage() {
  const session = await getAuthSession();
  if (!session) redirect("/login");
  
  const workspaces = await getWorkspacesByUserId(session.userId);

  if (workspaces.length > 0) {
    const active = workspaces[0];
    const { channelCount, memberCount, recentActivities } = await getDashboardStats(active.id);
    
    return (
      <div className="flex-1 h-full bg-[#09090B] overflow-y-auto relative custom-scrollbar">
        <div className="absolute top-[-5%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-500/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto p-5 md:p-8 lg:p-10">
          <div className="mb-8 md:mb-12 space-y-2">
            <div className="flex items-center gap-2 text-blue-500">
              <Zap size={12} className="fill-current" />
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase">Control Center</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-zinc-100 tracking-tight leading-tight">
              Welcome, <span className="text-blue-400">{session.name?.split(' ')[0]}</span>
            </h1>
          </div>

          {/* Bento Grid - Mobile Optimized */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            <div className="col-span-2 md:col-span-2 lg:col-span-2 group relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/20 p-6 md:p-8 flex flex-col justify-between min-h-[160px] md:min-h-[200px]">
              <ShieldCheck className="text-blue-400 size-8 md:size-10 mb-4" />
              <div>
                <h2 className="text-lg md:text-xl font-bold text-white mb-1 uppercase tracking-wider truncate">
                  {active.name} Workspace
                </h2>
              </div>
            </div>

            <div className="col-span-1 rounded-2xl border border-zinc-800/50 bg-zinc-900/20 p-5 md:p-6 flex flex-col justify-between hover:bg-zinc-900/40 transition-colors group">
              <MessageSquare className="text-blue-500/40 size-4 md:size-5 group-hover:text-blue-400 transition-colors" />
              <div className="mt-4">
                <span className="block text-2xl md:text-3xl font-bold text-white leading-none">{channelCount}</span>
                <span className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1 block">Channels</span>
              </div>
            </div>

            <div className="col-span-1 rounded-2xl border border-zinc-800/50 bg-zinc-900/20 p-5 md:p-6 flex flex-col justify-between hover:bg-zinc-900/40 transition-colors group">
              <Users className="text-blue-500/40 size-4 md:size-5 group-hover:text-blue-400 transition-colors" />
              <div className="mt-4">
                <span className="block text-2xl md:text-3xl font-bold text-white leading-none">{memberCount}</span>
                <span className="text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1 block">Members</span>
              </div>
            </div>
            <div className="col-span-2 md:col-span-2 lg:col-span-3 rounded-2xl border border-zinc-800/50 bg-zinc-900/20 p-5 md:p-6">
              <div className="flex items-center gap-2 mb-6">
                <Clock size={12} className="text-blue-500" />
                <span className="text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Live</span>
              </div>
              
              <div className="space-y-3">
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800/20 border border-zinc-800/30 group hover:border-blue-500/20 transition-all">
                      <div className="size-8 shrink-0 rounded bg-blue-500/10 flex items-center justify-center text-[10px] text-blue-400 font-bold border border-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                        {activity.channelName[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-zinc-300 truncate font-medium">{activity.content}</p>
                        <p className="text-[9px] text-zinc-600 mt-0.5 uppercase tracking-tighter">
                          #{activity.channelName.toLowerCase()} • {formatTimeAgo(new Date(activity.createdAt))}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center border border-dashed border-zinc-800/50 rounded-xl">
                    <p className="text-[10px] text-zinc-600 font-medium uppercase tracking-[0.2em]">Standby Mode</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#09090B] items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#3b82f603_0%,transparent_70%)]" />
      <div className="max-w-sm w-full space-y-10 z-10 text-center">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-white tracking-tight italic uppercase italic">Setup Required</h2>
          <p className="text-zinc-500 text-xs px-4">No workspaces detected. Initialize a new cluster or join an existing one.</p>
        </div>
        <div className="p-6 rounded-3xl border border-zinc-800/60 bg-zinc-900/20 space-y-6 backdrop-blur-sm">
           <CreateWorkspaceTrigger />
           <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800/50"></div></div>
              <span className="relative bg-[#0d0d0f] px-4 text-[9px] text-zinc-600 font-black uppercase tracking-widest">OR</span>
           </div>
           <JoinWorkspaceForm />
        </div>
      </div>
    </div>
  );
}