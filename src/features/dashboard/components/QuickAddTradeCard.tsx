import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type {
  QuickAddTradeFormInput,
  QuickAddTradeFormValues,
} from '@/utils/schema/tradeSchema'
import { quickAddTradeSchema } from '@/utils/schema/tradeSchema'
import { createTrade } from '@/utils/dashboard.functions'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FeedbackToast } from '@/components/ui/feedback-toast'
import { useFeedbackToast } from '@/hooks/use-feedback-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import {
  DIRECTION_OPTIONS,
  MARKET_OPTIONS,
  RESULT_OPTIONS,
  RequiredLabel,
  SESSION_OPTIONS,
  TIMEFRAME_OPTIONS,
  TRADE_TYPE_OPTIONS,
} from '@/features/trade/components/tradeFormFields'

const defaultValues: QuickAddTradeFormInput = {
  date: new Date().toISOString().slice(0, 10),
  time: new Date().toTimeString().slice(0, 5),
  market: '',
  pair: '',
  timeframe: '',
  session: '',
  tradeType: '',
  direction: '',
  marketCondition: '-',
  marketBias: '',
  strategy: '',
  setup: '-',
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
  result: 'Pending',
  actualRR: '',
  whatWentRight: '',
  mistakes: '',
  validSetup: false,
  entryTiming: '',
  lesson: '',
  notes: '-',
  tags: [],
  improvement: '',
  rulesToTighten: '',
  actionPlan: '',
}

export function QuickAddTradeCard() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast, showToast, dismissToast } = useFeedbackToast()
  const router = useRouter()
  const form = useForm<
    QuickAddTradeFormInput,
    unknown,
    QuickAddTradeFormValues
  >({
    resolver: zodResolver(quickAddTradeSchema),
    defaultValues,
  })

  const handleSubmit = async (data: QuickAddTradeFormValues) => {
    setIsSubmitting(true)
    try {
      await createTrade({ data })
      router.invalidate()
      form.reset({
        ...defaultValues,
        result: 'Pending',
        confidence: 5,
        discipline: 5,
        tags: [],
      })
      showToast('success', 'Trade saved successfully.')
      router.navigate({ to: '/dashboard' })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to save the trade. Please check required fields.'
      showToast('error', message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-border bg-card p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel text="Date" />
                  <FormControl>
                    <Input type="date" className="font-mono" {...field} />
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
                  <RequiredLabel text="Time" />
                  <FormControl>
                    <Input type="time" className="font-mono" {...field} />
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
                  <RequiredLabel text="Market" />
                  <Combobox
                    items={MARKET_OPTIONS}
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <FormControl>
                      <ComboboxInput placeholder="Select market" />
                    </FormControl>
                    <ComboboxContent>
                      <ComboboxEmpty>No results.</ComboboxEmpty>
                      <ComboboxList>
                        {(option) => (
                          <ComboboxItem key={option} value={option}>
                            {option}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pair"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel text="Pair / Asset" />
                  <FormControl>
                    <Input placeholder="EURUSD / BTCUSDT" {...field} />
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
                  <RequiredLabel text="Timeframe" />
                  <Combobox
                    items={TIMEFRAME_OPTIONS}
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <FormControl>
                      <ComboboxInput placeholder="Select timeframe" />
                    </FormControl>
                    <ComboboxContent>
                      <ComboboxEmpty>No results.</ComboboxEmpty>
                      <ComboboxList>
                        {(option) => (
                          <ComboboxItem key={option} value={option}>
                            {option}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="session"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel text="Session" />
                  <Combobox
                    items={SESSION_OPTIONS}
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <FormControl>
                      <ComboboxInput placeholder="Select session" />
                    </FormControl>
                    <ComboboxContent>
                      <ComboboxEmpty>No results.</ComboboxEmpty>
                      <ComboboxList>
                        {(option) => (
                          <ComboboxItem key={option} value={option}>
                            {option}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tradeType"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel text="Trade Type" />
                  <Combobox
                    items={TRADE_TYPE_OPTIONS}
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <FormControl>
                      <ComboboxInput placeholder="Select trade type" />
                    </FormControl>
                    <ComboboxContent>
                      <ComboboxEmpty>No results.</ComboboxEmpty>
                      <ComboboxList>
                        {(option) => (
                          <ComboboxItem key={option} value={option}>
                            {option}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="direction"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel text="Direction" />
                  <Combobox
                    items={DIRECTION_OPTIONS}
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <FormControl>
                      <ComboboxInput placeholder="Select direction" />
                    </FormControl>
                    <ComboboxContent>
                      <ComboboxEmpty>No results.</ComboboxEmpty>
                      <ComboboxList>
                        {(option) => (
                          <ComboboxItem key={option} value={option}>
                            {option}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="result"
              render={({ field }) => (
                <FormItem>
                  <RequiredLabel text="Result" />
                  <Combobox
                    items={RESULT_OPTIONS}
                    value={field.value ?? 'Pending'}
                    onValueChange={(value) => field.onChange(value ?? '')}
                  >
                    <FormControl>
                      <ComboboxInput placeholder="Select result" />
                    </FormControl>
                    <ComboboxContent>
                      <ComboboxEmpty>No results.</ComboboxEmpty>
                      <ComboboxList>
                        {(option) => (
                          <ComboboxItem key={option} value={option}>
                            {option}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving…' : 'Save trade'}
            </Button>
          </div>
        </form>
      </Form>
      {toast ? (
        <FeedbackToast
          kind={toast.kind}
          message={toast.message}
          onDismiss={dismissToast}
        />
      ) : null}
    </Card>
  )
}
