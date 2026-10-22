import { NewsletterWithTemplate } from "../queries";
import { NewsletterRow } from "./NewsletterRow";
import styles from "./NewsletterList.module.css";

interface NewsletterListProps {
  newsletters: NewsletterWithTemplate[];
}

export function NewsletterList({ newsletters }: NewsletterListProps) {
  if (newsletters.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No newsletters found. Create your first patient newsletter!</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {newsletters.map((nl) => (
        <NewsletterRow key={nl.id} newsletter={nl} />
      ))}
    </div>
  );
}
