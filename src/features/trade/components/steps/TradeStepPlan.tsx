import {
  RR_RATIO_OPTIONS,
  TECHNICAL_CONFIRMATION_OPTIONS,
} from "../../constants/options";
import type { UseFormReturn } from "react-hook-form";
import type {
  TradeFormInput,
  TradeFormValues,
} from "@/utils/schema/tradeSchema";
import { Input } from "@/components/ui/input";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type TradeStepPlanProps = {
  form: UseFormReturn<TradeFormInput, unknown, TradeFormValues>;
};

export function TradeStepPlan({ form }: TradeStepPlanProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <FormField
        control={form.control}
        name="technicalConfirmation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Technical Confirmation</FormLabel>
            <Combobox
              items={TECHNICAL_CONFIRMATION_OPTIONS}
              value={field.value ?? ""}
              onValueChange={(value) => field.onChange(value ?? "")}
            >
              <FormControl>
                <ComboboxInput placeholder="Select confirmation" />
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
        name="fundamentalConfirmation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fundamental Confirmation</FormLabel>
            <FormControl>
              <Input placeholder="News sentiment" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="entryReason"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Entry Reason</FormLabel>
            <FormControl>
              <Input placeholder="Liquidity sweep" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="accountBalance"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Account Balance</FormLabel>
            <FormControl>
              <Input placeholder="10000" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="entryPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Entry Price</FormLabel>
            <FormControl>
              <Input placeholder="1.2345" {...field} />
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
              <Input placeholder="1.2280" {...field} />
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
              <Input placeholder="1.2450" {...field} />
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
            <FormLabel>Risk Percent</FormLabel>
            <FormControl>
              <Input placeholder="1%" {...field} />
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
            <FormLabel>RR Ratio</FormLabel>
            <Combobox
              items={RR_RATIO_OPTIONS}
              value={field.value ?? ""}
              onValueChange={(value) => field.onChange(value ?? "")}
            >
              <FormControl>
                <ComboboxInput placeholder="Select or enter RR" />
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
        name="positionSize"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Position Size</FormLabel>
            <FormControl>
              <Input placeholder="0.5 lot" {...field} className="bg-muted/30" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
