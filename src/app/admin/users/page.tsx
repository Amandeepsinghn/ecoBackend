import type { Metadata } from "next";
import { RoleForm } from "@/components/admin/role-form";

export const metadata: Metadata = {
  title: "User role",
};

export default function AdminUsersPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">User role</h1>
      <p className="mt-3 max-w-xl text-sm text-muted">
        The API updates one user at a time. Enter their id and set the admin flag.
      </p>
      <div className="mt-8">
        <RoleForm />
      </div>
    </>
  );
}
