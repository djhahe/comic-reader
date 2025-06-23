import { describe, it, expect } from 'vitest'
import { cn } from './cn'

describe('cn', () => {
  it('should combine multiple class names', () => {
    const result = cn('class1', 'class2', 'class3')
    expect(result).toBe('class1 class2 class3')
  })

  it('should filter out undefined values', () => {
    const result = cn('class1', undefined, 'class3')
    expect(result).toBe('class1 class3')
  })

  it('should filter out empty strings', () => {
    const result = cn('class1', '', 'class3')
    expect(result).toBe('class1 class3')
  })
})
