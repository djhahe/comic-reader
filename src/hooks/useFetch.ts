import { useState, useEffect, useCallback } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useFetch<T = unknown>(url?: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const [currentUrl, setCurrentUrl] = useState<string | undefined>(url)

  const fetchData = useCallback(
    async (fetchUrl?: string) => {
      const targetUrl = fetchUrl || currentUrl

      if (!targetUrl) {
        setState(prev => ({ ...prev, error: 'No URL provided' }))
        return
      }

      setState(prev => ({ ...prev, loading: true, error: null }))

      try {
        const response = await fetch(targetUrl)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setState({ data, loading: false, error: null })
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'An error occurred',
        })
      }
    },
    [currentUrl],
  )

  useEffect(() => {
    if (url) {
      setCurrentUrl(url)
    }
  }, [url])

  useEffect(() => {
    if (currentUrl) {
      fetchData()
    }
  }, [currentUrl, fetchData])

  return {
    ...state,
  }
}
