import { desc, eq } from "drizzle-orm";
import { connection } from "next/server";
import { db } from "@/db/client";
import { emailTemplates, EmailTemplate } from "@/db/schema/emailTemplates";

export async function getEmailTemplates(): Promise<EmailTemplate[]> {
  await connection();
  return await db.select().from(emailTemplates).orderBy(desc(emailTemplates.createdAt));
}

export async function getEmailTemplateById(id: string): Promise<EmailTemplate | null> {
  await connection();
  const [record] = await db
    .select()
    .from(emailTemplates)
    .where(eq(emailTemplates.id, id))
    .limit(1);
  return record || null;
}
