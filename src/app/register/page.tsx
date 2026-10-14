import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { PageFrame } from "@/components/page-frame";

export const metadata: Metadata = {
  title: "Create account",
};

export default function RegisterPage() {
  return (
    <PageFrame title="Create account">
      <AuthForm mode="register" />
    </PageFrame>
  );
}
