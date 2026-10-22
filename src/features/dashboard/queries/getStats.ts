import { sql, eq, and, gte, inArray } from "drizzle-orm";
import { connection } from "next/server";
import { db } from "@/db/client";
import { members } from "@/db/schema/members";
import { campaigns } from "@/db/schema/campaigns";
import { messages } from "@/db/schema/messaging";
import { reviews } from "@/db/schema/reviews";
import { DashboardStats } from "../types";

export async function getDashboardStats(): Promise<DashboardStats> {
  await connection();
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);


  const [membersCountResult] = await db
    .select({ count: sql<number>`cast(count(*) as int)` })
    .from(members);

  const [activeCampaignsResult] = await db
    .select({ count: sql<number>`cast(count(*) as int)` })
    .from(campaigns)
    .where(inArray(campaigns.status, ["running", "scheduled"]));

  const [messagesCountResult] = await db
    .select({ count: sql<number>`cast(count(*) as int)` })
    .from(messages)
    .where(
      and(
        eq(messages.direction, "outbound"),
        gte(messages.createdAt, startOfMonth)
      )
    );

  const [reviewsResult] = await db
    .select({
      avgRating: sql<number>`coalesce(cast(avg(${reviews.rating}) as float), 0)`,
      count: sql<number>`cast(count(*) as int)`,
    })
    .from(reviews);

  return {
    totalMembers: membersCountResult?.count ?? 0,
    activeCampaigns: activeCampaignsResult?.count ?? 0,
    messagesSentThisMonth: messagesCountResult?.count ?? 0,
    averageReviewRating: Number((reviewsResult?.avgRating ?? 0).toFixed(1)),
    totalReviewsCount: reviewsResult?.count ?? 0,
  };
}
