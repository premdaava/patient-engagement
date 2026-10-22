import { Star } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { DashboardReview } from "../types";
import styles from "./RecentReviews.module.css";

export function ReviewItem({ review }: { review: DashboardReview }) {
  const formattedDate = new Date(review.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <li className={styles.recentReviewsItem}>
      <div className={styles.recentReviewsItemHeader}>
        <div className={styles.recentReviewsAuthor}>
          <Avatar name={review.memberName} size="sm" />
          <div>
            <span className={styles.recentReviewsAuthorName}>{review.memberName}</span>
            <span className={styles.recentReviewsDate}>{formattedDate}</span>
          </div>
        </div>
        <div className={styles.recentReviewsStars}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={13}
              className={i < review.rating ? styles.recentReviewsStarFilled : styles.recentReviewsStarEmpty}
            />
          ))}
          <Badge size="sm" variant="default">{review.source}</Badge>
        </div>
      </div>
      {review.comment && <p className={styles.recentReviewsComment}>{review.comment}</p>}
    </li>
  );
}
