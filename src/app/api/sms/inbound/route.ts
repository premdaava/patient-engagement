import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { conversations, messages } from "@/db/schema/messaging";
import { members } from "@/db/schema/members";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, message } = body;

    if (!phone || !message) {
      return NextResponse.json({ success: false, error: "Missing phone or message in webhook payload." }, { status: 400 });
    }

    // Find member by phone
    const [member] = await db
      .select()
      .from(members)
      .where(eq(members.phone, phone))
      .limit(1);

    if (!member) {
      return NextResponse.json({ success: false, error: "Member not found with given phone number." }, { status: 404 });
    }

    // Check if conversation exists for member
    let [conv] = await db
      .select()
      .from(conversations)
      .where(eq(conversations.memberId, member.id))
      .limit(1);

    if (!conv) {
      const [newConv] = await db
        .insert(conversations)
        .values({ memberId: member.id })
        .returning();
      conv = newConv;
    }

    // Insert inbound message
    await db.insert(messages).values({
      conversationId: conv.id,
      direction: "inbound",
      body: message,
      status: "received",
    });

    // Update conversation lastMessageAt
    await db
      .update(conversations)
      .set({ lastMessageAt: new Date() })
      .where(eq(conversations.id, conv.id));

    return NextResponse.json({ success: true, conversationId: conv.id });
  } catch (error) {
    console.error("Inbound webhook error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
