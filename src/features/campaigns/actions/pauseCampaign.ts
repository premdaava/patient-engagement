"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/client";
import { campaigns } from "@/db/schema/campaigns";

export async function pauseCampaign(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await db
      .update(campaigns)
      .set({ status: "paused" })
      .where(eq(campaigns.id, id));

    revalidatePath(`/campaigns/${id}`);
    revalidatePath("/campaigns");
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to pause campaign" };
  }
}
