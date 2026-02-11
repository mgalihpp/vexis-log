import { describe, expect, it } from 'vitest'
import { normalizeRrRatio } from '@/utils/rr-ratio'

describe('normalizeRrRatio', () => {
  it('keeps a standard ratio format stable', () => {
    expect(normalizeRrRatio('1:2')).toBe('1:2')
  })

  it('normalizes ratio precision and spaces', () => {
    expect(normalizeRrRatio(' 1 : 2.00 ')).toBe('1:2')
  })

  it('maps numeric ratio values to 1:x format', () => {
    expect(normalizeRrRatio(2)).toBe('1:2')
  })

  it('normalizes non-unit left-side ratios', () => {
    expect(normalizeRrRatio('2:4')).toBe('1:2')
  })
})
