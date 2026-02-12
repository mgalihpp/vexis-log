import { redirect } from "next/navigation";
import { getAllTrades } from "@/utils/dashboard.server";
import { HistoryPage } from "@/components/pages/dashboard/HistoryPage";
import { getServerAuthSession } from "@/lib/auth-session";

export default async function DashboardHistoryPage() {
  const user = await getServerAuthSession();
  if (!user) {
    redirect("/login");
  }

  const trades = await getAllTrades(user.id);
  return <HistoryPage trades={trades} />;
}
