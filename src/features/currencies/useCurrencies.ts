import { useQuery } from '@tanstack/react-query'
import { fetchCurrencies } from './service'

export function useCurrencies() {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: fetchCurrencies,
    staleTime: Infinity, // currency list doesn't change mid-session
  })
}
