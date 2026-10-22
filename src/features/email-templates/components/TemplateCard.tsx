import Link from "next/link";
import { FileCode, ArrowRight } from "lucide-react";
import { EmailTemplate } from "@/db/schema/emailTemplates";
import styles from "./TemplateCard.module.css";

interface TemplateCardProps {
  template: EmailTemplate;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const formattedDate = new Date(template.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={`/email-templates/${template.id}`} className={styles.card}>
      <div>
        <div className={styles.header}>
          <h3 className={styles.title}>{template.name}</h3>
          <FileCode size={20} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
        </div>
        <p className={styles.subject}><strong>Subject:</strong> {template.subject}</p>
        <div className={styles.previewThumb}>
          {template.body}
        </div>
      </div>
      <div className={styles.footer}>
        <span>Created {formattedDate}</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 500, color: "var(--color-primary)" }}>
          Edit <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
