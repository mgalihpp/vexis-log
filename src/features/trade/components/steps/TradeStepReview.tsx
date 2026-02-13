import { RequiredLabel } from "../tradeFormFields";
import type { UseFormReturn } from "react-hook-form";
import type {
  TradeFormInput,
  TradeFormValues,
} from "@/utils/schema/tradeSchema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type TradeStepReviewProps = {
  form: UseFormReturn<TradeFormInput, unknown, TradeFormValues>;
};

export function TradeStepReview({ form }: TradeStepReviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormField
        control={form.control}
        name="whatWentRight"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What Went Right</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Followed the plan, waited patiently"
                {...field}
              />
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
            <FormLabel>Mistakes</FormLabel>
            <FormControl>
              <Textarea placeholder="Entered too early" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="validSetup"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between rounded-md border border-border px-4 py-3">
              <div>
                <FormLabel>Setup valid?</FormLabel>
                <p className="text-xs text-muted-foreground">
                  Evaluate setup quality.
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
        name="entryTiming"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Entry Timing</FormLabel>
            <FormControl>
              <Input placeholder="Too early / on time" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="lesson"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Lesson</FormLabel>
            <FormControl>
              <Textarea placeholder="Be more disciplined" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
