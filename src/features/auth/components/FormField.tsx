import { ReactNode } from "react";
import styles from "./FormField.module.css";

interface FormFieldProps {
  label: string;
  id?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function FormField({
  label,
  id,
  error,
  hint,
  required,
  children,
  className = "",
}: FormFieldProps) {
  return (
    <div className={`${styles.formField} ${className}`.trim()}>
      <label htmlFor={id} className={styles.formFieldLabel}>
        {label}
        {required && <span className={styles.formFieldRequired}> *</span>}
      </label>
      <div className={styles.formFieldControl}>{children}</div>
      {error && (
        <p className={styles.formFieldError} role="alert" id={id ? `${id}-error` : undefined}>
          {error}
        </p>
      )}
      {!error && hint && (
        <p className={styles.formFieldHint} id={id ? `${id}-hint` : undefined}>
          {hint}
        </p>
      )}
    </div>
  );
}
