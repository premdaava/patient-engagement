import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsletterWithTemplate } from "../queries";
import { NewsletterStatusBadge } from "./NewsletterStatusBadge";
import styles from "./NewsletterRow.module.css";

interface NewsletterRowProps {
  newsletter: NewsletterWithTemplate;
}

export function NewsletterRow({ newsletter }: NewsletterRowProps) {
  const formattedDate = new Date(newsletter.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={`/newsletters/${newsletter.id}`} className={styles.row}>
      <div className={styles.mainInfo}>
        <h3 className={styles.title}>{newsletter.title}</h3>
        <div className={styles.meta}>
          {newsletter.templateName ? `Template: ${newsletter.templateName} • ` : ""}
          Created {formattedDate}
        </div>
      </div>
      <div className={styles.rightInfo}>
        <NewsletterStatusBadge status={newsletter.status} />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 500, color: "var(--color-primary)", fontSize: "0.85rem" }}>
          View <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
