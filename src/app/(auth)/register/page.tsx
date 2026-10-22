import { Metadata } from "next";
import { AuthLayout } from "@/features/auth/components/AuthLayout";
import { RegisterForm } from "@/features/members/components/RegisterForm";

export const metadata: Metadata = {
  title: "Register | CareConnect",
  description: "Create your CareConnect dental staff account.",
};

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create staff account"
      subtitle="Register to manage patient recalls, messaging, and campaigns"
      footerText="Already registered?"
      footerActionText="Sign in to your account"
      footerActionHref="/login"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
