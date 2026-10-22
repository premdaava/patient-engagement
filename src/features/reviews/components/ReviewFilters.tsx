"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./ReviewFilters.module.css";

export function ReviewFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rating = searchParams.get("rating") || "all";
  const status = searchParams.get("status") || "all";
  const source = searchParams.get("source") || "all";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/reviews?${params.toString()}`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.filterGroup}>
        <span className={styles.label}>Rating:</span>
        <select
          className={styles.select}
          value={rating}
          onChange={(e) => updateFilter("rating", e.target.value)}
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <span className={styles.label}>Status:</span>
        <select
          className={styles.select}
          value={status}
          onChange={(e) => updateFilter("status", e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="published">Published</option>
          <option value="flagged">Flagged</option>
          <option value="hidden">Hidden</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <span className={styles.label}>Source:</span>
        <select
          className={styles.select}
          value={source}
          onChange={(e) => updateFilter("source", e.target.value)}
        >
          <option value="all">All Sources</option>
          <option value="internal">Internal</option>
          <option value="google">Google</option>
          <option value="yelp">Yelp</option>
          <option value="facebook">Facebook</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );
}
