import { redirect } from "next/navigation";
import Analytics from "@/features/analytics/components/Analytics";
import { getAllTrades } from "@/utils/dashboard.server";
import { getServerAuthSession } from "@/lib/auth-session";

export default async function AnalyticsPage() {
  const user = await getServerAuthSession();
  if (!user) {
    redirect("/login");
  }

  const trades = await getAllTrades(user.id);
  return <Analytics trades={trades} />;
}
