import { desc, eq, sql } from "drizzle-orm";
import { connection } from "next/server";
import { db } from "@/db/client";
import { conversations, messages, Conversation, Message } from "@/db/schema/messaging";
import { members } from "@/db/schema/members";

export interface ConversationWithDetails extends Conversation {
  member: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    email: string | null;
    smsOptIn: boolean;
  };
  lastMessage?: {
    body: string;
    direction: "inbound" | "outbound";
    createdAt: Date;
  } | null;
  unreadCount: number;
}

export async function getConversations(searchQuery?: string): Promise<ConversationWithDetails[]> {
  await connection();

  const convs = await db
    .select({
      id: conversations.id,
      memberId: conversations.memberId,
      lastMessageAt: conversations.lastMessageAt,
      createdAt: conversations.createdAt,
      member: {
        id: members.id,
        firstName: members.firstName,
        lastName: members.lastName,
        phone: members.phone,
        email: members.email,
        smsOptIn: members.smsOptIn,
      },
    })
    .from(conversations)
    .innerJoin(members, eq(conversations.memberId, members.id))
    .orderBy(desc(conversations.lastMessageAt));

  const results: ConversationWithDetails[] = [];

  for (const c of convs) {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const fullName = `${c.member.firstName} ${c.member.lastName}`.toLowerCase();
      const phone = c.member.phone?.toLowerCase() || "";
      if (!fullName.includes(q) && !phone.includes(q)) {
        continue;
      }
    }

    // Get last message
    const [lastMsg] = await db
      .select({
        body: messages.body,
        direction: messages.direction,
        createdAt: messages.createdAt,
      })
      .from(messages)
      .where(eq(messages.conversationId, c.id))
      .orderBy(desc(messages.createdAt))
      .limit(1);

    // Get unread count (inbound messages that are unread or simply count inbound messages if no read status, let's count inbound messages)
    const [unreadRes] = await db
      .select({ count: sql<number>`count(*)` })
      .from(messages)
      .where(sql`${messages.conversationId} = ${c.id} AND ${messages.direction} = 'inbound' AND ${messages.status} = 'received'`);

    results.push({
      ...c,
      lastMessage: lastMsg || null,
      unreadCount: Number(unreadRes?.count || 0),
    });
  }

  return results;
}

export async function getMessagesForConversation(conversationId: string): Promise<Message[]> {
  await connection();

  const msgs = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, conversationId))
    .orderBy(messages.createdAt);

  return msgs;
}
