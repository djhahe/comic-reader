import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock fetch globally
global.fetch = vi.fn()

// Mock console.log to avoid noise in tests
global.console = {
  ...console,
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
}
