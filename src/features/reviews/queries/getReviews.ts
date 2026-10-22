import { desc, eq, and } from "drizzle-orm";
import { connection } from "next/server";
import { db } from "@/db/client";
import { reviews, Review } from "@/db/schema/reviews";
import { members } from "@/db/schema/members";

export interface ReviewWithMember extends Review {
  member?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string | null;
  } | null;
}

export interface ReviewFiltersInput {
  rating?: string;
  status?: string;
  source?: string;
}

export async function getReviews(filters?: ReviewFiltersInput): Promise<ReviewWithMember[]> {
  await connection();

  const conditions = [];

  if (filters?.rating && filters.rating !== "all") {
    conditions.push(eq(reviews.rating, parseInt(filters.rating, 10)));
  }

  if (filters?.status && filters.status !== "all") {
    conditions.push(eq(reviews.status, filters.status as "pending" | "published" | "flagged" | "hidden"));
  }

  if (filters?.source && filters.source !== "all") {
    conditions.push(eq(reviews.source, filters.source as "google" | "internal" | "yelp" | "facebook" | "other"));
  }

  const baseQuery = db
    .select({
      id: reviews.id,
      memberId: reviews.memberId,
      rating: reviews.rating,
      comment: reviews.comment,
      source: reviews.source,
      status: reviews.status,
      replyText: reviews.replyText,
      isFeatured: reviews.isFeatured,
      createdAt: reviews.createdAt,
      member: {
        id: members.id,
        firstName: members.firstName,
        lastName: members.lastName,
        email: members.email,
      },
    })
    .from(reviews)
    .leftJoin(members, eq(reviews.memberId, members.id))
    .orderBy(desc(reviews.createdAt));

  const rows = conditions.length > 0
    ? await baseQuery.where(and(...conditions))
    : await baseQuery;

  return rows;
}
