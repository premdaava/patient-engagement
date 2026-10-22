import Link from "next/link";
import { User, Phone, Mail, ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import styles from "./MemberPanel.module.css";


interface MemberPanelProps {
  member: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    email: string | null;
    smsOptIn: boolean;
  };
}

export function MemberPanel({ member }: MemberPanelProps) {
  const initials = `${member.firstName[0] || ""}${member.lastName[0] || ""}`.toUpperCase();
  const fullName = `${member.firstName} ${member.lastName}`;

  return (
    <div className={styles.container}>
      <div className={styles.avatarSection}>
        <div className={styles.avatarCircle}>{initials}</div>
        <div className={styles.name}>{fullName}</div>
        <Badge variant={member.smsOptIn ? "success" : "danger"}>
          {member.smsOptIn ? "SMS Opted-In" : "SMS Opted-Out"}
        </Badge>
      </div>

      <div className={styles.infoGroup}>
        <span className={styles.sectionTitle}>Contact Information</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
          <Phone size={16} color="var(--color-text-muted)" />
          <span className={styles.infoValue}>{member.phone || "No phone number"}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
          <Mail size={16} color="var(--color-text-muted)" />
          <span className={styles.infoValue}>{member.email || "No email address"}</span>
        </div>
      </div>

      <div className={styles.infoGroup}>
        <span className={styles.sectionTitle}>Quick Links</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
          <Link href={`/members`} style={{ textDecoration: "none" }}>
            <Button variant="outline" size="sm" leftIcon={<User size={14} />} style={{ width: "100%", justifyContent: "flex-start" }}>
              View Member Profile
            </Button>
          </Link>
          <Link href={`/surveys`} style={{ textDecoration: "none" }}>
            <Button variant="outline" size="sm" leftIcon={<ClipboardList size={14} />} style={{ width: "100%", justifyContent: "flex-start" }}>
              Patient Surveys
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
