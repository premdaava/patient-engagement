import { Badge, BadgeVariant } from "@/components/ui/Badge";
import { CampaignStatus } from "../types";

const STATUS_VARIANTS: Record<CampaignStatus, BadgeVariant> = {
  draft: "default",
  scheduled: "warning",
  running: "primary",
  paused: "danger",
  completed: "success",
};

export function CampaignStatusBadge({ status }: { status: CampaignStatus }) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <Badge size="sm" variant={STATUS_VARIANTS[status]}>
      {label}
    </Badge>
  );
}


