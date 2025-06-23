import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { MockedFunction } from 'vitest'
import { useFetch } from './useFetch'

vi.mock('@/services/request', () => ({
  request: vi.fn(),
}))

import { request } from '@/services/request'

const mockRequest = request as MockedFunction<typeof request>

describe('useFetch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.clearAllTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useFetch())

    expect(result.current).toEqual({
      data: null,
      loading: false,
      error: null,
    })
  })

  it('should not fetch when no URL is provided', () => {
    const { result } = renderHook(() => useFetch())

    expect(result.current).toEqual({
      data: null,
      loading: false,
      error: null,
    })
    expect(mockRequest).not.toHaveBeenCalled()
  })

  it('should fetch data successfully', async () => {
    const mockData = { id: 1, name: 'Test Comic' }
    const testUrl = 'https://api.example.com/comics/1'

    mockRequest.mockResolvedValueOnce(mockData)

    const { result } = renderHook(() => useFetch(testUrl))

    expect(result.current.loading).toBe(true)
    expect(result.current.data).toBe(null)
    expect(result.current.error).toBe(null)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toEqual(mockData)
    expect(result.current.error).toBe(null)
    expect(mockRequest).toHaveBeenCalledWith(testUrl)
    expect(mockRequest).toHaveBeenCalledTimes(1)
  })

  it('should handle fetch errors', async () => {
    const testUrl = 'https://api.example.com/comics/1'
    const errorMessage = 'Network error'

    mockRequest.mockRejectedValueOnce(new Error(errorMessage))

    const { result } = renderHook(() => useFetch(testUrl))

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toBe(null)
    expect(result.current.error).toBe(errorMessage)
    expect(mockRequest).toHaveBeenCalledWith(testUrl)
  })

  it('should handle non-Error objects in catch block', async () => {
    const testUrl = 'https://api.example.com/comics/1'

    mockRequest.mockRejectedValueOnce('String error')

    const { result } = renderHook(() => useFetch(testUrl))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toBe(null)
    expect(result.current.error).toBe('An error occurred')
  })

  it('should refetch when URL changes', async () => {
    const mockData1 = { id: 1, name: 'Comic 1' }
    const mockData2 = { id: 2, name: 'Comic 2' }
    const url1 = 'https://api.example.com/comics/1'
    const url2 = 'https://api.example.com/comics/2'

    mockRequest.mockResolvedValueOnce(mockData1).mockResolvedValueOnce(mockData2)

    const { result, rerender } = renderHook(({ url }: { url?: string }) => useFetch(url), {
      initialProps: { url: url1 },
    })

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData1)
    })

    rerender({ url: url2 })

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData2)
    })

    expect(mockRequest).toHaveBeenCalledTimes(2)
    expect(mockRequest).toHaveBeenNthCalledWith(1, url1)
    expect(mockRequest).toHaveBeenNthCalledWith(2, url2)
  })

  it('should not fetch when URL is undefined', () => {
    const { result } = renderHook(() => useFetch(undefined))

    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBe(null)
    expect(result.current.error).toBe(null)
    expect(mockRequest).not.toHaveBeenCalled()
  })

  it('should not fetch when URL is empty string', () => {
    const { result } = renderHook(() => useFetch(''))

    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBe(null)
    expect(result.current.error).toBe(null)
    expect(mockRequest).not.toHaveBeenCalled()
  })

  it('should handle multiple rapid URL changes', async () => {
    const mockData = { id: 1, name: 'Test Comic' }
    const testUrl = 'https://api.example.com/comics/1'

    mockRequest.mockResolvedValue(mockData)

    const { result, rerender } = renderHook(({ url }: { url?: string }) => useFetch(url), {
      initialProps: { url: testUrl },
    })

    rerender({ url: 'https://api.example.com/comics/2' })
    rerender({ url: 'https://api.example.com/comics/3' })
    rerender({ url: testUrl })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toEqual(mockData)
    expect(result.current.error).toBe(null)
  })

  it('should maintain previous data while loading new data', async () => {
    const mockData1 = { id: 1, name: 'Comic 1' }
    const mockData2 = { id: 2, name: 'Comic 2' }
    const url1 = 'https://api.example.com/comics/1'
    const url2 = 'https://api.example.com/comics/2'

    mockRequest.mockResolvedValueOnce(mockData1).mockResolvedValueOnce(mockData2)

    const { result, rerender } = renderHook(({ url }: { url?: string }) => useFetch(url), {
      initialProps: { url: url1 },
    })

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData1)
    })

    rerender({ url: url2 })

    expect(result.current.loading).toBe(true)
    expect(result.current.data).toEqual(mockData1)

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData2)
    })
  })

  it('should handle URL change to undefined', async () => {
    const mockData = { id: 1, name: 'Test Comic' }
    const testUrl = 'https://api.example.com/comics/1'

    mockRequest.mockResolvedValueOnce(mockData)

    const { result, rerender } = renderHook(({ url }: { url?: string }) => useFetch(url), {
      initialProps: { url: testUrl },
    })

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData)
    })

    rerender({ url: '' })

    expect(result.current.loading).toBe(false)
    expect(result.current.data).toEqual(mockData)
    expect(result.current.error).toBe(null)
  })

  it('should handle URL change to empty string', async () => {
    const mockData = { id: 1, name: 'Test Comic' }
    const testUrl = 'https://api.example.com/comics/1'

    mockRequest.mockResolvedValueOnce(mockData)

    const { result, rerender } = renderHook(({ url }: { url?: string }) => useFetch(url), {
      initialProps: { url: testUrl },
    })

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData)
    })

    rerender({ url: '' })

    expect(result.current.loading).toBe(false)
    expect(result.current.data).toEqual(mockData)
    expect(result.current.error).toBe(null)
  })
})
