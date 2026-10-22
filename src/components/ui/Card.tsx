import { ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
}

export function Card({
  children,
  className = "",
  padding = "md",
  hoverable = false,
}: CardProps) {
  const paddingClass = styles[`cardPadding${padding.charAt(0).toUpperCase() + padding.slice(1)}`];
  return (
    <div
      className={`${styles.card} ${paddingClass} ${hoverable ? styles.cardHoverable : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className={styles.cardHeader}>
      <div>
        <h3 className={styles.cardHeaderTitle}>{title}</h3>
        {subtitle && <p className={styles.cardHeaderSubtitle}>{subtitle}</p>}
      </div>
      {action && <div className={styles.cardHeaderAction}>{action}</div>}
    </div>
  );
}
