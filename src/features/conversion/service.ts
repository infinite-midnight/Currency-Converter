import { MOCK_RATES } from '@/mocks/currencies'
import { USE_MOCK, API_KEY, BASE_URL } from '@/config'

export interface ConvertResponseDTO {
  meta: { code: number; disclaimer: string }
  response: {
    timestamp: number
    date: string
    from: string
    to: string
    amount: number
    value: number
  }
}

export interface ConversionResult {
  from: string
  to: string
  amount: number
  value: number
  rate: number
  date: string
}


export async function fetchConversion(from: string, to: string, amount: number): Promise<ConversionResult> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 200))
    const rate = (MOCK_RATES[to] ?? 1) / (MOCK_RATES[from] ?? 1)
    return { from, to, amount, value: amount * rate, rate, date: new Date().toISOString().slice(0, 10) }
  }

  if (!API_KEY) throw new Error('Missing VITE_CURRENCY_BEACON_API_KEY')

  const url = new URL(`${BASE_URL}/convert`, window.location.origin)
  url.searchParams.set('api_key', API_KEY)
  url.searchParams.set('from', from)
  url.searchParams.set('to', to)
  url.searchParams.set('amount', String(amount))

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`Conversion fetch failed: ${res.status}`)

  const data = (await res.json()) as ConvertResponseDTO
  const { value, date, amount: reqAmount } = data.response
  return { from, to, amount: reqAmount, value, rate: reqAmount > 0 ? value / reqAmount : 0, date }
}
