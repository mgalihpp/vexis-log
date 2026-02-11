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
  FormLabel,
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

const getDefaultValues = (): QuickAddTradeFormInput => ({
  date: new Date().toISOString().slice(0, 10),
  time: new Date().toTimeString().slice(0, 5),
  market: '',
  pair: '',
  timeframe: '',
  session: '',
  tradeType: '',
  direction: '',
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
  fee: '',
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
})

export function QuickAddTradeCard() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast, showToast, dismissToast } = useFeedbackToast()
  const router = useRouter()
  const defaultValues = getDefaultValues()
  const form = useForm<
    QuickAddTradeFormInput,
    unknown,
    QuickAddTradeFormValues
  >({
    resolver: zodResolver(quickAddTradeSchema),
    defaultValues,
  })

  const resultValue = form.watch('result')
  const requiresFullForm = resultValue !== '' && resultValue !== 'Pending'

  const handleSubmit = async (data: QuickAddTradeFormValues) => {
    if (data.result && data.result !== 'Pending') {
      showToast(
        'error',
        'Outcome selain Pending butuh detail Entry/SL/TP/Exit. Lanjutkan di Full Trade Form.',
      )
      return
    }

    setIsSubmitting(true)
    try {
      await createTrade({ data })
      router.invalidate()
      form.reset(getDefaultValues())
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
                    onValueChange={(value) => field.onChange(value ?? '')}
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
                  <FormLabel>Timeframe</FormLabel>
                  <Combobox
                    items={TIMEFRAME_OPTIONS}
                    value={field.value ?? ''}
                    onValueChange={(value) => field.onChange(value ?? '')}
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
                  <FormLabel>Session</FormLabel>
                  <Combobox
                    items={SESSION_OPTIONS}
                    value={field.value ?? ''}
                    onValueChange={(value) => field.onChange(value ?? '')}
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
                  <FormLabel>Trade Type</FormLabel>
                  <Combobox
                    items={TRADE_TYPE_OPTIONS}
                    value={field.value ?? ''}
                    onValueChange={(value) => field.onChange(value ?? '')}
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
                    onValueChange={(value) => field.onChange(value ?? '')}
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
                  <FormLabel>Result</FormLabel>
                  <Combobox
                    items={RESULT_OPTIONS}
                    value={field.value}
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
            <FormField
              control={form.control}
              name="fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fee</FormLabel>
                  <FormControl>
                    <Input placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {requiresFullForm ? (
              <div className="md:col-span-3 rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-sm">
                <p className="text-amber-800 dark:text-amber-300">
                  Outcome final butuh detail eksekusi (Entry, SL, TP, Exit
                  Price).
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2"
                  onClick={() =>
                    router.navigate({ to: '/dashboard/trade/new' })
                  }
                >
                  Open Full Trade Form
                </Button>
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button type="submit" disabled={isSubmitting || requiresFullForm}>
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
