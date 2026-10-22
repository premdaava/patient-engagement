"use client";

import { Menu, Bell, Search } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import styles from "./Topbar.module.css";

interface TopbarProps {
  onToggleMobileMenu: () => void;
  userName?: string;
  userRole?: string;
}

export function Topbar({
  onToggleMobileMenu,
  userName = "Dr. Jane Smith",
  userRole = "Administrator",
}: TopbarProps) {
  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <button
          type="button"
          className={styles.topbarMobileToggle}
          onClick={onToggleMobileMenu}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className={styles.topbarSearch}>
          <Search size={16} className={styles.topbarSearchIcon} />
          <input
            type="search"
            placeholder="Search patients, campaigns…"
            className={styles.topbarSearchInput}
            aria-label="Search"
          />
        </div>
      </div>

      <div className={styles.topbarRight}>
        <button
          type="button"
          className={styles.topbarIconButton}
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className={styles.topbarBadgeDot} />
        </button>

        <div className={styles.topbarUser}>
          <Avatar name={userName} size="sm" />
          <div className={styles.topbarUserInfo}>
            <span className={styles.topbarUserName}>{userName}</span>
            <span className={styles.topbarUserRole}>{userRole}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
