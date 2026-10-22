import { ReactNode } from "react";
import styles from "./Badge.module.css";

export type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
}

export function Badge({ children, variant = "default", size = "md" }: BadgeProps) {
  const variantClass = styles[`badge${variant.charAt(0).toUpperCase() + variant.slice(1)}`];
  const sizeClass = size === "sm" ? styles.badgeSm : "";
  return (
    <span className={`${styles.badge} ${variantClass} ${sizeClass}`.trim()}>
      {children}
    </span>
  );
}
