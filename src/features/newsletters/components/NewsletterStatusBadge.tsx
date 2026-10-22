import styles from "./NewsletterStatusBadge.module.css";

interface NewsletterStatusBadgeProps {
  status: "draft" | "scheduled" | "sent";
}

export function NewsletterStatusBadge({ status }: NewsletterStatusBadgeProps) {
  return <span className={`${styles.badge} ${styles[status]}`}>{status}</span>;
}
