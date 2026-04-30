import { clients } from "./client";

type NotificationPayload =
  | { type: "UNREAD_UPDATE"; count: number }
  | { type: "RESET_UNREAD"; channelId: string };

export function sendNotification(memberId: string, payload: NotificationPayload) {
  const ws = clients.get(memberId);

  if (!ws) return;

  ws.send(JSON.stringify(payload));
}