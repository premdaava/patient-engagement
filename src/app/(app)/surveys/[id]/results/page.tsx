import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { getSurveyResults } from "@/features/surveys/queries";
import { ResultsSummary, ResultBar } from "@/features/surveys/components";
import styles from "@/features/surveys/components/ResultBar.module.css";



interface SurveyResultsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SurveyResultsPage({ params }: SurveyResultsPageProps) {
  const resolvedParams = await params;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)", width: "100%" }}>
      <PageHeader
        title="Survey Analytics & Results"
        description="Aggregate scores, response distribution charts, and patient text responses."
        actions={
          <Link href={`/surveys/${resolvedParams.id}`}>
            <Button variant="outline" leftIcon={<ArrowLeft size={16} />}>Back to Builder</Button>
          </Link>
        }
      />
      <Suspense fallback={<div>Loading survey results...</div>}>
        <SurveyResultsContent surveyId={resolvedParams.id} />
      </Suspense>
    </div>
  );
}

async function SurveyResultsContent({ surveyId }: { surveyId: string }) {
  const data = await getSurveyResults(surveyId);
  if (!data) {
    notFound();
  }

  const { survey, questions, responses, totalSubmissions } = data;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "var(--space-6)" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 4px 0" }}>{survey.title}</h2>
        {survey.description && <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", margin: 0 }}>{survey.description}</p>}
      </div>

      <ResultsSummary totalSubmissions={totalSubmissions} questionCount={questions.length} />

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>Question Breakdown</h3>

        {questions.map((q, idx) => {
          const qResponses = responses.filter((r) => r.questionId === q.id);

          // Calculate average score for rating/nps questions if numeric
          const numericScores = qResponses
            .map((r) => Number(r.responseText))
            .filter((n) => !isNaN(n));
          
          const avgScore = numericScores.length > 0 ? (numericScores.reduce((a, b) => a + b, 0) / numericScores.length).toFixed(1) : null;

          // Count option distribution
          const countsMap: Record<string, number> = {};
          qResponses.forEach((r) => {
            const val = r.responseText || "(Blank)";
            countsMap[val] = (countsMap[val] || 0) + 1;
          });

          return (
            <div
              key={q.id}
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-5)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase" }}>
                  Question {idx + 1} ({q.questionType.replace("_", " ")})
                </span>
                {avgScore && (
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-primary)", background: "var(--color-primary-light)", padding: "2px 8px", borderRadius: "var(--radius-sm)" }}>
                    Avg Score: {avgScore}
                  </span>
                )}
              </div>

              <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-text-main)", margin: 0 }}>
                {q.questionText}
              </h4>

              {q.questionType === "text" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                  {qResponses.length === 0 ? (
                    <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", fontStyle: "italic" }}>No text responses yet.</p>
                  ) : (
                    qResponses.map((r, i) => (
                      <div key={i} style={{ background: "var(--color-background)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", padding: 10, fontSize: "0.9rem" }}>
                        &quot;{r.responseText}&quot;
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className={styles.barContainer}>
                  {Object.entries(countsMap).map(([label, count]) => (
                    <ResultBar key={label} label={label} count={count} total={qResponses.length} />
                  ))}
                  {Object.keys(countsMap).length === 0 && (
                    <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", fontStyle: "italic" }}>No responses recorded for this question yet.</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
