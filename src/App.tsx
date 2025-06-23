import './App.css'
import { useEffect, useState } from 'react'
import { useFetchComic } from '@/services/comic/hooks'
import { ComicImage, Header } from './components'
import type { Comic } from './services/comic/types'

function App() {
  const [search, setSearch] = useState<number>()
  const [latestData, setLatestData] = useState<Comic | null>(null)

  const searchQuery = Number(search) || 'latest'
  const { data, loading, error } = useFetchComic(searchQuery)

  useEffect(() => {
    if (data && searchQuery === 'latest' && !latestData) {
      setLatestData(data)
    }
  }, [data, searchQuery, latestData])

  const handleChangePage = (id: number) => {
    setSearch(id)
  }

  return (
    <div className="app">
      {/*make sure latest comic loaded before rendering header */}
      {latestData && (
        <Header
          search={search || latestData?.num || 1}
          loading={loading}
          latestData={latestData}
          handleChangePage={handleChangePage}
        />
      )}
      <div className="image-container">
        <ComicImage
          key={data?.img}
          src={data?.img || ''}
          alt={data?.alt || ''}
          className="image"
          isLoading={loading}
          title={data?.safe_title || ''}
          error={error}
        />
      </div>
    </div>
  )
}

export default App
