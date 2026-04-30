"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "./Sidebar"
import { Navbar } from "./Navbar"
import { z } from "zod"
import { dashboardShellSchema } from "@/schemas/dashboard.schema"
import QueryProvider from "@/providers/queryProvider"

type DashboardShellProps = z.infer<typeof dashboardShellSchema>;

export function DashboardShell({
  workspaces,
  user,
  userRole,
  children,
  channels,
}: DashboardShellProps) {
  console.log("📦 DASHBOARD USER:", user);
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen w-full bg-[#09090B] overflow-hidden">
        <Navbar user={user} />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar
          workspaces={workspaces}
          channels={channels}
          userRole={userRole}
          />
          
          <SidebarInset className="bg-[#09090B] flex flex-1 flex-col border-l border-zinc-800/40 overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <QueryProvider>
              {children}
              </QueryProvider>
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}