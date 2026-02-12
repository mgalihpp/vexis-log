import { format, parseISO, startOfWeek } from 'date-fns'
import type { TradeEntry } from '@/types/trade'

export interface BreakdownItem {
  name: string
  trades: number
  wins: number
  losses: number
  winrate: number
  totalPL: number
  avgRR: number
}

const createBreakdownItem = (name: string): BreakdownItem => ({
  name,
  trades: 0,
  wins: 0,
  losses: 0,
  winrate: 0,
  totalPL: 0,
  avgRR: 0,
})

const classifyTradeOutcome = (trade: TradeEntry) => {
  const status = trade.result ?? trade.outcome
  const pnl = trade.profitLoss

  if (typeof pnl === 'number' && Number.isFinite(pnl) && pnl !== 0) {
    return pnl > 0 ? ('win' as const) : ('loss' as const)
  }

  if (status === 'Win') {
    return 'win' as const
  }

  if (status === 'Loss') {
    return 'loss' as const
  }

  if (status === 'Breakeven' || status === 'Pending') {
    return 'neutral' as const
  }

  return 'neutral' as const
}

const calculateBreakdownStats = (
  items: Record<string, BreakdownItem | undefined>,
) => {
  return Object.values(items)
    .filter((item): item is BreakdownItem => item !== undefined)
    .map((item) => {
      item.winrate = item.trades > 0 ? (item.wins / item.trades) * 100 : 0
      item.totalPL = Number(item.totalPL.toFixed(2))
      item.avgRR =
        item.trades > 0 ? Number((item.avgRR / item.trades).toFixed(2)) : 0
      return item
    })
}

const processTrade = (trade: TradeEntry, item: BreakdownItem) => {
  item.trades++

  const outcomeType = classifyTradeOutcome(trade)
  if (outcomeType === 'win') {
    item.wins++
  } else if (outcomeType === 'loss') {
    item.losses++
  }

  item.totalPL += trade.profitLoss || 0
  item.avgRR += trade.actualRR || 0
}

export const getDayOfWeekBreakdown = (trades: Array<TradeEntry>) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const items: Record<string, BreakdownItem | undefined> = {}

  days.forEach((day) => {
    items[day] = createBreakdownItem(day)
  })

  trades.forEach((trade) => {
    const date =
      typeof trade.date === 'string' ? parseISO(trade.date) : trade.date
    const dayName = format(date, 'EEEE')
    const item = items[dayName]
    if (item) {
      processTrade(trade, item)
    }
  })

  return calculateBreakdownStats(items)
}

export const getMonthlyBreakdown = (trades: Array<TradeEntry>) => {
  const items: Record<string, BreakdownItem | undefined> = {}

  trades.forEach((trade) => {
    const date =
      typeof trade.date === 'string' ? parseISO(trade.date) : trade.date
    const monthName = format(date, 'MMM yyyy')

    if (!items[monthName]) {
      items[monthName] = createBreakdownItem(monthName)
    }
    processTrade(trade, items[monthName])
  })

  // Sort by date could be added here if needed, currently just object iteration order which might vary
  return calculateBreakdownStats(items)
}

export const getWeeklyBreakdown = (trades: Array<TradeEntry>) => {
  const items: Record<string, BreakdownItem | undefined> = {}

  trades.forEach((trade) => {
    const date =
      typeof trade.date === 'string' ? parseISO(trade.date) : trade.date
    const weekStart = format(startOfWeek(date), 'dd MMM')
    const weekLabel = `Week of ${weekStart}`

    if (!items[weekLabel]) {
      items[weekLabel] = createBreakdownItem(weekLabel)
    }
    processTrade(trade, items[weekLabel])
  })

  return calculateBreakdownStats(items)
}

export const getYearlyBreakdown = (trades: Array<TradeEntry>) => {
  const items: Record<string, BreakdownItem | undefined> = {}

  trades.forEach((trade) => {
    const date =
      typeof trade.date === 'string' ? parseISO(trade.date) : trade.date
    const year = format(date, 'yyyy')

    if (!items[year]) {
      items[year] = createBreakdownItem(year)
    }
    processTrade(trade, items[year])
  })

  return calculateBreakdownStats(items)
}

export const getSymbolBreakdown = (trades: Array<TradeEntry>) => {
  const items: Record<string, BreakdownItem | undefined> = {}

  trades.forEach((trade) => {
    const symbol = trade.pair || 'Unknown'

    if (!items[symbol]) {
      items[symbol] = createBreakdownItem(symbol)
    }
    processTrade(trade, items[symbol])
  })

  return calculateBreakdownStats(items)
}

