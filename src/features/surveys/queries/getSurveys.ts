import { desc, eq, sql } from "drizzle-orm";

import { connection } from "next/server";
import { db } from "@/db/client";
import { surveys, surveyQuestions, surveyResponses, Survey, SurveyQuestion } from "@/db/schema/surveys";

export interface SurveyWithStats extends Survey {
  questionCount: number;
  responseCount: number;
}

export async function getSurveys(): Promise<SurveyWithStats[]> {
  await connection();

  const rows = await db
    .select({
      id: surveys.id,
      title: surveys.title,
      description: surveys.description,
      status: surveys.status,
      createdAt: surveys.createdAt,
      questionCount: sql<number>`(SELECT count(*) FROM ${surveyQuestions} WHERE ${surveyQuestions}.surveyId = ${surveys}.id)`,
      responseCount: sql<number>`(SELECT count(DISTINCT ${surveyResponses}.createdAt) FROM ${surveyResponses} WHERE ${surveyResponses}.surveyId = ${surveys}.id)`,
    })
    .from(surveys)
    .orderBy(desc(surveys.createdAt));

  return rows;
}

export async function getSurveyWithQuestions(id: string): Promise<{ survey: Survey; questions: SurveyQuestion[] } | null> {
  await connection();

  const [survey] = await db
    .select()
    .from(surveys)
    .where(eq(surveys.id, id))
    .limit(1);

  if (!survey) return null;

  const questions = await db
    .select()
    .from(surveyQuestions)
    .where(eq(surveyQuestions.surveyId, id))
    .orderBy(surveyQuestions.sortOrder);

  return { survey, questions };
}

export async function getSurveyResults(id: string) {
  await connection();

  const surveyData = await getSurveyWithQuestions(id);
  if (!surveyData) return null;

  const responses = await db
    .select()
    .from(surveyResponses)
    .where(eq(surveyResponses.surveyId, id));

  // Compute unique submissions by grouping responses by createdAt timestamp or similar if needed, or count distinct responses
  // Let's count unique submission timestamps or count rows per question
  const totalSubmissionsSet = new Set(responses.map(r => r.createdAt.getTime()));
  const totalSubmissions = totalSubmissionsSet.size;

  return {
    survey: surveyData.survey,
    questions: surveyData.questions,
    responses,
    totalSubmissions,
  };
}
