import { connection } from "next/server";
import { getPatients, getAppointments, OpenDentalPatient, OpenDentalAppointment } from "@/lib/open-dental";

export interface PatientAppointmentRow {
  patient: OpenDentalPatient;
  appointments: OpenDentalAppointment[];
}

export async function getOpenDentalPatientsAndAppointments(): Promise<PatientAppointmentRow[]> {
  await connection();

  try {
    const [patients, appointments] = await Promise.all([
      getPatients().catch(() => [] as OpenDentalPatient[]),
      getAppointments().catch(() => [] as OpenDentalAppointment[]),
    ]);


    const appointmentMap = new Map<number, OpenDentalAppointment[]>();
    for (const apt of appointments) {
      const list = appointmentMap.get(apt.PatNum) || [];
      list.push(apt);
      appointmentMap.set(apt.PatNum, list);
    }

    return patients.map((patient) => ({
      patient,
      appointments: appointmentMap.get(patient.PatNum) || [],
    }));
  } catch (error) {
    console.error("Failed to fetch Open Dental data:", error);
    return [];
  }
}
