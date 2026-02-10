import { Edit, MoreHorizontal, Trash2, Filter, Search } from 'lucide-react'
import { format } from 'date-fns'
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { DashboardTrade } from '@/features/dashboard/types'

type TradesTableProps = {
  trades: DashboardTrade[]
  search: string
  filterMarket: string
  onSearchChange: (value: string) => void
  onFilterMarketChange: (value: string) => void
  onEdit?: (trade: DashboardTrade) => void
  onDelete?: (tradeId: string) => void
}

export function TradesTable({
  trades,
  search,
  filterMarket,
  onSearchChange,
  onFilterMarketChange,
  onEdit,
  onDelete,
}: TradesTableProps) {
  return (
    <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-border/50 flex flex-col md:flex-row gap-4 items-center justify-between">
        <h3 className="text-lg font-bold font-display">Recent Trades</h3>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search pair or setup..."
              className="pl-9 bg-background/50 border-border/50"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </div>
          <Select value={filterMarket} onValueChange={onFilterMarketChange}>
            <SelectTrigger className="w-[200px] bg-background/50 border-border/50">
              <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Market" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Markets</SelectItem>
              <SelectItem value="Forex">Forex</SelectItem>
              <SelectItem value="Crypto">Crypto</SelectItem>
              <SelectItem value="Indices">Indices</SelectItem>
              <SelectItem value="Stocks">Stocks</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead>Pair</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Setup</TableHead>
              <TableHead>Outcome</TableHead>
              <TableHead className="text-right">P&L ($)</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-48 text-center text-muted-foreground"
                >
                  No trades found. Log your first trade!
                </TableCell>
              </TableRow>
            ) : (
              trades.map((trade) => (
                <TableRow
                  key={trade.id}
                  className="group hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {format(new Date(trade.date), 'yyyy-MM-dd')}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold font-mono text-foreground">
                        {trade.pair}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {trade.market}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="font-normal text-xs bg-background/50"
                    >
                      {trade.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {trade.setup || '-'}
                  </TableCell>
                  <TableCell>
                    {trade.result && (
                      <Badge
                        variant="secondary"
                        className={cn(
                          'font-bold text-xs uppercase tracking-wide',
                          trade.result === 'Win' &&
                            'bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25',
                          trade.result === 'Loss' &&
                            'bg-rose-500/15 text-rose-500 hover:bg-rose-500/25',
                          trade.result === 'Break Even' &&
                            'bg-slate-500/15 text-slate-500 hover:bg-slate-500/25',
                        )}
                      >
                        {trade.result}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium">
                    {trade.profitLoss ? (
                      <span
                        className={
                          Number(trade.profitLoss) >= 0
                            ? 'text-emerald-500'
                            : 'text-rose-500'
                        }
                      >
                        {Number(trade.profitLoss) >= 0 ? '+' : ''}
                        {Number(trade.profitLoss).toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onEdit?.(trade)}>
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete?.(trade.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
