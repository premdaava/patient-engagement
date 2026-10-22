import { desc } from "drizzle-orm";
import { connection } from "next/server";
import { db } from "@/db/client";
import { emailTemplates, EmailTemplate } from "@/db/schema/emailTemplates";

export async function getEmailTemplates(): Promise<EmailTemplate[]> {
  await connection();

  const records = await db
    .select()
    .from(emailTemplates)
    .orderBy(desc(emailTemplates.createdAt));

  return records;
}
