import { useEffect } from 'react'
import { useWatch } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'
import type { TradeFormInput } from '@/utils/schema/tradeSchema'
import { normalizeRrRatio } from '@/utils/rr-ratio'

type TradeDerivedFieldsSyncProps<TTransformedValues extends TradeFormInput> = {
  form: UseFormReturn<TradeFormInput, unknown, TTransformedValues>
}

export function TradeDerivedFieldsSync<
  TTransformedValues extends TradeFormInput,
>({ form }: TradeDerivedFieldsSyncProps<TTransformedValues>) {
  const [
    direction,
    entryPrice,
    stopLoss,
    takeProfit,
    exitPrice,
    result,
    fee,
    riskPercent,
    accountBalance,
    positionSize,
  ] = useWatch({
    control: form.control,
    name: [
      'direction',
      'entryPrice',
      'stopLoss',
      'takeProfit',
      'exitPrice',
      'result',
      'fee',
      'riskPercent',
      'accountBalance',
      'positionSize',
    ],
  })

  useEffect(() => {
    if (!entryPrice || !stopLoss || !direction) return

    const entry = parseFloat(entryPrice)
    const sl = parseFloat(stopLoss)
    const tp = takeProfit ? parseFloat(takeProfit) : null
    const exit = exitPrice ? parseFloat(exitPrice) : null
    const parsedFee = fee ? parseFloat(fee) : 0
    const risk = riskPercent ? parseFloat(riskPercent.replace('%', '')) : null
    const balance = accountBalance ? parseFloat(accountBalance) : null

    if (isNaN(entry) || isNaN(sl)) return

    if (tp && !isNaN(tp)) {
      let rr = 0
      if (direction === 'Long') {
        rr = (tp - entry) / (entry - sl)
      } else {
        rr = (entry - tp) / (sl - entry)
      }

      if (!isNaN(rr) && isFinite(rr) && rr > 0) {
        const nextRrRatio = normalizeRrRatio(rr)
        if (form.getValues('rrRatio') !== nextRrRatio) {
          form.setValue('rrRatio', nextRrRatio, { shouldValidate: true })
        }
      }
    }

    if (balance && risk && !isNaN(balance) && !isNaN(risk)) {
      const riskAmount = balance * (risk / 100)
      const stopLossDistance = Math.abs(entry - sl)
      if (stopLossDistance > 0) {
        const nextPositionSize = (riskAmount / stopLossDistance).toFixed(2)
        if (form.getValues('positionSize') !== nextPositionSize) {
          form.setValue('positionSize', nextPositionSize, {
            shouldValidate: true,
          })
        }
      }
    }

    const parsedExit = exit !== null && !isNaN(exit) ? exit : null
    const parsedTakeProfit = tp !== null && !isNaN(tp) ? tp : null

    let effectiveExit: number | null = parsedExit
    if (effectiveExit === null) {
      if (result === 'Win') {
        effectiveExit = parsedTakeProfit
      } else if (result === 'Loss') {
        effectiveExit = sl
      } else if (result === 'Breakeven') {
        effectiveExit = entry
      }
    }

    if (effectiveExit !== null) {
      let actualRRValue = 0
      if (direction === 'Long') {
        actualRRValue = (effectiveExit - entry) / (entry - sl)
      } else {
        actualRRValue = (entry - effectiveExit) / (sl - entry)
      }

      if (!isNaN(actualRRValue) && isFinite(actualRRValue)) {
        const nextActualRr = actualRRValue.toFixed(2)
        if (form.getValues('actualRR') !== nextActualRr) {
          form.setValue('actualRR', nextActualRr, { shouldValidate: true })
        }

        let nextResult: TradeFormInput['result'] | null = null
        if (result === 'Partial') {
          nextResult = 'Partial'
        } else if (actualRRValue >= 0.1) {
          nextResult = 'Win'
        } else if (actualRRValue <= -0.9) {
          nextResult = 'Loss'
        } else if (actualRRValue > -0.9 && actualRRValue < 0.1) {
          nextResult = 'Breakeven'
        }

        if (nextResult && form.getValues('result') !== nextResult) {
          form.setValue('result', nextResult)
        }

        const parsedPositionSize = positionSize
          ? parseFloat(positionSize)
          : null
        const directionalMove =
          direction === 'Long' ? effectiveExit - entry : entry - effectiveExit

        let nextProfitLoss: string | null = null
        if (
          parsedPositionSize &&
          !isNaN(parsedPositionSize) &&
          isFinite(parsedPositionSize)
        ) {
          nextProfitLoss = (directionalMove * parsedPositionSize).toFixed(2)
        } else if (balance && risk && !isNaN(balance) && !isNaN(risk)) {
          const riskAmount = balance * (risk / 100)
          nextProfitLoss = (riskAmount * actualRRValue).toFixed(2)
        }

        if (nextProfitLoss) {
          const feeAmount =
            !isNaN(parsedFee) && isFinite(parsedFee) && parsedFee > 0
              ? parsedFee
              : 0
          const nextNetProfitLoss = (
            parseFloat(nextProfitLoss) - feeAmount
          ).toFixed(2)

          if (form.getValues('profitLoss') !== nextNetProfitLoss) {
            form.setValue('profitLoss', nextNetProfitLoss, {
              shouldValidate: true,
            })
          }
        }
      }
    } else {
      if (form.getValues('actualRR') !== '') {
        form.setValue('actualRR', '', { shouldValidate: true })
      }

      if (form.getValues('profitLoss') !== '') {
        form.setValue('profitLoss', '', { shouldValidate: true })
      }
    }
  }, [
    direction,
    entryPrice,
    stopLoss,
    takeProfit,
    exitPrice,
    result,
    fee,
    riskPercent,
    accountBalance,
    positionSize,
    form,
  ])

  return null
}
