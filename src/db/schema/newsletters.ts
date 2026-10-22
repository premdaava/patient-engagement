import { pgTable, uuid, varchar, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { emailTemplates } from "./emailTemplates";

export const newsletterStatusEnum = pgEnum("newsletter_status", [
  "draft",
  "scheduled",
  "sent",
]);

export const newsletters = pgTable("newsletters", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  templateId: uuid("template_id").references(() => emailTemplates.id, {
    onDelete: "set null",
  }),
  content: text("content").notNull(),
  status: newsletterStatusEnum("status").notNull().default("draft"),
  sentAt: timestamp("sent_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Newsletter = typeof newsletters.$inferSelect;
export type NewNewsletter = typeof newsletters.$inferInsert;
