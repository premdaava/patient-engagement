"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Save, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { EmailTemplate } from "@/db/schema/emailTemplates";
import { Newsletter } from "@/db/schema/newsletters";
import { TemplatePicker } from "@/features/email-templates/components";
import { saveNewsletter, sendTestNewsletter } from "../actions/saveNewsletter";
import { ContentBlock, ContentBlockItem } from "./ContentBlock";
import { BlockToolbar } from "./BlockToolbar";
import { NewsletterPreview } from "./NewsletterPreview";
import styles from "./NewsletterComposer.module.css";

interface NewsletterComposerProps {
  newsletter?: Newsletter | null;
  templates: EmailTemplate[];
}

export function NewsletterComposer({ newsletter, templates }: NewsletterComposerProps) {
  const router = useRouter();
  const [title, setTitle] = useState(newsletter?.title || "");
  const [templateId, setTemplateId] = useState<string>(newsletter?.templateId || templates[0]?.id || "");
  
  const initialBlocks: ContentBlockItem[] = newsletter?.content
    ? (() => {
        try {
          return JSON.parse(newsletter.content);
        } catch {
          return [{ id: "1", type: "paragraph", value: newsletter.content }];
        }
      })()
    : [
        { id: "1", type: "heading", value: "Welcome to Our Monthly Patient Newsletter" },
        { id: "2", type: "paragraph", value: "We hope you are having a wonderful month! Here are the latest updates from our practice." },
      ];

  const [blocks, setBlocks] = useState<ContentBlockItem[]>(initialBlocks);
  const [isSaving, setIsSaving] = useState(false);
  const [testEmail, setTestEmail] = useState("demo@careconnect.com");
  const [isTesting, setIsTesting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  function handleAddBlock(type: "heading" | "paragraph" | "image" | "button") {
    const newBlock: ContentBlockItem = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      value: type === "heading" ? "New Section Title" : type === "paragraph" ? "Enter your text here..." : type === "image" ? "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800" : "Book Now",
      url: type === "button" ? "https://careconnect.com" : undefined,
    };
    setBlocks([...blocks, newBlock]);
  }

  function handleUpdateBlock(index: number, updated: ContentBlockItem) {
    const copy = [...blocks];
    copy[index] = updated;
    setBlocks(copy);
  }

  function handleMoveUp(index: number) {
    if (index === 0) return;
    const copy = [...blocks];
    const temp = copy[index];
    copy[index] = copy[index - 1];
    copy[index - 1] = temp;
    setBlocks(copy);
  }

  function handleMoveDown(index: number) {
    if (index === blocks.length - 1) return;
    const copy = [...blocks];
    const temp = copy[index];
    copy[index] = copy[index + 1];
    copy[index + 1] = temp;
    setBlocks(copy);
  }

  function handleRemove(index: number) {
    setBlocks(blocks.filter((_, i) => i !== index));
  }

  async function handleSave(status: "draft" | "scheduled" | "sent" = "draft") {
    if (!title.trim()) {
      setError("Newsletter title is required.");
      return;
    }

    setIsSaving(true);
    setError(null);
    setSuccessMsg(null);

    const contentJson = JSON.stringify(blocks);
    const res = await saveNewsletter({
      id: newsletter?.id,
      title,
      templateId: templateId || null,
      content: contentJson,
      status,
    });

    setIsSaving(false);
    if (res.success) {
      setSuccessMsg(status === "sent" ? "Newsletter sent successfully!" : "Newsletter saved successfully!");
      if (!newsletter?.id && res.id) {
        router.push(`/newsletters/${res.id}`);
      } else {
        router.refresh();
      }
    } else {
      setError(res.error || "Failed to save newsletter.");
    }
  }

  async function handleSendTest() {
    if (!newsletter?.id) {
      setError("Please save the newsletter as a draft first before sending a test.");
      return;
    }
    setIsTesting(true);
    const res = await sendTestNewsletter(newsletter.id, testEmail);
    setIsTesting(false);
    if (res.success) {
      setSuccessMsg(res.message);
    } else {
      setError("Failed to send test email.");
    }
  }
  return (
    <div>
      {newsletter?.status === "sent" && (
        <div className={styles.statsCard}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Status</span>
            <span className={styles.statValue} style={{ color: "#166534" }}>Sent Successfully</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Sent Date</span>
            <span className={styles.statValue}>
              {newsletter.sentAt ? new Date(newsletter.sentAt).toLocaleString() : "N/A"}
            </span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Estimated Delivery</span>
            <span className={styles.statValue}>1,420 Patients</span>
          </div>
        </div>
      )}

      {error && <div className={styles.errorBanner} style={{ marginBottom: 16 }}>{error}</div>}
      {successMsg && <div className={styles.successBanner} style={{ marginBottom: 16 }}>{successMsg}</div>}

      <div className={styles.composerLayout}>
        <div className={styles.formPane}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Newsletter Title</label>
            <Input
              placeholder="e.g. November Wellness & Smile Newsletter"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Base Email Template</label>
            <TemplatePicker
              templates={templates}
              selectedId={templateId}
              onChange={setTemplateId}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Content Sections</label>
            <BlockToolbar onAddBlock={handleAddBlock} />
            <div className={styles.blocksContainer}>
              {blocks.map((block, idx) => (
                <ContentBlock
                  key={block.id}
                  block={block}
                  index={idx}
                  total={blocks.length}
                  onChange={(updated) => handleUpdateBlock(idx, updated)}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </div>

          <div className={styles.fieldGroup} style={{ marginTop: 8 }}>
            <label className={styles.label}>Send Test Email</label>
            <div style={{ display: "flex", gap: 8 }}>
              <Input
                placeholder="test@example.com"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleSendTest}
                disabled={isTesting || !newsletter?.id}
                leftIcon={<Mail size={16} />}
              >
                {isTesting ? "Sending..." : "Send Test"}
              </Button>
            </div>
          </div>

          <div className={styles.actionsBar}>
            <Button
              type="button"
              variant="outline"
              leftIcon={<ArrowLeft size={16} />}
              onClick={() => router.push("/newsletters")}
            >
              Back
            </Button>
            <div style={{ display: "flex", gap: 8 }}>
              <Button
                type="button"
                variant="outline"
                leftIcon={<Save size={16} />}
                onClick={() => handleSave("draft")}
                disabled={isSaving}
              >
                Save Draft
              </Button>
              <Button
                type="button"
                leftIcon={<Send size={16} />}
                onClick={() => handleSave("sent")}
                disabled={isSaving}
              >
                {isSaving ? "Sending..." : "Send Now"}
              </Button>
            </div>
          </div>
        </div>

        <div>
          <NewsletterPreview title={title} blocks={blocks} />
        </div>
      </div>
    </div>
  );
}


