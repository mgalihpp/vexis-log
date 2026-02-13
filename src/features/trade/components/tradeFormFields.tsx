import { FormLabel } from "@/components/ui/form";

export const MARKET_OPTIONS = [
  "Forex",
  "Crypto",
  "Stock",
  "Index",
  "Commodities",
  "Futures",
  "Options",
  "ETFs",
];
export const TIMEFRAME_OPTIONS = [
  "M1",
  "M3",
  "M5",
  "M15",
  "M30",
  "H1",
  "H2",
  "H4",
  "H8",
  "D1",
  "W1",
];
export const SESSION_OPTIONS = [
  "Asia",
  "London",
  "New York",
  "Overlap",
  "Pre-London",
  "Post-NY",
];
export const TRADE_TYPE_OPTIONS = ["Scalp", "Day Trade", "Swing", "Position"];
export const DIRECTION_OPTIONS = ["Long", "Short"];
export const MARKET_CONDITION_OPTIONS = [
  "Trending",
  "Ranging",
  "Breakout",
  "Reversal",
  "High Volatility",
  "Low Volatility",
  "News Driven",
];
export const STRATEGY_OPTIONS = [
  "ICT",
  "SMC",
  "Breakout",
  "Pullback",
  "Trend Following",
  "Mean Reversion",
  "Supply & Demand",
  "Fib Retracement",
];
export const RESULT_OPTIONS = [
  "Pending",
  "Win",
  "Loss",
  "Breakeven",
  "Partial",
];

export const RequiredLabel = ({ text }: { text: string }) => (
  <FormLabel>
    {text}
    <span className="text-destructive">*</span>
  </FormLabel>
);
