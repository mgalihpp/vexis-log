import {
  DIRECTION_OPTIONS,
  MARKET_CONDITION_OPTIONS,
  MARKET_OPTIONS,
  RequiredLabel,
  SESSION_OPTIONS,
  STRATEGY_OPTIONS,
  TIMEFRAME_OPTIONS,
  TRADE_TYPE_OPTIONS,
} from '../tradeFormFields'
import type { UseFormReturn } from 'react-hook-form'
import type {
  TradeFormInput,
  TradeFormValues,
} from '@/utils/schema/tradeSchema'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

type TradeStepInfoProps = {
  form: UseFormReturn<TradeFormInput, unknown, TradeFormValues>
}

export function TradeStepInfo({ form }: TradeStepInfoProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem>
            <RequiredLabel text="Date" />
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
            <RequiredLabel text="Time" />
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
        name="marketCondition"
        render={({ field }) => (
          <FormItem>
            <RequiredLabel text="Market Condition" />
            <Combobox
              items={MARKET_CONDITION_OPTIONS}
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <FormControl>
                <ComboboxInput placeholder="Select condition" />
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
        name="marketBias"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Market Bias</FormLabel>
            <FormControl>
              <Input placeholder="Bullish / Bearish" {...field} />
            </FormControl>
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
            <Combobox
              items={STRATEGY_OPTIONS}
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <FormControl>
                <ComboboxInput placeholder="Select strategy" />
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
        name="setup"
        render={({ field }) => (
          <FormItem className="md:col-span-3">
            <RequiredLabel text="Setup" />
            <FormControl>
              <Textarea placeholder="Setup used" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
