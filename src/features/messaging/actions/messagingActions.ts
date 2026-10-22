"use server";

import { revalidatePath } from "next/cache";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db/client";
import { conversations, messages } from "@/db/schema/messaging";
import { members } from "@/db/schema/members";
import { sendSms } from "@/lib/sms";

export async function sendMessage(conversationId: string, body: string) {
  try {
    if (!body.trim()) {
      return { success: false, error: "Message body cannot be empty." };
    }

    // Get conversation and member to verify smsOptIn
    const [conv] = await db
      .select({
        memberId: conversations.memberId,
      })
      .from(conversations)
      .where(eq(conversations.id, conversationId))
      .limit(1);

    if (!conv) {
      return { success: false, error: "Conversation not found." };
    }

    const [member] = await db
      .select({
        phone: members.phone,
        smsOptIn: members.smsOptIn,
      })
      .from(members)
      .where(eq(members.id, conv.memberId))
      .limit(1);

    if (!member || !member.smsOptIn) {
      return { success: false, error: "Cannot send SMS: Patient has opted out of SMS messaging (smsOptIn is false)." };
    }

    if (!member.phone) {
      return { success: false, error: "Patient does not have a valid phone number on file." };
    }

    // Call stub SMS gateway
    const smsRes = await sendSms(member.phone, body);
    if (!smsRes.success) {
      return { success: false, error: smsRes.error || "SMS provider failed to send message." };
    }

    // Insert outbound message
    await db.insert(messages).values({
      conversationId,
      direction: "outbound",
      body,
      status: "sent",
    });

    // Update conversation lastMessageAt
    await db
      .update(conversations)
      .set({ lastMessageAt: new Date() })
      .where(eq(conversations.id, conversationId));

    revalidatePath("/messages");
    return { success: true };
  } catch (error) {
    console.error("Failed to send message:", error);
    return { success: false, error: "Failed to send message." };
  }
}

export async function markConversationAsRead(conversationId: string) {
  try {
    await db
      .update(messages)
      .set({ status: "delivered" })
      .where(sql`${messages.conversationId} = ${conversationId} AND ${messages.direction} = 'inbound' AND ${messages.status} = 'received'`);

    revalidatePath("/messages");
    return { success: true };
  } catch (error) {
    console.error("Failed to mark conversation as read:", error);
    return { success: false, error: "Failed to mark as read." };
  }
}
