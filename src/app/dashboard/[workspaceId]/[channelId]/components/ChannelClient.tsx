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

  // Helper untuk inisial nama
  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

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

      if (result?.success) {
        queryClient.setQueryData(["unread-count", user.memberId], 0);
        queryClient.invalidateQueries({ queryKey: ["unread-count", user.memberId] });
      }
    };

    run();
  }, [channel.id, channel.workspaceId, lastMessage?.id, user.memberId, queryClient]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) return <div className="flex-1 bg-[#09090B] animate-pulse" />;

  return (
    <div className="flex h-full bg-[#09090B] text-zinc-300 overflow-hidden">
      <div className="flex flex-col flex-1 min-w-0 h-full relative border-r border-zinc-800/50">
        
        <div className="shrink-0 z-20 backdrop-blur-md bg-black/40 border-b border-zinc-800/50 flex items-center justify-between pr-4 h-14">
          <div className="flex-1">
            <ChannelHeader name={channel.name} />
          </div>
        </div>

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 min-h-0 overflow-y-auto px-6 py-8 space-y-6 scroll-smooth custom-scrollbar"
          data-lenis-prevent
        >
          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
               <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em] animate-pulse">
                 Syncing History...
               </span>
            </div>
          )}

          {allMessages.map((msg) => (
            <div key={msg.id} className="flex gap-4 group hover:bg-white/[0.01] -mx-2 px-2 py-1 rounded-lg transition-colors">
              <div className="shrink-0 w-9 h-9 rounded-md bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 flex items-center justify-center text-[10px] font-bold text-blue-400 group-hover:border-blue-500/30 transition-all shadow-sm">
                {getInitials(msg.userName)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-zinc-100 tracking-tight">
                    {msg.userName}
                  </span>
                  <span className="text-[10px] text-zinc-600 font-medium uppercase tracking-tighter">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                  </span>
                </div>
                <p className="text-[13px] text-zinc-400 leading-relaxed break-words">
                  {msg.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="shrink-0 p-4 bg-gradient-to-t from-[#09090B] via-[#09090B] to-transparent">
          <div className="max-w-7xl mx-auto">
            <ChannelInput
              channelName={channel.name}
              onSendMessage={sendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}