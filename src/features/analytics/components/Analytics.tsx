import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts'
import {
  BarChart3,
  Brain,
  Calendar,
  CalendarIcon,
  Globe,
  Target,
  TrendingUp,
  X,
  Zap,
} from 'lucide-react'
import { endOfDay, format, parseISO, startOfDay } from 'date-fns'
import type { TradeEntry } from '@/types/trade'
import type { BreakdownItem } from '@/lib/analytics'
import {
  calculateStats,
  getDayOfWeekBreakdown,
  getDirectionBreakdown,
  getEmotionBreakdown,
  getEquityCurve,
  getMarketBreakdown,
  getMonthlyBreakdown,
  getSessionBreakdown,
  getSetupBreakdown,
  getSymbolBreakdown,
  getTradeTypeBreakdown,
  getWeeklyBreakdown,
  getYearlyBreakdown,
} from '@/lib/analytics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

const COLORS = [
  'hsl(174, 72%, 46%)',
  'hsl(142, 72%, 42%)',
  'hsl(0, 72%, 51%)',
  'hsl(38, 92%, 50%)',
  'hsl(262, 60%, 52%)',
  'hsl(200, 70%, 50%)',
  'hsl(320, 65%, 52%)',
  'hsl(80, 65%, 45%)',
]

const CATEGORIES = [
  { value: 'dayofweek', label: 'Day', icon: Calendar },
  { value: 'monthly', label: 'Monthly', icon: Calendar },
  { value: 'weekly', label: 'Weekly', icon: Calendar },
  { value: 'yearly', label: 'Yearly', icon: Calendar },
  { value: 'symbol', label: 'Symbol', icon: Globe },
  { value: 'direction', label: 'Direction', icon: TrendingUp },
  { value: 'session', label: 'Session', icon: Globe },
  { value: 'market', label: 'Market', icon: BarChart3 },
  { value: 'setup', label: 'Setup', icon: Target },
  { value: 'tradetype', label: 'Trade Type', icon: Zap },
  { value: 'emotion', label: 'Emotion', icon: Brain },
] as const

type CategoryValue = (typeof CATEGORIES)[number]['value']

function BreakdownTable({ data }: { data: Array<BreakdownItem> }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Trades</TableHead>
            <TableHead className="text-right">Win</TableHead>
            <TableHead className="text-right">Loss</TableHead>
            <TableHead className="text-right">Winrate</TableHead>
            <TableHead className="text-right">P&L</TableHead>
            <TableHead className="text-right">Avg RR</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.name}>
              <TableCell className="font-mono font-medium">
                {item.name}
              </TableCell>
              <TableCell className="text-right">{item.trades}</TableCell>
              <TableCell className="text-right text-success">
                {item.wins}
              </TableCell>
              <TableCell className="text-right text-destructive">
                {item.losses}
              </TableCell>
              <TableCell className="text-right">
                {item.winrate.toFixed(1)}%
              </TableCell>
              <TableCell
                className={`text-right font-mono ${item.totalPL >= 0 ? 'text-success' : 'text-destructive'}`}
              >
                {item.totalPL > 0 ? '+' : ''}
                {item.totalPL}
              </TableCell>
              <TableCell className="text-right font-mono">
                {item.avgRR}R
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function BreakdownBarChart({
  data,
  dataKey = 'totalPL',
  label = 'P&L',
}: {
  data: Array<BreakdownItem>
  dataKey?: string
  label?: string
}) {
  const chartConfig = { [dataKey]: { label, color: 'hsl(var(--chart-1))' } }
  return (
    <ChartContainer config={chartConfig} className="h-[280px] w-full">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
        <XAxis
          dataKey="name"
          tick={{ fill: 'hsl(215, 15%, 52%)', fontSize: 12 }}
          interval={0}
        />
        <YAxis tick={{ fill: 'hsl(215, 15%, 52%)', fontSize: 12 }} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey={dataKey} radius={[4, 4, 0, 0]}>
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={
                entry.totalPL >= 0 ? 'hsl(142, 72%, 42%)' : 'hsl(0, 72%, 51%)'
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}

function WinrateBarChart({ data }: { data: Array<BreakdownItem> }) {
  const chartConfig = {
    winrate: { label: 'Winrate %', color: 'hsl(var(--chart-1))' },
  }
  return (
    <ChartContainer config={chartConfig} className="h-[280px] w-full">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
        <XAxis
          dataKey="name"
          tick={{ fill: 'hsl(215, 15%, 52%)', fontSize: 12 }}
          interval={0}
        />
        <YAxis
          tick={{ fill: 'hsl(215, 15%, 52%)', fontSize: 12 }}
          domain={[0, 100]}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="winrate"
          radius={[4, 4, 0, 0]}
          fill="hsl(174, 72%, 46%)"
        />
      </BarChart>
    </ChartContainer>
  )
}

function DistributionPieChart({ data }: { data: Array<BreakdownItem> }) {
  const chartConfig = Object.fromEntries(
    data.map((d, i) => [
      d.name,
      { label: d.name, color: COLORS[i % COLORS.length] },
    ]),
  )
  return (
    <ChartContainer config={chartConfig} className="h-[280px] w-full">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Pie
          data={data}
          dataKey="trades"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ name, trades }) => `${name} (${trades})`}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}

