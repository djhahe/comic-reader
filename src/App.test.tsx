import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { MockedFunction } from 'vitest'
import App from './App'
import { useFetchComic } from '@/services/comic/hooks'
import { getRandomId } from '@/utils/random'
import type { Comic } from './services/comic/types'

vi.mock('@/services/comic/hooks', () => ({
  useFetchComic: vi.fn(),
}))
vi.mock('@/utils/random', () => ({
  getRandomId: vi.fn(),
}))

const mockUseFetchComic = useFetchComic as MockedFunction<typeof useFetchComic>
const mockGetRandomId = getRandomId as MockedFunction<typeof getRandomId>

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

const mockLatestComic: Comic = {
  ...mockComic,
  num: 3000,
  safe_title: 'Latest Comic',
  img: 'https://imgs.xkcd.com/comics/latest.png',
}

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseFetchComic.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    })
    mockGetRandomId.mockReturnValue(1500)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render loading state and not render header until latestData is loaded', () => {
    mockUseFetchComic.mockReturnValue({ data: null, loading: true, error: null })
    render(<App />)
    expect(screen.queryByText('Previous')).not.toBeInTheDocument()
  })

  it('should render header after latestData is loaded', async () => {
    mockUseFetchComic.mockReturnValueOnce({ data: mockLatestComic, loading: false, error: null })
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText('Previous')).toBeInTheDocument()
      expect(screen.getByText('Next')).toBeInTheDocument()
      expect(screen.getByText('Random')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
    })
  })
})
