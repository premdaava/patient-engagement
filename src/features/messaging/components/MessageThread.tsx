"use client";

import { Message } from "@/db/schema/messaging";
import { MessageBubble } from "./MessageBubble";
import { MessageComposer } from "./MessageComposer";
import styles from "./MessageThread.module.css";

interface MessageThreadProps {
  conversationId: string;
  patientName: string;
  messages: Message[];
  smsOptIn: boolean;
}

export function MessageThread({ conversationId, patientName, messages, smsOptIn }: MessageThreadProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Conversation with {patientName}</div>
      <div className={styles.messagesArea}>
        {messages.length === 0 ? (
          <div style={{ textAlign: "center", color: "var(--color-text-muted)", marginTop: 40, fontSize: "0.875rem" }}>
            No messages in this thread yet. Send a message below to start chatting.
          </div>
        ) : (
          messages.map((m) => <MessageBubble key={m.id} message={m} />)
        )}
      </div>
      <MessageComposer conversationId={conversationId} smsOptIn={smsOptIn} />
    </div>
  );
}
