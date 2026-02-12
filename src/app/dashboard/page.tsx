import { redirect } from "next/navigation";
import { getAllTrades, getTradeStats } from "@/utils/dashboard.server";
import { DashboardHomePage } from "@/components/pages/dashboard/DashboardHomePage";
import { getServerAuthSession } from "@/lib/auth-session";

export default async function DashboardPage() {
  const user = await getServerAuthSession();
  if (!user) {
    redirect("/login");
  }

  const [trades, stats] = await Promise.all([
    getAllTrades(user.id),
    getTradeStats(user.id),
  ]);
  return <DashboardHomePage trades={trades} stats={stats} />;
}
