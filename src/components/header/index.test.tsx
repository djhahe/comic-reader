import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Header } from './index'
import { getRandomId } from '@/utils/random'
import type { Comic } from '@/services/comic/types'

vi.mock('@/utils/random', () => ({
  getRandomId: vi.fn(),
}))
const mockGetRandomId = getRandomId as unknown as ReturnType<typeof vi.fn>

const mockComic: Comic = {
  month: '1',
  num: 100,
  link: 'https://xkcd.com/100/',
  year: '2024',
  news: '',
  safe_title: 'Test Comic',
  transcript: '',
  alt: 'Test alt',
  img: 'https://imgs.xkcd.com/comics/test.png',
}

describe('Header', () => {
  let handleChangePage: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.clearAllMocks()
    handleChangePage = vi.fn()
    mockGetRandomId.mockReturnValue(42)
  })

  it('renders navigation, search, and random controls', () => {
    render(<Header search={50} loading={false} latestData={mockComic} handleChangePage={handleChangePage} />)
    expect(screen.getByText('Previous')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
    expect(screen.getByText('Random')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
  })

  it('disables Previous button on first comic', () => {
    render(<Header search={1} loading={false} latestData={mockComic} handleChangePage={handleChangePage} />)
    expect(screen.getByText('Previous').parentElement).toBeDisabled()
  })

  it('disables Next button on latest comic', () => {
    render(<Header search={100} loading={false} latestData={mockComic} handleChangePage={handleChangePage} />)
    expect(screen.getByText('Next').parentElement).toBeDisabled()
  })

  it('disables all controls when loading', () => {
    render(<Header search={50} loading={true} latestData={mockComic} handleChangePage={handleChangePage} />)
    expect(screen.getByText('Previous').parentElement).toBeDisabled()
    expect(screen.getByText('Next').parentElement).toBeDisabled()
    expect(screen.getByText('Random').parentElement).toBeDisabled()
    expect(screen.getByPlaceholderText('Search')).toBeDisabled()
  })

  it('calls handleChangePage(-1) when Previous is clicked', () => {
    render(<Header search={10} loading={false} latestData={mockComic} handleChangePage={handleChangePage} />)
    fireEvent.click(screen.getByText('Previous'))
    expect(handleChangePage).toHaveBeenCalledWith(9)
  })

  it('calls handleChangePage(+1) when Next is clicked', () => {
    render(<Header search={10} loading={false} latestData={mockComic} handleChangePage={handleChangePage} />)
    fireEvent.click(screen.getByText('Next'))
    expect(handleChangePage).toHaveBeenCalledWith(11)
  })

  it('calls handleChangePage with random id when Random is clicked', () => {
    render(<Header search={10} loading={false} latestData={mockComic} handleChangePage={handleChangePage} />)
    fireEvent.click(screen.getByText('Random'))
    expect(mockGetRandomId).toHaveBeenCalledWith(1, 100)
    expect(handleChangePage).toHaveBeenCalledWith(42)
  })

  it('calls handleChangePage with input value on search submit', () => {
    render(<Header search={10} loading={false} latestData={mockComic} handleChangePage={handleChangePage} />)
    const input = screen.getByPlaceholderText('Search')
    fireEvent.change(input, { target: { value: '77' } })
    fireEvent.submit(input.closest('form')!)
    expect(handleChangePage).toHaveBeenCalledWith(77)
  })

  it('updates input value when search prop changes', () => {
    const { rerender } = render(
      <Header search={10} loading={false} latestData={mockComic} handleChangePage={handleChangePage} />,
    )
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement
    expect(input.value).toBe('10')
    rerender(<Header search={55} loading={false} latestData={mockComic} handleChangePage={handleChangePage} />)
    expect(input.value).toBe('55')
  })
})
