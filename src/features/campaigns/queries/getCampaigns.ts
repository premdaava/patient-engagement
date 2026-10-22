import { desc, eq, ilike, and, sql } from "drizzle-orm";
import { connection } from "next/server";
import { db } from "@/db/client";
import { campaigns } from "@/db/schema/campaigns";
import { campaignRecipients } from "@/db/schema/campaignRecipients";
import { CampaignListItem, CampaignStatus } from "../types";

export async function getCampaigns(options?: {
  search?: string;
  status?: string;
}): Promise<CampaignListItem[]> {
  await connection();

  const conditions = [];

  if (options?.search?.trim()) {
    conditions.push(ilike(campaigns.name, `%${options.search.trim()}%`));
  }

  if (options?.status && options.status !== "all") {
    conditions.push(eq(campaigns.status, options.status as CampaignStatus));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const records = await db
    .select({
      id: campaigns.id,
      name: campaigns.name,
      type: campaigns.type,
      status: campaigns.status,
      templateId: campaigns.templateId,
      scheduledAt: campaigns.scheduledAt,
      createdAt: campaigns.createdAt,
      recipientsCount: sql<number>`cast(count(${campaignRecipients.id}) as int)`,
    })
    .from(campaigns)
    .leftJoin(campaignRecipients, eq(campaigns.id, campaignRecipients.campaignId))
    .where(whereClause)
    .groupBy(campaigns.id)
    .orderBy(desc(campaigns.createdAt));

  return records;
}
