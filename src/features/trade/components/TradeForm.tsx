import { useState } from 'react'
import { ArrowLeft, ArrowRight, Save } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from '@tanstack/react-router'
import { TradeStepExecution } from './steps/TradeStepExecution'
import { TradeStepInfo } from './steps/TradeStepInfo'
import { TradeStepPlan } from './steps/TradeStepPlan'
import { TradeStepPsychology } from './steps/TradeStepPsychology'
import { TradeStepReview } from './steps/TradeStepReview'
import { TradeStepEvaluation } from './steps/TradeStepEvaluation'
import { TradeDerivedFieldsSync } from './TradeDerivedFieldsSync'
import type { FieldErrors } from 'react-hook-form'
import type {
  TradeFormInput,
  TradeFormValues,
} from '@/utils/schema/tradeSchema'
import { tradeSchema } from '@/utils/schema/tradeSchema'
import { createTrade, updateTrade } from '@/utils/dashboard.functions'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { FeedbackToast } from '@/components/ui/feedback-toast'
import { useFeedbackToast } from '@/hooks/use-feedback-toast'

const steps = [
  {
    id: 'info',
    title: 'Trade Info',
    description: 'Fill the essential trade details before the setup.',
  },
  {
    id: 'plan',
    title: 'Setup & Entry',
    description: 'Capture setup validation and entry plan.',
  },
  {
    id: 'execution',
    title: 'Execution & Outcome',
    description: 'Select the outcome during or after the trade.',
  },
  {
    id: 'psychology',
    title: 'Psychology',
    description: 'Assess emotions and discipline during the trade.',
  },
  {
    id: 'review',
    title: 'Post-Trade Review',
    description: 'Evaluate what went right and mistakes made.',
  },
  {
    id: 'evaluation',
    title: 'Improvement & Evaluation',
    description: 'Capture lessons and improvement plan.',
  },
]

export const stepFields: Array<Array<keyof TradeFormInput>> = [
  ['date', 'market', 'pair', 'direction'],
  [],
  [],
  [],
  [],
  [],
]

const baseDefaultValues: TradeFormInput = {
  date: '',
  time: '',
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
  accountBalance: '',
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
  result: 'Pending',
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
}

type TradeFormProps = {
  tradeId?: string
  initialValues?: Partial<TradeFormInput>
}

export default function TradeForm({ tradeId, initialValues }: TradeFormProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const { toast, showToast, dismissToast } = useFeedbackToast()

  const router = useRouter()
  const form = useForm<TradeFormInput, unknown, TradeFormValues>({
    resolver: zodResolver(tradeSchema),
    shouldUnregister: false,
    defaultValues: {
      ...baseDefaultValues,
      ...initialValues,
    },
  })

  const isSubmitting = form.formState.isSubmitting

  const resultValue = form.watch('result')
  const isPending = resultValue === 'Pending'

  const handleSubmit = async (data: TradeFormValues) => {
    try {
      if (tradeId) {
        await updateTrade({ data: { id: tradeId, data } })
      } else {
        await createTrade({ data })
      }
      router.invalidate()
      showToast(
        'success',
        tradeId ? 'Trade updated successfully.' : 'Trade saved successfully.',
      )
      await new Promise((resolve) => window.setTimeout(resolve, 700))
      await router.navigate({ to: '/dashboard/trade' })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to save the trade. Please check required fields.'
      showToast('error', message)
    }
  }

  const handleInvalidSubmit = (errors: FieldErrors<TradeFormInput>) => {
    form.clearErrors()

    const invalidFields = Object.keys(errors) as Array<keyof TradeFormInput>
    if (invalidFields.length > 0) {
      const firstInvalidField = invalidFields[0]
      const targetStep = stepFields.findIndex((fields) =>
        fields.includes(firstInvalidField),
      )

      if (targetStep >= 0 && targetStep !== stepIndex) {
        setStepIndex(targetStep)
      }
    }

    const requiredFieldLabels: Partial<Record<keyof TradeFormInput, string>> = {
      date: 'Date',
      market: 'Market',
      pair: 'Pair',
      direction: 'Direction',
    }

    const missingLabels = invalidFields
      .map((field) => requiredFieldLabels[field])
      .filter((label): label is string => Boolean(label))

    if (missingLabels.length > 0) {
      showToast(
        'error',
        `Please fill required fields: ${missingLabels.join(', ')}.`,
      )
      return
    }

    showToast('error', 'Please check highlighted fields before saving.')
  }

  const progress = Math.round(((stepIndex + 1) / steps.length) * 100)
  const isLastStep = stepIndex === steps.length - 1

  const goNext = async () => {
    const fields = stepFields[stepIndex]
    const isValid = await form.trigger(fields)
    if (!isValid) {
      return
    }

    setStepIndex((value) => Math.min(value + 1, steps.length - 1))
  }

  const goBack = () => {
    setStepIndex((value) => Math.max(value - 1, 0))
  }

  return (
    <Form {...form}>
      <TradeDerivedFieldsSync form={form} />
      <form onSubmit={(event) => event.preventDefault()} className="space-y-6">
        <Card className="border-border bg-card p-6 space-y-4">
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Step {stepIndex + 1} of {steps.length}
            </p>
            <h2 className="text-2xl font-display font-semibold">
              {steps[stepIndex].title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {steps[stepIndex].description}
            </p>
          </div>
          <div className="h-2 w-full rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] text-muted-foreground md:grid-cols-6 md:text-xs">
            {steps.map((step, index) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setStepIndex(index)}
                disabled={isSubmitting}
                className={`rounded-md border px-2 py-1 text-center ${
                  index === stepIndex
                    ? 'border-primary/60 text-primary'
                    : 'border-border hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>
        </Card>

        <Card className="border-border bg-card p-6">
          {stepIndex === 0 && <TradeStepInfo form={form} />}
          {stepIndex === 1 && <TradeStepPlan form={form} />}
          {stepIndex === 2 && (
            <TradeStepExecution form={form} isPending={isPending} />
          )}
          {stepIndex === 3 && <TradeStepPsychology form={form} />}
          {stepIndex === 4 && <TradeStepReview form={form} />}
          {stepIndex === 5 && <TradeStepEvaluation form={form} />}
        </Card>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={goBack}
            disabled={stepIndex === 0 || isSubmitting}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          {isLastStep ? (
            <Button
              type="button"
              className="w-full md:w-auto gradient-primary text-primary-foreground font-semibold"
              disabled={isSubmitting}
              onClick={() =>
                form.handleSubmit(handleSubmit, handleInvalidSubmit)()
              }
            >
              <Save className="mr-2 h-4 w-4" />
              {tradeId ? 'Update Trade' : 'Save Trade'}
            </Button>
          ) : (
            <Button
              type="button"
              className="w-full md:w-auto"
              onClick={goNext}
              disabled={isSubmitting}
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
      {toast ? (
        <FeedbackToast
          kind={toast.kind}
          message={toast.message}
          onDismiss={dismissToast}
        />
      ) : null}
    </Form>
  )
}
