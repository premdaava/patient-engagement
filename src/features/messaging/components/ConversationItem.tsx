"use client";

import Link from "next/link";
import { ConversationWithDetails } from "../queries";
import styles from "./ConversationItem.module.css";

interface ConversationItemProps {
  conversation: ConversationWithDetails;
  isActive: boolean;
}

export function ConversationItem({ conversation, isActive }: ConversationItemProps) {
  const patientName = `${conversation.member.firstName} ${conversation.member.lastName}`;
  const lastMsg = conversation.lastMessage;

  const timeStr = lastMsg
    ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : new Date(conversation.createdAt).toLocaleDateString();

  return (
    <Link href={`/messages?id=${conversation.id}`} className={`${styles.item} ${isActive ? styles.active : ""}`}>
      <div className={styles.rowTop}>
        <span className={styles.name}>{patientName}</span>
        <span className={styles.time}>{timeStr}</span>
      </div>
      <div className={styles.rowBottom}>
        <span className={styles.preview}>
          {lastMsg ? `${lastMsg.direction === "outbound" ? "You: " : ""}${lastMsg.body}` : "No messages yet"}
        </span>
        {conversation.unreadCount > 0 && (
          <span className={styles.unreadBadge}>{conversation.unreadCount}</span>
        )}
      </div>
    </Link>
  );
}
