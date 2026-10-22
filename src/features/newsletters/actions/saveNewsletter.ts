"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/client";
import { newsletters } from "@/db/schema/newsletters";

export interface SaveNewsletterInput {
  id?: string;
  title: string;
  templateId?: string | null;
  content: string;
  status?: "draft" | "scheduled" | "sent";
  sentAt?: Date | null;
}

export async function saveNewsletter(input: SaveNewsletterInput) {
  try {
    const status = input.status || "draft";
    const sentAt = status === "sent" ? new Date() : (input.sentAt || null);

    if (input.id) {
      await db
        .update(newsletters)
        .set({
          title: input.title,
          templateId: input.templateId || null,
          content: input.content,
          status,
          sentAt,
        })
        .where(eq(newsletters.id, input.id));

      revalidatePath("/newsletters");
      revalidatePath(`/newsletters/${input.id}`);
      return { success: true, id: input.id };
    } else {
      const [created] = await db
        .insert(newsletters)
        .values({
          title: input.title,
          templateId: input.templateId || null,
          content: input.content,
          status,
          sentAt,
        })
        .returning({ id: newsletters.id });

      revalidatePath("/newsletters");
      return { success: true, id: created.id };
    }
  } catch (error) {
    console.error("Failed to save newsletter:", error);
    return { success: false, error: "Failed to save newsletter" };
  }
}

export async function sendTestNewsletter(id: string, testEmail: string) {
  // Stub for sending test newsletter email
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { success: true, message: `Test newsletter sent to ${testEmail}` };
}
