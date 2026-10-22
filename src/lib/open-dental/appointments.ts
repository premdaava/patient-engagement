import { openDentalFetch } from "./client";

export interface OpenDentalAppointment {
  AptNum: number;
  PatNum: number;
  AptDateTime: string;
  ProcDescript?: string;
  AptStatus?: string;
  ClinicNum?: number;
}

export async function getAppointments(params?: { PatNum?: number; DateStart?: string; DateEnd?: string }): Promise<OpenDentalAppointment[]> {
  const queryParams = new URLSearchParams();
  if (params?.PatNum) queryParams.set("PatNum", params.PatNum.toString());
  if (params?.DateStart) queryParams.set("DateStart", params.DateStart);
  if (params?.DateEnd) queryParams.set("DateEnd", params.DateEnd);

  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
  return openDentalFetch<OpenDentalAppointment[]>(`appointments${queryString}`);
}

export async function getAppointment(aptNum: number): Promise<OpenDentalAppointment> {
  return openDentalFetch<OpenDentalAppointment>(`appointments/${aptNum}`);
}
