import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { MockedFunction } from 'vitest'
import { useFetchComic } from './hooks'
import { useFetch } from '@/hooks/useFetch'
import type { Comic, ComicRequest } from './types'

// Mock the useFetch hook
vi.mock('@/hooks/useFetch', () => ({
  useFetch: vi.fn(),
}))

const mockUseFetch = useFetch as MockedFunction<typeof useFetch>

const mockComic: Comic = {
  month: '1',
  num: 1234,
  link: 'https://xkcd.com/1234/',
  year: '2024',
  news: 'Test news',
  safe_title: 'Test Comic',
  transcript: 'Test transcript',
  alt: 'Test alt text',
  img: 'https://imgs.xkcd.com/comics/test.png',
}

describe('useFetchComic', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock environment variable
    vi.stubEnv('VITE_API_URL', 'https://xkcd.com/info.0.json')
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllEnvs()
  })

  it('should fetch comic by number', () => {
    mockUseFetch.mockReturnValue({
      data: mockComic,
      loading: false,
      error: null,
    })

    const { result } = renderHook(() => useFetchComic(1234))

    expect(result.current).toEqual({
      data: mockComic,
      loading: false,
      error: null,
    })
    expect(mockUseFetch).toHaveBeenCalledWith('https://xkcd.com/info.0.json/?comic=1234')
  })

  it('should fetch latest comic', () => {
    mockUseFetch.mockReturnValue({
      data: mockComic,
      loading: false,
      error: null,
    })

    const { result } = renderHook(() => useFetchComic('latest'))

    expect(result.current).toEqual({
      data: mockComic,
      loading: false,
      error: null,
    })
    expect(mockUseFetch).toHaveBeenCalledWith('https://xkcd.com/info.0.json/?comic=latest')
  })

  it('should handle loading state', () => {
    mockUseFetch.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    })

    const { result } = renderHook(() => useFetchComic(1234))

    expect(result.current).toEqual({
      data: null,
      loading: true,
      error: null,
    })
  })

  it('should handle error state', () => {
    const errorMessage = 'Failed to fetch comic'
    mockUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: errorMessage,
    })

    const { result } = renderHook(() => useFetchComic(1234))

    expect(result.current).toEqual({
      data: null,
      loading: false,
      error: errorMessage,
    })
  })

  it('should update URL when request changes from number to number', () => {
    mockUseFetch.mockReturnValue({
      data: mockComic,
      loading: false,
      error: null,
    })

    const { rerender } = renderHook(({ request }: { request: number }) => useFetchComic(request), {
      initialProps: { request: 1234 },
    })

    expect(mockUseFetch).toHaveBeenCalledWith('https://xkcd.com/info.0.json/?comic=1234')

    rerender({ request: 5678 })

    expect(mockUseFetch).toHaveBeenCalledWith('https://xkcd.com/info.0.json/?comic=5678')
  })

  it('should handle switching from number to latest', () => {
    mockUseFetch.mockReturnValue({
      data: mockComic,
      loading: false,
      error: null,
    })

    const { rerender } = renderHook(({ request }: { request: ComicRequest }) => useFetchComic(request), {
      initialProps: { request: 1234 as ComicRequest },
    })

    expect(mockUseFetch).toHaveBeenCalledWith('https://xkcd.com/info.0.json/?comic=1234')

    rerender({ request: 'latest' })

    expect(mockUseFetch).toHaveBeenCalledWith('https://xkcd.com/info.0.json/?comic=latest')
  })

  it('should handle zero as a valid comic number', () => {
    mockUseFetch.mockReturnValue({
      data: mockComic,
      loading: false,
      error: null,
    })

    renderHook(() => useFetchComic(0))

    expect(mockUseFetch).toHaveBeenCalledWith('https://xkcd.com/info.0.json/?comic=0')
  })

  it('should handle negative numbers', () => {
    mockUseFetch.mockReturnValue({
      data: mockComic,
      loading: false,
      error: null,
    })

    renderHook(() => useFetchComic(-1))

    expect(mockUseFetch).toHaveBeenCalledWith('https://xkcd.com/info.0.json/?comic=-1')
  })
})