export const getDirectionBreakdown = (trades: Array<TradeEntry>) => {
  const items: Record<string, BreakdownItem | undefined> = {}

  trades.forEach((trade) => {
    const direction = trade.type || 'Unknown'

    if (!items[direction]) {
      items[direction] = createBreakdownItem(direction)
    }
    processTrade(trade, items[direction])
  })

  return calculateBreakdownStats(items)
}

export const getSessionBreakdown = (trades: Array<TradeEntry>) => {
  const items: Record<string, BreakdownItem | undefined> = {}

  trades.forEach((trade) => {
    const session = trade.session || 'Unknown'

    if (!items[session]) {
      items[session] = createBreakdownItem(session)
    }
    processTrade(trade, items[session])
  })

  return calculateBreakdownStats(items)
}

export const getMarketBreakdown = (trades: Array<TradeEntry>) => {
  const items: Record<string, BreakdownItem | undefined> = {}

  trades.forEach((trade) => {
    const market = trade.market || 'Unknown'

    if (!items[market]) {
      items[market] = createBreakdownItem(market)
    }
    processTrade(trade, items[market])
  })

  return calculateBreakdownStats(items)
}

export const getSetupBreakdown = (trades: Array<TradeEntry>) => {
  const items: Record<string, BreakdownItem | undefined> = {}

  trades.forEach((trade) => {
    const setup = trade.setup || 'Unknown'

    if (!items[setup]) {
      items[setup] = createBreakdownItem(setup)
    }
    processTrade(trade, items[setup])
  })

  return calculateBreakdownStats(items)
}

export const getTradeTypeBreakdown = (trades: Array<TradeEntry>) => {
  const items: Record<string, BreakdownItem | undefined> = {}

  trades.forEach((trade) => {
    const type = trade.tradeType || 'Unknown'

    if (!items[type]) {
      items[type] = createBreakdownItem(type)
    }
    processTrade(trade, items[type])
  })

  return calculateBreakdownStats(items)
}

export const getEmotionBreakdown = (trades: Array<TradeEntry>) => {
  const items: Record<string, BreakdownItem | undefined> = {}

  trades.forEach((trade) => {
    const emotion = trade.emotionBefore || 'Neutral'

    if (!items[emotion]) {
      items[emotion] = createBreakdownItem(emotion)
    }
    processTrade(trade, items[emotion])
  })

  return calculateBreakdownStats(items)
}

export const getEquityCurve = (trades: Array<TradeEntry>) => {
  if (trades.length === 0) return []

  // Sort trades by date
  const sortedTrades = [...trades].sort((a, b) => {
    const dateA =
      typeof a.date === 'string' ? parseISO(a.date).getTime() : a.date.getTime()
    const dateB =
      typeof b.date === 'string' ? parseISO(b.date).getTime() : b.date.getTime()
    return dateA - dateB
  })

  // Aggregate P&L by date
  const dailyMap = new Map<string, { dateLabel: string; pnl: number }>()

  for (const trade of sortedTrades) {
    const dateObj =
      typeof trade.date === 'string' ? parseISO(trade.date) : trade.date
    const dateKey = format(dateObj, 'yyyy-MM-dd')
    const dateLabel = format(dateObj, 'dd MMM')
    const pnl = trade.profitLoss || 0

    const current = dailyMap.get(dateKey)
    if (current) {
      current.pnl += pnl
    } else {
      dailyMap.set(dateKey, { dateLabel, pnl })
    }
  }

  // Build cumulative equity curve
  let equity = 0
  return Array.from(dailyMap.values()).map(({ dateLabel, pnl }) => {
    equity += pnl
    return {
      date: dateLabel,
      equity: Number(equity.toFixed(2)),
    }
  })
}

export const calculateStats = (trades: Array<TradeEntry>) => {
  const totalTrades = trades.length
  if (totalTrades === 0) {
    return {
      totalTrades: 0,
      winrate: 0,
      totalProfitLoss: 0,
      avgRR: 0,
    }
  }

  const decisiveTrades = trades.filter((trade) => {
    const outcomeType = classifyTradeOutcome(trade)
    return outcomeType === 'win' || outcomeType === 'loss'
  })
  const wins = decisiveTrades.filter(
    (trade) => classifyTradeOutcome(trade) === 'win',
  ).length
  const winrate =
    decisiveTrades.length === 0 ? 0 : (wins / decisiveTrades.length) * 100
  const totalProfitLoss = trades.reduce(
    (acc, t) => acc + (t.profitLoss || 0),
    0,
  )
  const avgRR =
    trades.reduce((acc, t) => acc + (t.actualRR || 0), 0) / totalTrades

  return {
    totalTrades,
    winrate,
    totalProfitLoss: Number(totalProfitLoss.toFixed(2)),
    avgRR: Number(avgRR.toFixed(2)),
  }
}
