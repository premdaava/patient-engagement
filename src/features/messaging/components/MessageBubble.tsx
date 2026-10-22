import { Message } from "@/db/schema/messaging";
import styles from "./MessageBubble.module.css";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isInbound = message.direction === "inbound";
  const timeStr = new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className={`${styles.bubble} ${isInbound ? styles.inbound : styles.outbound}`}>
      <span>{message.body}</span>
      <span className={styles.timestamp}>{timeStr}</span>
    </div>
  );
}
