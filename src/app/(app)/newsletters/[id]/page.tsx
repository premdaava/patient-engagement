import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { getNewsletterById } from "@/features/newsletters/queries";
import { getEmailTemplates } from "@/features/email-templates/queries";
import { NewsletterComposer } from "@/features/newsletters/components";

interface NewsletterDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewsletterDetailsPage({ params }: NewsletterDetailsPageProps) {
  const resolvedParams = await params;
  const isNew = resolvedParams.id === "new";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", width: "100%" }}>
      <PageHeader
        title={isNew ? "Create Newsletter" : "Edit Newsletter"}
        description={isNew ? "Compose a modular patient newsletter using content blocks and templates." : "Manage newsletter content, preview layout, and track delivery stats."}
      />
      <Suspense fallback={<div>Loading newsletter composer...</div>}>
        <NewsletterComposerContent newsletterId={resolvedParams.id} />
      </Suspense>
    </div>
  );
}

async function NewsletterComposerContent({ newsletterId }: { newsletterId: string }) {
  const templates = await getEmailTemplates();

  if (newsletterId === "new") {
    return <NewsletterComposer newsletter={null} templates={templates} />;
  }

  const newsletter = await getNewsletterById(newsletterId);
  if (!newsletter) {
    notFound();
  }

  return <NewsletterComposer newsletter={newsletter} templates={templates} />;
}
