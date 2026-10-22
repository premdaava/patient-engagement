import { Suspense } from "react";
import { Metadata } from "next";
import {
  DashboardHeader,
  DashboardHeaderSkeleton,
  StatsRow,
  StatsRowSkeleton,
  RecentCampaigns,
  RecentCampaignsSkeleton,
  RecentReviews,
  RecentReviewsSkeleton,
  UnreadMessages,
  UnreadMessagesSkeleton,
} from "@/features/dashboard";
import styles from "./dashboard.module.css";

export const metadata: Metadata = {
  title: "Dashboard | CareConnect",
  description: "Overview of dental patient outreach, campaigns, and engagement.",
};

export default function DashboardPage() {
  return (
    <div className={styles.dashboard}>
      <Suspense fallback={<DashboardHeaderSkeleton />}>
        <DashboardHeader />
      </Suspense>

      <Suspense fallback={<StatsRowSkeleton />}>
        <StatsRow />
      </Suspense>

      <Suspense fallback={<RecentCampaignsSkeleton />}>
        <RecentCampaigns />
      </Suspense>

      <div className={styles.dashboardWidgetsGrid}>
        <Suspense fallback={<RecentReviewsSkeleton />}>
          <RecentReviews />
        </Suspense>

        <Suspense fallback={<UnreadMessagesSkeleton />}>
          <UnreadMessages />
        </Suspense>
      </div>
    </div>
  );
}


