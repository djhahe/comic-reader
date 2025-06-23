import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getRandomId } from './random'

describe('randomId', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should generate a number within the specified range', () => {
    const min = 1
    const max = 10
    const result = getRandomId(min, max)

    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
    expect(Number.isInteger(result)).toBe(true)
  })

  it('should handle same min and max values', () => {
    const value = 5
    const result = getRandomId(value, value)

    expect(result).toBe(value)
  })

  it('should handle zero as min value', () => {
    const min = 0
    const max = 5
    const result = getRandomId(min, max)

    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
    expect(Number.isInteger(result)).toBe(true)
  })

  it('should handle negative numbers', () => {
    const min = -10
    const max = -1
    const result = getRandomId(min, max)

    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
    expect(Number.isInteger(result)).toBe(true)
  })

  it('should handle large numbers', () => {
    const min = 1000
    const max = 9999
    const result = getRandomId(min, max)

    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
    expect(Number.isInteger(result)).toBe(true)
  })
})
