// src/lib/mockData.ts
import { Message } from "../types/message";

// In‑memory storage (reset on server restart)
export const whatsappMessages: Message[] = [];
export const webhookLogs: Record<string, any>[] = [];

export function addMessage(message: Message) {
  whatsappMessages.push(message);
}

export function addLog(entry: Record<string, any>) {
  webhookLogs.push({ timestamp: Date.now(), ...entry });
}

export function clearData() {
  whatsappMessages.length = 0;
  webhookLogs.length = 0;
}
