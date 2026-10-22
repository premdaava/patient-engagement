"use client";

import { useState } from "react";
import { MessageSquare, EyeOff, CheckCircle2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ReviewWithMember } from "../queries";
import { updateReviewStatus, toggleFeatured } from "../actions";
import { StarRating } from "./StarRating";
import { ReplyBox } from "./ReplyBox";
import styles from "./ReviewCard.module.css";

interface ReviewCardProps {
  review: ReviewWithMember;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const patientName = review.member
    ? `${review.member.firstName} ${review.member.lastName}`
    : "Anonymous Patient";

  const formattedDate = new Date(review.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  async function handleToggleStatus(newStatus: "published" | "hidden") {
    setIsUpdating(true);
    await updateReviewStatus(review.id, newStatus);
    setIsUpdating(false);
  }

  async function handleToggleFeature() {
    setIsUpdating(true);
    await toggleFeatured(review.id, !review.isFeatured);
    setIsUpdating(false);
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.authorInfo}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className={styles.authorName}>{patientName}</span>
            {review.isFeatured && (
              <Badge variant="warning" size="sm">
                Featured
              </Badge>
            )}
          </div>
          <div className={styles.metaInfo}>
            <span>{formattedDate}</span>
            <span>•</span>
            <span style={{ textTransform: "capitalize" }}>Source: {review.source}</span>
          </div>
        </div>
        <div className={styles.badgeList}>
          <StarRating rating={review.rating} />
          <Badge
            variant={
              review.status === "published"
                ? "success"
                : review.status === "pending"
                ? "warning"
                : review.status === "flagged"
                ? "danger"
                : "default"
            }
          >
            {review.status}
          </Badge>
        </div>
      </div>

      {review.comment && <p className={styles.comment}>{review.comment}</p>}

      {review.replyText && !isReplying && (
        <div className={styles.replySection}>
          <span className={styles.replyTitle}>Practice Reply:</span>
          <p className={styles.replyText}>{review.replyText}</p>
        </div>
      )}

      {isReplying && (
        <ReplyBox
          reviewId={review.id}
          initialReply={review.replyText}
          onClose={() => setIsReplying(false)}
        />
      )}

      <div className={styles.footerActions}>
        {!isReplying && (
          <Button
            variant="outline"
            size="sm"
            leftIcon={<MessageSquare size={14} />}
            onClick={() => setIsReplying(true)}
          >
            {review.replyText ? "Edit Reply" : "Reply"}
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          leftIcon={<Bookmark size={14} />}
          onClick={handleToggleFeature}
          disabled={isUpdating}
        >
          {review.isFeatured ? "Unfeature" : "Feature"}
        </Button>

        {review.status !== "hidden" ? (
          <Button
            variant="outline"
            size="sm"
            leftIcon={<EyeOff size={14} />}
            onClick={() => handleToggleStatus("hidden")}
            disabled={isUpdating}
          >
            Hide
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            leftIcon={<CheckCircle2 size={14} />}
            onClick={() => handleToggleStatus("published")}
            disabled={isUpdating}
          >
            Publish
          </Button>
        )}
      </div>
    </div>
  );
}
