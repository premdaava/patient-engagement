"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/client";
import { emailTemplates } from "@/db/schema/emailTemplates";

export interface SaveTemplateInput {
  id?: string;
  name: string;
  subject: string;
  body: string;
}

export async function saveEmailTemplate(input: SaveTemplateInput) {
  try {
    if (input.id) {
      await db
        .update(emailTemplates)
        .set({
          name: input.name,
          subject: input.subject,
          body: input.body,
        })
        .where(eq(emailTemplates.id, input.id));

      revalidatePath("/email-templates");
      revalidatePath(`/email-templates/${input.id}`);
      revalidatePath("/campaigns/new");
      return { success: true, id: input.id };
    } else {
      const [created] = await db
        .insert(emailTemplates)
        .values({
          name: input.name,
          subject: input.subject,
          body: input.body,
        })
        .returning({ id: emailTemplates.id });

      revalidatePath("/email-templates");
      revalidatePath("/campaigns/new");
      return { success: true, id: created.id };
    }
  } catch (error) {
    console.error("Failed to save email template:", error);
    return { success: false, error: "Failed to save email template" };
  }
}
