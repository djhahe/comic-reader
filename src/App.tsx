import './App.css'
import { useEffect, useRef, useState, useMemo } from 'react'
import { useFetchComic } from '@/services/comic/hooks'
import { Button, Input, ComicImage } from './components'
import { SearchIcon } from 'lucide-react'
import type { Comic } from './services/comic/types'

function App() {
  const [search, setSearch] = useState<number>()
  const [latestData, setLatestData] = useState<Comic | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const searchQuery = useMemo(() => Number(search) || 'latest', [search])
  const { data, loading, error } = useFetchComic(searchQuery)

  useEffect(() => {
    if (data && searchQuery === 'latest' && !latestData) {
      setLatestData(data)
    }
  }, [data, searchQuery, latestData])

  useEffect(() => {
    if (data && inputRef.current) {
      inputRef.current.value = data.num.toString()
    }
  }, [data])

  const handleRandom = () => {
    const randomNum = Math.floor(Math.random() * (latestData?.num || 1))
    setSearch(randomNum)
  }

  const handleChangePage = (offset: number) => {
    if (data?.num) {
      setSearch(data.num + offset)
    }
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const value = Number(formData.get('search'))
    setSearch(value)
  }

  return (
    <div className="app">
      <div className="header">
        <Button disabled={(data?.num || 0) < 1 || loading} onClick={() => handleChangePage(-1)}>
          Previous
        </Button>
        <form onSubmit={handleSearch}>
          <Input
            placeholder="Search"
            leftIcon={<SearchIcon />}
            type="number"
            name="search"
            disabled={loading}
            min={1}
            ref={inputRef}
          />
        </form>
        <Button disabled={!!error || loading} onClick={handleRandom}>
          Random
        </Button>
        <Button
          disabled={(!!latestData && !!data && data.num >= latestData.num) || loading}
          onClick={() => handleChangePage(1)}
        >
          Next
        </Button>
      </div>
      <div className="image-container">
        <ComicImage
          key={data?.img}
          src={data?.img || ''}
          alt={data?.alt || ''}
          className="image"
          isLoading={loading}
          title={data?.safe_title || ''}
        />
      </div>

      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default App
