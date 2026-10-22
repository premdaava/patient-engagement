import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { getEmailTemplateById } from "@/features/email-templates/queries";
import { TemplateEditor } from "@/features/email-templates/components";

interface TemplateDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TemplateDetailsPage({ params }: TemplateDetailsPageProps) {
  const resolvedParams = await params;
  const isNew = resolvedParams.id === "new";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", width: "100%" }}>
      <PageHeader
        title={isNew ? "Create Email Template" : "Edit Email Template"}
        description={isNew ? "Design a new reusable email template with merge tags." : "Modify template content and preview live changes."}
      />
      <Suspense fallback={<div>Loading template editor...</div>}>
        <TemplateEditorContent templateId={resolvedParams.id} />
      </Suspense>
    </div>
  );
}

async function TemplateEditorContent({ templateId }: { templateId: string }) {
  if (templateId === "new") {
    return <TemplateEditor template={null} />;
  }

  const template = await getEmailTemplateById(templateId);
  if (!template) {
    notFound();
  }

  return <TemplateEditor template={template} />;
}
