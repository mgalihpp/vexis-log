import { describe, expect, it } from 'vitest'
import { tradeSchema, updateTradeSchema } from '@/utils/schema/tradeSchema'

describe('updateTradeSchema', () => {
  it('accepts a partial payload with only notes', () => {
    const result = updateTradeSchema.safeParse({ notes: 'Updated notes only' })
    expect(result.success).toBe(true)
  })

  it('accepts a partial payload with only market', () => {
    const result = updateTradeSchema.safeParse({ market: 'Forex' })
    expect(result.success).toBe(true)
  })

  it('accepts a partial payload with multiple fields', () => {
    const result = updateTradeSchema.safeParse({
      market: 'Crypto',
      pair: 'BTC/USD',
      notes: 'Partial update test',
    })
    expect(result.success).toBe(true)
  })

  it('rejects an empty object', () => {
    const result = updateTradeSchema.safeParse({})
    expect(result.success).toBe(false)
    if (!result.success) {
      const messages = result.error.issues.map(
        (e: { message: string }) => e.message,
      )
      expect(messages).toContain(
        'At least one field must be provided for update.',
      )
    }
  })
})

describe('tradeSchema (create)', () => {
  it('rejects when required fields are missing', () => {
    const result = tradeSchema.safeParse({ notes: 'Just notes' })
    expect(result.success).toBe(false)
  })

  it('requires date, time, market, pair, setup, notes, and other required fields', () => {
    const result = tradeSchema.safeParse({
      date: '2025-01-15',
      time: '14:30',
      market: 'Forex',
      pair: 'EUR/USD',
      timeframe: '1H',
      session: 'London',
      tradeType: 'Swing',
      direction: 'Long',
      marketCondition: 'Trending',
      setup: 'Breakout above resistance',
      confidence: 7,
      discipline: 8,
      result: 'Win',
      notes: 'Clean breakout entry',
    })
    expect(result.success).toBe(true)
  })
})
