import { CampaignDashboardHeader } from "@/features/campaigns/components/CampaignDashboardHeader";
import { pauseCampaign, resumeCampaign, duplicateCampaign } from "@/features/campaigns/actions";
import { CampaignDetails } from "../types";

export function CampaignHeaderActions({ campaign }: { campaign: CampaignDetails }) {
  async function handlePause() {
    "use server";
    await pauseCampaign(campaign.id);
  }

  async function handleResume() {
    "use server";
    await resumeCampaign(campaign.id);
  }

  async function handleDuplicate() {
    "use server";
    await duplicateCampaign(campaign.id);
  }

  return (
    <CampaignDashboardHeader
      campaign={campaign}
      onPause={handlePause}
      onResume={handleResume}
      onDuplicate={handleDuplicate}
    />
  );
}
