import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("🌱 Starting database seed...");

  const { db } = await import("./client");
  const { users } = await import("./schema/users");
  const { members } = await import("./schema/members");

  const demoEmail = "demo@careconnect.com";
  const demoPassword = "Password123!";

  // Check if demo user already exists
  const existingUser = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, demoEmail))
    .limit(1);

  if (existingUser.length > 0) {
    console.log(`Demo user already exists: ${demoEmail}`);
    console.log("\n=================================");
    console.log("Demo credentials:");
    console.log(`Email:    ${demoEmail}`);
    console.log(`Password: ${demoPassword}`);
    console.log("=================================\n");
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(demoPassword, 10);

  const [newUser] = await db
    .insert(users)
    .values({
      email: demoEmail,
      passwordHash,
      role: "admin",
    })
    .returning({ id: users.id, email: users.email, role: users.role });

  console.log(`✓ Created demo user: ${newUser.email} (Role: ${newUser.role})`);

  const [newMember] = await db
    .insert(members)
    .values({
      userId: newUser.id,
      firstName: "Dr. Sarah",
      lastName: "Jenkins",
      email: demoEmail,
      phone: "(555) 234-5678",
      openDentalPatNum: "OD-1001",
      smsOptIn: true,
      emailOptIn: true,
    })
    .returning({ id: members.id, firstName: members.firstName, lastName: members.lastName });

  console.log(`✓ Created demo member profile: ${newMember.firstName} ${newMember.lastName}`);
  console.log("\n=================================");
  console.log("Demo credentials:");
  console.log(`Email:    ${demoEmail}`);
  console.log(`Password: ${demoPassword}`);
  console.log("=================================\n");
}

seed()
  .then(() => {
    console.log("✨ Seed completed successfully.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  });

