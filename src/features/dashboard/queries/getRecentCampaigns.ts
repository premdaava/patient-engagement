import { desc } from "drizzle-orm";
import { db } from "@/db/client";
import { campaigns } from "@/db/schema/campaigns";
import { DashboardCampaign } from "../types";

export async function getRecentCampaigns(limit = 5): Promise<DashboardCampaign[]> {
  const records = await db
    .select({
      id: campaigns.id,
      name: campaigns.name,
      type: campaigns.type,
      status: campaigns.status,
      scheduledAt: campaigns.scheduledAt,
      createdAt: campaigns.createdAt,
    })
    .from(campaigns)
    .orderBy(desc(campaigns.createdAt))
    .limit(limit);

  return records;
}
