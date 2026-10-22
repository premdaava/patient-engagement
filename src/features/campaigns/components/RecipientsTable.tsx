import { Table, Column } from "@/components/ui/Table";
import { CampaignRecipientRow } from "../types";
import { CampaignRecipientStatusBadge } from "./CampaignRecipientStatusBadge";
import styles from "./RecipientsTable.module.css";

interface RecipientsTableProps {
  recipients: CampaignRecipientRow[];
}

export function RecipientsTable({ recipients }: RecipientsTableProps) {
  const columns: Column<CampaignRecipientRow>[] = [
    {
      key: "memberName",
      header: "Patient Name",
      render: (r) => <span className={styles.recipientName}>{r.memberName}</span>,
    },
    {
      key: "contact",
      header: "Contact Info",
      render: (r) => <span className={styles.recipientContact}>{r.email || r.phone || "—"}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (r) => <CampaignRecipientStatusBadge status={r.status} />,
    },
    {
      key: "sentAt",
      header: "Sent At",
      render: (r) => <span className={styles.recipientDate}>{r.sentAt ? new Date(r.sentAt).toLocaleString() : "—"}</span>,
    },
    {
      key: "openedAt",
      header: "Opened At",
      render: (r) => <span className={styles.recipientDate}>{r.openedAt ? new Date(r.openedAt).toLocaleString() : "—"}</span>,
    },
    {
      key: "clickedAt",
      header: "Clicked At",
      render: (r) => <span className={styles.recipientDate}>{r.clickedAt ? new Date(r.clickedAt).toLocaleString() : "—"}</span>,
    },
  ];

  return (
    <div className={styles.recipientsTableContainer}>
      <Table
        columns={columns}
        data={recipients}
        keyExtractor={(r) => r.id}
        emptyTitle="No recipients recorded for this campaign yet."
      />
    </div>
  );
}

