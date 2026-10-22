import { Star } from "lucide-react";
import { ReviewWithMember } from "../queries";
import { StarRating } from "./StarRating";
import styles from "./ReviewSummary.module.css";

interface ReviewSummaryProps {
  reviews: ReviewWithMember[];
}

export function ReviewSummary({ reviews }: ReviewSummaryProps) {
  const total = reviews.length;
  const avgRating = total > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / total).toFixed(1) : "0.0";

  const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    if (counts[r.rating] !== undefined) {
      counts[r.rating]++;
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.averageSection}>
        <div className={styles.averageNumber}>{avgRating}</div>
        <StarRating rating={parseFloat(avgRating)} size={20} />
        <div className={styles.totalReviews}>Based on {total} {total === 1 ? "review" : "reviews"}</div>
      </div>

      <div className={styles.distributionSection}>
        {[5, 4, 3, 2, 1].map((star) => {
          const count = counts[star];
          const pct = total > 0 ? (count / total) * 100 : 0;
          return (
            <div key={star} className={styles.distRow}>
              <div className={styles.starLabel}>
                {star} <Star size={14} fill="var(--color-warning, #f59e0b)" color="var(--color-warning, #f59e0b)" />
              </div>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: `${pct}%` }} />
              </div>
              <div className={styles.countLabel}>{count}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
