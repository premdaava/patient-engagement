import { openDentalFetch } from "./client";

export interface OpenDentalPatient {
  PatNum: number;
  LName: string;
  FName: string;
  WirelessPhone?: string;
  HmPhone?: string;
  WkPhone?: string;
  Email?: string;
  Birthdate?: string;
  Address?: string;
  City?: string;
  State?: string;
  Zip?: string;
}

export async function getPatients(params?: { LName?: string; FName?: string }): Promise<OpenDentalPatient[]> {
  const queryParams = new URLSearchParams();
  if (params?.LName) queryParams.set("LName", params.LName);
  if (params?.FName) queryParams.set("FName", params.FName);

  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
  return openDentalFetch<OpenDentalPatient[]>(`patients${queryString}`);
}

export async function getPatient(patNum: number): Promise<OpenDentalPatient> {
  return openDentalFetch<OpenDentalPatient>(`patients/${patNum}`);
}

