import api from "./api";
import type { ChatResponse } from "../types/chat";

export async function sendChat(query: string): Promise<string> {
  const response = await api.post<ChatResponse>("/chat/", { query });
  return response.data.response;
}
