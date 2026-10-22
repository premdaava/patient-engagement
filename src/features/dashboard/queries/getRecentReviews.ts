import { desc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { reviews } from "@/db/schema/reviews";
import { members } from "@/db/schema/members";
import { DashboardReview } from "../types";

export async function getRecentReviews(limit = 4): Promise<DashboardReview[]> {
  const records = await db
    .select({
      id: reviews.id,
      rating: reviews.rating,
      comment: reviews.comment,
      source: reviews.source,
      status: reviews.status,
      createdAt: reviews.createdAt,
      firstName: members.firstName,
      lastName: members.lastName,
    })
    .from(reviews)
    .leftJoin(members, eq(reviews.memberId, members.id))
    .orderBy(desc(reviews.createdAt))
    .limit(limit);

  return records.map((r) => ({
    id: r.id,
    rating: r.rating,
    comment: r.comment,
    source: r.source,
    status: r.status,
    createdAt: r.createdAt,
    memberName: r.firstName ? `${r.firstName} ${r.lastName}`.trim() : "Anonymous Patient",
  }));
}
