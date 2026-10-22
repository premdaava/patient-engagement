import { Users, Megaphone, MessageSquare, Star } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { getDashboardStats } from "../queries/getStats";
import styles from "./StatsRow.module.css";

export async function StatsRow() {
  const stats = await getDashboardStats();

  return (
    <div className={styles.statsRow}>
      <StatCard
        label="Total Members"
        value={stats.totalMembers.toLocaleString()}
        icon={<Users size={20} />}
      />
      <StatCard
        label="Active Campaigns"
        value={stats.activeCampaigns}
        icon={<Megaphone size={20} />}
      />
      <StatCard
        label="Messages Sent (Month)"
        value={stats.messagesSentThisMonth.toLocaleString()}
        icon={<MessageSquare size={20} />}
      />
      <StatCard
        label="Average Review Rating"
        value={stats.totalReviewsCount > 0 ? `${stats.averageReviewRating} / 5.0` : "No ratings"}
        change={stats.totalReviewsCount > 0 ? `${stats.totalReviewsCount} reviews` : undefined}
        changeType="positive"
        icon={<Star size={20} />}
      />
    </div>
  );
}

export function StatsRowSkeleton() {
  return (
    <div className={styles.statsRow}>
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className={styles.statsRowSkeleton} />
      ))}
    </div>
  );
}
