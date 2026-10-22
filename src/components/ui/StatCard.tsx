import { ReactNode } from "react";
import styles from "./StatCard.module.css";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: ReactNode;
}

export function StatCard({
  label,
  value,
  change,
  changeType = "neutral",
  icon,
}: StatCardProps) {
  const changeClass = styles[`statCardChange${changeType.charAt(0).toUpperCase() + changeType.slice(1)}`];

  return (
    <div className={styles.statCard}>
      <div className={styles.statCardContent}>
        <span className={styles.statCardLabel}>{label}</span>
        <span className={styles.statCardValue}>{value}</span>
        {change && (
          <span className={`${styles.statCardChange} ${changeClass}`.trim()}>
            {change}
          </span>
        )}
      </div>
      {icon && <div className={styles.statCardIcon}>{icon}</div>}
    </div>
  );
}
