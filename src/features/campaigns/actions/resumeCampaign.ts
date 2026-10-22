"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/client";
import { campaigns } from "@/db/schema/campaigns";

export async function resumeCampaign(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const [existing] = await db
      .select({ scheduledAt: campaigns.scheduledAt })
      .from(campaigns)
      .where(eq(campaigns.id, id))
      .limit(1);

    const isFuture = existing?.scheduledAt && new Date(existing.scheduledAt) > new Date();
    const newStatus = isFuture ? "scheduled" : "running";

    await db
      .update(campaigns)
      .set({ status: newStatus })
      .where(eq(campaigns.id, id));

    revalidatePath(`/campaigns/${id}`);
    revalidatePath("/campaigns");
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to resume campaign" };
  }
}
