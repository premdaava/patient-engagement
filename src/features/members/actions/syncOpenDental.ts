"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { members } from "@/db/schema/members";
import { getPatients } from "@/lib/open-dental";

export async function syncOpenDentalPatients() {
  try {
    const odPatients = await getPatients();

    let syncedCount = 0;

    for (const od of odPatients) {
      const patNumStr = od.PatNum.toString();
      const phone = od.WirelessPhone || od.HmPhone || od.WkPhone || null;
      const email = od.Email || null;

      // Check if member already exists by openDentalPatNum
      const [existing] = await db
        .select()
        .from(members)
        .where(eq(members.openDentalPatNum, patNumStr))
        .limit(1);

      if (existing) {
        await db
          .update(members)
          .set({
            firstName: od.FName,
            lastName: od.LName,
            phone,
            email,
          })
          .where(eq(members.id, existing.id));
      } else {
        await db.insert(members).values({
          firstName: od.FName,
          lastName: od.LName,
          phone,
          email,
          openDentalPatNum: patNumStr,
          smsOptIn: true, // Default opted in on sync or false
          emailOptIn: true,
        });
      }
      syncedCount++;
    }

    revalidatePath("/members");
    return { success: true, count: syncedCount };
  } catch (error) {
    console.error("Failed to sync Open Dental patients:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to sync Open Dental patients." };
  }
}
