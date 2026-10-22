import { CheckCircle2, Clock, PlayCircle, PauseCircle, Check } from "lucide-react";
import { CampaignStatus } from "../types";
import styles from "./CampaignTimeline.module.css";

interface CampaignTimelineProps {
  status: CampaignStatus;
  createdAt: Date;
  scheduledAt: Date | null;
}

export function CampaignTimeline({ status, createdAt, scheduledAt }: CampaignTimelineProps) {
  const steps = [
    {
      id: "draft",
      label: "Campaign Created",
      time: new Date(createdAt).toLocaleString(),
      completed: true,
      active: status === "draft",
    },
    {
      id: "scheduled",
      label: scheduledAt ? `Scheduled (${new Date(scheduledAt).toLocaleString()})` : "Scheduled / Ready",
      time: scheduledAt ? new Date(scheduledAt).toLocaleString() : "—",
      completed: status === "running" || status === "completed" || status === "paused",
      active: status === "scheduled",
    },
    {
      id: "running",
      label: status === "paused" ? "Paused" : "Dispatched / Running",
      time: status === "running" || status === "completed" ? "Active" : "Pending",
      completed: status === "completed",
      active: status === "running" || status === "paused",
    },
    {
      id: "completed",
      label: "Completed",
      time: status === "completed" ? "Finished" : "Pending",
      completed: status === "completed",
      active: false,
    },
  ];

  return (
    <div className={styles.campaignTimeline}>
      <h3 className={styles.campaignTimelineTitle}>Campaign Status Timeline</h3>
      <div className={styles.campaignTimelineSteps}>
        {steps.map((step, idx) => (
          <div
            key={step.id}
            className={`${styles.campaignTimelineStep} ${step.completed ? styles.completed : ""} ${
              step.active ? styles.active : ""
            }`}
          >
            <div className={styles.campaignTimelineNode}>
              {step.completed ? (
                <Check size={14} />
              ) : step.active ? (
                <Clock size={14} />
              ) : (
                <span>{idx + 1}</span>
              )}
            </div>
            <div className={styles.campaignTimelineContent}>
              <span className={styles.campaignTimelineLabel}>{step.label}</span>
              <span className={styles.campaignTimelineTime}>{step.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
