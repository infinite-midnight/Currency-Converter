import { useQuery } from '@tanstack/react-query'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { fetchConversion } from './service'

export function useConversion(from: string, to: string, amount: number) {
  const debouncedAmount = useDebouncedValue(amount, 400) // avoid a request on every keystroke

  return useQuery({
    queryKey: ['convert', from, to, debouncedAmount],
    queryFn: () => fetchConversion(from, to, debouncedAmount),
    enabled: !!from && !!to && from !== to && debouncedAmount > 0,
    staleTime: 30_000, // rate is fresh enough to reuse for 30s if you switch pairs and back
    placeholderData: (prev) => prev, 
  })
}
