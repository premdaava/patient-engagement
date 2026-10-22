"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { FormField } from "./FormField";
import { PasswordInput } from "./PasswordInput";
import { loginAction } from "../actions/login";
import { FormActionState } from "../types";
import styles from "./LoginForm.module.css";

const initialState: FormActionState = {};

export function LoginForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard");
      router.refresh();
    }
  }, [state?.success, router]);

  const emailError = typeof state?.errors?.email === "string" ? state.errors.email : undefined;
  const passwordError = typeof state?.errors?.password === "string" ? state.errors.password : undefined;

  return (
    <form action={formAction} className={styles.loginForm} noValidate>
      {state?.message && (
        <div className={styles.loginFormAlert} role="alert">
          {state.message}
        </div>
      )}

      <FormField label="Email address" id="login-email" error={emailError} required>
        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="doctor@practice.com"
          defaultValue={String(state?.fields?.email ?? "")}
          className={`${styles.loginFormInput} ${emailError ? styles.loginFormInputError : ""}`.trim()}
          disabled={isPending}
        />
      </FormField>

      <FormField label="Password" id="login-password" error={passwordError} required>
        <PasswordInput
          id="login-password"
          name="password"
          autoComplete="current-password"
          placeholder="••••••••"
          hasError={Boolean(passwordError)}
          disabled={isPending}
        />
      </FormField>

      <Button
        type="submit"
        variant="primary"
        size="md"
        isLoading={isPending}
        className={styles.loginFormSubmit}
      >
        Sign in
      </Button>
    </form>
  );
}
