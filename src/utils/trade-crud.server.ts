import type z from "zod";
import { prisma } from "@/lib/db";
import {
  quickAddTradeSchema,
  tradeSchema,
  updateTradeSchema,
} from "@/utils/schema/tradeSchema";
import { normalizeRrRatio } from "@/utils/rr-ratio";
import { parse, format } from "date-fns";

const parseNumber = (value?: string) => {
  if (value === undefined || value === "") {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const parseRatio = (value?: string) => {
  if (value === undefined || value === "") {
    return undefined;
  }

  if (value.includes(":")) {
    const [left, right] = value.split(":");
    const leftNumber = Number(left);
    const rightNumber = Number(right);

    if (Number.isNaN(leftNumber) || Number.isNaN(rightNumber)) {
      return undefined;
    }

    if (leftNumber === 0) {
      return undefined;
    }

    return rightNumber / leftNumber;
  }

  return parseNumber(value);
};

const withFallback = (value: string | undefined, fallback: string) => {
  if (value === undefined) {
    return fallback;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
};

const parsePositiveFiniteNumber = (value?: string) => {
  const parsed = parseNumber(value);
  if (parsed === undefined || !Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
};

const parseFiniteNumber = (value?: string) => {
  const parsed = parseNumber(value);
  if (parsed === undefined || !Number.isFinite(parsed)) {
    return null;
  }

  return parsed;
};

const deriveTradeValues = (
  data:
    | z.infer<typeof tradeSchema>
    | z.infer<typeof quickAddTradeSchema>
    | Partial<z.infer<typeof tradeSchema>>,
) => {
  const direction = data.direction;
  if (direction !== "Long" && direction !== "Short") {
    return {
      rrRatio: null,
      positionSize: null,
      actualRR: null,
      profitLoss: null,
      result: null,
    };
  }

  const entry = parseFiniteNumber(data.entryPrice);
  const stopLoss = parseFiniteNumber(data.stopLoss);
  if (entry === null || stopLoss === null) {
    return {
      rrRatio: null,
      positionSize: null,
      actualRR: null,
      profitLoss: null,
      result: null,
    };
  }

  const stopLossDistance = Math.abs(entry - stopLoss);
  if (stopLossDistance <= 0) {
    return {
      rrRatio: null,
      positionSize: null,
      actualRR: null,
      profitLoss: null,
      result: null,
    };
  }

  const riskPercent = parsePositiveFiniteNumber(data.riskPercent);
  const accountBalance = parsePositiveFiniteNumber(data.accountBalance);
  const fee = parsePositiveFiniteNumber(data.fee) ?? 0;
  const riskAmount =
    riskPercent !== null && accountBalance !== null
      ? accountBalance * (riskPercent / 100)
      : null;

  let rrRatio: string | null = null;
  const takeProfit = parseFiniteNumber(data.takeProfit);
  if (takeProfit !== null) {
    const rawRr =
      direction === "Long"
        ? (takeProfit - entry) / (entry - stopLoss)
        : (entry - takeProfit) / (stopLoss - entry);

    if (Number.isFinite(rawRr) && rawRr > 0) {
      rrRatio = normalizeRrRatio(rawRr);
    }
  }

  let positionSize: string | null = null;
  if (riskAmount !== null) {
    positionSize = (riskAmount / stopLossDistance).toFixed(2);
  }

  let actualRR: string | null = null;
  let profitLoss: string | null = null;
  let result: z.infer<typeof tradeSchema>["result"] | null = null;

  const parsedExit = parseFiniteNumber(data.exitPrice);
  let effectiveExit: number | null = parsedExit;

  if (effectiveExit === null) {
    if (data.result === "Win" && takeProfit !== null) {
      effectiveExit = takeProfit;
    } else if (data.result === "Loss") {
      effectiveExit = stopLoss;
    } else if (data.result === "Breakeven") {
      effectiveExit = entry;
    }
  }

  if (effectiveExit !== null) {
    const rawActualRr =
      direction === "Long"
        ? (effectiveExit - entry) / (entry - stopLoss)
        : (entry - effectiveExit) / (stopLoss - entry);

    if (Number.isFinite(rawActualRr)) {
      actualRR = rawActualRr.toFixed(2);

      if (data.result === "Partial") {
        result = "Partial";
      } else if (rawActualRr > 0) {
        result = "Win";
      } else if (rawActualRr < 0) {
        result = "Loss";
      } else {
        result = "Breakeven";
      }

      const manualPositionSize = parsePositiveFiniteNumber(data.positionSize);
      const effectivePositionSize =
        manualPositionSize ??
        (positionSize !== null
          ? parsePositiveFiniteNumber(positionSize)
          : null);

      const directionalMove =
        direction === "Long" ? effectiveExit - entry : entry - effectiveExit;

      if (effectivePositionSize !== null) {
        profitLoss = (directionalMove * effectivePositionSize - fee).toFixed(2);
      } else if (riskAmount !== null) {
        profitLoss = (riskAmount * rawActualRr - fee).toFixed(2);
      }
    }
  }

  return {
    rrRatio,
    positionSize,
    actualRR,
    profitLoss,
    result,
  };
};

const mapTradeInputToData = (
  data:
    | z.infer<typeof tradeSchema>
    | z.infer<typeof quickAddTradeSchema>
    | Partial<z.infer<typeof tradeSchema>>,
) => {
  const derived = deriveTradeValues(data);
  const normalizedRrRatio = normalizeRrRatio(derived.rrRatio ?? data.rrRatio);

  const dateValue =
    data.date !== undefined
      ? data.time
        ? parse(`${data.date}T${data.time}`, `yyyy-MM-dd'T'HH:mm`, new Date())
        : parse(`${data.date}T00:00:00`, `yyyy-MM-dd'T'HH:mm:ss`, new Date())
      : undefined;
  if (dateValue) {
    dateValue.setMinutes(
      dateValue.getMinutes() - dateValue.getTimezoneOffset(),
    );
  }

  return {
    date: dateValue,
    time: data.time,
    market: data.market,
    pair: data.pair,
    timeframe: data.timeframe,
    session: data.session,
    tradeType: data.tradeType,
    type: data.direction ?? data.tradeType,
    marketCondition: data.marketCondition,
    marketBias: data.marketBias,
    strategy: data.strategy,
    setup: data.setup,
    technicalConfirmation: data.technicalConfirmation,
    fundamentalConfirmation: data.fundamentalConfirmation,
    entryReason: data.entryReason,
    accountBalance: parseNumber(data.accountBalance),
    entryPrice: parseNumber(data.entryPrice),
    stopLoss: parseNumber(data.stopLoss),
    takeProfit: parseNumber(data.takeProfit),
    riskPercent: parseNumber(data.riskPercent),
    riskRewardRatio: parseRatio(normalizedRrRatio),
    rrRatio: normalizedRrRatio,
    positionSize: parseNumber(derived.positionSize ?? data.positionSize),
    entryOnPlan: data.entryOnPlan,
    slippage: data.slippage,
    planChange: data.planChange,
    tradeManagement: data.tradeManagement,
    emotionBefore: data.emotionBefore,
    emotionalDisruption: data.emotionalDisruption,
    confidenceLevel: data.confidence,
    confidence: data.confidence,
    disturbances: data.emotionalDisruption,
    disciplineScore: data.discipline,
    discipline: data.discipline,
    exitPrice: parseNumber(data.exitPrice),
    fee: parseNumber(data.fee),
    profitLoss: parseNumber(derived.profitLoss ?? data.profitLoss),
    outcome: derived.result ?? data.result,
    result: derived.result ?? data.result,
    actualRR: parseNumber(derived.actualRR ?? data.actualRR),
    whatWentRight: data.whatWentRight,
    mistakes: data.mistakes,
    setupValid: data.validSetup,
    validSetup: data.validSetup,
    entryTiming: data.entryTiming,
    lesson: data.lesson,
    notes: data.notes,
    tags: data.tags,
    improvement: data.improvement,
    rulesToTighten: data.rulesToTighten,
    actionPlan: data.actionPlan,
  };
};

const UPDATE_FIELD_BATCH_SIZE = 40;

const chunkTradeUpdateData = (
  updateData: Parameters<typeof prisma.trade.update>[0]["data"],
) => {
  const entries = Object.entries(updateData);
  const chunks: Array<Parameters<typeof prisma.trade.update>[0]["data"]> = [];

  for (
    let index = 0;
    index < entries.length;
    index += UPDATE_FIELD_BATCH_SIZE
  ) {
    chunks.push(
      Object.fromEntries(entries.slice(index, index + UPDATE_FIELD_BATCH_SIZE)),
    );
  }

  return chunks;
};

export async function createTradeRecord(userId: string, data: unknown) {
  const validData = tradeSchema.or(quickAddTradeSchema).parse(data);
  const mapped = mapTradeInputToData(validData);

  return prisma.trade.create({
    data: {
      userId,
      ...mapped,
      date: mapped.date ?? new Date(),
      market: withFallback(mapped.market, "Forex"),
      pair: withFallback(mapped.pair, "N/A"),
      timeframe: withFallback(mapped.timeframe, ""),
      type: withFallback(mapped.type, "Long"),
    } as Parameters<typeof prisma.trade.create>[0]["data"],
  });
}

export async function updateTradeRecord(
  id: string,
  userId: string,
  data: unknown,
) {
  const existingTrade = await prisma.trade.findFirst({
    where: {
      id,
      userId,
    },
    select: {
      id: true,
    },
  });

  if (!existingTrade) {
    throw new Error("Trade not found");
  }

  const validData = updateTradeSchema.parse(data);
  const mapped = mapTradeInputToData(validData);

  const updateData = Object.fromEntries(
    Object.entries(mapped).filter(([, value]) => value !== undefined),
  ) as Parameters<typeof prisma.trade.update>[0]["data"];

  const updateChunks = chunkTradeUpdateData(updateData);
  if (updateChunks.length === 0) {
    return prisma.trade.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  return prisma.$transaction(async (tx) => {
    let updatedTrade: Awaited<ReturnType<typeof tx.trade.update>> | null = null;

    for (const chunk of updateChunks) {
      updatedTrade = await tx.trade.update({
        where: {
          id,
        },
        data: chunk,
      });
    }

    if (!updatedTrade) {
      return tx.trade.findUniqueOrThrow({
        where: {
          id,
        },
      });
    }

    return updatedTrade;
  });
}
