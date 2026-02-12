import { getAllTrades } from "@/utils/dashboard.server";
import { TradePage } from "@/components/pages/dashboard/TradePage";

export default async function DashboardTradePage() {
  const trades = await getAllTrades();
  return <TradePage trades={trades} />;
}
