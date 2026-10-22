import Link from "next/link";
import { ArrowRight, BarChart3, ExternalLink } from "lucide-react";
import { SurveyWithStats } from "../queries";
import { SurveyStatusBadge } from "./SurveyStatusBadge";
import styles from "./SurveyRow.module.css";

interface SurveyRowProps {
  survey: SurveyWithStats;
}

export function SurveyRow({ survey }: SurveyRowProps) {
  const formattedDate = new Date(survey.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className={styles.row}>
      <div className={styles.mainInfo}>
        <Link href={`/surveys/${survey.id}`} style={{ textDecoration: "none" }}>
          <h3 className={styles.title}>{survey.title}</h3>
        </Link>
        <div className={styles.meta}>
          {survey.questionCount} Questions • {survey.responseCount} Responses • Created {formattedDate}
        </div>
      </div>
      <div className={styles.rightInfo}>
        <SurveyStatusBadge status={survey.status} />
        <div className={styles.actions}>
          <Link
            href={`/surveys/${survey.id}/results`}
            style={{ display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 500, color: "var(--color-primary)", fontSize: "0.85rem", padding: "6px 10px", background: "var(--color-background)", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)" }}
          >
            <BarChart3 size={14} /> Results
          </Link>
          {survey.status === "active" && (
            <a
              href={`/s/${survey.id}`}
              target="_blank"
              rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 500, color: "var(--color-text-muted)", fontSize: "0.85rem", padding: "6px 10px", background: "var(--color-background)", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)" }}
              title="Public Survey Link"
            >
              <ExternalLink size={14} />
            </a>
          )}
          <Link
            href={`/surveys/${survey.id}`}
            style={{ display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 500, color: "var(--color-primary)", fontSize: "0.85rem" }}
          >
            Edit <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
