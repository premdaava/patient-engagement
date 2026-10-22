"use client";

import { useState } from "react";
import { Search } from "lucide-react";
// Remove unused User import

import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { OpenDentalPatient } from "@/lib/open-dental";

interface PatientsClientProps {
  patients: OpenDentalPatient[];
}

export function PatientsClient({ patients }: PatientsClientProps) {
  const [search, setSearch] = useState("");

  const filteredPatients = patients.filter((p) => {
    const q = search.toLowerCase();
    const fullName = `${p.FName} ${p.LName}`.toLowerCase();
    const phone = p.WirelessPhone || p.HmPhone || "";
    return fullName.includes(q) || phone.includes(q) || p.PatNum.toString().includes(q) || (p.Email && p.Email.toLowerCase().includes(q));
  });

  return (
    <div style={{ padding: "32px", maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--color-text, #0f172a)" }}>
            Open Dental Patients
          </h1>
          <p style={{ color: "var(--color-text-secondary, #64748b)", fontSize: "0.9375rem", marginTop: 4 }}>
            Patient directory synchronized live from Open Dental API (<a href="https://www.opendental.com/site/apipatients.html" target="_blank" rel="noreferrer" style={{ color: "var(--color-primary, #2563eb)" }}>API Docs</a>).
          </p>
        </div>
        <Badge variant="primary">{patients.length} Total Patients</Badge>
      </div>

      <div style={{ background: "var(--color-surface, #ffffff)", border: "1px solid var(--color-border, #e2e8f0)", borderRadius: 12, padding: 20 }}>
        <div style={{ marginBottom: 20, maxWidth: 400 }}>
          <Input
            placeholder="Search patients by name, phone, email, or PatNum..."
            leftIcon={<Search size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredPatients.length === 0 ? (
          <div style={{ padding: 48, textAlign: "center", color: "var(--color-text-muted)" }}>
            No patients found matching your search.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9375rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--color-border, #e2e8f0)", color: "var(--color-text-secondary, #64748b)", fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  <th style={{ padding: "12px 16px" }}>PatNum</th>
                  <th style={{ padding: "12px 16px" }}>Patient Name</th>
                  <th style={{ padding: "12px 16px" }}>Phone</th>
                  <th style={{ padding: "12px 16px" }}>Email</th>
                  <th style={{ padding: "12px 16px" }}>Birthdate</th>
                  <th style={{ padding: "12px 16px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((p) => {
                  const phone = p.WirelessPhone || p.HmPhone || p.WkPhone || "No phone";
                  return (
                    <tr key={p.PatNum} style={{ borderBottom: "1px solid var(--color-border, #f1f5f9)" }}>
                      <td style={{ padding: "14px 16px", fontWeight: 600, color: "var(--color-text, #0f172a)" }}>
                        #{p.PatNum}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--color-primary-subtle, #eef6fb)", color: "var(--color-primary, #1e7db0)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: "0.8125rem" }}>
                            {p.FName[0]}{p.LName[0]}
                          </div>
                          <span style={{ fontWeight: 600, color: "var(--color-text, #0f172a)" }}>
                            {p.FName} {p.LName}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px", color: "var(--color-text-secondary, #475569)" }}>
                        {phone}
                      </td>
                      <td style={{ padding: "14px 16px", color: "var(--color-text-secondary, #475569)" }}>
                        {p.Email || "No email"}
                      </td>
                      <td style={{ padding: "14px 16px", color: "var(--color-text-secondary, #475569)" }}>
                        {p.Birthdate || "—"}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <Badge variant="success">Active</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
