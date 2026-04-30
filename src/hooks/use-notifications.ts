import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useNotifications(memberId: string, token: string) {
  const queryClient = useQueryClient();
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const { data = { count: 0, details: [] }, refetch } = useQuery({
    queryKey: ["unread-count", memberId],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/unread-count?memberId=${memberId}`, {
        cache: 'no-store'
      });
      if (!res.ok) return { count: 0, details: [] };
      return await res.json();
    },
    enabled: !!memberId,
  });

  useEffect(() => {
    if (!token || !memberId) return;

    const wsUrl = `${process.env.NEXT_PUBLIC_API_URL}/ws-notif?token=${token}`.replace("http", "ws");
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === "NEW_UNREAD" || payload.type === "CHANNEL_READ_SUCCESS") {
          queryClient.invalidateQueries({ queryKey: ["unread-count", memberId] });
        }
      } catch (err) {}
    };

    setSocket(ws);
    return () => ws.close();
  }, [token, memberId, queryClient]);

  return {
    unreadCount: data.count,
    unreadDetails: data.details,
    refresh: refetch,
  };
}