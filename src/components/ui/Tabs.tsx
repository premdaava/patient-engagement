"use client";

import { ReactNode } from "react";
import styles from "./Tabs.module.css";

export interface TabItem {
  id: string;
  label: string;
  badge?: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className = "" }: TabsProps) {
  return (
    <div className={`${styles.tabs} ${className}`.trim()} role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`${styles.tabsTrigger} ${isActive ? styles.tabsTriggerActive : ""}`.trim()}
            onClick={() => onChange(tab.id)}
          >
            <span>{tab.label}</span>
            {tab.badge && <span className={styles.tabsBadge}>{tab.badge}</span>}
          </button>
        );
      })}
    </div>
  );
}
