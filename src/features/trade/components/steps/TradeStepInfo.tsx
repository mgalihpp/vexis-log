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
import { MARKET_BIAS_OPTIONS, SETUP_OPTIONS } from '../../constants/options'
import type { UseFormReturn } from 'react-hook-form'
import type {
  TradeFormInput,
  TradeFormValues,
} from '@/utils/schema/tradeSchema'
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

type TradeStepInfoProps = {
  form: UseFormReturn<TradeFormInput, unknown, TradeFormValues>
  showRequiredIndicators?: boolean
}

export function TradeStepInfo({
  form,
  showRequiredIndicators = true,
}: TradeStepInfoProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem>
            {showRequiredIndicators ? (
              <RequiredLabel text="Date" />
            ) : (
              <FormLabel>Date</FormLabel>
            )}
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
            <FormLabel>Time</FormLabel>
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
            {showRequiredIndicators ? (
              <RequiredLabel text="Market" />
            ) : (
              <FormLabel>Market</FormLabel>
            )}
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
            {showRequiredIndicators ? (
              <RequiredLabel text="Pair / Asset" />
            ) : (
              <FormLabel>Pair / Asset</FormLabel>
            )}
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
            {showRequiredIndicators ? (
              <RequiredLabel text="Direction" />
            ) : (
              <FormLabel>Direction</FormLabel>
            )}
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
        name="marketCondition"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Market Condition</FormLabel>
            <Combobox
              items={MARKET_CONDITION_OPTIONS}
              value={field.value ?? ''}
              onValueChange={(value) => field.onChange(value ?? '')}
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
            <Combobox
              items={MARKET_BIAS_OPTIONS}
              value={field.value ?? ''}
              onValueChange={(value) => field.onChange(value ?? '')}
            >
              <FormControl>
                <ComboboxInput placeholder="Select bias" />
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
        name="strategy"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Strategy</FormLabel>
            <Combobox
              items={STRATEGY_OPTIONS}
              value={field.value ?? ''}
              onValueChange={(value) => field.onChange(value ?? '')}
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
          <FormItem>
            <FormLabel>Setup</FormLabel>
            <Combobox
              items={SETUP_OPTIONS}
              value={field.value ?? ''}
              onValueChange={(value) => field.onChange(value ?? '')}
            >
              <FormControl>
                <ComboboxInput placeholder="Select setup" />
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
  )
}
