import { getAllTrades, getTradeStats } from "@/utils/dashboard.server";
import { DashboardHomePage } from "@/components/pages/dashboard/DashboardHomePage";

export default async function DashboardPage() {
  const [trades, stats] = await Promise.all([getAllTrades(), getTradeStats()]);
  return <DashboardHomePage trades={trades} stats={stats} />;
}
