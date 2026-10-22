"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { EmailTemplate } from "@/db/schema/emailTemplates";
import { saveEmailTemplate } from "../actions/saveTemplate";
import { TagPicker } from "./TagPicker";
import { TemplatePreview } from "./TemplatePreview";
import styles from "./TemplateEditor.module.css";

interface TemplateEditorProps {
  template?: EmailTemplate | null;
}

export function TemplateEditor({ template }: TemplateEditorProps) {
  const router = useRouter();
  const [name, setName] = useState(template?.name || "");
  const [subject, setSubject] = useState(template?.subject || "");
  const [body, setBody] = useState(template?.body || "");
  const [activeField, setActiveField] = useState<"subject" | "body">("body");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  function handleInsertTag(tag: string) {
    if (activeField === "subject") {
      setSubject((prev) => prev + tag);
    } else {
      setBody((prev) => prev + tag);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !subject.trim() || !body.trim()) {
      setError("All fields are required.");
      return;
    }

    setIsSaving(true);
    setError(null);
    setSuccessMsg(null);

    const res = await saveEmailTemplate({
      id: template?.id,
      name,
      subject,
      body,
    });

    setIsSaving(false);
    if (res.success) {
      setSuccessMsg("Template saved successfully!");
      if (!template?.id && res.id) {
        router.push(`/email-templates/${res.id}`);
      } else {
        router.refresh();
      }
    } else {
      setError(res.error || "Failed to save template.");
    }
  }

  return (
    <form onSubmit={handleSave} className={styles.editorLayout}>
      <div className={styles.formPane}>
        {error && <div className={styles.errorBanner}>{error}</div>}
        {successMsg && <div className={styles.successBanner}>{successMsg}</div>}

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Template Name</label>
          <Input
            placeholder="e.g. 6-Month Routine Recall"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Email Subject</label>
          <Input
            placeholder="e.g. Time for your dental checkup!"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            onFocus={() => setActiveField("subject")}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Email Body Content</label>
          <textarea
            className={styles.textarea}
            placeholder="Write your email body here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onFocus={() => setActiveField("body")}
          />
          <TagPicker onInsertTag={handleInsertTag} />
        </div>

        <div className={styles.actionsBar}>
          <Button
            type="button"
            variant="outline"
            leftIcon={<ArrowLeft size={16} />}
            onClick={() => router.push("/email-templates")}
          >
            Back to Templates
          </Button>
          <Button
            type="submit"
            leftIcon={<Save size={16} />}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Template"}
          </Button>
        </div>
      </div>

      <div>
        <TemplatePreview subject={subject} body={body} />
      </div>
    </form>
  );
}
