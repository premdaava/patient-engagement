"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { users } from "@/db/schema/users";
import { members } from "@/db/schema/members";
import { registerMemberSchema } from "../lib/schemas";
import { createSession } from "@/features/auth/lib/session";
import { FormActionState } from "@/features/auth/types";

export async function registerAction(
  _prevState: FormActionState | null,
  formData: FormData
): Promise<FormActionState> {
  const rawData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    password: formData.get("password"),
    smsOptIn: formData.get("smsOptIn") === "true" || formData.get("smsOptIn") === "on",
    emailOptIn: formData.get("emailOptIn") === "true" || formData.get("emailOptIn") === "on",
  };

  const validation = registerMemberSchema.safeParse(rawData);
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
      fields: {
        firstName: String(rawData.firstName ?? ""),
        lastName: String(rawData.lastName ?? ""),
        email: String(rawData.email ?? ""),
        phone: String(rawData.phone ?? ""),
        smsOptIn: rawData.smsOptIn,
        emailOptIn: rawData.emailOptIn,
      },
    };
  }

  const { firstName, lastName, email, phone, password, smsOptIn, emailOptIn } = validation.data;

  try {
    const existingUsers = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUsers.length > 0) {
      return {
        success: false,
        errors: { email: "An account with this email already exists" },
        fields: {
          firstName,
          lastName,
          email,
          phone,
          smsOptIn,
          emailOptIn,
        },
      };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [newUser] = await db
      .insert(users)
      .values({
        email,
        passwordHash,
        role: "staff",
      })
      .returning();

    await db.insert(members).values({
      userId: newUser.id,
      firstName,
      lastName,
      email,
      phone: phone || null,
      smsOptIn,
      emailOptIn,
    });

    await createSession({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Register action error:", error);
    const detail = error instanceof Error ? error.message : "An unexpected error occurred.";
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? `Registration failed: ${detail}`
          : "An unexpected error occurred during registration. Please try again.",
      fields: {
        firstName,
        lastName,
        email,
        phone,
        smsOptIn,
        emailOptIn,
      },
    };
  }
}
