"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/client";
import { surveys, surveyQuestions, surveyResponses } from "@/db/schema/surveys";

export interface QuestionInput {
  id?: string;
  questionText: string;
  questionType: "text" | "rating" | "multiple_choice" | "yes_no";
  options?: string | null; // JSON string or comma separated
  isRequired?: boolean;
  sortOrder: number;
}

export interface SaveSurveyInput {
  id?: string;
  title: string;
  description?: string | null;
  status?: "draft" | "active" | "closed";
  questions: QuestionInput[];
}

export async function saveSurvey(input: SaveSurveyInput) {
  try {
    let surveyId = input.id;

    if (surveyId) {
      await db
        .update(surveys)
        .set({
          title: input.title,
          description: input.description || null,
          status: input.status || "draft",
        })
        .where(eq(surveys.id, surveyId));

      // Remove existing questions and re-insert
      await db.delete(surveyQuestions).where(eq(surveyQuestions.surveyId, surveyId));
    } else {
      const [created] = await db
        .insert(surveys)
        .values({
          title: input.title,
          description: input.description || null,
          status: input.status || "draft",
        })
        .returning({ id: surveys.id });

      surveyId = created.id;
    }

    if (input.questions && input.questions.length > 0) {
      await db.insert(surveyQuestions).values(
        input.questions.map((q, idx) => ({
          surveyId: surveyId!,
          questionText: q.questionText,
          questionType: q.questionType,
          options: q.options || null,
          isRequired: q.isRequired ?? false,
          sortOrder: idx,
        }))
      );
    }

    revalidatePath("/surveys");
    revalidatePath(`/surveys/${surveyId}`);
    return { success: true, id: surveyId };
  } catch (error) {
    console.error("Failed to save survey:", error);
    return { success: false, error: "Failed to save survey" };
  }
}

export async function submitSurveyResponse(surveyId: string, answers: Record<string, string>) {
  try {
    const submissionTime = new Date();

    const insertValues = Object.entries(answers).map(([questionId, responseText]) => ({
      surveyId,
      questionId,
      responseText,
      createdAt: submissionTime,
    }));

    if (insertValues.length > 0) {
      await db.insert(surveyResponses).values(insertValues);
    }

    revalidatePath(`/surveys/${surveyId}/results`);
    return { success: true };
  } catch (error) {
    console.error("Failed to submit survey response:", error);
    return { success: false, error: "Failed to submit response" };
  }
}
