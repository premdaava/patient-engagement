import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCampaignById, getCampaignRecipients } from "@/features/campaigns/queries";
import {
  CampaignHeaderActions,
  CampaignMetrics,
  CampaignTimeline,
  RecipientsTable,
} from "@/features/campaigns/components";
import { Card } from "@/components/ui/Card";
import styles from "./campaignDetails.module.css";

interface CampaignDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CampaignDetailsPage({ params }: CampaignDetailsPageProps) {
  const resolvedParams = await params;
  const campaignId = resolvedParams.id;

  return (
    <div className={styles.container}>
      <Suspense fallback={<div>Loading campaign...</div>}>
        <CampaignDetailsContent campaignId={campaignId} />
      </Suspense>
    </div>
  );
}

async function CampaignDetailsContent({ campaignId }: { campaignId: string }) {
  const [campaign, recipients] = await Promise.all([
    getCampaignById(campaignId),
    getCampaignRecipients(campaignId),
  ]);

  if (!campaign) {
    notFound();
  }

  return (
    <>
      <CampaignHeaderActions campaign={campaign} />

      <CampaignMetrics metrics={campaign.metrics} />

      <CampaignTimeline
        status={campaign.status}
        createdAt={campaign.createdAt}
        scheduledAt={campaign.scheduledAt}
      />

      {campaign.templateSubject && (
        <Card className={styles.templateSection}>
          <h3 className={styles.sectionTitle}>Message Template</h3>
          <div className={styles.templateContent}>
            <p className={styles.templateSubject}><strong>Subject:</strong> {campaign.templateSubject}</p>
            <p className={styles.templateBody}>{campaign.templateBody}</p>
          </div>
        </Card>
      )}

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Recipients ({recipients.length})</h3>
        <RecipientsTable recipients={recipients} />
      </div>
    </>
  );
}



