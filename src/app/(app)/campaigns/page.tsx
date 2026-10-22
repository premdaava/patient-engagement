import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { getCampaigns } from "@/features/campaigns/queries";
import { CampaignFilters, CampaignList, CampaignListSkeleton } from "@/features/campaigns/components";
import styles from "./campaigns.module.css";

interface CampaignsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
}

export default async function CampaignsPage({ searchParams }: CampaignsPageProps) {
  const resolvedParams = await searchParams;
  const search = resolvedParams.search;
  const status = resolvedParams.status;

  return (
    <div className={styles.container}>
      <PageHeader
        title="Patient Campaigns"
        description="Create and monitor automated SMS and email recall campaigns."
        actions={
          <Link href="/campaigns/new">
            <Button leftIcon={<Plus size={16} />}>New Campaign</Button>
          </Link>
        }
      />

      <div className={styles.controls}>
        <Suspense fallback={<div>Loading filters...</div>}>
          <CampaignFilters />
        </Suspense>
      </div>

      <Suspense fallback={<CampaignListSkeleton />}>
        <CampaignContent search={resolvedParams.search} status={resolvedParams.status} />
      </Suspense>
    </div>
  );
}

async function CampaignContent({ search, status }: { search?: string; status?: string }) {
  const campaigns = await getCampaigns({ search, status });
  return <CampaignList campaigns={campaigns} />;
}


