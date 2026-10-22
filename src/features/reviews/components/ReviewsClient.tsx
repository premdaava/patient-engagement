"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ReviewSummary, ReviewFilters, ReviewCard, RequestReviewModal } from "@/features/reviews/components";
import { ReviewWithMember } from "@/features/reviews/queries";

interface ReviewsClientProps {
  reviews: ReviewWithMember[];
}

export function ReviewsClient({ reviews }: ReviewsClientProps) {
  const [showRequestModal, setShowRequestModal] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", width: "100%" }}>
      <PageHeader
        title="Patient Reviews"
        description="Monitor patient feedback, reply to reviews, feature testimonials, and request new reviews."
        actions={
          <Button
            leftIcon={<Plus size={16} />}
            onClick={() => setShowRequestModal(true)}
          >
            Request a Review
          </Button>
        }
      />

      <ReviewSummary reviews={reviews} />

      <ReviewFilters />

      {reviews.length === 0 ? (
        <EmptyState
          title="No reviews found"
          description="No reviews match your selected filter criteria."
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

      {showRequestModal && (
        <RequestReviewModal onClose={() => setShowRequestModal(false)} />
      )}
    </div>
  );
}
