import Link from "next/link";
import { Megaphone, ClipboardList, Mail, Plus } from "lucide-react";
import styles from "./QuickActions.module.css";

export function QuickActions() {
  return (
    <div className={styles.quickActions}>
      <Link href="/campaigns" className={styles.quickActionsButton}>
        <Plus size={15} className={styles.quickActionsIcon} />
        <Megaphone size={16} />
        <span>New Campaign</span>
      </Link>
      <Link href="/surveys" className={styles.quickActionsButton}>
        <Plus size={15} className={styles.quickActionsIcon} />
        <ClipboardList size={16} />
        <span>New Survey</span>
      </Link>
      <Link href="/newsletters" className={styles.quickActionsButton}>
        <Plus size={15} className={styles.quickActionsIcon} />
        <Mail size={16} />
        <span>New Newsletter</span>
      </Link>
    </div>
  );
}
