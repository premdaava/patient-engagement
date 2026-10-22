import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { getEmailTemplates } from "@/features/email-templates/queries";
import { TemplateGrid } from "@/features/email-templates/components";

export default async function EmailTemplatesPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", width: "100%" }}>
      <PageHeader
        title="Email Templates"
        description="Manage reusable email templates for patient campaigns and recall outreach."
        actions={
          <Link href="/email-templates/new">
            <Button leftIcon={<Plus size={16} />}>New Template</Button>
          </Link>
        }
      />
      <Suspense fallback={<div>Loading email templates...</div>}>
        <TemplatesListContent />
      </Suspense>
    </div>
  );
}

async function TemplatesListContent() {
  const templates = await getEmailTemplates();
  return <TemplateGrid templates={templates} />;
}
