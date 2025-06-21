import './App.css'
import { useEffect, useState } from 'react'
import { useFetchComic } from '@/services/comic/hooks'
import { Button, Input, Tooltip, Image } from './components'
import { SearchIcon } from 'lucide-react'
import type { Comic } from './services/comic/types'

function App() {
  const [search, setSearch] = useState<number>()
  const [latestData, setLatestData] = useState<Comic | null>(null)

  const searchQuery = Number(search) || 'latest'
  const { data, loading, error } = useFetchComic(searchQuery)

  useEffect(() => {
    if (data && searchQuery === 'latest') {
      setLatestData(data)
    }
  }, [data, searchQuery])

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
        <Button disabled={data?.num === 1 || loading} onClick={() => handleChangePage(-1)}>
          Previous
        </Button>
        <form onSubmit={handleSearch}>
          <Input placeholder="Search" leftIcon={<SearchIcon />} type="number" name="search" disabled={loading} />
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
      <Tooltip content={loading || !data ? '' : data.safe_title}>
        <Image src={data?.img || ''} alt={data?.safe_title || ''} className="image" isLoading={loading} />
      </Tooltip>

      <div className={loading ? 'loading' : ''}>{data?.alt}</div>
      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default App
