import { desc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { messages, conversations } from "@/db/schema/messaging";
import { members } from "@/db/schema/members";
import { DashboardMessage } from "../types";

export async function getUnreadMessages(limit = 4): Promise<DashboardMessage[]> {
  const records = await db
    .select({
      id: messages.id,
      conversationId: messages.conversationId,
      body: messages.body,
      direction: messages.direction,
      status: messages.status,
      createdAt: messages.createdAt,
      firstName: members.firstName,
      lastName: members.lastName,
      phone: members.phone,
    })
    .from(messages)
    .innerJoin(conversations, eq(messages.conversationId, conversations.id))
    .innerJoin(members, eq(conversations.memberId, members.id))
    .where(eq(messages.direction, "inbound"))
    .orderBy(desc(messages.createdAt))
    .limit(limit);

  return records.map((m) => ({
    id: m.id,
    conversationId: m.conversationId,
    body: m.body,
    direction: m.direction,
    status: m.status,
    createdAt: m.createdAt,
    memberName: `${m.firstName} ${m.lastName}`.trim(),
    memberPhone: m.phone,
  }));
}
