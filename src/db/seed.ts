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
  const { campaigns } = await import("./schema/campaigns");
  const { reviews } = await import("./schema/reviews");
  const { conversations, messages } = await import("./schema/messaging");

  const demoEmail = "demo@careconnect.com";
  const demoPassword = "Password123!";

  // 1. Seed Demo User
  let doctorUser = (
    await db.select().from(users).where(eq(users.email, demoEmail)).limit(1)
  )[0];

  if (!doctorUser) {
    const passwordHash = await bcrypt.hash(demoPassword, 10);
    const [created] = await db
      .insert(users)
      .values({
        email: demoEmail,
        passwordHash,
        role: "admin",
      })
      .returning();
    doctorUser = created;
    console.log(`✓ Created demo user: ${doctorUser.email} (Role: ${doctorUser.role})`);
  }

  // 2. Seed Doctor Member Profile
  let doctorMember = (
    await db.select().from(members).where(eq(members.userId, doctorUser.id)).limit(1)
  )[0];

  if (!doctorMember) {
    const [createdMember] = await db
      .insert(members)
      .values({
        userId: doctorUser.id,
        firstName: "Dr. Sarah",
        lastName: "Jenkins",
        email: demoEmail,
        phone: "(555) 234-5678",
        openDentalPatNum: "OD-1001",
        smsOptIn: true,
        emailOptIn: true,
      })
      .returning();
    doctorMember = createdMember;
    console.log(`✓ Created doctor profile: ${doctorMember.firstName} ${doctorMember.lastName}`);
  }

  // 3. Seed Sample Patient Members
  const existingPatients = await db.select().from(members);
  let patientA = existingPatients.find((p) => p.email === "emily.watson@gmail.com");
  let patientB = existingPatients.find((p) => p.email === "marcus.chen@outlook.com");

  if (!patientA) {
    const [created] = await db
      .insert(members)
      .values({
        firstName: "Emily",
        lastName: "Watson",
        email: "emily.watson@gmail.com",
        phone: "(555) 345-9871",
        openDentalPatNum: "OD-2004",
        smsOptIn: true,
        emailOptIn: true,
      })
      .returning();
    patientA = created;
    console.log(`✓ Created sample patient: ${patientA.firstName} ${patientA.lastName}`);
  }

  if (!patientB) {
    const [created] = await db
      .insert(members)
      .values({
        firstName: "Marcus",
        lastName: "Chen",
        email: "marcus.chen@outlook.com",
        phone: "(555) 456-1122",
        openDentalPatNum: "OD-2005",
        smsOptIn: true,
        emailOptIn: false,
      })
      .returning();
    patientB = created;
    console.log(`✓ Created sample patient: ${patientB.firstName} ${patientB.lastName}`);
  }

  // 4. Seed Sample Campaigns
  const existingCampaigns = await db.select().from(campaigns);
  if (existingCampaigns.length === 0) {
    await db.insert(campaigns).values([
      {
        name: "6-Month Hygiene Recall SMS",
        type: "sms",
        status: "running",
      },
      {
        name: "Teeth Whitening Spring Special",
        type: "email",
        status: "scheduled",
        scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      },
      {
        name: "Overdue Perio Treatment Follow-Up",
        type: "sms",
        status: "completed",
      },
      {
        name: "Invisalign Consultation Invite",
        type: "email",
        status: "draft",
      },
    ]);
    console.log("✓ Created 4 sample campaigns");
  }

  // 5. Seed Sample Reviews
  const existingReviews = await db.select().from(reviews);
  if (existingReviews.length === 0 && patientA && patientB) {
    await db.insert(reviews).values([
      {
        memberId: patientA.id,
        rating: 5,
        comment: "Dr. Jenkins and the hygienist were amazingly gentle! Cleanest my teeth have felt in years.",
        source: "google",
        status: "published",
      },
      {
        memberId: patientB.id,
        rating: 5,
        comment: "The SMS recall reminder made scheduling so seamless. Highly recommend this practice!",
        source: "internal",
        status: "published",
      },
    ]);
    console.log("✓ Created sample reviews");
  }

  // 6. Seed Sample 2-Way Conversations & Messages
  const existingConversations = await db.select().from(conversations);
  if (existingConversations.length === 0 && patientA) {
    const [conv] = await db
      .insert(conversations)
      .values({
        memberId: patientA.id,
        lastMessageAt: new Date(),
      })
      .returning();

    await db.insert(messages).values([
      {
        conversationId: conv.id,
        direction: "outbound",
        status: "delivered",
        body: "Hi Emily, this is CareConnect Dental. You are due for your routine 6-month cleaning. Would you like to schedule this Friday?",
      },
      {
        conversationId: conv.id,
        direction: "inbound",
        status: "received",
        body: "Hi! Yes please, can I take the 2:30pm slot this Friday?",
      },
    ]);
    console.log("✓ Created sample conversations and messages");
  }

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


