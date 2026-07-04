export type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

export type ChatRequest = {
  query: string;
};

export type ChatResponse = {
  response: string;
};
