import { eq } from "drizzle-orm";
import { PageHeader } from "@/components/ui/PageHeader";
import { getSession } from "@/features/auth/lib/session";
import { db } from "@/db/client";
import { members } from "@/db/schema/members";
import { QuickActions } from "./QuickActions";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export async function DashboardHeader() {
  const session = await getSession();
  let name = "Doctor";

  if (session?.userId) {
    const [member] = await db
      .select({ firstName: members.firstName })
      .from(members)
      .where(eq(members.userId, session.userId))
      .limit(1);

    if (member?.firstName) {
      name = member.firstName;
    }
  }

  const greeting = getGreeting();

  return (
    <PageHeader
      title={`${greeting}, ${name}`}
      description="Here is an overview of patient recalls, active campaigns, and incoming feedback today."
      actions={<QuickActions />}
    />
  );
}

export function DashboardHeaderSkeleton() {
  return (
    <PageHeader
      title="Welcome back"
      description="Here is an overview of patient recalls, active campaigns, and incoming feedback today."
      actions={<QuickActions />}
    />
  );
}

