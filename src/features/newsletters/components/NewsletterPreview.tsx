import { ContentBlockItem } from "./ContentBlock";
import styles from "./NewsletterPreview.module.css";

interface NewsletterPreviewProps {
  title: string;
  blocks: ContentBlockItem[];
}

export function NewsletterPreview({ title, blocks }: NewsletterPreviewProps) {
  return (
    <div className={styles.previewBox}>
      <div className={styles.previewHeader}>
        <h3 className={styles.previewTitle}>Live Newsletter Preview</h3>
        <span style={{ fontSize: "0.75rem", color: "var(--color-success)", fontWeight: 500 }}>
          ● Responsive Email Render
        </span>
      </div>
      <div className={styles.emailFrame}>
        <div style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "var(--space-3)" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>Newsletter</div>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "4px 0 0 0" }}>{title || "(Untitled Newsletter)"}</h2>
        </div>

        {blocks.length === 0 ? (
          <p style={{ color: "var(--color-text-muted)", fontStyle: "italic", textAlign: "center", padding: "var(--space-8)" }}>
            Add sections below to build your newsletter content.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            {blocks.map((block) => {
              if (block.type === "heading") {
                return <h3 key={block.id} className={styles.previewHeading}>{block.value}</h3>;
              }
              if (block.type === "paragraph") {
                return <p key={block.id} className={styles.previewParagraph}>{block.value}</p>;
              }
              if (block.type === "image") {
                if (!block.value) return null;
                return <img key={block.id} src={block.value} alt="Newsletter image" className={styles.previewImage} />;
              }
              if (block.type === "button") {
                return (
                  <a key={block.id} href={block.url || "#"} className={styles.previewButton} target="_blank" rel="noreferrer">
                    {block.value || "Click Here"}
                  </a>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
