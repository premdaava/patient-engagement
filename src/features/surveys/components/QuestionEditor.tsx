import { ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import styles from "./QuestionEditor.module.css";

export interface QuestionEditorItem {
  id: string;
  questionText: string;
  questionType: "text" | "rating" | "multiple_choice" | "yes_no";
  options?: string | null;
  isRequired?: boolean;
}

interface QuestionEditorProps {
  question: QuestionEditorItem;
  index: number;
  total: number;
  onChange: (updated: QuestionEditorItem) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onRemove: (index: number) => void;
}

export function QuestionEditor({
  question,
  index,
  total,
  onChange,
  onMoveUp,
  onMoveDown,
  onRemove,
}: QuestionEditorProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.typeBadge}>
          Question {index + 1} ({question.questionType.replace("_", " ")})
        </span>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => onMoveUp(index)}
            disabled={index === 0}
            title="Move Up"
          >
            <ArrowUp size={16} />
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => onMoveDown(index)}
            disabled={index === total - 1}
            title="Move Down"
          >
            <ArrowDown size={16} />
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => onRemove(index)}
            title="Delete Question"
            style={{ color: "#ef4444" }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <input
        type="text"
        className={styles.input}
        placeholder="Enter question text..."
        value={question.questionText}
        onChange={(e) => onChange({ ...question, questionText: e.target.value })}
      />

      {question.questionType === "multiple_choice" && (
        <input
          type="text"
          className={styles.input}
          placeholder="Options separated by comma (e.g. Extremely Satisfied, Satisfied, Neutral, Dissatisfied)"
          value={question.options || ""}
          onChange={(e) => onChange({ ...question, options: e.target.value })}
        />
      )}
    </div>
  );
}
