import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./Checkbox.module.css";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  hint?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, hint, error, id, className = "", ...props }, ref) {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={`${styles.checkbox} ${className}`.trim()}>
        <label htmlFor={inputId} className={styles.checkboxLabel}>
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            className={`${styles.checkboxInput} ${error ? styles.checkboxInputError : ""}`.trim()}
            aria-invalid={Boolean(error)}
            {...props}
          />
          <span className={styles.checkboxText}>{label}</span>
        </label>
        {hint && !error && <span className={styles.checkboxHint}>{hint}</span>}
        {error && (
          <span className={styles.checkboxErrorMessage} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);
