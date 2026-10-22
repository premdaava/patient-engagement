import { Plus } from "lucide-react";
import styles from "./BlockToolbar.module.css";

interface BlockToolbarProps {
  onAddBlock: (type: "heading" | "paragraph" | "image" | "button") => void;
}

export function BlockToolbar({ onAddBlock }: BlockToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <span style={{ fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", marginRight: "var(--space-2)" }}>
        <Plus size={15} style={{ marginRight: 4 }} /> Add Section:
      </span>
      <button type="button" className={styles.addBtn} onClick={() => onAddBlock("heading")}>
        + Heading
      </button>
      <button type="button" className={styles.addBtn} onClick={() => onAddBlock("paragraph")}>
        + Paragraph
      </button>
      <button type="button" className={styles.addBtn} onClick={() => onAddBlock("image")}>
        + Image URL
      </button>
      <button type="button" className={styles.addBtn} onClick={() => onAddBlock("button")}>
        + Button CTA
      </button>
    </div>
  );
}

