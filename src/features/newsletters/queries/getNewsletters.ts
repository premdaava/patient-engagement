import { desc, eq } from "drizzle-orm";
import { connection } from "next/server";
import { db } from "@/db/client";
import { newsletters, Newsletter } from "@/db/schema/newsletters";
import { emailTemplates, EmailTemplate } from "@/db/schema/emailTemplates";

export interface NewsletterWithTemplate extends Newsletter {
  templateName?: string | null;
}

export async function getNewsletters(): Promise<NewsletterWithTemplate[]> {
  await connection();

  const rows = await db
    .select({
      id: newsletters.id,
      title: newsletters.title,
      templateId: newsletters.templateId,
      content: newsletters.content,
      status: newsletters.status,
      sentAt: newsletters.sentAt,
      createdAt: newsletters.createdAt,
      templateName: emailTemplates.name,
    })
    .from(newsletters)
    .leftJoin(emailTemplates, eq(newsletters.templateId, emailTemplates.id))
    .orderBy(desc(newsletters.createdAt));

  return rows;
}

export async function getNewsletterById(id: string): Promise<Newsletter | null> {
  await connection();

  const [record] = await db
    .select()
    .from(newsletters)
    .where(eq(newsletters.id, id))
    .limit(1);

  return record || null;
}
