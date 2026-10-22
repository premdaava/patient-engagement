import Link from "next/link";
import { Megaphone, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { CampaignListItem } from "../types";
import { CampaignCard } from "./CampaignCard";
import styles from "./CampaignList.module.css";

interface CampaignListProps {
  campaigns: CampaignListItem[];
}

export function CampaignList({ campaigns }: CampaignListProps) {
  if (campaigns.length === 0) {
    return (
      <div className={styles.campaignListEmpty}>
        <EmptyState
          title="No campaigns found"
          description="Create your first targeted patient campaign or adjust your active filters."
          icon={<Megaphone size={36} />}
          action={
            <Link href="/campaigns/new">
              <Button leftIcon={<Plus size={16} />}>New Campaign</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className={styles.campaignList}>
      {campaigns.map((c) => (
        <CampaignCard key={c.id} campaign={c} />
      ))}
    </div>
  );
}

export function CampaignListSkeleton() {
  return (
    <div className={styles.campaignList}>
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className={styles.campaignListSkeleton} />
      ))}
    </div>
  );
}
