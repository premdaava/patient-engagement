"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Megaphone,
  Mail,
  ClipboardList,
  FileCode,
  Star,
  MessageSquare,
  Users,
  ChevronLeft,
  ChevronRight,
  Activity,
} from "lucide-react";
import styles from "./Sidebar.module.css";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/newsletters", label: "Newsletters", icon: Mail },
  { href: "/surveys", label: "Surveys", icon: ClipboardList },
  { href: "/email-templates", label: "Email Templates", icon: FileCode },
  { href: "/reviews", label: "Reviews", icon: Star },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/members", label: "Members", icon: Users },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export function Sidebar(props: SidebarProps) {
  return (
    <Suspense fallback={<aside className={styles.sidebar} />}>
      <SidebarContent {...props} />
    </Suspense>
  );
}

function SidebarContent({
  isCollapsed,
  onToggleCollapse,
  isOpenMobile,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname() || "";

  return (
    <>
      {isOpenMobile && (
        <div
          className={styles.sidebarMobileBackdrop}
          onClick={onCloseMobile}
          aria-hidden
        />
      )}
      <aside
        className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ""} ${isOpenMobile ? styles.sidebarMobileOpen : ""}`.trim()}
      >
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogo}>
            <Activity className={styles.sidebarLogoIcon} size={22} />
            {!isCollapsed && (
              <span className={styles.sidebarLogoText}>CareConnect</span>
            )}
          </div>
          <button
            type="button"
            className={styles.sidebarCollapseBtn}
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`${styles.sidebarNavItem} ${isActive ? styles.sidebarNavItemActive : ""}`.trim()}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon size={18} className={styles.sidebarNavIcon} />
                {!isCollapsed && (
                  <span className={styles.sidebarNavLabel}>{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}



