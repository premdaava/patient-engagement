import styles from "./ResultsSummary.module.css";

interface ResultsSummaryProps {
  totalSubmissions: number;
  questionCount: number;
  completionRate?: string;
}

export function ResultsSummary({ totalSubmissions, questionCount, completionRate = "94%" }: ResultsSummaryProps) {
  return (
    <div className={styles.statsGrid}>
      <div className={styles.statCard}>
        <span className={styles.statLabel}>Total Responses</span>
        <span className={styles.statValue}>{totalSubmissions}</span>
      </div>
      <div className={styles.statCard}>
        <span className={styles.statLabel}>Total Questions</span>
        <span className={styles.statValue}>{questionCount}</span>
      </div>
      <div className={styles.statCard}>
        <span className={styles.statLabel}>Completion Rate</span>
        <span className={styles.statValue}>{completionRate}</span>
      </div>
    </div>
  );
}
