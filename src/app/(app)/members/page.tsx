import { Suspense } from "react";
import { getMembers } from "@/features/members/queries";
import { MembersClient } from "@/features/members/components";

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <Suspense fallback={<div>Loading members...</div>}>
      <MembersClient members={members} />
    </Suspense>
  );
}
