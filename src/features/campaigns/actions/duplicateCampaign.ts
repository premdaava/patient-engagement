"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/client";
import { campaigns } from "@/db/schema/campaigns";
import { campaignRecipients } from "@/db/schema/campaignRecipients";

export async function duplicateCampaign(id: string): Promise<{ success: boolean; newCampaignId?: string; error?: string }> {
  try {
    const [source] = await db
      .select()
      .from(campaigns)
      .where(eq(campaigns.id, id))
      .limit(1);

    if (!source) {
      return { success: false, error: "Source campaign not found" };
    }

    const [cloned] = await db
      .insert(campaigns)
      .values({
        name: `${source.name} (Copy)`,
        type: source.type,
        status: "draft",
        templateId: source.templateId,
      })
      .returning({ id: campaigns.id });

    const sourceRecipients = await db
      .select({ memberId: campaignRecipients.memberId })
      .from(campaignRecipients)
      .where(eq(campaignRecipients.campaignId, id));

    if (sourceRecipients.length > 0) {
      await db.insert(campaignRecipients).values(
        sourceRecipients.map((r) => ({
          campaignId: cloned.id,
          memberId: r.memberId,
          status: "pending" as const,
        }))
      );
    }

    revalidatePath("/campaigns");
    return { success: true, newCampaignId: cloned.id };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to duplicate campaign" };
  }
}
