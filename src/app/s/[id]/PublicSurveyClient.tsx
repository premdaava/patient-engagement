"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Survey, SurveyQuestion } from "@/db/schema/surveys";
import { submitSurveyResponse } from "@/features/surveys/actions/saveSurvey";
import { RatingInput, NpsInput } from "@/features/surveys/components";
import styles from "./PublicSurveyClient.module.css";

interface PublicSurveyClientProps {
  survey: Survey;
  questions: SurveyQuestion[];
}

export function PublicSurveyClient({ survey, questions }: PublicSurveyClientProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleAnswerChange(questionId: string, value: string) {
    setAnswers({ ...answers, [questionId]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const res = await submitSurveyResponse(survey.id, answers);
    setIsSubmitting(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      setError(res.error || "Failed to submit survey.");
    }
  }

  if (submitted) {
    return (
      <div className={styles.publicContainer}>
        <div className={styles.publicCard}>
          <div className={styles.successBox}>
            <CheckCircle2 size={56} style={{ color: "var(--color-success)" }} />
            <h2 className={styles.title}>Thank You!</h2>
            <p className={styles.description}>Your feedback has been successfully submitted to your care team.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.publicContainer}>
      <form onSubmit={handleSubmit} className={styles.publicCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>{survey.title}</h1>
          {survey.description && <p className={styles.description}>{survey.description}</p>}
        </div>

        {error && <div style={{ background: "#fef2f2", color: "#b91c1c", padding: 12, borderRadius: 6, fontSize: "0.9rem" }}>{error}</div>}

        <div className={styles.questionsList}>
          {questions.map((q, idx) => {
            const val = answers[q.id] || "";

            return (
              <div key={q.id} className={styles.questionBlock}>
                <h3 className={styles.questionText}>
                  {idx + 1}. {q.questionText} {q.isRequired && <span style={{ color: "#ef4444" }}>*</span>}
                </h3>

                {q.questionType === "rating" && (
                  <RatingInput
                    value={Number(val) || 0}
                    onChange={(score) => handleAnswerChange(q.id, score.toString())}
                  />
                )}

                {q.questionType === "multiple_choice" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {(q.options ? q.options.split(",") : ["Option 1", "Option 2"]).map((opt, i) => {
                      const trimmed = opt.trim();
                      return (
                        <label key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.95krem", cursor: "pointer" }}>
                          <input
                            type="radio"
                            name={q.id}
                            checked={val === trimmed}
                            onChange={() => handleAnswerChange(q.id, trimmed)}
                          />
                          {trimmed}
                        </label>
                      );
                    })}
                  </div>
                )}

                {q.questionType === "yes_no" && (
                  <div style={{ display: "flex", gap: 16 }}>
                    {["Yes", "No"].map((opt) => (
                      <label key={opt} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                        <input
                          type="radio"
                          name={q.id}
                          checked={val === opt}
                          onChange={() => handleAnswerChange(q.id, opt)}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                )}

                {q.questionType === "text" && (
                  <textarea
                    className={styles.textarea}
                    placeholder="Type your response here..."
                    value={val}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  />
                )}
              </div>
            );
          })}
        </div>

        <Button type="submit" leftIcon={<Send size={16} />} disabled={isSubmitting} style={{ width: "100%", justifyContent: "center" }}>
          {isSubmitting ? "Submitting..." : "Submit Response"}
        </Button>
      </form>
    </div>
  );
}
