"use client"

import { Globe, HelpCircle, Bell, Settings, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { OrbisLogo }  from "@/app/components/brand/logo"
import { logoutAction } from "@/lib/authAction"
import { useNotifications } from "@/hooks/use-notifications"
import Link from "next/link"

export function Navbar({ user }: { user: any }) {
  const initials = user?.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase() || "??";

  const memberId = user?.memberId;
  const token = user?.token;

  const { unreadCount, unreadDetails } = useNotifications(memberId, token);

  return (
    <header className="flex w-full h-16 items-center justify-between border-b border-[#8ffcff]/10 px-6 bg-black shrink-0 z-50">
      <div className="flex items-center gap-3">
        <OrbisLogo />
        <div className="text-xs font-medium tracking-[0.3em] text-white uppercase">Orbis</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center border-r border-[#8ffcff]/10 pr-4 mr-2 gap-1">
          <NavIcon icon={<Globe size={18} />} />
          <NavIcon icon={<HelpCircle size={18} />} />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative cursor-pointer">
                <NavIcon icon={<Bell size={18} />} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-[10px] bg-[#00f9ff] text-black px-1.5 py-0.5">
                    {unreadCount}
                  </span>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-black border-[#8ffcff]/10 rounded-none text-white p-0">
              <div className="px-4 py-3 border-b border-[#8ffcff]/10 text-[11px] font-medium uppercase tracking-widest text-[#8ffcff]/60">
                Notifications
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {unreadDetails?.length === 0 ? (
                  <div className="px-4 py-6 text-center text-xs text-white/40">
                    No new messages
                  </div>
                ) : (
                  unreadDetails?.map((notif: any) => (
                    <Link 
                      href={`/dashboard/${notif.workspaceId}/${notif.channelId}`} 
                      key={notif.channelId}
                    >
                      <DropdownMenuItem className="flex flex-col items-start p-4 border-b border-white/5 cursor-pointer focus:bg-[#00f9ff]/5 rounded-none transition-colors">
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="text-xs font-medium text-white"># {notif.channelName}</span>
                          <span className="text-[10px] text-[#00f9ff] bg-[#00f9ff]/10 px-1.5 py-0.5">
                            {notif.count} new
                          </span>
                        </div>
                      </DropdownMenuItem>
                    </Link>
                  ))
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <NavIcon icon={<Settings size={18} />} />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer outline-none group pl-2">
              <div className="size-8 rounded-none border border-[#00f9ff] flex items-center justify-center text-[10px] font-medium text-[#00f9ff] shadow-[0_0_10px_rgba(0,249,255,0.1)]">
                {initials}
              </div>
              <div className="hidden flex-col md:flex -space-y-0.5 text-left">
                <span className="text-xs font-medium text-white tracking-tight uppercase">{user?.name}</span>
                <span className="text-[10px] text-[#8ffcff]/40 font-light">{user?.email}</span>
              </div>
              <ChevronDown size={14} className="text-[#8ffcff]/30 group-hover:text-[#00f9ff] transition-colors" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-black border-[#8ffcff]/10 rounded-none text-[#8ffcff]/60">
            <DropdownMenuItem className="text-[11px] font-medium uppercase tracking-widest py-3 focus:bg-[#00f9ff]/10 focus:text-[#00f9ff] rounded-none">Profile Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-[11px] font-medium uppercase tracking-widest py-3 focus:bg-[#00f9ff]/10 focus:text-[#00f9ff] rounded-none">Billing</DropdownMenuItem>
            <DropdownMenuItem 
            className="text-sm py-2 focus:bg-zinc-900 text-red-400 cursor-pointer"
            onClick={async () => await logoutAction()}
          >
            Logout
          </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

function NavIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <Button variant="ghost" size="icon" className="size-9 text-[#8ffcff]/40 hover:text-[#00f9ff] hover:bg-[#00f9ff]/5 rounded-none transition-all asChild">
      <div>{icon}</div>
    </Button>
  )
}