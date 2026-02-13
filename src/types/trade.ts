import type { Trade } from "@prisma/client";

/**
 * TradeEntry represents a single trade record from the database.
 * Re-exported from @prisma/client to centralize trade types.
 */
export type TradeEntry = Trade;

export type { Trade };
