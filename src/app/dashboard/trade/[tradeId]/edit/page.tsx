import TradeForm from "@/features/trade/components/TradeForm";
import { getTradeById } from "@/utils/dashboard.server";
import { mapTradeToFormValues } from "@/features/trade/utils/trade-mapper";

type Params = {
  params: Promise<{ tradeId: string }>;
};

export default async function DashboardTradeEditPage({ params }: Params) {
  const { tradeId } = await params;
  const trade = await getTradeById(tradeId);
  const initialValues = mapTradeToFormValues(trade);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Edit Trade
        </h1>
        <p className="text-muted-foreground">
          Update trade details, outcome, or notes.
        </p>
      </div>
      <TradeForm tradeId={trade.id} initialValues={initialValues} />
    </div>
  );
}
