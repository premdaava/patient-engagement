import { Send, CheckCircle2, Eye, MousePointerClick, MessageSquareReply } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CampaignMetricsData } from "../types";
import styles from "./CampaignMetrics.module.css";

interface CampaignMetricsProps {
  metrics: CampaignMetricsData;
}

export function CampaignMetrics({ metrics }: CampaignMetricsProps) {
  const openRate = metrics.delivered > 0 ? Math.round((metrics.opened / metrics.delivered) * 100) : 0;
  const clickRate = metrics.delivered > 0 ? Math.round((metrics.clicked / metrics.delivered) * 100) : 0;

  const items = [
    {
      label: "Total Recipients",
      value: metrics.total.toLocaleString(),
      icon: <Send size={20} />,
      color: "primary",
    },
    {
      label: "Delivered",
      value: metrics.delivered.toLocaleString(),
      icon: <CheckCircle2 size={20} />,
      color: "success",
    },
    {
      label: "Opened",
      value: `${metrics.opened.toLocaleString()} (${openRate}%)`,
      icon: <Eye size={20} />,
      color: "warning",
    },
    {
      label: "Clicked",
      value: `${metrics.clicked.toLocaleString()} (${clickRate}%)`,
      icon: <MousePointerClick size={20} />,
      color: "primary",
    },
    {
      label: "Replies",
      value: metrics.replies.toLocaleString(),
      icon: <MessageSquareReply size={20} />,
      color: "success",
    },
  ];

  return (
    <div className={styles.campaignMetricsGrid}>
      {items.map((item, idx) => (
        <Card key={idx} className={styles.campaignMetricsCard}>
          <div className={`${styles.campaignMetricsIcon} ${styles[item.color]}`}>
            {item.icon}
          </div>
          <div className={styles.campaignMetricsContent}>
            <span className={styles.campaignMetricsLabel}>{item.label}</span>
            <span className={styles.campaignMetricsValue}>{item.value}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
