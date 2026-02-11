import { useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type {
  TradeFormInput,
  TradeFormValues,
} from '@/utils/schema/tradeSchema'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

type TradeStepEvaluationProps = {
  form: UseFormReturn<TradeFormInput, unknown, TradeFormValues>
}

export function TradeStepEvaluation({ form }: TradeStepEvaluationProps) {
  const [tagsInput, setTagsInput] = useState(form.getValues('tags').join(', '))

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea placeholder="Additional notes" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tags"
        render={() => (
          <FormItem className="md:col-span-2">
            <FormLabel>Tags</FormLabel>
            <FormControl>
              <Input
                placeholder="breakout, london, news"
                value={tagsInput}
                onChange={(event) => {
                  const rawValue = event.target.value
                  setTagsInput(rawValue)

                  const nextTags = rawValue
                    .split(/[\n,;]+/)
                    .map((tag) => tag.trim())
                    .filter(Boolean)

                  form.setValue('tags', nextTags, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="improvement"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Improvement</FormLabel>
            <FormControl>
              <Textarea placeholder="Primary improvement" {...field} />
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
            <FormLabel>Rules to Tighten</FormLabel>
            <FormControl>
              <Textarea placeholder="Limit overtrading" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="actionPlan"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Action Plan</FormLabel>
            <FormControl>
              <Textarea placeholder="Improvement plan" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
