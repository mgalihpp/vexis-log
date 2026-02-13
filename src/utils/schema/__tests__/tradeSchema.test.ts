import { describe, expect, it } from "vitest";
import { tradeSchema, updateTradeSchema } from "@/utils/schema/tradeSchema";

describe("updateTradeSchema", () => {
  it("accepts a partial payload with only notes", () => {
    const result = updateTradeSchema.safeParse({ notes: "Updated notes only" });
    expect(result.success).toBe(true);
  });

  it("accepts a partial payload with only market", () => {
    const result = updateTradeSchema.safeParse({ market: "Forex" });
    expect(result.success).toBe(true);
  });

  it("accepts a partial payload with multiple fields", () => {
    const result = updateTradeSchema.safeParse({
      market: "Crypto",
      pair: "BTC/USD",
      notes: "Partial update test",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an empty object", () => {
    const result = updateTradeSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map(
        (e: { message: string }) => e.message,
      );
      expect(messages).toContain(
        "At least one field must be provided for update.",
      );
    }
  });
});

describe("tradeSchema (create)", () => {
  it("rejects when required fields are missing", () => {
    const result = tradeSchema.safeParse({ notes: "Just notes" });
    expect(result.success).toBe(false);
  });

  it("requires date, market, pair, and direction", () => {
    const result = tradeSchema.safeParse({
      date: "2025-01-15",
      market: "Forex",
      pair: "EUR/USD",
      direction: "Long",
      result: "Win",
    });
    expect(result.success).toBe(true);
  });

  it("accepts minimal payload with only mandatory fields", () => {
    const result = tradeSchema.safeParse({
      date: "2025-01-15",
      market: "Forex",
      pair: "EUR/USD",
      direction: "Long",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.result).toBe("Pending");
    }
  });
});
