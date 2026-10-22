import { EmailTemplate } from "@/db/schema/emailTemplates";
import { TemplateCard } from "./TemplateCard";
import styles from "./TemplateGrid.module.css";

interface TemplateGridProps {
  templates: EmailTemplate[];
}

export function TemplateGrid({ templates }: TemplateGridProps) {
  if (templates.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No email templates found. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </div>
  );
}
