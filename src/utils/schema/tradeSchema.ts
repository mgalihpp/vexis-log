import { z } from "zod";

export const tradeSchema = z.object({
  date: z.string().min(1, "Please enter a date."),
  time: z.string().optional(),
  market: z.string().min(1, "Please select a market."),
  pair: z.string().min(1, "Please enter a pair/asset."),
  timeframe: z.string().optional(),
  session: z.string().optional(),
  tradeType: z.string().optional(),
  direction: z.string().min(1, "Please select a direction."),
  marketCondition: z.string().optional(),
  marketBias: z.string().optional(),
  strategy: z.string().optional(),
  setup: z.string().optional(),
  technicalConfirmation: z.string().optional(),
  fundamentalConfirmation: z.string().optional(),
  entryReason: z.string().optional(),
  entryPrice: z.string().optional(),
  stopLoss: z.string().optional(),
  takeProfit: z.string().optional(),
  riskPercent: z.string().optional(),
  accountBalance: z.string().optional(),
  rrRatio: z.string().optional(),
  positionSize: z.string().optional(),
  entryOnPlan: z.boolean().optional(),
  slippage: z.string().optional(),
  planChange: z.string().optional(),
  tradeManagement: z.string().optional(),
  emotionBefore: z.string().optional(),
  emotionalDisruption: z.string().optional(),
  confidence: z.number().optional(),
  discipline: z.number().optional(),
  exitPrice: z.string().optional(),
  fee: z.string().optional(),
  profitLoss: z.string().optional(),
  result: z.string().optional().default("Pending"),
  actualRR: z.string().optional(),
  whatWentRight: z.string().optional(),
  mistakes: z.string().optional(),
  validSetup: z.boolean().optional(),
  entryTiming: z.string().optional(),
  lesson: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  improvement: z.string().optional(),
  rulesToTighten: z.string().optional(),
  actionPlan: z.string().optional(),
});

export const quickAddTradeSchema = tradeSchema.partial().extend({
  date: z.string().min(1, "Please enter a date."),
  time: z.string().min(1, "Please enter a time."),
  market: z.string().min(1, "Please select a market."),
  pair: z.string().min(1, "Please enter a pair/asset."),
  timeframe: z.string().optional(),
  tradeType: z.string().optional(),
  direction: z.string().min(1, "Please select a direction."),
  result: z.string().optional(),
  confidence: z.number().optional(),
  discipline: z.number().optional(),
});

export const updateTradeSchema = z
  .object({})
  .passthrough()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  })
  .pipe(tradeSchema.partial());

export type TradeFormInput = z.input<typeof tradeSchema>;
export type TradeFormValues = z.output<typeof tradeSchema>;
export type QuickAddTradeFormInput = z.input<typeof quickAddTradeSchema>;
export type QuickAddTradeFormValues = z.output<typeof quickAddTradeSchema>;
export type UpdateTradeFormInput = Partial<z.input<typeof tradeSchema>>;
export type UpdateTradeFormValues = z.output<typeof updateTradeSchema>;
