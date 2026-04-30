"use client"

import { useState } from "react"
import { Search, Plus, LayoutGrid, Trash2 } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { CreateChannelModal } from "./createPage/CreateChannel";
import { AppSidebarProps } from "@/schemas/sidebar.schema";
import Link from "next/link";
import { useParams } from "next/navigation";
import { InviteSection } from "./inviteSection";
import { deleteChannelAction } from "@/actions/deleteChannelAction";
import { useRouter } from "next/navigation";

export function AppSidebar({ workspaces, channels, userRole }: AppSidebarProps) {
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false)
  const params = useParams()
  const router = useRouter();
  
  const activeWorkspace = workspaces?.[0];
  const isAdmin = userRole === "admin";
  const currentChannelId = params?.channelId as string;

 const handleDeleteChannel = async (channelId: string, channelName: string) => {
    const confirmDelete = confirm(
      `Delete channel "${channelName}"?\n\nThis action cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      await deleteChannelAction(channelId);

      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete channel");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Sidebar className="border-r border-zinc-800/50 bg-[#09090B]">
      <SidebarHeader className="pt-6 px-4 pb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            {activeWorkspace ? (
              <>
                <SidebarMenuButton size="lg" className="h-12 hover:bg-zinc-900/50 border border-transparent hover:border-zinc-800/50 transition-all rounded-lg">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-gradient-to-br from-blue-500/20 to-indigo-900/40 text-blue-400 text-xs font-bold uppercase ring-1 ring-blue-500/30">
                    {activeWorkspace.name[0]}
                  </div>

                  <div className="flex flex-col gap-0.5 leading-none ml-2 text-left">
                    <span className="font-semibold text-sm text-zinc-200 truncate max-w-[140px]">
                      {activeWorkspace.name}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">
                      Workspace
                    </span>
                  </div>

                  <LayoutGrid className="ml-auto size-4 text-zinc-600" />
                </SidebarMenuButton>

                {isAdmin && (
                  <InviteSection inviteCode={activeWorkspace.inviteCode} />
                )}
              </>
            ) : (
              <div className="p-3 text-[11px] font-medium text-zinc-500 border border-dashed border-zinc-800 rounded-lg text-center bg-zinc-900/20">
                No Workspace Selected
              </div>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
        
        {activeWorkspace && (
           <div className="relative mt-5 group">
             <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
             <input 
               placeholder="Find something..." 
               className="h-8 w-full bg-zinc-900/50 pl-9 pr-4 text-[11px] border border-zinc-800/60 rounded-full focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 placeholder:text-zinc-600 text-zinc-200 transition-all"
             />
           </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-3 mt-4 scrollbar-hide">
        {activeWorkspace ? (
          <SidebarGroup>
            <div className="flex items-center justify-between px-2 mb-3">
              <SidebarGroupLabel className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em] p-0 h-auto">
                Channels
              </SidebarGroupLabel>
              {isAdmin && (
                <button 
                  onClick={() => setIsChannelModalOpen(true)}
                  className="p-1 rounded-md hover:bg-zinc-800 text-zinc-500 hover:text-zinc-200 transition-colors"
                >
                  <Plus className="size-3.5" />
                </button>
              )}
            </div>

            <SidebarMenu className="gap-1">
              {channels.length > 0 ? (
                channels.map((channel) => {
                  const isActive = currentChannelId === channel.id;
                  return (
                    <SidebarMenuItem key={channel.id}>
                      <Link
                        href={`/dashboard/${activeWorkspace.id}/${channel.id}`}
                        className="block"
                      >
                        <SidebarMenuButton
                          className={`h-10 px-2 pr-8 rounded-lg transition-all duration-200 ${
                            isActive
                              ? 'bg-blue-500/10 text-blue-300 ring-1 ring-blue-500/20'
                              : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                          }`}
                        >
                          <div className={`flex items-center justify-center size-6 rounded text-[9px] font-bold ${
                            isActive
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-zinc-800/50 text-zinc-500'
                          }`}>
                            {getInitials(channel.name)}
                          </div>

                          <span className="truncate ml-2 text-[12px] font-medium capitalize">
                            {channel.name}
                          </span>
                        </SidebarMenuButton>
                      </Link>
                      {isAdmin && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteChannel(channel.id, channel.name);
                        }}
                        className="
                          absolute right-2 top-1/2 -translate-y-1/2
                          p-0.5 rounded
                          opacity-0 group-hover:opacity-100
                          hover:bg-red-500/10
                          transition
                        "
                      >
                        <Trash2 className="size-3 text-red-400/70 hover:text-red-400" />
                      </button>
                    )}
                    </SidebarMenuItem>
                  );
                })
              ) : (
                <div className="px-2 py-4 text-center border border-dashed border-zinc-800/50 rounded-lg">
                  <p className="text-[10px] text-zinc-600 italic">No channels found</p>
                </div>
              )}
            </SidebarMenu>
          </SidebarGroup>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 opacity-40">
             <LayoutGrid size={32} className="text-zinc-700 mb-3 animate-pulse" />
             <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">Select a workspace</p>
          </div>
        )}
      </SidebarContent>

      <CreateChannelModal 
        workspaceId={activeWorkspace?.id}
        open={isChannelModalOpen} 
        onOpenChange={setIsChannelModalOpen} 
      />
    </Sidebar>
  )
}