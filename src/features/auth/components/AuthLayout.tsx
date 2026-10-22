import { ReactNode } from "react";
import Link from "next/link";
import { Activity, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import styles from "./AuthLayout.module.css";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerActionText: string;
  footerActionHref: string;
}

export function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerActionText,
  footerActionHref,
}: AuthLayoutProps) {
  return (
    <div className={styles.authLayout}>
      <aside className={styles.authLayoutBrand}>
        <div className={styles.authLayoutBrandHeader}>
          <div className={styles.authLayoutBrandLogo}>
            <Activity size={26} className={styles.authLayoutBrandIcon} />
            <span className={styles.authLayoutBrandTitle}>CareConnect</span>
          </div>
          <span className={styles.authLayoutBrandTag}>Dental Engagement Platform</span>
        </div>

        <div className={styles.authLayoutBrandBody}>
          <h2 className={styles.authLayoutBrandHeading}>
            Transform your dental patient retention and recall outreach.
          </h2>
          <p className={styles.authLayoutBrandDescription}>
            Seamlessly integrated with Open Dental for real-time appointment reminders,
            targeted SMS recalls, and review generation.
          </p>

          <ul className={styles.authLayoutBrandList}>
            <li className={styles.authLayoutBrandListItem}>
              <CheckCircle2 size={18} className={styles.authLayoutBrandListIcon} />
              <span>Automated 6-month hygiene recall sequences</span>
            </li>
            <li className={styles.authLayoutBrandListItem}>
              <Sparkles size={18} className={styles.authLayoutBrandListIcon} />
              <span>Smart patient reactivation & 2-way messaging</span>
            </li>
            <li className={styles.authLayoutBrandListItem}>
              <ShieldCheck size={18} className={styles.authLayoutBrandListIcon} />
              <span>HIPAA-conscious encrypted communication</span>
            </li>
          </ul>
        </div>

        <div className={styles.authLayoutBrandFooter}>
          <p>© 2026 CareConnect Dental. All rights reserved.</p>
        </div>
      </aside>

      <main className={styles.authLayoutMain}>
        <div className={styles.authLayoutCard}>
          <div className={styles.authLayoutHeader}>
            <h1 className={styles.authLayoutTitle}>{title}</h1>
            <p className={styles.authLayoutSubtitle}>{subtitle}</p>
          </div>

          <div className={styles.authLayoutFormArea}>{children}</div>

          <div className={styles.authLayoutFooter}>
            <span className={styles.authLayoutFooterText}>{footerText} </span>
            <Link href={footerActionHref} className={styles.authLayoutFooterLink}>
              {footerActionText}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
