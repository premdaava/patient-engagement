import { Column } from "@/components/ui/Table";
import { Badge, BadgeVariant } from "@/components/ui/Badge";
import { DashboardCampaign } from "../types";
import styles from "./RecentCampaigns.module.css";

const STATUS_VARIANTS: Record<DashboardCampaign["status"], BadgeVariant> = {
  draft: "default",
  scheduled: "warning",
  running: "primary",
  paused: "danger",
  completed: "success",
};


export const campaignColumns: Column<DashboardCampaign>[] = [
  {
    key: "name",
    header: "Campaign",
    render: (r) => <span className={styles.recentCampaignsName}>{r.name}</span>,
  },
  {
    key: "type",
    header: "Channel",
    render: (r) => (
      <Badge size="sm" variant={r.type === "sms" ? "success" : "default"}>
        {r.type.toUpperCase()}
      </Badge>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (r) => (
      <Badge size="sm" variant={STATUS_VARIANTS[r.status]}>
        {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
      </Badge>
    ),
  },
  {
    key: "createdAt",
    header: "Created",
    render: (r) => (
      <span className={styles.recentCampaignsDate}>
        {new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
      </span>
    ),
  },
];

