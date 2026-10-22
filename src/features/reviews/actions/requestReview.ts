"use server";

import { revalidatePath } from "next/cache";
import { createCampaign } from "@/features/campaigns/actions";
import { db } from "@/db/client";
import { members } from "@/db/schema/members";

export async function requestReviewAction(type: "email" | "sms") {
  try {
    // Fetch all members to target review request campaign
    const allMembers = await db.select({ id: members.id }).from(members);
    const memberIds = allMembers.map((m) => m.id);

    const campaignName = `Review Request Campaign (${type.toUpperCase()}) - ${new Date().toLocaleDateString()}`;
    const customSubject = "We value your feedback!";
    const customBody = "Hi there! Thank you for choosing our practice. Please take a moment to leave us a review and share your feedback: https://g.page/review-example";

    const res = await createCampaign({
      name: campaignName,
      type,
      scheduleType: "immediate",
      audienceType: "custom",
      customSubject: type === "email" ? customSubject : undefined,
      customBody,
      selectedMemberIds: memberIds,
    });

    if (res.success) {
      revalidatePath("/reviews");
      revalidatePath("/campaigns");
      return { success: true, campaignId: res.campaignId };
    } else {
      return { success: false, error: res.error || "Failed to create review request campaign." };
    }
  } catch (error) {
    console.error("Failed to request review:", error);
    return { success: false, error: "Failed to request review." };
  }
}
