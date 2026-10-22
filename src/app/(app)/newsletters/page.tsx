import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { getNewsletters } from "@/features/newsletters/queries";
import { NewsletterList } from "@/features/newsletters/components";

export default async function NewslettersPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", width: "100%" }}>
      <PageHeader
        title="Patient Newsletters"
        description="Design and broadcast engaging newsletters and practice updates to your patients."
        actions={
          <Link href="/newsletters/new">
            <Button leftIcon={<Plus size={16} />}>New Newsletter</Button>
          </Link>
        }
      />
      <Suspense fallback={<div>Loading newsletters...</div>}>
        <NewslettersListContent />
      </Suspense>
    </div>
  );
}

async function NewslettersListContent() {
  const newsletters = await getNewsletters();
  return <NewsletterList newsletters={newsletters} />;
}
