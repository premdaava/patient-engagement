ALTER TYPE "public"."campaign_status" ADD VALUE 'paused' BEFORE 'completed';--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "reply_text" text;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "is_featured" boolean DEFAULT false NOT NULL;