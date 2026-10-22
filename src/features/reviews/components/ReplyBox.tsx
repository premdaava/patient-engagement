"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { replyReview } from "../actions";
import styles from "./ReplyBox.module.css";

interface ReplyBoxProps {
  reviewId: string;
  initialReply?: string | null;
  onClose: () => void;
}

export function ReplyBox({ reviewId, initialReply, onClose }: ReplyBoxProps) {
  const [replyText, setReplyText] = useState(initialReply || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSubmitting(true);
    setError(null);

    const res = await replyReview(reviewId, replyText);
    setIsSubmitting(false);

    if (res.success) {
      onClose();
    } else {
      setError(res.error || "Failed to submit reply.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      {error && <div style={{ color: "var(--color-error, #ef4444)", fontSize: "0.85rem" }}>{error}</div>}
      <textarea
        className={styles.textarea}
        rows={3}
        placeholder="Write a professional reply to this patient review..."
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
      />
      <div className={styles.actions}>
        <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" size="sm" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Submit Reply"}
        </Button>
      </div>
    </form>
  );
}
