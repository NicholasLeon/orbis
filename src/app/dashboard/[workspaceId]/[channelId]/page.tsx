import { getChannelById } from "@/services/channelServices";
import { getUserProfile } from "@/services/userServices";
import { getAuthSession } from "@/lib/authSession";
import { notFound, redirect } from "next/navigation";
import { ChannelClient } from "./components/ChannelClient";
import { getCurrentUser } from "@/lib/authAction";

interface ChannelPageProps {
  params: Promise<{
    workspaceId: string;
    channelId: string;
  }>;
}

export default async function ChannelPage({ params }: ChannelPageProps) {
  const { workspaceId, channelId } = await params;
  const session = await getAuthSession();
  
  if (!session) redirect("/login");

  const { userId, token } = session;

  const [channel, userRaw] = await Promise.all([
    getChannelById(channelId, workspaceId),
    getCurrentUser(), 
  ]);

  if (!channel || !userRaw) {
    return notFound();
  }
  
  return (
    <main className="h-full max-h-screen overflow-hidden flex flex-col">
    <ChannelClient 
      channel={channel} 
      user={userRaw} 
    />
    </main>
  );
}