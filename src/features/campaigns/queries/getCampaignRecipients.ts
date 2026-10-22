import { eq, desc } from "drizzle-orm";
import { connection } from "next/server";
import { db } from "@/db/client";
import { campaignRecipients } from "@/db/schema/campaignRecipients";
import { members } from "@/db/schema/members";
import { CampaignRecipientRow } from "../types";

export async function getCampaignRecipients(campaignId: string): Promise<CampaignRecipientRow[]> {
  await connection();

  const records = await db
    .select({
      id: campaignRecipients.id,
      memberId: campaignRecipients.memberId,
      status: campaignRecipients.status,
      sentAt: campaignRecipients.sentAt,
      openedAt: campaignRecipients.openedAt,
      clickedAt: campaignRecipients.clickedAt,
      firstName: members.firstName,
      lastName: members.lastName,
      email: members.email,
      phone: members.phone,
    })
    .from(campaignRecipients)
    .innerJoin(members, eq(campaignRecipients.memberId, members.id))
    .where(eq(campaignRecipients.campaignId, campaignId))
    .orderBy(desc(campaignRecipients.sentAt));

  return records.map((r) => ({
    id: r.id,
    memberId: r.memberId,
    memberName: `${r.firstName} ${r.lastName}`.trim(),
    email: r.email,
    phone: r.phone,
    status: r.status,
    sentAt: r.sentAt,
    openedAt: r.openedAt,
    clickedAt: r.clickedAt,
  }));
}
