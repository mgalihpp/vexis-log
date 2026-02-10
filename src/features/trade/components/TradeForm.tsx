import { useState } from 'react'
import { ChevronDown, ChevronUp, Save } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from '@tanstack/react-router'
import type {
  TradeFormInput,
  TradeFormValues,
} from '@/utils/schema/tradeSchema'
import { tradeSchema } from '@/utils/schema/tradeSchema'
import { createTrade } from '@/utils/dashboard.functions'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const SectionHeader = ({
  number,
  title,
  isOpen,
  onToggle,
}: {
  number: string
  title: string
  isOpen: boolean
  onToggle: () => void
}) => (
  <button
    type="button"
    onClick={onToggle}
    className="flex w-full items-center justify-between py-3 px-1 text-left group"
  >
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent font-mono text-xs text-accent-foreground">
        {number}
      </span>
      <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground">
        {title}
      </h3>
    </div>
    {isOpen ? (
      <ChevronUp className="h-4 w-4 text-muted-foreground" />
    ) : (
      <ChevronDown className="h-4 w-4 text-muted-foreground" />
    )}
  </button>
)

export default function TradeForm() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false,
    '7': false,
    '8': false,
    '9': false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()
  const form = useForm<TradeFormInput, unknown, TradeFormValues>({
    resolver: zodResolver(tradeSchema),
    defaultValues: {
      date: '',
      time: '',
      market: '',
      pair: '',
      timeframe: '',
      session: '',
      tradeType: '',
      marketCondition: '',
      marketBias: '',
      strategy: '',
      setup: '',
      technicalConfirmation: '',
      fundamentalConfirmation: '',
      entryReason: '',
      entryPrice: '',
      stopLoss: '',
      takeProfit: '',
      riskPercent: '',
      rrRatio: '',
      positionSize: '',
      entryOnPlan: false,
      slippage: '',
      planChange: '',
      tradeManagement: '',
      emotionBefore: '',
      emotionalDisruption: '',
      confidence: 5,
      discipline: 5,
      exitPrice: '',
      profitLoss: '',
      result: '',
      actualRR: '',
      whatWentRight: '',
      mistakes: '',
      validSetup: false,
      entryTiming: '',
      lesson: '',
      notes: '',
      tags: [],
      improvement: '',
      rulesToTighten: '',
      actionPlan: '',
    },
  })

  const toggle = (key: string) =>
    setOpenSections((p) => ({ ...p, [key]: !p[key] }))

  const handleSubmit = async (data: TradeFormValues) => {
    setIsSubmitting(true)
    try {
      await createTrade({ data })
      router.invalidate()
      await router.navigate({ to: '/dashboard/trade' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        {/* Section 1: Informasi Umum */}
        <Card className="bg-card border-border overflow-hidden">
          <SectionHeader
            number="01"
            title="Informasi Umum Trade"
            isOpen={openSections['1']}
            onToggle={() => toggle('1')}
          />
          {openSections['1'] && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 pt-0 animate-slide-up">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="font-mono" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waktu</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} className="font-mono" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="market"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Market</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {['Forex', 'Crypto', 'Saham', 'Indeks'].map((m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pair"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pair / Asset</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="EUR/USD"
                        {...field}
                        className="font-mono"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeframe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timeframe</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {['M1', 'M5', 'M15', 'M30', 'H1', 'H4', 'D1', 'W1'].map(
                          (t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="session"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {['Asia', 'London', 'New York'].map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tradeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipe Trade</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {['Scalp', 'Intraday', 'Swing', 'Position'].map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </Card>

        {/* Section 2: Pra-Trade Analysis */}
        <Card className="bg-card border-border overflow-hidden">
          <SectionHeader
            number="02"
            title="Pra-Trade Analysis"
            isOpen={openSections['2']}
            onToggle={() => toggle('2')}
          />
          {openSections['2'] && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 pt-0 animate-slide-up">
              <FormField
                control={form.control}
                name="marketCondition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kondisi Market</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {['Trending', 'Ranging', 'Choppy'].map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="strategy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Strategy</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Smart Money, ICT, Breakout..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marketBias"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Market Bias</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {['Bullish', 'Bearish', 'Netral'].map((b) => (
                          <SelectItem key={b} value={b}>
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="setup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Setup Trading</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Breakout, Pullback, Reversal..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="technicalConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konfirmasi Teknis</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="RSI divergence, engulfing candle..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fundamentalConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konfirmasi Fundamental</FormLabel>
                    <FormControl>
                      <Input placeholder="NFP, CPI, opsional..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="entryReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alasan Entry (WHY)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Jelaskan alasan masuk posisi..."
                          {...field}
                          rows={2}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
        </Card>

        {/* Section 3: Trading Plan */}
        <Card className="bg-card border-border overflow-hidden">
          <SectionHeader
            number="03"
            title="Trading Plan"
            isOpen={openSections['3']}
            onToggle={() => toggle('3')}
          />
          {openSections['3'] && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 pt-0 animate-slide-up">
              <FormField
                control={form.control}
                name="entryPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entry Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        {...field}
                        className="font-mono"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stopLoss"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stop Loss</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        {...field}
                        className="font-mono"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="takeProfit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Take Profit</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        {...field}
                        className="font-mono"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="riskPercent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Risk per Trade (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        {...field}
                        className="font-mono"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rrRatio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Risk : Reward Ratio</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1:2"
                        {...field}
                        className="font-mono"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="positionSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position Size / Lot</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0.1 lot"
                        {...field}
                        className="font-mono"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </Card>

        {/* Section 4: Eksekusi */}
        <Card className="bg-card border-border overflow-hidden">
          <SectionHeader
            number="04"
            title="Eksekusi Trade"
            isOpen={openSections['4']}
            onToggle={() => toggle('4')}
          />
          {openSections['4'] && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 pt-0 animate-slide-up">
              <FormField
                control={form.control}
                name="entryOnPlan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entry sesuai plan?</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <span className="text-sm text-muted-foreground">
                      {field.value ? 'Ya' : 'Tidak'}
                    </span>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slippage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slippage / Error</FormLabel>
                    <FormControl>
                      <Input placeholder="Tidak ada" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="planChange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Perubahan Plan</FormLabel>
                    <FormControl>
                      <Input placeholder="Jika ada perubahan..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tradeManagement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manajemen Trade</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="BE, partial close, trailing..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </Card>

        {/* Section 5: Psikologi */}
        <Card className="bg-card border-border overflow-hidden">
          <SectionHeader
            number="05"
            title="Psikologi Trading"
            isOpen={openSections['5']}
            onToggle={() => toggle('5')}
          />
          {openSections['5'] && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 pt-0 animate-slide-up">
              <FormField
                control={form.control}
                name="emotionBefore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kondisi Emosi sebelum Entry</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tenang, cemas, excited..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emotionalDisruption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gangguan Emosi</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="FOMO, Fear, Greed, Overconfidence"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confidence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Tingkat Keyakinan: ${field.value}/10`}</FormLabel>
                    <FormControl>
                      <Slider
                        value={[field.value]}
                        onValueChange={(v) => field.onChange(v[0])}
                        min={1}
                        max={10}
                        step={1}
                        className="py-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discipline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Disiplin terhadap Rules: ${field.value}/10`}</FormLabel>
                    <FormControl>
                      <Slider
                        value={[field.value]}
                        onValueChange={(v) => field.onChange(v[0])}
                        min={1}
                        max={10}
                        step={1}
                        className="py-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </Card>

        {/* Section 6: Hasil */}
        <Card className="bg-card border-border overflow-hidden">
          <SectionHeader
            number="06"
            title="Hasil Trade"
            isOpen={openSections['6']}
            onToggle={() => toggle('6')}
          />
          {openSections['6'] && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 pt-0 animate-slide-up">
              <FormField
                control={form.control}
                name="exitPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exit Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        {...field}
                        className="font-mono"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profitLoss"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profit / Loss</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+50 pips / -20 pips"
                        {...field}
                        className="font-mono"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="result"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hasil Akhir</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {['Win', 'Loss', 'BE'].map((r) => (
                          <SelectItem key={r} value={r}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="actualRR"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RR Aktual</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1.5"
                        {...field}
                        className="font-mono"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </Card>

        {/* Section 7: Post-Trade Review */}
        <Card className="bg-card border-border overflow-hidden">
          <SectionHeader
            number="07"
            title="Post-Trade Review"
            isOpen={openSections['7']}
            onToggle={() => toggle('7')}
          />
          {openSections['7'] && (
            <div className="grid grid-cols-1 gap-4 p-4 pt-0 animate-slide-up">
              <FormField
                control={form.control}
                name="whatWentRight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apa yang dilakukan dengan benar</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mistakes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kesalahan yang terjadi</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="validSetup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Setup valid?</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-3 pt-1">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <span className="text-sm text-muted-foreground">
                            {field.value ? 'Ya' : 'Tidak'}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="entryTiming"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Entry timing</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tepat / Terlalu cepat / Telat"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="lesson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pelajaran penting</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </Card>

        {/* Section 8: Notes */}
        <Card className="bg-card border-border overflow-hidden">
          <SectionHeader
            number="08"
            title="Catatan & Dokumentasi"
            isOpen={openSections['8']}
            onToggle={() => toggle('8')}
          />
          {openSections['8'] && (
            <div className="p-4 pt-0 animate-slide-up">
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catatan visual & notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Link screenshot chart, catatan penting..."
                        {...field}
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => {
                  const tagsValue = field.value ?? []

                  return (
                    <FormItem className="mt-4">
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="breakout, london, news"
                          value={tagsValue.join(', ')}
                          onChange={(event) => {
                            const nextTags = event.target.value
                              .split(',')
                              .map((tag) => tag.trim())
                              .filter(Boolean)
                            field.onChange(nextTags)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </div>
          )}
        </Card>

        {/* Section 9: Evaluasi */}
        <Card className="bg-card border-border overflow-hidden">
          <SectionHeader
            number="09"
            title="Evaluasi & Improvement"
            isOpen={openSections['9']}
            onToggle={() => toggle('9')}
          />
          {openSections['9'] && (
            <div className="grid grid-cols-1 gap-4 p-4 pt-0 animate-slide-up">
              <FormField
                control={form.control}
                name="improvement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apa yang harus diperbaiki</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rulesToTighten"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rule yang perlu diperketat</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="actionPlan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Action plan untuk next trade</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </Card>

        <Button
          type="submit"
          className="w-full gradient-primary text-primary-foreground font-semibold h-12 text-base"
          disabled={isSubmitting}
        >
          <Save className="mr-2 h-5 w-5" /> Simpan Trade
        </Button>
      </form>
    </Form>
  )
}
