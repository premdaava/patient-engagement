import { connection } from "next/server";
import { getPatients, OpenDentalPatient } from "@/lib/open-dental";
import { PatientsClient } from "@/features/open-dental/components";

export default async function PatientsPage() {
  await connection();
  
  let patients: OpenDentalPatient[] = [];
  let errorMsg: string | null = null;
  try {
    patients = await getPatients();
  } catch (err: unknown) {
    errorMsg = err instanceof Error ? err.message : "Failed to fetch from Open Dental API";
  }


  return (
    <div style={{ padding: "32px", maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
      {errorMsg && (
        <div style={{ padding: 16, background: "#ffeeee", border: "1px solid #f5c6cb", color: "#721c24", borderRadius: 8, fontSize: "0.9rem" }}>
          <strong>Open Dental API Error:</strong> {errorMsg}
          <div style={{ fontSize: "0.8rem", marginTop: 4 }}>
            Please check your OPEN_DENTAL_DEVELOPER_KEY, OPEN_DENTAL_CUSTOMER_KEY, and OPEN_DENTAL_API_BASE_URL in .env.local.
          </div>
        </div>
      )}
      <PatientsClient patients={patients} />
    </div>
  );
}



