import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getSurveyWithQuestions } from "@/features/surveys/queries";
import { PublicSurveyClient } from "./PublicSurveyClient";

interface PublicSurveyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PublicSurveyPage({ params }: PublicSurveyPageProps) {
  const resolvedParams = await params;

  return (
    <Suspense fallback={<div style={{ textAlign: "center", padding: 64 }}>Loading survey...</div>}>
      <PublicSurveyLoader surveyId={resolvedParams.id} />
    </Suspense>
  );
}

async function PublicSurveyLoader({ surveyId }: { surveyId: string }) {
  const data = await getSurveyWithQuestions(surveyId);
  if (!data || data.survey.status !== "active") {
    notFound();
  }

  return <PublicSurveyClient survey={data.survey} questions={data.questions} />;
}
