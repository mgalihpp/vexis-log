import { RESULT_OPTIONS, RequiredLabel } from '../tradeFormFields'
import type { UseFormReturn } from 'react-hook-form'
import type {
  TradeFormInput,
  TradeFormValues,
} from '@/utils/schema/tradeSchema'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
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

type TradeStepExecutionProps = {
  form: UseFormReturn<TradeFormInput, unknown, TradeFormValues>
  isPending: boolean
}

export function TradeStepExecution({
  form,
  isPending,
}: TradeStepExecutionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <FormField
        control={form.control}
        name="entryOnPlan"
        render={({ field }) => (
          <FormItem className="md:col-span-3">
            <div className="flex items-center justify-between rounded-md border border-border px-4 py-3">
              <div>
                <RequiredLabel text="Entry followed the plan" />
                <p className="text-xs text-muted-foreground">
                  If still open, set the outcome to Pending.
                </p>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="slippage"
        render={({ field }) => (
          <FormItem>
            <RequiredLabel text="Slippage" />
            <FormControl>
              <Input placeholder="0.2 pip" {...field} />
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
            <FormLabel>Plan Changes</FormLabel>
            <FormControl>
              <Input placeholder="None" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tradeManagement"
        render={({ field }) => (
          <FormItem className="md:col-span-3">
            <FormLabel>Trade Management</FormLabel>
            <FormControl>
              <Textarea placeholder="Trailing stop, partial close" {...field} />
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
            <RequiredLabel text="Outcome" />
            <Combobox
              items={RESULT_OPTIONS}
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <FormControl>
                <ComboboxInput placeholder="Select outcome" />
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
      {!isPending && (
        <>
          <FormField
            control={form.control}
            name="exitPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exit Price</FormLabel>
                <FormControl>
                  <Input placeholder="1.2400" {...field} />
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
                  <Input placeholder="+2R" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="actualRR"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Actual RR</FormLabel>
                <FormControl>
                  <Input placeholder="1.8" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  )
}
