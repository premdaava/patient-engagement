"use client";

import { InputHTMLAttributes, forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./PasswordInput.module.css";

export interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  hasError?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ hasError, className = "", ...props }, ref) {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={`${styles.passwordInput} ${className}`.trim()}>
        <input
          ref={ref}
          type={showPassword ? "text" : "password"}
          className={`${styles.passwordInputField} ${hasError ? styles.passwordInputFieldHasError : ""}`.trim()}
          {...props}
        />
        <button
          type="button"
          className={styles.passwordInputToggle}
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    );
  }
);
