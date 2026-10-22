"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, BarChart3, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Survey, SurveyQuestion } from "@/db/schema/surveys";
import { saveSurvey } from "../actions/saveSurvey";
import { QuestionEditor, QuestionEditorItem } from "./QuestionEditor";
import { QuestionTypePicker } from "./QuestionTypePicker";
import { SurveyPreview } from "./SurveyPreview";
import styles from "./SurveyBuilder.module.css";

interface SurveyBuilderProps {
  survey?: Survey | null;
  questions?: SurveyQuestion[];
}

export function SurveyBuilder({ survey, questions: initialQuestions }: SurveyBuilderProps) {
  const router = useRouter();
  const [title, setTitle] = useState(survey?.title || "");
  const [description, setDescription] = useState(survey?.description || "");
  const [status, setStatus] = useState<"draft" | "active" | "closed">(survey?.status || "draft");

  const formattedQuestions: QuestionEditorItem[] =
    initialQuestions && initialQuestions.length > 0
      ? initialQuestions.map((q) => ({
          id: q.id,
          questionText: q.questionText,
          questionType: q.questionType,
          options: q.options,
          isRequired: q.isRequired,
        }))
      : [
          { id: "1", questionText: "How satisfied were you with your visit today?", questionType: "rating" },
          { id: "2", questionText: "How likely are you to recommend us to friends and family?", questionType: "multiple_choice", options: "0 - Not likely, 5 - Neutral, 10 - Extremely Likely" },
          { id: "3", questionText: "Any additional feedback for our care team?", questionType: "text" },
        ];

  const [questions, setQuestions] = useState<QuestionEditorItem[]>(formattedQuestions);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  function handleAddQuestion(type: "rating" | "multiple_choice" | "text" | "yes_no") {
    const newQ: QuestionEditorItem = {
      id: Math.random().toString(36).substring(2, 9),
      questionText: type === "rating" ? "Rate your experience:" : type === "multiple_choice" ? "Select an option:" : type === "yes_no" ? "Do you agree?" : "Please provide your comments:",
      questionType: type,
      options: type === "multiple_choice" ? "Option 1, Option 2, Option 3" : null,
    };
    setQuestions([...questions, newQ]);
  }

  function handleUpdateQuestion(index: number, updated: QuestionEditorItem) {
    const copy = [...questions];
    copy[index] = updated;
    setQuestions(copy);
  }

  function handleMoveUp(index: number) {
    if (index === 0) return;
    const copy = [...questions];
    const temp = copy[index];
    copy[index] = copy[index - 1];
    copy[index - 1] = temp;
    setQuestions(copy);
  }

  function handleMoveDown(index: number) {
    if (index === questions.length - 1) return;
    const copy = [...questions];
    const temp = copy[index];
    copy[index] = copy[index + 1];
    copy[index + 1] = temp;
    setQuestions(copy);
  }
  function handleRemove(index: number) {
    setQuestions(questions.filter((_, i) => i !== index));
  }

  async function handleSave(newStatus?: "draft" | "active" | "closed") {
    if (!title.trim()) {
      setError("Survey title is required.");
      return;
    }

    setIsSaving(true);
    setError(null);
    setSuccessMsg(null);

    const activeStatus = newStatus || status;
    const res = await saveSurvey({
      id: survey?.id,
      title,
      description,
      status: activeStatus,
      questions: questions.map((q, idx) => ({
        questionText: q.questionText,
        questionType: q.questionType,
        options: q.options || null,
        isRequired: q.isRequired ?? false,
        sortOrder: idx,
      })),
    });

    setIsSaving(false);
    if (res.success) {
      setStatus(activeStatus);
      setSuccessMsg("Survey saved successfully!");
      if (!survey?.id && res.id) {
        router.push(`/surveys/${res.id}`);
      } else {
        router.refresh();
      }
    } else {
      setError(res.error || "Failed to save survey.");
    }
  }

  return (
    <div>
      {error && <div className={styles.errorBanner} style={{ marginBottom: 16 }}>{error}</div>}
      {successMsg && <div className={styles.successBanner} style={{ marginBottom: 16 }}>{successMsg}</div>}

      <div className={styles.composerLayout}>
        <div className={styles.formPane}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Survey Title</label>
            <Input
              placeholder="e.g. Post-Visit Patient Satisfaction Survey"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Description (Optional)</label>
            <textarea
              className={styles.input}
              rows={3}
              placeholder="Explain the purpose of this survey to patients..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ fontFamily: "inherit", resize: "vertical" }}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Survey Status</label>
            <select
              className={styles.input}
              value={status}
              onChange={(e) => setStatus(e.target.value as "draft" | "active" | "closed")}
            >
              <option value="draft">Draft</option>
              <option value="active">Active (Accepting Responses)</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Questions</label>
            <QuestionTypePicker onAddQuestion={handleAddQuestion} />
            <div className={styles.questionsContainer}>
              {questions.map((q, idx) => (
                <QuestionEditor
                  key={q.id}
                  question={q}
                  index={idx}
                  total={questions.length}
                  onChange={(updated) => handleUpdateQuestion(idx, updated)}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </div>

          <div className={styles.actionsBar}>
            <div style={{ display: "flex", gap: 8 }}>
              <Button
                type="button"
                variant="outline"
                leftIcon={<ArrowLeft size={16} />}
                onClick={() => router.push("/surveys")}
              >
                Back
              </Button>
              {survey?.id && (
                <Button
                  type="button"
                  variant="outline"
                  leftIcon={<BarChart3 size={16} />}
                  onClick={() => router.push(`/surveys/${survey.id}/results`)}
                >
                  View Results
                </Button>
              )}
              {status === "active" && survey?.id && (
                <Button
                  type="button"
                  variant="outline"
                  leftIcon={<Globe size={16} />}
                  onClick={() => window.open(`/s/${survey.id}`, "_blank")}
                >
                  Public Link
                </Button>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSave("draft")}
                disabled={isSaving}
              >
                Save Draft
              </Button>
              <Button
                type="button"
                leftIcon={<Save size={16} />}
                onClick={() => handleSave(status === "draft" ? "active" : status)}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save & Publish"}
              </Button>
            </div>
          </div>
        </div>

        <div>
          <SurveyPreview title={title} description={description} questions={questions} />
        </div>
      </div>
    </div>
  );
}




