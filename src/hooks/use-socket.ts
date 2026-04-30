import { useState, useEffect, useRef } from "react";
import { Message } from "@/schemas/message.schema";
import { useQueryClient, InfiniteData } from "@tanstack/react-query"

export function useSocket(channelId: string, user: any) {
  const queryClient = useQueryClient();
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!channelId || !user?.token) return;

    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/ws/${channelId}?token=${user.token}`);
    socketRef.current = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "NEW_MESSAGE") {
      queryClient.setQueryData<InfiniteData<{ items: Message[]; nextCursor: string | null }>>(
      ["messages", channelId],
      (oldData) => {
        if (!oldData) return undefined;

        const newPages = [...oldData.pages];
        const lastPageIndex = newPages.length - 1;

        newPages[lastPageIndex] = {
          ...newPages[lastPageIndex],
          items: [...newPages[lastPageIndex].items, data.payload],
        };

        return {
          ...oldData,
          pages: newPages,
        };
      }
    );
  }
};

    return () => ws.close();
  }, [channelId, user?.token, queryClient]);

  const sendMessage = (content: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ content }));
    }
  };

  return { sendMessage };
}