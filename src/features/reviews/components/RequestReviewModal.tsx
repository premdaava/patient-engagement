"use client";

import { useState } from "react";
import { Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { requestReviewAction } from "../actions";
import styles from "./RequestReviewModal.module.css";

interface RequestReviewModalProps {
  onClose: () => void;
}

export function RequestReviewModal({ onClose }: RequestReviewModalProps) {
  const [type, setType] = useState<"email" | "sms">("email");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend() {
    setIsLoading(true);
    setError(null);

    const res = await requestReviewAction(type);
    setIsLoading(false);

    if (res.success) {
      onClose();
    } else {
      setError(res.error || "Failed to create review request campaign.");
    }
  }

  return (
    <div className={styles.requestModal}>
      <div className={styles.modalCard}>
        <div className={styles.modalTitle}>Request a Review</div>
        <p className={styles.modalDescription}>
          Send an automated review request campaign via Email or SMS to all active practice patients.
        </p>

        {error && <div style={{ color: "var(--color-error, #ef4444)", fontSize: "0.85rem" }}>{error}</div>}

        <div className={styles.typeOptions}>
          <button
            type="button"
            className={`${styles.typeBtn} ${type === "email" ? styles.active : ""}`}
            onClick={() => setType("email")}
          >
            <Mail size={24} />
            <span>Email Campaign</span>
          </button>
          <button
            type="button"
            className={`${styles.typeBtn} ${type === "sms" ? styles.active : ""}`}
            onClick={() => setType("sms")}
          >
            <MessageSquare size={24} />
            <span>SMS Campaign</span>
          </button>
        </div>

        <div className={styles.modalActions}>
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSend} disabled={isLoading}>
            {isLoading ? "Creating Campaign..." : `Send ${type.toUpperCase()} Campaign`}
          </Button>
        </div>
      </div>
    </div>
  );
}
