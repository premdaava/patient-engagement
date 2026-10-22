import { ReactNode } from "react";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      {icon && <div className={styles.emptyStateIcon}>{icon}</div>}
      <h4 className={styles.emptyStateTitle}>{title}</h4>
      {description && <p className={styles.emptyStateDescription}>{description}</p>}
      {action && <div className={styles.emptyStateAction}>{action}</div>}
    </div>
  );
}
