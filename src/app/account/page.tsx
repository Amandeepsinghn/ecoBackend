import type { Metadata } from "next";
import { ProfileView } from "@/components/account/profile-view";
import { PageFrame } from "@/components/page-frame";

export const metadata: Metadata = {
  title: "Account",
};

export default function AccountPage() {
  return (
    <PageFrame
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/account", label: "Account" },
      ]}
      title="Profile"
    >
      <ProfileView />
    </PageFrame>
  );
}
