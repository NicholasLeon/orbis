import { getAuthSession } from "@/lib/authSession";
import { DashboardShell } from "./components/DashboardShell";
import { getWorkspacesByUserId } from "@/services/workspaceServices";
import { getUserProfile } from "@/services/userServices";
import { getMemberRole } from "@/services/memberServices";
import { getChannelsByWorkspaceId } from "@/services/channelServices";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/authAction";
import QueryProvider from "@/providers/queryProvider";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthSession();
  const user = await getCurrentUser();

  if (!session) {
    redirect("/login");
  }

  const { userId, token } = session;

  try {
    const [workspacesData, userProfileRaw] = await Promise.all([
      getWorkspacesByUserId(userId),
      getUserProfile(userId)
    ]);

    const activeWorkspace = workspacesData[0];

    const [channels, userRole] = activeWorkspace 
      ? await Promise.all([
          getChannelsByWorkspaceId(activeWorkspace.id),
          getMemberRole(activeWorkspace.id, userId)
        ])
      : [[], null];

    return (
      <QueryProvider>
      <DashboardShell 
        workspaces={workspacesData} 
        userRole={userRole} 
        user={user}
        channels={channels}
      >
        {children}
      </DashboardShell>
      </QueryProvider>
    );
  } catch (error) {
    console.error("❌ Layout Error detail:", error);
    return (
      <div className="h-full flex items-center justify-center bg-black text-[#00f9ff] font-mono">
        FAILED_TO_INITIALIZE_DATA
      </div>
    );
  }
}