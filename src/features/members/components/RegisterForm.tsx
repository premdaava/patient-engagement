"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { FormField } from "@/features/auth/components/FormField";
import { PasswordInput } from "@/features/auth/components/PasswordInput";
import { registerAction } from "../actions/register";
import { FormActionState } from "@/features/auth/types";
import styles from "./RegisterForm.module.css";

const initialState: FormActionState = {};

export function RegisterForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(registerAction, initialState);

  useEffect(() => {
    if (state?.success) {
      router.push("/ui-kit");
      router.refresh();
    }
  }, [state?.success, router]);

  const errors = state?.errors || {};
  const fields = state?.fields || {};

  return (
    <form action={formAction} className={styles.registerForm} noValidate>
      {state?.message && (
        <div className={styles.registerFormAlert} role="alert">
          {state.message}
        </div>
      )}

      <div className={styles.registerFormRow}>
        <FormField label="First name" id="reg-firstName" error={errors.firstName as string} required>
          <input
            id="reg-firstName"
            name="firstName"
            placeholder="Jane"
            defaultValue={String(fields.firstName ?? "")}
            className={`${styles.registerFormInput} ${errors.firstName ? styles.registerFormInputError : ""}`.trim()}
            disabled={isPending}
          />
        </FormField>

        <FormField label="Last name" id="reg-lastName" error={errors.lastName as string} required>
          <input
            id="reg-lastName"
            name="lastName"
            placeholder="Doe"
            defaultValue={String(fields.lastName ?? "")}
            className={`${styles.registerFormInput} ${errors.lastName ? styles.registerFormInputError : ""}`.trim()}
            disabled={isPending}
          />
        </FormField>
      </div>

      <FormField label="Work Email" id="reg-email" error={errors.email as string} required>
        <input
          id="reg-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jane@dentalpractice.com"
          defaultValue={String(fields.email ?? "")}
          className={`${styles.registerFormInput} ${errors.email ? styles.registerFormInputError : ""}`.trim()}
          disabled={isPending}
        />
      </FormField>

      <FormField label="Phone number" id="reg-phone" error={errors.phone as string} hint="Optional — for direct practice alerts">
        <input
          id="reg-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="(555) 000-0000"
          defaultValue={String(fields.phone ?? "")}
          className={`${styles.registerFormInput} ${errors.phone ? styles.registerFormInputError : ""}`.trim()}
          disabled={isPending}
        />
      </FormField>

      <FormField label="Password" id="reg-password" error={errors.password as string} hint="At least 8 characters" required>
        <PasswordInput
          id="reg-password"
          name="password"
          autoComplete="new-password"
          placeholder="••••••••"
          hasError={Boolean(errors.password)}
          disabled={isPending}
        />
      </FormField>

      <div className={styles.registerFormOptIns}>
        <Checkbox
          id="reg-smsOptIn"
          name="smsOptIn"
          label="I consent to receive critical appointment & recall notifications via SMS"
          defaultChecked={Boolean(fields.smsOptIn ?? false)}
          disabled={isPending}
        />
        <Checkbox
          id="reg-emailOptIn"
          name="emailOptIn"
          label="I consent to receive clinic newsletters and dental hygiene guides via Email"
          defaultChecked={Boolean(fields.emailOptIn ?? false)}
          disabled={isPending}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        isLoading={isPending}
        className={styles.registerFormSubmit}
      >
        Create Account & Register
      </Button>
    </form>
  );
}
