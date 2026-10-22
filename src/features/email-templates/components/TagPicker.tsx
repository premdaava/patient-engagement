import styles from "./TagPicker.module.css";

const MERGE_TAGS = [
  { label: "{{firstName}}", description: "Patient's first name" },
  { label: "{{lastName}}", description: "Patient's last name" },
  { label: "{{practiceName}}", description: "Practice or clinic name" },
  { label: "{{appointmentDate}}", description: "Scheduled appointment date/time" },
  { label: "{{doctorName}}", description: "Assigned doctor or practitioner" },
];

interface TagPickerProps {
  onInsertTag: (tag: string) => void;
}

export function TagPicker({ onInsertTag }: TagPickerProps) {
  return (
    <div className={styles.tagPicker}>
      <span className={styles.label}>Insert Tag:</span>
      {MERGE_TAGS.map((tag) => (
        <button
          key={tag.label}
          type="button"
          className={styles.tagBtn}
          onClick={() => onInsertTag(tag.label)}
          title={tag.description}
        >
          {tag.label}
        </button>
      ))}
    </div>
  );
}
