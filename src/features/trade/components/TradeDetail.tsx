import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Brain,
  ClipboardCheck,
  Clock,
  Edit,
  FileText,
  Lightbulb,
  Minus,
  Target,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { mapTradeToFormValues } from "../utils/trade-mapper";
import { EditableSection } from "./EditableSection";
import { TradeStepInfo } from "./steps/TradeStepInfo";
import { TradeStepPlan } from "./steps/TradeStepPlan";
import { TradeStepExecution } from "./steps/TradeStepExecution";
import { TradeStepPsychology } from "./steps/TradeStepPsychology";
import { TradeStepReview } from "./steps/TradeStepReview";
import { TradeStepEvaluation } from "./steps/TradeStepEvaluation";
import { TradeDerivedFieldsSync } from "./TradeDerivedFieldsSync";
import type { TradeEntry } from "@/types/trade";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import type { TradeFormValues } from "@/utils/schema/tradeSchema";
import { updateTrade } from "@/utils/dashboard.functions";

interface TradeDetailProps {
  trade: TradeEntry;
  onClose: () => void;
}

const resultConfig = {
  Win: {
    icon: TrendingUp,
    label: "WIN",
    class: "text-success bg-success/15 border-success/30",
  },
  Loss: {
    icon: TrendingDown,
    label: "LOSS",
    class: "text-destructive bg-destructive/15 border-destructive/30",
  },
  Breakeven: {
    icon: Minus,
    label: "BREAKEVEN",
    class: "text-warning bg-warning/15 border-warning/30",
  },
  Partial: {
    icon: Activity,
    label: "PARTIAL",
    class: "text-info bg-info/15 border-info/30",
  },
  Pending: {
    icon: Clock,
    label: "PENDING",
    class: "text-muted-foreground bg-muted/15 border-muted/30",
  },
};

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="section-header">
      <Icon className="h-4 w-4 text-primary" />
      <span>{title}</span>
    </div>
  );
}

function Field({
  label,
  value,
  mono,
}: {
  label: string;
  value: string | number | boolean | null | undefined;
  mono?: boolean;
}) {
  const display =
    typeof value === "boolean"
      ? value
        ? "Yes ✓"
        : "No ✗"
      : String(value ?? "");
  return (
    <div>
      <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
      <div className={`text-sm text-foreground ${mono ? "font-mono" : ""}`}>
        {display || "—"}
      </div>
    </div>
  );
}

function RatingBar({ value, max = 10 }: { value: number; max?: number }) {
  const pct = (value / max) * 100;
  const color =
    value >= 7 ? "bg-success" : value >= 4 ? "bg-warning" : "bg-destructive";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-sm font-semibold text-foreground">
        {value}/{max}
      </span>
    </div>
  );
}

