import { connection } from "next/server";
import { db } from "@/db/client";
import { members, Member } from "@/db/schema/members";

export async function getMembers(): Promise<Member[]> {
  await connection();
  return db.select().from(members).orderBy(members.lastName);
}
