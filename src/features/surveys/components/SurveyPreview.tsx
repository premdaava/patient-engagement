import { QuestionEditorItem } from "./QuestionEditor";
import styles from "./SurveyPreview.module.css";

interface SurveyPreviewProps {
  title: string;
  description?: string | null;
  questions: QuestionEditorItem[];
}

export function SurveyPreview({ title, description, questions }: SurveyPreviewProps) {
  return (
    <div className={styles.previewBox}>
      <div className={styles.previewHeader}>
        <div>
          <h3 className={styles.previewTitle}>{title || "(Untitled Survey)"}</h3>
          {description && <p className={styles.previewDesc}>{description}</p>}
        </div>
        <span style={{ fontSize: "0.75rem", color: "var(--color-success)", fontWeight: 500 }}>
          ● Live Preview
        </span>
      </div>

      {questions.length === 0 ? (
        <p style={{ color: "var(--color-text-muted)", fontStyle: "italic", textAlign: "center", padding: "var(--space-8)" }}>
          Add questions on the left to preview your survey.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {questions.map((q, idx) => (
            <div key={q.id} className={styles.questionItem}>
              <p className={styles.qText}>
                {idx + 1}. {q.questionText || "( Untitled Question )"}
              </p>

              {q.questionType === "rating" && (
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      style={{
                        padding: "6px 12px",
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                      }}
                    >
                      ★ {n}
                    </span>
                  ))}
                </div>
              )}

              {q.questionType === "multiple_choice" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
                  {(q.options ? q.options.split(",") : ["Option 1", "Option 2"]).map((opt, i) => (
                    <label key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.9rem", color: "var(--color-text-main)" }}>
                      <input type="radio" name={`preview-${q.id}`} disabled />
                      {opt.trim()}
                    </label>
                  ))}
                </div>
              )}

              {q.questionType === "yes_no" && (
                <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <input type="radio" name={`preview-yn-${q.id}`} disabled /> Yes
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <input type="radio" name={`preview-yn-${q.id}`} disabled /> No
                  </label>
                </div>
              )}

              {q.questionType === "text" && (
                <input
                  type="text"
                  placeholder="Patient short answer..."
                  disabled
                  style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid var(--color-border)", background: "var(--color-surface)" }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
