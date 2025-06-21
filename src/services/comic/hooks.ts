import { useFetch } from '../../hooks/useFetch'
import type { Comic, ComicRequest } from './types'

export const useFetchComic = (request: ComicRequest) => {
  const { data, loading, error } = useFetch<Comic>(`${import.meta.env.VITE_API_URL}/?comic=${request}`)

  return { data, loading, error }
}
