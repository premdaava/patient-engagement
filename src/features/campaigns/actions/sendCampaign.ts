"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { campaigns } from "@/db/schema/campaigns";
import { campaignRecipients } from "@/db/schema/campaignRecipients";

/**
 * Dispatches a campaign to its recipients.
 *
 * TODO: Provider integration (Twilio for SMS / SendGrid / Resend for Email).
 * Currently marks recipient status as delivered and records timestamps.
 */
export async function sendCampaign(campaignId: string): Promise<{ success: boolean; dispatched: number }> {
  // Update campaign status to running
  await db
    .update(campaigns)
    .set({ status: "running" })
    .where(eq(campaigns.id, campaignId));

  const now = new Date();

  // Update recipients to delivered with sent timestamp
  const updated = await db
    .update(campaignRecipients)
    .set({
      status: "delivered",
      sentAt: now,
    })
    .where(eq(campaignRecipients.campaignId, campaignId))
    .returning({ id: campaignRecipients.id });

  return {
    success: true,
    dispatched: updated.length,
  };
}
