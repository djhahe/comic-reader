import { SearchIcon } from 'lucide-react'
import { Button } from '../button'
import { Input } from '../input'
import { useState, useEffect } from 'react'
import { getRandomId } from '@/utils/random'
import type { Comic } from '@/services/comic/types'
import './style.css'

export type HeaderProps = {
  search: number
  loading: boolean
  latestData: Comic | null
  handleChangePage: (offset: number) => void
}

export const Header = ({ search, loading, latestData, handleChangePage }: HeaderProps) => {
  const [inputValue, setInputValue] = useState<number>(search)

  useEffect(() => {
    setInputValue(search)
  }, [search])

  const handleRandom = () => {
    const randomId = getRandomId(1, latestData?.num || 1)
    handleChangePage(randomId)
    setInputValue(randomId)
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleChangePage(inputValue)
    setInputValue(inputValue)
  }

  const handleNavigate = (id: number) => {
    handleChangePage(id)
    setInputValue(id)
  }

  return (
    <div className="header">
      <Button disabled={(search && search <= 1) || loading} onClick={() => handleNavigate(search - 1)}>
        Previous
      </Button>
      <form onSubmit={handleSearch}>
        <Input
          placeholder="Search"
          leftIcon={<SearchIcon />}
          type="number"
          name="search"
          disabled={loading}
          max={latestData?.num || 0}
          min={1}
          onInvalid={(e: React.InvalidEvent<HTMLInputElement>) => {
            if (e.target.validity.rangeOverflow) {
              e.target.setCustomValidity(`The latest comic id is ${latestData?.num || 0}`)
            } else if (e.target.validity.rangeUnderflow) {
              e.target.setCustomValidity('The comic id must be greater than 0')
            } else {
              e.target.setCustomValidity('')
            }
          }}
          value={inputValue.toString()}
          onChange={e => setInputValue(Number(e.target.value))}
          className="search-input"
        />
      </form>
      <Button disabled={loading} onClick={handleRandom}>
        Random
      </Button>
      <Button
        disabled={!search || (search && search >= (latestData?.num || 0)) || loading}
        onClick={() => handleNavigate(search + 1)}
      >
        Next
      </Button>
    </div>
  )
}
