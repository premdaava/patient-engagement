import { Suspense } from "react";
import { getConversations, getMessagesForConversation } from "@/features/messaging/queries";
import { MessagingClient } from "@/features/messaging/components";

interface MessagesPageProps {
  searchParams: Promise<{
    id?: string;
    search?: string;
  }>;
}

export default async function MessagesPage({ searchParams }: MessagesPageProps) {
  const resolvedParams = await searchParams;
  const conversations = await getConversations(resolvedParams.search);

  const activeId = resolvedParams.id || (conversations.length > 0 ? conversations[0].id : undefined);
  const messages = activeId ? await getMessagesForConversation(activeId) : [];

  return (
    <Suspense fallback={<div>Loading messages...</div>}>
      <MessagingClient
        conversations={conversations}
        activeConversationId={activeId}
        messages={messages}
      />
    </Suspense>
  );
}
