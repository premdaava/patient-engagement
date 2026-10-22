import { ButtonHTMLAttributes, ReactNode } from "react";
import { Spinner } from "./Spinner";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const variantClass = styles[`button${variant.charAt(0).toUpperCase() + variant.slice(1)}`];
  const sizeClass = styles[`button${size.charAt(0).toUpperCase() + size.slice(1)}`];

  return (
    <button
      className={`${styles.button} ${variantClass} ${sizeClass} ${className}`.trim()}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <Spinner size={size === "lg" ? "md" : "sm"} />
      ) : (
        leftIcon && <span className={styles.buttonIcon}>{leftIcon}</span>
      )}
      <span className={styles.buttonLabel}>{children}</span>
      {!isLoading && rightIcon && (
        <span className={styles.buttonIcon}>{rightIcon}</span>
      )}
    </button>
  );
}
