"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { sendMessage } from "../actions";
import styles from "./MessageComposer.module.css";

interface MessageComposerProps {
  conversationId: string;
  smsOptIn: boolean;
}

export function MessageComposer({ conversationId, smsOptIn }: MessageComposerProps) {
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || isSending) return;

    setIsSending(true);
    setError(null);

    const res = await sendMessage(conversationId, text);
    setIsSending(false);

    if (res.success) {
      setText("");
    } else {
      setError(res.error || "Failed to send message.");
    }
  }

  if (!smsOptIn) {
    return (
      <div className={styles.container}>
        <div className={styles.warningBanner}>
          Cannot send SMS: This patient has opted out of SMS messaging (smsOptIn is false).
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSend} className={styles.container} style={{ flexDirection: "column", alignItems: "stretch" }}>
      {error && <div style={{ color: "var(--color-error, #ef4444)", fontSize: "0.85rem", marginBottom: 4 }}>{error}</div>}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <input
          type="text"
          className={styles.input}
          placeholder="Type your message here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isSending}
        />
        <Button type="submit" leftIcon={<Send size={16} />} disabled={isSending || !text.trim()}>
          {isSending ? "Sending..." : "Send"}
        </Button>
      </div>
    </form>
  );
}
