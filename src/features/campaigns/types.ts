export type CampaignStatus = "draft" | "scheduled" | "running" | "paused" | "completed";
export type CampaignType = "email" | "sms";
export type CampaignRecipientStatus = "pending" | "sent" | "delivered" | "failed" | "bounced";

export interface CampaignListItem {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  templateId: string | null;
  scheduledAt: Date | null;
  createdAt: Date;
  recipientsCount: number;
}

export interface CampaignMetricsData {
  total: number;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  replies: number;
}

export interface CampaignRecipientRow {
  id: string;
  memberId: string;
  memberName: string;
  email: string | null;
  phone: string | null;
  status: CampaignRecipientStatus;
  sentAt: Date | null;
  openedAt: Date | null;
  clickedAt: Date | null;
}

export interface CampaignDetails {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  templateId: string | null;
  templateName?: string | null;
  templateSubject?: string | null;
  templateBody?: string | null;
  scheduledAt: Date | null;
  createdAt: Date;
  metrics: CampaignMetricsData;
}

export interface AudienceMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  smsOptIn: boolean;
  emailOptIn: boolean;
}

export interface CreateCampaignInput {
  name: string;
  type: CampaignType;
  audienceType: "all" | "sms_only" | "email_only" | "custom";
  selectedMemberIds?: string[];
  templateId?: string;
  customSubject?: string;
  customBody?: string;
  scheduleType: "immediate" | "scheduled";
  scheduledAt?: string;
}
