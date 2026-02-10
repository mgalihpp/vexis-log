import type { UseFormReturn } from 'react-hook-form'
import type {
  TradeFormInput,
  TradeFormValues,
} from '@/utils/schema/tradeSchema'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

type TradeStepPsychologyProps = {
  form: UseFormReturn<TradeFormInput, unknown, TradeFormValues>
}

export function TradeStepPsychology({ form }: TradeStepPsychologyProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormField
        control={form.control}
        name="emotionBefore"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Emotion Before Entry</FormLabel>
            <FormControl>
              <Input placeholder="Tenang, anxious" {...field} />
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
            <FormLabel>Emotional Disruptions</FormLabel>
            <FormControl>
              <Input placeholder="FOMO, Fear, Greed" {...field} />
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
            <FormLabel>{`Confidence: ${field.value}/10`}</FormLabel>
            <FormControl>
              <Slider
                value={[field.value]}
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
            <FormLabel>{`Discipline: ${field.value}/10`}</FormLabel>
            <FormControl>
              <Slider
                value={[field.value]}
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
  )
}
