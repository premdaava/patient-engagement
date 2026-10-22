import { eq, sql } from "drizzle-orm";
import { connection } from "next/server";
import { db } from "@/db/client";
import { campaigns } from "@/db/schema/campaigns";
import { campaignRecipients } from "@/db/schema/campaignRecipients";
import { emailTemplates } from "@/db/schema/emailTemplates";
import { CampaignDetails } from "../types";

export async function getCampaignById(id: string): Promise<CampaignDetails | null> {
  await connection();

  const [campaign] = await db
    .select({
      id: campaigns.id,
      name: campaigns.name,
      type: campaigns.type,
      status: campaigns.status,
      templateId: campaigns.templateId,
      scheduledAt: campaigns.scheduledAt,
      createdAt: campaigns.createdAt,
      templateName: emailTemplates.name,
      templateSubject: emailTemplates.subject,
      templateBody: emailTemplates.body,
    })
    .from(campaigns)
    .leftJoin(emailTemplates, eq(campaigns.templateId, emailTemplates.id))
    .where(eq(campaigns.id, id))
    .limit(1);

  if (!campaign) return null;

  const [metrics] = await db
    .select({
      total: sql<number>`cast(count(*) as int)`,
      sent: sql<number>`cast(count(case when ${campaignRecipients.sentAt} is not null or ${campaignRecipients.status} in ('sent', 'delivered') then 1 end) as int)`,
      delivered: sql<number>`cast(count(case when ${campaignRecipients.status} = 'delivered' or ${campaignRecipients.openedAt} is not null or ${campaignRecipients.clickedAt} is not null then 1 end) as int)`,
      opened: sql<number>`cast(count(case when ${campaignRecipients.openedAt} is not null then 1 end) as int)`,
      clicked: sql<number>`cast(count(case when ${campaignRecipients.clickedAt} is not null then 1 end) as int)`,
    })
    .from(campaignRecipients)
    .where(eq(campaignRecipients.campaignId, id));

  return {
    ...campaign,
    metrics: {
      total: metrics?.total ?? 0,
      sent: metrics?.sent ?? 0,
      delivered: metrics?.delivered ?? 0,
      opened: metrics?.opened ?? 0,
      clicked: metrics?.clicked ?? 0,
      replies: 0,
    },
  };
}
