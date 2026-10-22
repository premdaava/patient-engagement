"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ConversationWithDetails } from "../queries";
import { Message } from "@/db/schema/messaging";
import { ConversationList, MessageThread, MemberPanel } from "../components";
import { markConversationAsRead } from "../actions";

interface MessagingClientProps {
  conversations: ConversationWithDetails[];
  activeConversationId?: string;
  messages: Message[];
}

export function MessagingClient({ conversations, activeConversationId, messages }: MessagingClientProps) {
  const router = useRouter();

  // Polling every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 10000);
    return () => clearInterval(interval);
  }, [router]);

  // Mark as read when active conversation changes / loads
  useEffect(() => {
    if (activeConversationId) {
      markConversationAsRead(activeConversationId);
    }
  }, [activeConversationId]);

  const activeConv = conversations.find((c) => c.id === activeConversationId) || conversations[0];

  return (
    <div style={{ display: "flex", width: "100%", height: "calc(100vh - 80px)", overflow: "hidden" }}>
      <ConversationList conversations={conversations} activeId={activeConv?.id} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {activeConv ? (
          <MessageThread
            conversationId={activeConv.id}
            patientName={`${activeConv.member.firstName} ${activeConv.member.lastName}`}
            messages={messages}
            smsOptIn={activeConv.member.smsOptIn}
          />
        ) : (
          <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", color: "var(--color-text-muted)" }}>
            Select a conversation to start messaging.
          </div>
        )}
      </div>

      {activeConv && <MemberPanel member={activeConv.member} />}
    </div>
  );
}
