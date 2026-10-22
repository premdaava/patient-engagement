"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { users } from "@/db/schema/users";
import { loginSchema } from "../lib/schemas";
import { createSession } from "../lib/session";
import { FormActionState } from "../types";

export async function loginAction(
  _prevState: FormActionState | null,
  formData: FormData
): Promise<FormActionState> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validation = loginSchema.safeParse(rawData);
  if (!validation.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of validation.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return {
      success: false,
      errors: fieldErrors,
      fields: { email: String(rawData.email ?? "") },
    };
  }

  const { email, password } = validation.data;

  try {
    const existingUsers = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    const user = existingUsers[0];
    if (!user) {
      return {
        success: false,
        message: "Invalid email or password",
        fields: { email },
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid email or password",
        fields: { email },
      };
    }

    await createSession({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Login action error:", error);
    const detail = error instanceof Error ? error.message : "An unexpected error occurred.";
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? `Login failed: ${detail}`
          : "An unexpected error occurred. Please try again.",
      fields: { email },
    };
  }
}
