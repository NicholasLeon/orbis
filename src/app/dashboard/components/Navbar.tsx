"use client"

import { HelpCircle, Bell, Settings, ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { OrbisLogo } from "@/app/components/brand/logo"
import { logoutAction } from "@/lib/authAction"
import { useNotifications } from "@/hooks/use-notifications"
import Link from "next/link"

export function Navbar({ user }: { user: any }) {
  const initials = user?.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase() || "??";
  const memberId = user?.memberId;
  const token = user?.token;

  const { unreadCount, unreadDetails } = useNotifications(memberId, token);

  return (
    <header className="sticky top-0 w-full h-14 items-center justify-between border-b border-zinc-800/40 px-4 md:px-6 bg-[#09090B]/80 backdrop-blur-md shrink-0 z-50 flex">
      
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden text-zinc-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors" />
        
        <div className="flex items-center gap-3">
          <div className="scale-90 md:scale-100">
            <OrbisLogo />
          </div>
          <div className="text-[11px] font-bold tracking-[0.4em] text-white uppercase italic hidden sm:block">
            Orbis
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden xs:flex items-center border-r border-zinc-800/50 pr-2 mr-2 gap-1">
          <NavIcon icon={<HelpCircle size={16} />} />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative cursor-pointer">
                <NavIcon icon={<Bell size={16} />} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex size-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full size-2 bg-blue-500"></span>
                  </span>
                )}
              </div>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-72 bg-[#09090B] border-zinc-800 rounded-xl text-zinc-300 p-0 shadow-2xl">
              <div className="px-4 py-3 border-b border-zinc-800/50 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Notifications
              </div>
              <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                {unreadDetails?.length === 0 ? (
                  <div className="px-4 py-8 text-center text-[11px] text-zinc-600 italic">
                    All caught up. No new messages.
                  </div>
                ) : (
                  unreadDetails?.map((notif: any) => (
                    <Link 
                      href={`/dashboard/${notif.workspaceId}/${notif.channelId}`} 
                      key={notif.channelId}
                    >
                      <DropdownMenuItem className="flex flex-col items-start p-4 border-b border-zinc-800/30 cursor-pointer focus:bg-blue-500/5 transition-colors group">
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="text-xs font-semibold text-zinc-200 group-focus:text-blue-300"># {notif.channelName}</span>
                          <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
                            {notif.count} new
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-500 truncate w-full">New activity in this channel</p>
                      </DropdownMenuItem>
                    </Link>
                  ))
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <NavIcon icon={<Settings size={16} />} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer outline-none group">
              <div className="size-8 rounded-md border border-blue-500/20 bg-blue-500/5 flex items-center justify-center text-[10px] font-bold text-blue-400 group-hover:border-blue-500/40 group-hover:bg-blue-500/10 transition-all">
                {initials}
              </div>
              
              <div className="hidden lg:flex flex-col -space-y-0.5 text-left">
                <span className="text-[11px] font-bold text-zinc-200 tracking-tight uppercase">{user?.name}</span>
                <span className="text-[9px] text-zinc-600 font-medium truncate max-w-[100px]">{user?.email}</span>
              </div>
              <ChevronDown size={14} className="text-zinc-600 group-hover:text-zinc-400 transition-colors hidden sm:block" />
            </div>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-56 bg-[#09090B] border-zinc-800 rounded-xl text-zinc-400 p-1 shadow-2xl">
            <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 px-3 py-2">
              Account Settings
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800/50" />
            <DropdownMenuItem className="text-xs font-medium py-2.5 px-3 focus:bg-blue-500/10 focus:text-blue-300 rounded-lg cursor-pointer transition-colors">
              Profile Details
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-xs font-medium py-2.5 px-3 focus:bg-red-500/10 text-red-400/80 focus:text-red-400 rounded-lg cursor-pointer mt-1 transition-colors"
              onClick={async () => await logoutAction()}
            >
              Log out Session
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

function NavIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="size-8 text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
    >
      {icon}
    </Button>
  )
}