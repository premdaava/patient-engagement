"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Search, User } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { OpenDentalAppointment } from "@/lib/open-dental";

interface AppointmentsClientProps {
  appointments: OpenDentalAppointment[];
}

export function AppointmentsClient({ appointments }: AppointmentsClientProps) {
  const [search, setSearch] = useState("");

  const filteredAppointments = appointments.filter((apt) => {
    const q = search.toLowerCase();
    const desc = (apt.ProcDescript || "").toLowerCase();
    const status = (apt.AptStatus || "").toLowerCase();
    return desc.includes(q) || status.includes(q) || apt.PatNum.toString().includes(q) || apt.AptNum.toString().includes(q);
  });

  return (
    <div style={{ padding: "32px", maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--color-text, #0f172a)" }}>
            Open Dental Appointments
          </h1>
          <p style={{ color: "var(--color-text-secondary, #64748b)", fontSize: "0.9375rem", marginTop: 4 }}>
            Appointment schedule synchronized live from Open Dental API (<a href="https://www.opendental.com/site/apiappointments.html" target="_blank" rel="noreferrer" style={{ color: "var(--color-primary, #2563eb)" }}>API Docs</a>).
          </p>
        </div>
        <Badge variant="primary">{appointments.length} Total Appointments</Badge>
      </div>

      <div style={{ background: "var(--color-surface, #ffffff)", border: "1px solid var(--color-border, #e2e8f0)", borderRadius: 12, padding: 20 }}>
        <div style={{ marginBottom: 20, maxWidth: 400 }}>
          <Input
            placeholder="Search appointments by description, status, PatNum..."
            leftIcon={<Search size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredAppointments.length === 0 ? (
          <div style={{ padding: 48, textAlign: "center", color: "var(--color-text-muted)" }}>
            No appointments found matching your search.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filteredAppointments.map((apt) => {
              const aptDate = new Date(apt.AptDateTime);
              return (
                <div
                  key={apt.AptNum}
                  style={{
                    background: "var(--color-background, #f8fafc)",
                    border: "1px solid var(--color-border, #e2e8f0)",
                    borderRadius: 10,
                    padding: 20,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 10, background: "rgba(37, 99, 235, 0.1)", color: "var(--color-primary, #2563eb)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Clock size={24} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: "var(--color-text, #0f172a)", fontSize: "1rem" }}>
                        {apt.ProcDescript || "General Dental Visit"}
                      </div>
                      <div style={{ display: "flex", gap: 16, marginTop: 4, fontSize: "0.875rem", color: "var(--color-text-secondary, #64748b)" }}>
                        <span>PatNum #{apt.PatNum}</span>
                        <span>•</span>
                        <span>{aptDate.toLocaleDateString()} at {aptDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <Badge variant="success">{apt.AptStatus || "Scheduled"}</Badge>
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
