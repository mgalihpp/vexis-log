import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DEMO_EMAIL = "demo@vexislog.app";
const DEMO_PASSWORD = "Demo12345!";

function daysAgo(days, hour, minute) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(hour, minute, 0, 0);
  return date;
}

function buildTrade(overrides) {
  return {
    market: "Crypto",
    pair: "BTC/USDT",
    timeframe: "15m",
    type: "Long",
    tags: ["seed-demo", "landing-shot"],
    strategy: "Break of Structure",
    setup: "Retest",
    marketBias: "Bullish",
    entryOnPlan: true,
    validSetup: true,
    confidenceLevel: 8,
    disciplineScore: 8,
    result: "Win",
    outcome: "Win",
    rrRatio: "1:2",
    riskRewardRatio: 2,
    ...overrides,
  };
}

const demoTrades = [
  buildTrade({
    date: daysAgo(18, 8, 15),
    pair: "BTC/USDT",
    entryPrice: 60210,
    stopLoss: 59880,
    takeProfit: 60940,
    exitPrice: 60940,
    riskPercent: 1,
    accountBalance: 25000,
    positionSize: 0.42,
    actualRR: 2.1,
    profitLoss: 520,
    notes: "London open continuation after BOS and pullback confirmation.",
    emotionBefore: "Confident",
    emotionalDisruption: "None",
  }),
  buildTrade({
    date: daysAgo(16, 14, 5),
    pair: "ETH/USDT",
    timeframe: "5m",
    type: "Short",
    marketBias: "Bearish",
    entryPrice: 3240,
    stopLoss: 3276,
    takeProfit: 3168,
    exitPrice: 3185,
    riskPercent: 0.8,
    accountBalance: 25520,
    positionSize: 3.2,
    actualRR: 1.5,
    profitLoss: 286,
    notes: "NY rejection at key level. Partials taken early.",
    emotionBefore: "Calm",
    emotionalDisruption: "None",
    tags: ["seed-demo", "landing-shot", "scalp"],
  }),
  buildTrade({
    date: daysAgo(14, 9, 20),
    pair: "SOL/USDT",
    timeframe: "15m",
    type: "Long",
    marketBias: "Bullish",
    entryPrice: 142.1,
    stopLoss: 139.9,
    takeProfit: 146.8,
    exitPrice: 140.4,
    actualRR: -0.8,
    result: "Loss",
    outcome: "Loss",
    profitLoss: -188,
    notes: "Forced entry before candle close, invalid confirmation.",
    emotionalDisruption: "FOMO",
    disciplineScore: 5,
    tags: ["seed-demo", "landing-shot", "fomo"],
  }),
  buildTrade({
    date: daysAgo(13, 10, 45),
    pair: "BTC/USDT",
    timeframe: "1h",
    type: "Long",
    strategy: "Pullback",
    setup: "Break of Structure",
    entryPrice: 61500,
    stopLoss: 61020,
    takeProfit: 62390,
    exitPrice: 62270,
    actualRR: 1.8,
    profitLoss: 470,
    notes: "Textbook retest with confluence from prior daily level.",
    tags: ["seed-demo", "landing-shot", "a-setup"],
  }),
  buildTrade({
    date: daysAgo(11, 7, 30),
    pair: "ETH/USDT",
    timeframe: "15m",
    type: "Long",
    entryPrice: 3305,
    stopLoss: 3275,
    takeProfit: 3368,
    exitPrice: 3304,
    actualRR: 0,
    result: "BE",
    outcome: "Break Even",
    profitLoss: -12,
    fee: 12,
    notes: "Moved SL to entry before news release.",
    emotionalDisruption: "Hesitation",
    tags: ["seed-demo", "landing-shot", "break-even"],
  }),
  buildTrade({
    date: daysAgo(10, 13, 10),
    pair: "BTC/USDT",
    timeframe: "5m",
    type: "Short",
    marketBias: "Bearish",
    entryPrice: 61180,
    stopLoss: 61410,
    takeProfit: 60620,
    exitPrice: 60630,
    actualRR: 2.3,
    profitLoss: 510,
    notes: "VWAP reclaim failure with clean momentum shift.",
    emotionBefore: "Calm",
    emotionalDisruption: "None",
    tags: ["seed-demo", "landing-shot", "vwap"],
  }),
  buildTrade({
    date: daysAgo(8, 15, 25),
    pair: "SOL/USDT",
    timeframe: "15m",
    type: "Long",
    entryPrice: 149.4,
    stopLoss: 147.3,
    takeProfit: 154.2,
    exitPrice: 153.7,
    actualRR: 2,
    profitLoss: 420,
    notes: "Impulse continuation after breakout and volume expansion.",
    emotionBefore: "Excited",
    emotionalDisruption: "None",
    tags: ["seed-demo", "landing-shot", "momentum"],
  }),
  buildTrade({
    date: daysAgo(7, 9, 5),
    pair: "BTC/USDT",
    timeframe: "1h",
    type: "Short",
    strategy: "Reversal",
    setup: "Reversal",
    marketBias: "Range",
    entryPrice: 62640,
    stopLoss: 62920,
    takeProfit: 62020,
    exitPrice: 62810,
    actualRR: -0.6,
    result: "Loss",
    outcome: "Loss",
    profitLoss: -160,
    notes: "Counter-trend idea taken too early.",
    emotionalDisruption: "Over-leveraged",
    disciplineScore: 4,
    tags: ["seed-demo", "landing-shot", "counter-trend"],
  }),
  buildTrade({
    date: daysAgo(5, 11, 40),
    pair: "ETH/USDT",
    timeframe: "15m",
    type: "Long",
    entryPrice: 3382,
    stopLoss: 3358,
    takeProfit: 3435,
    exitPrice: 3430,
    actualRR: 2,
    profitLoss: 465,
    notes: "Continuation setup aligned with higher timeframe trend.",
    emotionBefore: "Confident",
    tags: ["seed-demo", "landing-shot", "trend"],
  }),
  buildTrade({
    date: daysAgo(3, 8, 55),
    pair: "BTC/USDT",
    timeframe: "5m",
    type: "Long",
    entryPrice: 63220,
    stopLoss: 62990,
    takeProfit: 63680,
    exitPrice: 63510,
    actualRR: 1.3,
    profitLoss: 280,
    notes: "Scalp from support reclaim. Exited early into resistance.",
    emotionBefore: "Calm",
    tags: ["seed-demo", "landing-shot", "scalp"],
  }),
  buildTrade({
    date: daysAgo(2, 13, 35),
    pair: "SOL/USDT",
    timeframe: "15m",
    type: "Short",
    marketBias: "Bearish",
    entryPrice: 156.2,
    stopLoss: 158.0,
    takeProfit: 152.0,
    exitPrice: 152.6,
    actualRR: 1.9,
    profitLoss: 390,
    notes: "Failed breakout and quick reclaim below prior swing.",
    tags: ["seed-demo", "landing-shot", "retest"],
  }),
  buildTrade({
    date: daysAgo(1, 10, 20),
    pair: "ETH/USDT",
    timeframe: "1h",
    type: "Long",
    entryPrice: 3450,
    stopLoss: 3410,
    takeProfit: 3520,
    exitPrice: 3514,
    actualRR: 1.6,
    profitLoss: 430,
    notes: "Clean break and retest from key session range.",
    tags: ["seed-demo", "landing-shot", "session-breakout"],
  }),
];

async function main() {
  const password = await bcrypt.hash(DEMO_PASSWORD, 12);

  await prisma.user.upsert({
    where: { email: DEMO_EMAIL },
    update: {
      name: "Vexis Demo Trader",
      password,
      theme: "dark",
      language: "en",
    },
    create: {
      email: DEMO_EMAIL,
      name: "Vexis Demo Trader",
      password,
      theme: "dark",
      language: "en",
    },
  });

  await prisma.trade.deleteMany({
    where: {
      tags: {
        has: "seed-demo",
      },
    },
  });

  await prisma.trade.createMany({
    data: demoTrades,
  });

  console.log("Demo seed completed.");
  console.log(`User: ${DEMO_EMAIL}`);
  console.log(`Password: ${DEMO_PASSWORD}`);
  console.log(`Trades inserted: ${demoTrades.length}`);
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
