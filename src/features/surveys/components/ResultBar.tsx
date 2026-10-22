import styles from "./ResultBar.module.css";

interface ResultBarProps {
  label: string;
  count: number;
  total: number;
}

export function ResultBar({ label, count, total }: ResultBarProps) {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div className={styles.barRow}>
      <span className={styles.label} title={label}>{label}</span>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${percentage}%` }} />
      </div>
      <span className={styles.count}>{count} ({percentage}%)</span>
    </div>
  );
}
