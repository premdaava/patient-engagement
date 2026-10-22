import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
}

export function StarRating({ rating, max = 5, size = 16 }: StarRatingProps) {
  return (
    <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
      {Array.from({ length: max }).map((_, i) => {
        const isFilled = i < Math.floor(rating);
        return (
          <Star
            key={i}
            size={size}
            fill={isFilled ? "var(--color-warning, #f59e0b)" : "none"}
            color={isFilled ? "var(--color-warning, #f59e0b)" : "var(--color-border, #cbd5e1)"}
          />
        );
      })}
    </div>
  );
}
