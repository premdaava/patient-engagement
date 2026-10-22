import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { getSurveyWithQuestions } from "@/features/surveys/queries";
import { SurveyBuilder } from "@/features/surveys/components";

interface SurveyDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SurveyDetailsPage({ params }: SurveyDetailsPageProps) {
  const resolvedParams = await params;
  const isNew = resolvedParams.id === "new";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", width: "100%" }}>
      <PageHeader
        title={isNew ? "Create Survey" : "Edit Survey"}
        description={isNew ? "Build a custom patient survey with rating scales, multiple choice, and feedback boxes." : "Manage survey questions, update status, and review response analytics."}
      />
      <Suspense fallback={<div>Loading survey builder...</div>}>
        <SurveyBuilderContent surveyId={resolvedParams.id} />
      </Suspense>
    </div>
  );
}

async function SurveyBuilderContent({ surveyId }: { surveyId: string }) {
  if (surveyId === "new") {
    return <SurveyBuilder survey={null} questions={[]} />;
  }

  const data = await getSurveyWithQuestions(surveyId);
  if (!data) {
    notFound();
  }

  return <SurveyBuilder survey={data.survey} questions={data.questions} />;
}
