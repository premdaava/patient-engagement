import styles from "./Avatar.module.css";

interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function Avatar({ name, src, size = "md" }: AvatarProps) {
  const sizeClass = styles[`avatar${size.charAt(0).toUpperCase() + size.slice(1)}`];

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        className={`${styles.avatar} ${sizeClass}`.trim()}
      />
    );
  }

  return (
    <div
      className={`${styles.avatar} ${sizeClass} ${styles.avatarFallback}`.trim()}
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  );
}
