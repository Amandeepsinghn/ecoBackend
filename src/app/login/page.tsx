import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { PageFrame } from "@/components/page-frame";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <PageFrame title="Sign in">
      <AuthForm mode="login" />
    </PageFrame>
  );
}
