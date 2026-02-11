const RATIO_PRECISION = 2

function formatRatioNumber(value: number): string {
  return value.toFixed(RATIO_PRECISION).replace(/\.?0+$/, '')
}

export function normalizeRrRatio(value?: string | number | null): string {
  if (value === undefined || value === null) {
    return ''
  }

  const rawValue = String(value).trim()
  if (!rawValue) {
    return ''
  }

  if (rawValue.includes(':')) {
    const [leftRaw, rightRaw, ...rest] = rawValue
      .split(':')
      .map((part) => part.trim())
    if (rest.length > 0) {
      return rawValue
    }

    const left = Number(leftRaw)
    const right = Number(rightRaw)

    if (
      !Number.isFinite(left) ||
      !Number.isFinite(right) ||
      left === 0 ||
      right <= 0
    ) {
      return rawValue
    }

    const normalized = right / left
    return `1:${formatRatioNumber(normalized)}`
  }

  const numeric = Number(rawValue)
  if (!Number.isFinite(numeric) || numeric <= 0) {
    return rawValue
  }

  return `1:${formatRatioNumber(numeric)}`
}
