import { DISRUPTION_OPTIONS, EMOTION_OPTIONS } from "../../constants/options";
import type { UseFormReturn } from "react-hook-form";
import type {
  TradeFormInput,
  TradeFormValues,
} from "@/utils/schema/tradeSchema";
import { Slider } from "@/components/ui/slider";
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

type TradeStepPsychologyProps = {
  form: UseFormReturn<TradeFormInput, unknown, TradeFormValues>;
};

export function TradeStepPsychology({ form }: TradeStepPsychologyProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormField
        control={form.control}
        name="emotionBefore"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Emotion Before Entry</FormLabel>
            <Combobox
              items={EMOTION_OPTIONS}
              value={field.value ?? ""}
              onValueChange={(value) => field.onChange(value ?? "")}
            >
              <FormControl>
                <ComboboxInput placeholder="Select emotion" />
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
        name="emotionalDisruption"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Emotional Disruptions</FormLabel>
            <Combobox
              items={DISRUPTION_OPTIONS}
              value={field.value ?? ""}
              onValueChange={(value) => field.onChange(value ?? "")}
            >
              <FormControl>
                <ComboboxInput placeholder="Select disruption" />
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
        name="confidence"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{`Confidence: ${field.value ?? 5}/10`}</FormLabel>
            <FormControl>
              <Slider
                value={[field.value ?? 5]}
                onValueChange={(value) => field.onChange(value[0])}
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
            <FormLabel>{`Discipline: ${field.value ?? 5}/10`}</FormLabel>
            <FormControl>
              <Slider
                value={[field.value ?? 5]}
                onValueChange={(value) => field.onChange(value[0])}
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
  );
}
