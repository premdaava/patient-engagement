import { Plus } from "lucide-react";
import styles from "./QuestionTypePicker.module.css";

interface QuestionTypePickerProps {
  onAddQuestion: (type: "rating" | "multiple_choice" | "text" | "yes_no") => void;
}

export function QuestionTypePicker({ onAddQuestion }: QuestionTypePickerProps) {
  return (
    <div className={styles.toolbar}>
      <span style={{ fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", marginRight: "var(--space-2)" }}>
        <Plus size={15} style={{ marginRight: 4 }} /> Add Question:
      </span>
      <button type="button" className={styles.addBtn} onClick={() => onAddQuestion("rating")}>
        + Rating (1-5)
      </button>
      <button type="button" className={styles.addBtn} onClick={() => onAddQuestion("multiple_choice")}>
        + Multiple Choice / NPS
      </button>
      <button type="button" className={styles.addBtn} onClick={() => onAddQuestion("text")}>
        + Short Text
      </button>
      <button type="button" className={styles.addBtn} onClick={() => onAddQuestion("yes_no")}>
        + Yes / No
      </button>
    </div>
  );
}
