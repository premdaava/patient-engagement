import { EmailTemplate } from "@/db/schema/emailTemplates";
import styles from "./TemplatePicker.module.css";

interface TemplatePickerProps {
  templates: EmailTemplate[];
  selectedId: string;
  onChange: (id: string) => void;
}

export function TemplatePicker({ templates, selectedId, onChange }: TemplatePickerProps) {
  if (templates.length === 0) {
    return <p style={{ color: "var(--color-text-muted)" }}>No email templates available.</p>;
  }

  return (
    <div className={styles.pickerContainer}>
      <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: 0 }}>Select Email Template</h3>
      <div className={styles.pickerGrid}>
        {templates.map((template) => {
          const isSelected = template.id === selectedId;
          return (
            <div
              key={template.id}
              className={`${styles.pickerCard} ${isSelected ? styles.pickerCardSelected : ""}`}
              onClick={() => onChange(template.id)}
            >
              <h4 className={styles.pickerTitle}>{template.name}</h4>
              <p className={styles.pickerSubject}>{template.subject}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
