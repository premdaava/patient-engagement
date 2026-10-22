import { Metadata } from "next";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign In | CareConnect",
  description: "Sign in to your CareConnect dental practice portal.",
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to access your practice engagement portal"
      footerText="Don't have an account yet?"
      footerActionText="Create an account"
      footerActionHref="/register"
    >
      <LoginForm />
    </AuthLayout>
  );
}
