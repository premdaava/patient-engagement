import { Table, Column } from "@/components/ui/Table";
import { Checkbox } from "@/components/ui/Checkbox";
import { AudienceMember } from "../types";
import styles from "./AudiencePicker.module.css";

interface AudiencePickerProps {
  audience: AudienceMember[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  campaignType: "email" | "sms";
}

export function AudiencePicker({ audience, selectedIds, onChange, campaignType }: AudiencePickerProps) {
  const eligibleAudience = audience.filter((m) =>
    campaignType === "sms" ? m.smsOptIn : m.emailOptIn
  );

  const allSelected = eligibleAudience.length > 0 && eligibleAudience.every((m) => selectedIds.includes(m.id));

  function toggleAll() {
    if (allSelected) {
      onChange([]);
    } else {
      onChange(eligibleAudience.map((m) => m.id));
    }
  }

  function toggleOne(id: string) {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((item) => item !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  }

  const columns: Column<AudienceMember>[] = [
    {
      key: "select",
      header: (
        <Checkbox
          label=""
          checked={allSelected}
          onChange={toggleAll}
          aria-label="Select all"
        />
      ),
      width: "50px",
      render: (m) => (
        <Checkbox
          label=""
          checked={selectedIds.includes(m.id)}
          onChange={() => toggleOne(m.id)}
          aria-label={`Select ${m.firstName} ${m.lastName}`}
        />
      ),
    },
    {
      key: "name",
      header: "Patient Name",
      render: (m) => <span className={styles.name}>{`${m.firstName} ${m.lastName}`}</span>,
    },
    {
      key: "contact",
      header: "Contact",
      render: (m) => <span className={styles.contact}>{campaignType === "sms" ? m.phone : m.email}</span>,
    },
    {
      key: "status",
      header: "Opt-In Status",
      render: () => <span className={styles.optInBadge}>Opted In</span>,
    },
  ];

  return (
    <div className={styles.audiencePicker}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Select Patient Audience</h3>
          <p className={styles.subtitle}>
            Showing patients opted in for {campaignType.toUpperCase()} messages ({eligibleAudience.length} available).
          </p>
        </div>
      </div>

      <div className={styles.tableWrap}>
        <Table
          columns={columns}
          data={eligibleAudience}
          keyExtractor={(m) => m.id}
          emptyTitle="No eligible patients found"
        />
      </div>
    </div>
  );
}


