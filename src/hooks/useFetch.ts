import { useState, useEffect, useCallback } from 'react'
import { request } from '@/services/request'

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

  const fetchData = useCallback(async (fetchUrl?: string) => {
    if (!fetchUrl) {
      setState(prev => ({ ...prev, error: 'No URL provided' }))
      return
    }

    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const data = await request<T>(fetchUrl)

      setState({ data, loading: false, error: null })
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      })
    }
  }, [])

  useEffect(() => {
    if (url) {
      console.log('🚀 ~ useEffect ~ url:', url)
      fetchData(url)
    }
  }, [url, fetchData])

  return {
    ...state,
  }
}
