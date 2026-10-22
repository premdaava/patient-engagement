import styles from "./TemplatePreview.module.css";

interface TemplatePreviewProps {
  subject: string;
  body: string;
}

export function TemplatePreview({ subject, body }: TemplatePreviewProps) {
  // Replace tags with sample mock values for realistic live preview
  const interpolatedSubject = subject
    .replace(/\{\{firstName\}\}/g, "Emily")
    .replace(/\{\{lastName\}\}/g, "Watson")
    .replace(/\{\{practiceName\}\}/g, "CareConnect Dental")
    .replace(/\{\{appointmentDate\}\}/g, "Friday, Nov 14 at 2:30 PM")
    .replace(/\{\{doctorName\}\}/g, "Dr. Sarah Jenkins");

  const interpolatedBody = body
    .replace(/\{\{firstName\}\}/g, "Emily")
    .replace(/\{\{lastName\}\}/g, "Watson")
    .replace(/\{\{practiceName\}\}/g, "CareConnect Dental")
    .replace(/\{\{appointmentDate\}\}/g, "Friday, Nov 14 at 2:30 PM")
    .replace(/\{\{doctorName\}\}/g, "Dr. Sarah Jenkins");

  return (
    <div className={styles.previewBox}>
      <div className={styles.previewHeader}>
        <h3 className={styles.previewTitle}>Live Patient Preview</h3>
        <span style={{ fontSize: "0.75rem", color: "var(--color-success)", fontWeight: 500 }}>
          ● Simulated render (Emily Watson)
        </span>
      </div>
      <div className={styles.emailFrame}>
        <div className={styles.emailHeaderRow}>
          <div><strong>From:</strong> CareConnect Dental &lt;noreply@careconnect.com&gt;</div>
          <div><strong>To:</strong> Emily Watson &lt;emily.watson@gmail.com&gt;</div>
        </div>
        <div>
          <h4 className={styles.emailSubjectDisplay}>
            {interpolatedSubject || "(No subject)"}
          </h4>
        </div>
        <div className={styles.emailBodyDisplay}>
          {interpolatedBody || "(No message body content)"}
        </div>
      </div>
    </div>
  );
}
