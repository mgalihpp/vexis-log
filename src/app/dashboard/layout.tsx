import { redirect } from "next/navigation";
import { Sidebar } from "@/features/dashboard/components/Sidebar";
import { getServerAuthSession } from "@/lib/auth-session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerAuthSession();
  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 min-h-0 overflow-auto">
        <div className="container mx-auto p-4 md:p-8 max-w-7xl">{children}</div>
      </div>
    </main>
  );
}
