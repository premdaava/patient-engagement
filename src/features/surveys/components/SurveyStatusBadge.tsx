import styles from "./SurveyStatusBadge.module.css";

interface SurveyStatusBadgeProps {
  status: "draft" | "active" | "closed";
}

export function SurveyStatusBadge({ status }: SurveyStatusBadgeProps) {
  return <span className={`${styles.badge} ${styles[status]}`}>{status}</span>;
}
