import { redirect } from "next/navigation";
import { getAllTrades } from "@/utils/dashboard.server";
import { TradePage } from "@/components/pages/dashboard/TradePage";
import { getServerAuthSession } from "@/lib/auth-session";

export default async function DashboardTradePage() {
  const user = await getServerAuthSession();
  if (!user) {
    redirect("/login");
  }

  const trades = await getAllTrades(user.id);
  return <TradePage trades={trades} />;
}
