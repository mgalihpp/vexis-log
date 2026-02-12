import Analytics from "@/features/analytics/components/Analytics";
import { getAllTrades } from "@/utils/dashboard.server";

export default async function AnalyticsPage() {
  const trades = await getAllTrades();
  return <Analytics trades={trades} />;
}
