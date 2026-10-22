import { PageHeader } from "@/components/ui/PageHeader";
import { getEmailTemplates, getAvailableAudience } from "@/features/campaigns/queries";
import { CampaignWizard } from "@/features/campaigns/components";
import styles from "./newCampaign.module.css";

export default async function NewCampaignPage() {
  const [templates, audience] = await Promise.all([
    getEmailTemplates(),
    getAvailableAudience(),
  ]);

  return (
    <div className={styles.container}>
      <PageHeader
        title="Create Campaign"
        description="Launch a new patient engagement campaign with our step-by-step wizard."
      />
      <CampaignWizard templates={templates} audience={audience} />
    </div>
  );
}
