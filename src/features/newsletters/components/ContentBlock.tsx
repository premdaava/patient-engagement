import { ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import styles from "./ContentBlock.module.css";

export interface ContentBlockItem {
  id: string;
  type: "heading" | "paragraph" | "image" | "button";
  value: string;
  url?: string; // for button or image
}

interface ContentBlockProps {
  block: ContentBlockItem;
  index: number;
  total: number;
  onChange: (updated: ContentBlockItem) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onRemove: (index: number) => void;
}

export function ContentBlock({
  block,
  index,
  total,
  onChange,
  onMoveUp,
  onMoveDown,
  onRemove,
}: ContentBlockProps) {
  return (
    <div className={styles.blockCard}>
      <div className={styles.blockHeader}>
        <span className={styles.blockTitle}>
          Section {index + 1}: {block.type}
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
            title="Remove Section"
            style={{ color: "#ef4444" }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {block.type === "heading" && (
        <input
          type="text"
          className={styles.input}
          placeholder="Heading title..."
          value={block.value}
          onChange={(e) => onChange({ ...block, value: e.target.value })}
        />
      )}

      {block.type === "paragraph" && (
        <textarea
          className={styles.textarea}
          placeholder="Write paragraph content here..."
          value={block.value}
          onChange={(e) => onChange({ ...block, value: e.target.value })}
        />
      )}

      {block.type === "image" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <input
            type="text"
            className={styles.input}
            placeholder="Image URL (e.g. https://images.unsplash.com/...)"
            value={block.value}
            onChange={(e) => onChange({ ...block, value: e.target.value })}
          />
        </div>
      )}

      {block.type === "button" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <input
            type="text"
            className={styles.input}
            placeholder="Button Label (e.g. Book Appointment)"
            value={block.value}
            onChange={(e) => onChange({ ...block, value: e.target.value })}
          />
          <input
            type="text"
            className={styles.input}
            placeholder="Button URL (e.g. https://...)"
            value={block.url || ""}
            onChange={(e) => onChange({ ...block, url: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}
