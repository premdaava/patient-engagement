import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Table } from "@/components/ui/Table";
import { getRecentCampaigns } from "../queries/getRecentCampaigns";
import { campaignColumns } from "./RecentCampaignsColumns";
import styles from "./RecentCampaigns.module.css";

export async function RecentCampaigns() {
  const campaigns = await getRecentCampaigns(5);

  return (
    <Card className={styles.recentCampaignsCard} padding="none">
      <div className={styles.recentCampaignsHeaderWrapper}>
        <CardHeader
          title="Recent campaigns"
          subtitle="Outreach, recalls, and automated reminders"
          action={
            <Link href="/campaigns" className={styles.recentCampaignsLink}>
              <span>View all</span>
              <ArrowUpRight size={14} />
            </Link>
          }
        />
      </div>
      <Table
        columns={campaignColumns}
        data={campaigns}
        keyExtractor={(row) => row.id}
        emptyTitle="No campaigns created yet"
        emptyDescription="Launch an SMS or email recall sequence to re-engage overdue patients."
      />
    </Card>
  );
}

export function RecentCampaignsSkeleton() {
  return (
    <Card className={styles.recentCampaignsCard} padding="none">
      <div className={styles.recentCampaignsHeaderWrapper}>
        <CardHeader title="Recent campaigns" subtitle="Loading campaigns..." />
      </div>
      <Table columns={campaignColumns} data={[]} keyExtractor={() => ""} isLoading />
    </Card>
  );
}


