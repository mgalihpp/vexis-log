import { getAllTrades } from "@/utils/dashboard.server";
import { HistoryPage } from "@/components/pages/dashboard/HistoryPage";

export default async function DashboardHistoryPage() {
  const trades = await getAllTrades();
  return <HistoryPage trades={trades} />;
}
