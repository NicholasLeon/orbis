"use client"

import { useRef, useEffect } from "react";
import { ChannelHeader } from "./ChannelHeader";
import { ChannelInput } from "./ChannelInput";
import { Channel } from "@/schemas/channel.schema";
import { User } from "@/schemas/user.schema";
import { useSocket } from "@/hooks/use-socket";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessages } from "@/actions/messageAction";
import { markAsRead } from "@/lib/notification";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface ChannelPageProps {
  channel: Channel;
  user: User & { memberId: string };
}

export function ChannelClient({ channel, user }: ChannelPageProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useInfiniteQuery({
    queryKey: ["messages", channel.id],
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      getMessages(channel.id, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const { sendMessage } = useSocket(channel.id, user);

  const allMessages = data?.pages.flatMap((page) => page.items) || [];

  const lastMessage = allMessages[allMessages.length - 1];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [allMessages]);

  useEffect(() => {
    if (!lastMessage?.id) return;

    const run = async () => {
      const result = await markAsRead({
        memberId: user.memberId,
        workspaceId: channel.workspaceId,
        channelId: channel.id,
        messageId: lastMessage.id,
      });

      console.log("✅ Hasil dari aksi markAsRead:", result);

      if (result?.success) {
        console.log("🔄 Memaksa Navbar update angka notif!");
        queryClient.setQueryData(["unread-count", user.memberId], 0);
        queryClient.invalidateQueries({ queryKey: ["unread-count", user.memberId] });
        // router.refresh();
      }
    };

    run();
  }, [channel.id, channel.workspaceId, lastMessage?.id, user.memberId, router, queryClient]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) return <div className="flex-1 bg-black animate-pulse" />;

  return (
    <div className="flex h-full bg-black text-[#8ffcff] overflow-hidden">
      <div className="flex flex-col flex-1 min-w-0 h-full relative overflow-hidden border-r border-white/5">
        
        <div className="shrink-0 z-20 backdrop-blur-md bg-black/50 border-b border-white/5 flex items-center justify-between pr-4">
          <div className="flex-1">
            <ChannelHeader name={channel.name} />
          </div>
        </div>

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-4 py-6 space-y-8"
        >
          {isFetchingNextPage && (
            <div className="text-center text-xs text-[#00f9ff]">
              Syncing History...
            </div>
          )}

          {allMessages.map((msg) => (
            <div key={msg.id} className="flex gap-4">
              <div className="w-9 h-9 flex items-center justify-center text-xs text-[#00f9ff]">
                {msg.userName.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="text-xs text-white">
                  {msg.userName}
                </div>
                <p className="text-sm text-white/70">
                  {msg.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4">
          <ChannelInput
            channelName={channel.name}
            onSendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}