import { AdminNav } from "@/components/admin/admin-nav";
import { shell } from "@/components/ui";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className={`${shell} py-10`}>
      <p className="text-sm font-medium text-muted">Admin</p>
      <div className="mt-6">
        <AdminNav />
        {children}
      </div>
    </div>
  );
}
