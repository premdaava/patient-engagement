import { asc } from "drizzle-orm";
import { connection } from "next/server";
import { db } from "@/db/client";
import { members } from "@/db/schema/members";
import { AudienceMember } from "../types";

export async function getAvailableAudience(): Promise<AudienceMember[]> {
  await connection();

  const records = await db
    .select({
      id: members.id,
      firstName: members.firstName,
      lastName: members.lastName,
      email: members.email,
      phone: members.phone,
      smsOptIn: members.smsOptIn,
      emailOptIn: members.emailOptIn,
    })
    .from(members)
    .orderBy(asc(members.lastName), asc(members.firstName));

  return records;
}
