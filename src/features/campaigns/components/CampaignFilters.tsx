"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Tabs } from "@/components/ui/Tabs";
import styles from "./CampaignFilters.module.css";

const STATUS_TABS = [
  { id: "all", label: "All" },
  { id: "running", label: "Running" },
  { id: "scheduled", label: "Scheduled" },
  { id: "draft", label: "Draft" },
  { id: "paused", label: "Paused" },
  { id: "completed", label: "Completed" },
];

export function CampaignFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") || "all";
  const currentSearch = searchParams.get("search") || "";

  function updateParams(newParams: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, val]) => {
      if (val && val !== "all") {
        params.set(key, val);
      } else {
        params.delete(key);
      }
    });
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={styles.campaignFilters}>
      <div className={styles.campaignFiltersTabs}>
        <Tabs
          activeTab={currentStatus}
          tabs={STATUS_TABS}
          onChange={(tab) => updateParams({ status: tab })}
        />
      </div>
      <div className={styles.campaignFiltersSearch}>
        <Input
          placeholder="Search campaigns..."
          leftIcon={<Search size={16} />}
          defaultValue={currentSearch}
          onChange={(e) => updateParams({ search: e.target.value })}
        />
      </div>
    </div>
  );
}
