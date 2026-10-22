"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { reviews } from "@/db/schema/reviews";

export async function replyReview(id: string, replyText: string) {
  try {
    await db
      .update(reviews)
      .set({ replyText, status: "published" })
      .where(eq(reviews.id, id));

    revalidatePath("/reviews");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to reply to review:", error);
    return { success: false, error: "Failed to save reply." };
  }
}

export async function updateReviewStatus(id: string, status: "pending" | "published" | "flagged" | "hidden") {
  try {
    await db
      .update(reviews)
      .set({ status })
      .where(eq(reviews.id, id));

    revalidatePath("/reviews");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to update review status:", error);
    return { success: false, error: "Failed to update status." };
  }
}

export async function toggleFeatured(id: string, isFeatured: boolean) {
  try {
    await db
      .update(reviews)
      .set({ isFeatured })
      .where(eq(reviews.id, id));

    revalidatePath("/reviews");
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle featured status:", error);
    return { success: false, error: "Failed to update featured status." };
  }
}
