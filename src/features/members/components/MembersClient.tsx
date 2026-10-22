"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Member } from "@/db/schema/members";
import { syncOpenDentalPatients } from "../actions";

interface MembersClientProps {
  members: Member[];
}

export function MembersClient({ members }: MembersClientProps) {
  const router = useRouter();
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  async function handleSync() {
    setIsSyncing(true);
    setError(null);
    setSuccessMsg(null);

    const res = await syncOpenDentalPatients();
    setIsSyncing(false);

    if (res.success) {
      setSuccessMsg(`Successfully synced ${res.count} patients from Open Dental.`);
      router.refresh();
    } else {
      setError(res.error || "Failed to sync with Open Dental.");
    }
  }

  return (
    <div style={{ padding: "32px", maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--color-text, #0f172a)" }}>Patients</h1>
          <p style={{ color: "var(--color-text-secondary, #64748b)", fontSize: "0.9375rem", marginTop: 4 }}>
            Manage patient directory and sync with Open Dental.
          </p>
        </div>
        <Button onClick={handleSync} disabled={isSyncing} leftIcon={<RefreshCw size={16} className={isSyncing ? "animate-spin" : ""} />}>
          {isSyncing ? "Syncing..." : "Sync from Open Dental"}
        </Button>
      </div>

      {error && (
        <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid var(--color-error, #ef4444)", color: "#991b1b", padding: 16, borderRadius: 8, fontSize: "0.875rem" }}>
          {error}
        </div>
      )}

      {successMsg && (
        <div style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid var(--color-success, #10b981)", color: "#065f46", padding: 16, borderRadius: 8, fontSize: "0.875rem" }}>
          {successMsg}
        </div>
      )}

      <div style={{ background: "var(--color-surface, #ffffff)", border: "1px solid var(--color-border, #e2e8f0)", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9375rem" }}>
          <thead>
            <tr style={{ background: "var(--color-background, #f8fafc)", borderBottom: "1px solid var(--color-border, #e2e8f0)", color: "var(--color-text-muted, #64748b)", fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ padding: "16px 20px" }}>Patient Name</th>
              <th style={{ padding: "16px 20px" }}>Phone</th>
              <th style={{ padding: "16px 20px" }}>Email</th>
              <th style={{ padding: "16px 20px" }}>Open Dental PatNum</th>
              <th style={{ padding: "16px 20px" }}>SMS Opt-In</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: 32, textAlign: "center", color: "var(--color-text-muted)" }}>
                  No members found. Click &quot;Sync from Open Dental&quot; to import patients.
                </td>
              </tr>
            ) : (
              members.map((m) => (
                <tr key={m.id} style={{ borderBottom: "1px solid var(--color-border, #f1f5f9)" }}>
                  <td style={{ padding: "16px 20px", fontWeight: 600, color: "var(--color-text, #0f172a)", display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(37, 99, 235, 0.1)", color: "var(--color-primary, #2563eb)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <User size={16} />
                    </div>
                    {m.firstName} {m.lastName}
                  </td>
                  <td style={{ padding: "16px 20px", color: "var(--color-text-secondary, #64748b)" }}>{m.phone || "—"}</td>
                  <td style={{ padding: "16px 20px", color: "var(--color-text-secondary, #64748b)" }}>{m.email || "—"}</td>
                  <td style={{ padding: "16px 20px", color: "var(--color-text-secondary, #64748b)" }}>{m.openDentalPatNum ? `#${m.openDentalPatNum}` : "—"}</td>
                  <td style={{ padding: "16px 20px" }}>
                    <Badge variant={m.smsOptIn ? "success" : "danger"}>
                      {m.smsOptIn ? "Opted-In" : "Opted-Out"}
                    </Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
