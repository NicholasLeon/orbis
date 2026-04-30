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
  return (
    <SidebarProvider>
      {/* Parent Container: 
        H-screen memaksa aplikasi setinggi layar. 
        W-full memastikan tidak ada overflow horizontal yang tidak diinginkan.
      */}
      <div className="flex h-screen w-full bg-[#09090B] overflow-hidden antialiased">
        
        {/* Sidebar: Tersembunyi otomatis di mobile (dibawah 1024px) oleh SidebarProvider */}
        <AppSidebar
          workspaces={workspaces}
          channels={channels}
          userRole={userRole}
        />
        
        {/* Main Area: 
          SidebarInset adalah pembungkus konten utama yang cerdas. 
          Ia akan menyesuaikan lebarnya saat sidebar di-toggle.
        */}
        <SidebarInset className="bg-[#09090B] flex flex-col flex-1 min-w-0 overflow-hidden border-l border-zinc-800/30">
          
          {/* Navbar: 
            Sekarang ditaruh di dalam SidebarInset agar tetap sejajar 
            dengan konten saat sidebar terbuka.
          */}
          <Navbar user={user} />
          
          {/* Main Content Wrapper:
            min-h-0 sangat krusial agar overflow-y-auto di dalamnya bekerja 
            ketika konten melebihi tinggi layar.
          */}
          <main className="flex-1 min-h-0 overflow-y-auto relative custom-scrollbar">
            <QueryProvider>
              {/* Padding bawah ditambahkan agar konten tidak mepet di mobile */}
              <div className="h-full pb-6 md:pb-0">
                {children}
              </div>
            </QueryProvider>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}