import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { getSurveys } from "@/features/surveys/queries";
import { SurveyList } from "@/features/surveys/components";

export default async function SurveysPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", width: "100%" }}>
      <PageHeader
        title="Patient Surveys"
        description="Create feedback surveys, NPS evaluations, and patient satisfaction forms."
        actions={
          <Link href="/surveys/new">
            <Button leftIcon={<Plus size={16} />}>New Survey</Button>
          </Link>
        }
      />
      <Suspense fallback={<div>Loading surveys...</div>}>
        <SurveysListContent />
      </Suspense>
    </div>
  );
}

async function SurveysListContent() {
  const surveys = await getSurveys();
  return <SurveyList surveys={surveys} />;
}
