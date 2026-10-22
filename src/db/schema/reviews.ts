import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";

import { members } from "./members";

export const reviewSourceEnum = pgEnum("review_source", [
  "google",
  "internal",
  "yelp",
  "facebook",
  "other",
]);

export const reviewStatusEnum = pgEnum("review_status", [
  "pending",
  "published",
  "flagged",
  "hidden",
]);

export const reviews = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  memberId: uuid("member_id").references(() => members.id, { onDelete: "set null" }),
  rating: integer("rating").notNull(), // 1–5
  comment: text("comment"),
  source: reviewSourceEnum("source").notNull().default("internal"),
  status: reviewStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  replyText: text("reply_text"),
  isFeatured: boolean("is_featured").notNull().default(false),

});

export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
