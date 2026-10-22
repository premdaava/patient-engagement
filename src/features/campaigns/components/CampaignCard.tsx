import Link from "next/link";
import { Mail, MessageSquare, Users, Calendar, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CampaignListItem } from "../types";
import { CampaignStatusBadge } from "./CampaignStatusBadge";
import styles from "./CampaignCard.module.css";

export function CampaignCard({ campaign }: { campaign: CampaignListItem }) {
  const isSms = campaign.type === "sms";
  const ChannelIcon = isSms ? MessageSquare : Mail;

  const dateLabel = campaign.scheduledAt
    ? `Scheduled for ${new Date(campaign.scheduledAt).toLocaleDateString()}`
    : `Created ${new Date(campaign.createdAt).toLocaleDateString()}`;

  return (
    <Card className={styles.campaignCard} hoverable>
      <div className={styles.campaignCardHeader}>
        <div className={styles.campaignCardTypeIcon}>
          <ChannelIcon size={18} />
        </div>
        <div className={styles.campaignCardTitleWrap}>
          <h3 className={styles.campaignCardTitle}>{campaign.name}</h3>
          <span className={styles.campaignCardChannel}>
            {isSms ? "SMS Campaign" : "Email Campaign"}
          </span>
        </div>
        <CampaignStatusBadge status={campaign.status} />
      </div>

      <div className={styles.campaignCardMeta}>
        <div className={styles.campaignCardMetaItem}>
          <Users size={14} />
          <span>{campaign.recipientsCount} recipients</span>
        </div>
        <div className={styles.campaignCardMetaItem}>
          <Calendar size={14} />
          <span>{dateLabel}</span>
        </div>
      </div>

      <div className={styles.campaignCardFooter}>
        <Link href={`/campaigns/${campaign.id}`} className={styles.campaignCardLink}>
          <span>View Campaign</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </Card>
  );
}
