export interface DashboardStats {
  totalMembers: number;
  activeCampaigns: number;
  messagesSentThisMonth: number;
  averageReviewRating: number;
  totalReviewsCount: number;
}

export interface DashboardCampaign {
  id: string;
  name: string;
  type: "email" | "sms";
  status: "draft" | "scheduled" | "running" | "completed";
  scheduledAt: Date | null;
  createdAt: Date;
}

export interface DashboardReview {
  id: string;
  rating: number;
  comment: string | null;
  source: "google" | "internal" | "yelp" | "facebook" | "other";
  status: "pending" | "published" | "flagged" | "hidden";
  createdAt: Date;
  memberName: string;
}

export interface DashboardMessage {
  id: string;
  conversationId: string;
  body: string;
  direction: "inbound" | "outbound";
  status: "queued" | "sent" | "delivered" | "failed" | "received";
  createdAt: Date;
  memberName: string;
  memberPhone: string | null;
}