function DateRangePicker({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  onClear,
}: {
  dateFrom: Date | undefined
  dateTo: Date | undefined
  onDateFromChange: (d: Date | undefined) => void
  onDateToChange: (d: Date | undefined) => void
  onClear: () => void
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              'h-8 text-xs gap-1.5 border-border/50 bg-muted/50',
              !dateFrom && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="h-3.5 w-3.5" />
            {dateFrom ? format(dateFrom, 'dd MMM yyyy') : 'From'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="single"
            selected={dateFrom}
            onSelect={onDateFromChange}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
      <span className="text-xs text-muted-foreground">—</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              'h-8 text-xs gap-1.5 border-border/50 bg-muted/50',
              !dateTo && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="h-3.5 w-3.5" />
            {dateTo ? format(dateTo, 'dd MMM yyyy') : 'To'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="single"
            selected={dateTo}
            onSelect={onDateToChange}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
      {(dateFrom || dateTo) && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          onClick={onClear}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  )
}

function getBreakdownData(category: CategoryValue, trades: Array<TradeEntry>) {
  const map: Record<CategoryValue, () => Array<BreakdownItem>> = {
    dayofweek: () => getDayOfWeekBreakdown(trades),
    monthly: () => getMonthlyBreakdown(trades),
    weekly: () => getWeeklyBreakdown(trades),
    yearly: () => getYearlyBreakdown(trades),
    symbol: () => getSymbolBreakdown(trades),
    direction: () => getDirectionBreakdown(trades),
    session: () => getSessionBreakdown(trades),
    market: () => getMarketBreakdown(trades),
    setup: () => getSetupBreakdown(trades),
    tradetype: () => getTradeTypeBreakdown(trades),
    emotion: () => getEmotionBreakdown(trades),
  }
  return map[category]()
}

const Analytics = ({ trades }: { trades: Array<TradeEntry> }) => {
  const [activeCategory, setActiveCategory] =
    useState<CategoryValue>('dayofweek')
  const [dateFrom, setDateFrom] = useState<Date | undefined>()
  const [dateTo, setDateTo] = useState<Date | undefined>()

  const filteredTrades = useMemo(() => {
    if (!dateFrom && !dateTo) return trades
    return trades.filter((t) => {
      // Safe parsing if t.date is already Date object
      const dateObj =
        t.date instanceof Date ? t.date : parseISO(t.date as unknown as string)

      if (dateFrom && dateObj < startOfDay(dateFrom)) return false
      if (dateTo && dateObj > endOfDay(dateTo)) return false
      return true
    })
  }, [dateFrom, dateTo, trades])

  const stats = useMemo(() => calculateStats(filteredTrades), [filteredTrades])
  const equityCurve = useMemo(
    () => getEquityCurve(filteredTrades),
    [filteredTrades],
  )
  const breakdownData = useMemo(
    () => getBreakdownData(activeCategory, filteredTrades),
    [activeCategory, filteredTrades],
  )

  const activeCat = CATEGORIES.find((c) => c.value === activeCategory)!
  const equityChartConfig = {
    equity: { label: 'Equity %', color: 'hsl(var(--chart-1))' },
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar Navigation */}
      <nav className="hidden md:flex flex-col gap-1 w-52 shrink-0 glass-card border-border/50 p-3 rounded-lg self-start sticky top-20">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium px-2 mb-2">
          Category
        </span>
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.value
          const Icon = cat.icon
          return (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                'flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 text-left w-full',
                isActive
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {cat.label}
            </button>
          )
        })}
      </nav>

      {/* Mobile Navigation */}
      <div className="flex md:hidden gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-none sticky top-14 bg-background/80 backdrop-blur-lg z-40 py-2 border-b border-border/30">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.value
          const Icon = cat.icon
          return (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border shrink-0',
                isActive
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted/50 text-muted-foreground border-border/50',
              )}
            >
              <Icon className="h-3 w-3" />
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* Header with Date Picker */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <DateRangePicker
            dateFrom={dateFrom}
            dateTo={dateTo}
            onDateFromChange={setDateFrom}
            onDateToChange={setDateTo}
            onClear={() => {
              setDateFrom(undefined)
              setDateTo(undefined)
            }}
          />
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              label: 'Total Trades',
              value: stats.totalTrades,
              icon: BarChart3,
            },
            {
              label: 'Winrate',
              value: `${stats.winrate.toFixed(1)}%`,
              icon: Target,
            },
            {
              label: 'Total P&L',
              value: `${stats.totalProfitLoss > 0 ? '+' : ''}${stats.totalProfitLoss}`,
              icon: TrendingUp,
            },
            { label: 'Avg RR', value: `${stats.avgRR}R`, icon: Zap },
          ].map((s) => (
            <div key={s.label} className="glass-card p-4 animate-fade-in">
              <div className="flex items-center gap-2 mb-1">
                <s.icon className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  {s.label}
                </span>
              </div>
              <div className="stat-value text-primary">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Equity Curve */}
        <Card className="glass-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" /> Equity Curve
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={equityChartConfig}
              className="h-[300px] w-full"
            >
              <AreaChart data={equityCurve}>
                <defs>
                  <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(174, 72%, 46%)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(174, 72%, 46%)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(220, 14%, 18%)"
                />
                <XAxis
                  dataKey="date"
                  tick={{ fill: 'hsl(215, 15%, 52%)', fontSize: 12 }}
                />
                <YAxis tick={{ fill: 'hsl(215, 15%, 52%)', fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="equity"
                  stroke="hsl(174, 72%, 46%)"
                  fill="url(#equityGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Breakdown Content */}
        <div className="space-y-4 animate-fade-in" key={activeCategory}>
          <div className="flex items-center gap-2 mb-2">
            <activeCat.icon className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Breakdown: {activeCat.label}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="glass-card border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">
                  P&L
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BreakdownBarChart data={breakdownData} />
              </CardContent>
            </Card>

            <Card className="glass-card border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">
                  Winrate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <WinrateBarChart data={breakdownData} />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="glass-card border-border/50 lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">
                  Table Detail
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BreakdownTable data={breakdownData} />
              </CardContent>
            </Card>

            <Card className="glass-card border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">
                  Trade Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DistributionPieChart data={breakdownData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
