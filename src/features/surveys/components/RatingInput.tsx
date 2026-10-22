import styles from "./RatingInput.module.css";

interface RatingInputProps {
  value: number;
  onChange: (val: number) => void;
  max?: number;
}

export function RatingInput({ value, onChange, max = 5 }: RatingInputProps) {
  return (
    <div className={styles.container}>
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          className={`${styles.starBtn} ${value === n ? styles.selected : ""}`}
          onClick={() => onChange(n)}
        >
          ★ {n}
        </button>
      ))}
    </div>
  );
}
