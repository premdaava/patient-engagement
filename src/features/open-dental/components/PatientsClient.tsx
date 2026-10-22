"use client";

import { useState } from "react";
import { Phone, Mail, Search, User } from "lucide-react";
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
            {filteredPatients.map((p) => {
              const phone = p.WirelessPhone || p.HmPhone || "No phone";
              return (
                <div
                  key={p.PatNum}
                  style={{
                    background: "var(--color-background, #f8fafc)",
                    border: "1px solid var(--color-border, #e2e8f0)",
                    borderRadius: 10,
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(37, 99, 235, 0.1)", color: "var(--color-primary, #2563eb)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                        {p.FName[0]}{p.LName[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: "var(--color-text, #0f172a)", fontSize: "1rem" }}>
                          {p.FName} {p.LName}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted, #94a3b8)" }}>
                          PatNum #{p.PatNum}
                        </div>
                      </div>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: "0.875rem", color: "var(--color-text-secondary, #64748b)", borderTop: "1px solid var(--color-border, #e2e8f0)", paddingTop: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Phone size={14} color="var(--color-primary, #2563eb)" />
                      <span>{phone}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Mail size={14} color="var(--color-primary, #2563eb)" />
                      <span>{p.Email || "No email on file"}</span>
                    </div>
                    {p.Birthdate && (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontWeight: 500, fontSize: "0.75rem", background: "#e2e8f0", padding: "2px 6px", borderRadius: 4 }}>DOB</span>
                        <span>{p.Birthdate}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
