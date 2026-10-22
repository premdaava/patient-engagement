import Link from "next/link";
import { Star, ArrowUpRight } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { getRecentReviews } from "../queries/getRecentReviews";
import { ReviewItem } from "./ReviewItem";
import styles from "./RecentReviews.module.css";

export async function RecentReviews() {
  const reviews = await getRecentReviews(4);

  return (
    <Card className={styles.recentReviewsCard} padding="none">
      <div className={styles.recentReviewsHeaderWrapper}>
        <CardHeader
          title="Recent reviews"
          subtitle="Patient feedback and satisfaction ratings"
          action={
            <Link href="/reviews" className={styles.recentReviewsLink}>
              <span>View all</span>
              <ArrowUpRight size={14} />
            </Link>
          }
        />
      </div>

      {reviews.length === 0 ? (
        <div className={styles.recentReviewsEmpty}>
          <EmptyState
            title="No reviews yet"
            description="Patient feedback collected from post-visit surveys will show up here."
            icon={<Star size={28} />}
          />
        </div>
      ) : (
        <ul className={styles.recentReviewsList}>
          {reviews.map((rev) => (
            <ReviewItem key={rev.id} review={rev} />
          ))}
        </ul>
      )}
    </Card>
  );
}

export function RecentReviewsSkeleton() {
  return (
    <Card className={styles.recentReviewsCard} padding="none">
      <div className={styles.recentReviewsHeaderWrapper}>
        <CardHeader title="Recent reviews" subtitle="Loading feedback..." />
      </div>
      <div className={styles.recentReviewsSkeletonList}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className={styles.recentReviewsSkeletonItem} />
        ))}
      </div>
    </Card>
  );
}


