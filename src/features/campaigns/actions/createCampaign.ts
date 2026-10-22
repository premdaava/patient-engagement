"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db/client";
import { campaigns } from "@/db/schema/campaigns";
import { campaignRecipients } from "@/db/schema/campaignRecipients";
import { emailTemplates } from "@/db/schema/emailTemplates";
import { CreateCampaignInput } from "../types";
import { sendCampaign } from "./sendCampaign";

export async function createCampaign(input: CreateCampaignInput): Promise<{ success: boolean; campaignId?: string; error?: string }> {
  try {
    let templateId = input.templateId;

    if (!templateId && input.customBody) {
      const [newTmpl] = await db
        .insert(emailTemplates)
        .values({
          name: `${input.name} Template`,
          subject: input.customSubject ?? input.name,
          body: input.customBody,
        })
        .returning({ id: emailTemplates.id });
      templateId = newTmpl.id;
    }

    const scheduledDate = input.scheduleType === "scheduled" && input.scheduledAt
      ? new Date(input.scheduledAt)
      : null;

    const initialStatus = input.scheduleType === "scheduled" ? "scheduled" : "running";

    const [created] = await db
      .insert(campaigns)
      .values({
        name: input.name,
        type: input.type,
        status: initialStatus,
        templateId: templateId ?? null,
        scheduledAt: scheduledDate,
      })
      .returning({ id: campaigns.id });

    if (input.selectedMemberIds && input.selectedMemberIds.length > 0) {
      await db.insert(campaignRecipients).values(
        input.selectedMemberIds.map((mId) => ({
          campaignId: created.id,
          memberId: mId,
          status: "pending" as const,
        }))
      );
    }

    if (initialStatus === "running") {
      await sendCampaign(created.id);
    }

    revalidatePath("/campaigns");
    return { success: true, campaignId: created.id };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to create campaign" };
  }
}
