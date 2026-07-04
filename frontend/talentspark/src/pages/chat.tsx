import { useState } from "react";
import { sendChat } from "../Services/chat_services";
import type { ChatMessage } from "../types/chat";

function ChatPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return;
    }

    const userMessage: ChatMessage = { role: "user", text: trimmedQuery };
    setMessages((current) => [...current, userMessage]);
    setQuery("");
    setError(null);
    setLoading(true);

    try {
      const assistantText = await sendChat(trimmedQuery);
      const assistantMessage: ChatMessage = { role: "assistant", text: assistantText };
      setMessages((current) => [...current, assistantMessage]);
    } catch (err) {
      console.error("Chat API error", err);
      setError("Unable to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <section style={{ padding: "1rem", maxWidth: "720px", margin: "0 auto" }}>
      <h2>AI Chat</h2>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          minHeight: "280px",
          padding: "1rem",
          marginBottom: "1rem",
          backgroundColor: "#fafafa",
        }}
      >
        {messages.length === 0 ? (
          <div style={{ color: "#555" }}>
            Type a message below and press Send to chat with the backend.
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              style={{
                marginBottom: "0.75rem",
                display: "flex",
                justifyContent: message.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "80%",
                  padding: "0.75rem 1rem",
                  borderRadius: "16px",
                  backgroundColor: message.role === "user" ? "#2b6cb0" : "#e2e8f0",
                  color: message.role === "user" ? "white" : "#111827",
                }}
              >
                <div style={{ fontSize: "0.85rem", marginBottom: "0.35rem", opacity: 0.8 }}>
                  {message.role === "user" ? "You" : "Assistant"}
                </div>
                <div>{message.text}</div>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ask a question..."
          rows={4}
          style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #ccc", resize: "vertical" }}
          disabled={loading}
        />
        <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button type="submit" disabled={loading} style={{ padding: "0.75rem 1.2rem", borderRadius: "8px", border: "none", backgroundColor: "#2b6cb0", color: "white", cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Sending..." : "Send"}
          </button>
          <button type="button" onClick={clearConversation} style={{ padding: "0.75rem 1.2rem", borderRadius: "8px", border: "1px solid #ccc", backgroundColor: "white", cursor: "pointer" }}>
            Clear
          </button>
        </div>
      </form>
      {error && <div style={{ marginTop: "0.75rem", color: "#b91c1c" }}>{error}</div>}
    </section>
  );
}

export default ChatPage;
