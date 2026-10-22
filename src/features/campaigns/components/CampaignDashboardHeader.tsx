import { ArrowLeft, Pause, Play, Copy } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CampaignDetails } from "../types";
import { CampaignStatusBadge } from "./CampaignStatusBadge";
import styles from "./CampaignDashboardHeader.module.css";

interface CampaignDashboardHeaderProps {
  campaign: CampaignDetails;
  onPause?: () => void;
  onResume?: () => void;
  onDuplicate?: () => void;
}

export function CampaignDashboardHeader({
  campaign,
  onPause,
  onResume,
  onDuplicate,
}: CampaignDashboardHeaderProps) {
  const isRunning = campaign.status === "running";
  const isPaused = campaign.status === "paused";

  return (
    <div className={styles.header}>
      <div className={styles.headerTop}>
        <Link href="/campaigns" className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Back to Campaigns</span>
        </Link>
      </div>

      <div className={styles.headerMain}>
        <div className={styles.headerTitleWrap}>
          <h1 className={styles.headerTitle}>{campaign.name}</h1>
          <CampaignStatusBadge status={campaign.status} />
          <span className={styles.headerType}>
            {campaign.type === "sms" ? "SMS Campaign" : "Email Campaign"}
          </span>
        </div>

        <div className={styles.headerActions}>
          {onDuplicate && (
            <Button variant="outline" size="sm" leftIcon={<Copy size={15} />} onClick={onDuplicate}>
              Duplicate
            </Button>
          )}

          {isRunning && onPause && (
            <Button variant="outline" size="sm" leftIcon={<Pause size={15} />} onClick={onPause}>
              Pause
            </Button>
          )}

          {isPaused && onResume && (
            <Button variant="primary" size="sm" leftIcon={<Play size={15} />} onClick={onResume}>
              Resume
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
