import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ComicImage } from './index'

describe('ComicImage', () => {
  let originalImage: typeof global.Image
  let mockImgInstance: { src: string; onload: () => void }
  let mockImage: unknown

  beforeEach(() => {
    originalImage = global.Image
    mockImgInstance = { src: '', onload: vi.fn() }
    mockImage = vi.fn(() => mockImgInstance)
    global.Image = mockImage as typeof global.Image
  })

  afterEach(() => {
    global.Image = originalImage
  })

  it('shows loading placeholders before image loads', () => {
    render(<ComicImage src="test.jpg" alt="Test alt" title="Test title" error={null} />)
    expect(screen.queryByAltText('Test alt')).not.toBeInTheDocument()
    expect(screen.queryByText('Test title')).not.toBeInTheDocument()
    // Placeholders are present (divs)
    expect(document.querySelector('.image__loader.image-placeholder')).toBeInTheDocument()
    expect(document.querySelector('.image__loader.alt-placeholder')).toBeInTheDocument()
  })

  it('shows error if error prop is set', () => {
    render(<ComicImage src="test.jpg" alt="Test alt" title="Test title" error="Something went wrong" />)
    expect(screen.getByText('Something went wrong')).toHaveClass('error')
    expect(screen.queryByAltText('Test alt')).not.toBeInTheDocument()
  })

  it('shows image and title after image loads', async () => {
    render(<ComicImage src="test.jpg" alt="Test alt" title="Test title" error={null} />)
    // Simulate image load
    mockImgInstance.onload()
    await waitFor(() => {
      expect(screen.getByAltText('Test alt')).toBeInTheDocument()
      expect(screen.getByText('Test title')).toHaveClass('title')
      expect(screen.getByText('Test alt')).toHaveClass('alt')
    })
  })

  it('passes extra props to img element', async () => {
    render(
      <ComicImage
        src="test.jpg"
        alt="Test alt"
        error={null}
        className="custom-class"
        data-testid="comic-img"
        width={123}
      />,
    )
    mockImgInstance.onload()
    await waitFor(() => {
      const img = screen.getByTestId('comic-img')
      expect(img).toHaveClass('custom-class')
      expect(img).toHaveAttribute('width', '123')
      expect(img).toHaveAttribute('loading', 'eager')
    })
  })

  it('shows loading placeholders if isLoading is true', () => {
    render(<ComicImage src="test.jpg" alt="Test alt" error={null} isLoading={true} />)
    expect(document.querySelector('.image__loader.image-placeholder')).toBeInTheDocument()
    expect(document.querySelector('.image__loader.alt-placeholder')).toBeInTheDocument()
    expect(screen.queryByAltText('Test alt')).not.toBeInTheDocument()
  })

  it('prioritizes error over loading/loaded state', () => {
    render(<ComicImage src="test.jpg" alt="Test alt" error="Error!" isLoading={true} />)
    expect(screen.getByText('Error!')).toHaveClass('error')
    expect(screen.queryByAltText('Test alt')).not.toBeInTheDocument()
  })
})
