import Link from "next/link";
import { MessageSquare, ArrowUpRight } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/EmptyState";
import { getUnreadMessages } from "../queries/getUnreadMessages";
import styles from "./UnreadMessages.module.css";

export async function UnreadMessages() {
  const messages = await getUnreadMessages(4);

  return (
    <Card className={styles.unreadMessagesCard} padding="none">
      <div className={styles.unreadMessagesHeaderWrapper}>
        <CardHeader
          title="Unread messages"
          subtitle="Direct patient inquiries & two-way SMS"
          action={
            <Link href="/messages" className={styles.unreadMessagesLink}>
              <span>View all</span>
              <ArrowUpRight size={14} />
            </Link>
          }
        />
      </div>

      {messages.length === 0 ? (
        <div className={styles.unreadMessagesEmpty}>
          <EmptyState
            title="No unread messages"
            description="You're all caught up with two-way SMS and patient queries."
            icon={<MessageSquare size={28} />}
          />
        </div>
      ) : (
        <ul className={styles.unreadMessagesList}>
          {messages.map((msg) => (
            <li key={msg.id} className={styles.unreadMessagesItem}>
              <Link href="/messages" className={styles.unreadMessagesItemLink}>
                <Avatar name={msg.memberName} size="sm" />
                <div className={styles.unreadMessagesContent}>
                  <div className={styles.unreadMessagesMeta}>
                    <span className={styles.unreadMessagesSender}>{msg.memberName}</span>
                    <span className={styles.unreadMessagesTime}>
                      {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className={styles.unreadMessagesBody}>{msg.body}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

export function UnreadMessagesSkeleton() {
  return (
    <Card className={styles.unreadMessagesCard} padding="none">
      <div className={styles.unreadMessagesHeaderWrapper}>
        <CardHeader title="Unread messages" subtitle="Loading messages..." />
      </div>
      <div className={styles.unreadMessagesSkeletonList}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className={styles.unreadMessagesSkeletonItem} />
        ))}
      </div>
    </Card>
  );
}
