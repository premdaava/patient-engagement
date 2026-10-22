import { Suspense } from "react";
import { getReviews } from "@/features/reviews/queries";
import { ReviewsClient } from "@/features/reviews/components";

interface ReviewsPageProps {
  searchParams: Promise<{
    rating?: string;
    status?: string;
    source?: string;
  }>;
}

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  const resolvedParams = await searchParams;
  const reviews = await getReviews({
    rating: resolvedParams.rating,
    status: resolvedParams.status,
    source: resolvedParams.source,
  });

  return (
    <Suspense fallback={<div>Loading reviews...</div>}>
      <ReviewsClient reviews={reviews} />
    </Suspense>
  );
}
