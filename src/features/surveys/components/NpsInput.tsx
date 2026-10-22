import styles from "./NpsInput.module.css";

interface NpsInputProps {
  value: number;
  onChange: (val: number) => void;
}

export function NpsInput({ value, onChange }: NpsInputProps) {
  return (
    <div className={styles.container}>
      {Array.from({ length: 11 }, (_, i) => i).map((n) => (
        <button
          key={n}
          type="button"
          className={`${styles.npsBtn} ${value === n ? styles.selected : ""}`}
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}
    </div>
  );
}