export function TradeDetail({ trade, onClose }: TradeDetailProps) {
  const router = useRouter();

  // Normalize outcome to match config keys
  let outcome = trade.outcome ?? "Pending";

  // Handle legacy/alternate values
  if (outcome === "BE") outcome = "Breakeven";

  // Fallback if the outcome string isn't in our config (e.g. invalid data)
  if (!(outcome in resultConfig)) {
    outcome = "Pending";
  }

  const outcomeKey = outcome as keyof typeof resultConfig;
  const cfg = resultConfig[outcomeKey];
  const ResultIcon = cfg.icon;

  const profitLossPercent =
    trade.riskPercent && trade.actualRR
      ? Number((trade.actualRR * trade.riskPercent).toFixed(2))
      : (trade.profitLoss ?? 0);

  const defaultValues = mapTradeToFormValues(trade);

  const handleSave = async (data: TradeFormValues) => {
    await updateTrade({ data: { id: trade.id, data } });
    router.refresh();
  };

  return (
    <div className="glass-card p-6 animate-fade-in h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-lg border ${cfg.class}`}
          >
            <ResultIcon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-mono text-xl font-bold text-foreground">
              {trade.pair}
            </h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>
                {trade.date instanceof Date
                  ? trade.date.toLocaleDateString("en-US", { timeZone: "UTC" })
                  : String(trade.date)}{" "}
                {trade.time ?? ""}
              </span>
              <span>·</span>
              <span>{trade.session}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/trade/${trade.id}/edit`}>
            <button
              type="button"
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              title="Full Edit Mode"
            >
              <Edit className="h-5 w-5 text-muted-foreground" />
            </button>
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Result banner */}
      <div
        className={`flex items-center justify-between p-4 rounded-lg border mb-6 ${cfg.class}`}
      >
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={cfg.class}>
            {cfg.label}
          </Badge>
          <span className="text-sm">
            Actual RR:{" "}
            <span className="font-mono font-bold">{trade.actualRR}R</span>
          </span>
        </div>
        <div className="font-mono text-2xl font-bold">
          {profitLossPercent > 0 ? "+" : ""}
          {profitLossPercent}%
        </div>
      </div>

      <div className="space-y-6">
        {/* Block 1: Info & Context */}
        <EditableSection
          title="Trade Info & Setup"
          icon={FileText}
          defaultValues={defaultValues}
          onSave={handleSave}
          renderEdit={(form) => (
            <>
              <TradeDerivedFieldsSync form={form} />
              <TradeStepInfo form={form} showRequiredIndicators={false} />
            </>
          )}
          renderView={() => (
            <>
              {/* 1. General Information */}
              <div className="mb-4">
                <SectionTitle icon={FileText} title="General Information" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Field label="Market" value={trade.market} />
                  <Field label="Timeframe" value={trade.timeframe} mono />
                  <Field label="Session" value={trade.session} />
                  <Field label="Trade Type" value={trade.tradeType} />
                </div>
              </div>

              {/* 2. Pre-Trade Analysis (Part 1: Context) */}
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    label="Market Condition"
                    value={trade.marketCondition}
                  />
                  <Field label="Market Bias" value={trade.marketBias} />
                  <Field label="Strategy" value={trade.strategy} />
                </div>
                <div className="mt-3">
                  <Field label="Setup" value={trade.setup} />
                </div>
              </div>
            </>
          )}
        />

        <Separator className="bg-border/50" />

        {/* Block 2: Plan & Analysis */}
        <EditableSection
          title="Analysis & Plan"
          icon={Target}
          defaultValues={defaultValues}
          onSave={handleSave}
          renderEdit={(form) => (
            <>
              <TradeDerivedFieldsSync form={form} />
              <TradeStepPlan form={form} />
            </>
          )}
          renderView={() => (
            <>
              {/* 2. Pre-Trade Analysis (Part 2: Confirmations) */}
              <div className="mb-4">
                <SectionTitle icon={Target} title="Pre-Trade Analysis" />
                <div className="space-y-3">
                  <Field
                    label="Technical Confirmation"
                    value={trade.technicalConfirmation}
                  />
                  <Field
                    label="Fundamental Confirmation"
                    value={trade.fundamentalConfirmation}
                  />
                  <Field label="Entry Reason" value={trade.entryReason} />
                </div>
              </div>

              {/* 3. Trading Plan */}
              <div>
                <SectionTitle icon={ClipboardCheck} title="Trading Plan" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Field label="Entry Price" value={trade.entryPrice} mono />
                  <Field label="Stop Loss" value={trade.stopLoss} mono />
                  <Field label="Take Profit" value={trade.takeProfit} mono />
                  <Field label="Risk %" value={`${trade.riskPercent}%`} mono />
                  <Field label="RR Ratio" value={`${trade.rrRatio}R`} mono />
                  <Field
                    label="Position Size"
                    value={trade.positionSize}
                    mono
                  />
                </div>
              </div>
            </>
          )}
        />

        <Separator className="bg-border/50" />

        {/* Block 3: Execution & Result */}
        <EditableSection
          title="Execution & Outcome"
          icon={Activity}
          defaultValues={defaultValues}
          onSave={handleSave}
          renderEdit={(form) => {
            const result = form.watch("result");
            const isPending = result === "Pending";
            return (
              <>
                <TradeDerivedFieldsSync form={form} />
                <TradeStepExecution
                  form={form}
                  isPending={isPending}
                  showRequiredIndicators={false}
                />
              </>
            );
          }}
          renderView={() => (
            <>
              {/* 4. Execution */}
              <div className="mb-4">
                <SectionTitle icon={Activity} title="Trade Execution" />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Entry on plan?" value={trade.entryOnPlan} />
                  <Field label="Slippage" value={trade.slippage} />
                </div>
                <div className="mt-3 space-y-3">
                  <Field label="Plan Change" value={trade.planChange} />
                  <Field
                    label="Trade Management"
                    value={trade.tradeManagement}
                  />
                </div>
              </div>

              {/* 6. Result (Moved here to match Edit Step) */}
              <div>
                <SectionTitle icon={BarChart3} title="Trade Result" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Field label="Exit Price" value={trade.exitPrice} mono />
                  <Field label="Fee" value={trade.fee} mono />
                  <Field label="P&L" value={trade.profitLoss} mono />
                  <Field label="P&L %" value={`${profitLossPercent}%`} mono />
                </div>
              </div>
            </>
          )}
        />

        <Separator className="bg-border/50" />

        {/* Block 4: Psychology */}
        <EditableSection
          title="Trading Psychology"
          icon={Brain}
          defaultValues={defaultValues}
          onSave={handleSave}
          renderEdit={(form) => (
            <>
              <TradeDerivedFieldsSync form={form} />
              <TradeStepPsychology form={form} />
            </>
          )}
          renderView={() => (
            <>
              {/* 5. Psychology */}
              <div className="grid grid-cols-2 gap-4 mb-3">
                <Field
                  label="Emotion Before Entry"
                  value={trade.emotionBefore}
                />
                <Field
                  label="Emotional Disruption"
                  value={trade.emotionalDisruption}
                />
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">
                    Confidence Level
                  </div>
                  <RatingBar value={trade.confidenceLevel ?? 0} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">
                    Discipline
                  </div>
                  <RatingBar value={trade.disciplineScore ?? 0} />
                </div>
              </div>
            </>
          )}
        />

        <Separator className="bg-border/50" />

        {/* Block 5: Review */}
        <EditableSection
          title="Post-Trade Review"
          icon={Lightbulb}
          defaultValues={defaultValues}
          onSave={handleSave}
          renderEdit={(form) => (
            <>
              <TradeDerivedFieldsSync form={form} />
              <TradeStepReview form={form} />
            </>
          )}
          renderView={() => (
            <>
              {/* 7. Post-Trade Review */}
              <div className="mb-4">
                <SectionTitle icon={Lightbulb} title="Post-Trade Review" />
                <div className="space-y-3">
                  <Field label="What went right" value={trade.whatWentRight} />
                  <Field label="Mistakes" value={trade.mistakes} />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Valid Setup?" value={trade.validSetup} />
                    <Field label="Entry timing" value={trade.entryTiming} />
                  </div>
                  <Field label="Lessons Learned" value={trade.lesson} />
                </div>
              </div>
            </>
          )}
        />

        <Separator className="bg-border/50" />

        {/* Block 6: Evaluation */}
        <EditableSection
          title="Improvement & Evaluation"
          icon={AlertTriangle}
          defaultValues={defaultValues}
          onSave={handleSave}
          renderEdit={(form) => (
            <>
              <TradeDerivedFieldsSync form={form} />
              <TradeStepEvaluation form={form} />
            </>
          )}
          renderView={() => (
            <>
              {/* 9. Evaluation */}
              <div>
                <SectionTitle
                  icon={AlertTriangle}
                  title="Evaluation & Improvement"
                />
                <div className="space-y-3">
                  <Field label="Notes" value={trade.notes} />
                  <div className="flex flex-wrap gap-1 mt-1">
                    {trade.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px] py-0 h-4"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Field label="What to improve" value={trade.improvement} />
                  <Field
                    label="Rules to tighten"
                    value={trade.rulesToTighten}
                  />
                  <Field label="Action plan" value={trade.actionPlan} />
                </div>
              </div>
            </>
          )}
        />
      </div>
    </div>
  );
}
