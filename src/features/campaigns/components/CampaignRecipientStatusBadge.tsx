import { Badge, BadgeVariant } from "@/components/ui/Badge";
import { CampaignRecipientStatus } from "../types";

const RECIPIENT_STATUS_VARIANTS: Record<CampaignRecipientStatus, BadgeVariant> = {
  pending: "default",
  sent: "primary",
  delivered: "success",
  failed: "danger",
  bounced: "warning",
};

export function CampaignRecipientStatusBadge({ status }: { status: CampaignRecipientStatus }) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <Badge size="sm" variant={RECIPIENT_STATUS_VARIANTS[status]}>
      {label}
    </Badge>
  );
}
