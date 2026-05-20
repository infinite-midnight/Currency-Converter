import { MOCK_CURRENCIES_RESPONSE } from '@/mocks/currencies'
import { USE_MOCK, API_KEY, BASE_URL } from '@/config'

// Domain model - insulates components from the API
export interface Currency {
  code: string
  name: string
  symbol: string
  symbolFirst: boolean
  precision: number
  decimalMark: string
  thousandsSeparator: string
}

// Raw API shape, only the fields we use.
interface CurrencyApiItem {
  short_code: string
  name: string
  symbol: string
  symbol_first: boolean
  precision: number
  decimal_mark: string
  thousands_separator: string
}

function toCurrency(item: CurrencyApiItem): Currency {
  return {
    code: item.short_code,
    name: item.name,
    symbol: item.symbol,
    symbolFirst: item.symbol_first,
    precision: item.precision,
    decimalMark: item.decimal_mark,
    thousandsSeparator: item.thousands_separator,
  }
}

export async function fetchCurrencies(): Promise<Currency[]> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 300))
    return MOCK_CURRENCIES_RESPONSE.response.map(toCurrency)
  }

  if (!API_KEY) throw new Error('Missing VITE_CURRENCY_BEACON_API_KEY')

  const url = new URL(`${BASE_URL}/currencies`, window.location.origin)
  url.searchParams.set('api_key', API_KEY)

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`Currencies fetch failed: ${res.status}`)

  const data = (await res.json()) as { response: CurrencyApiItem[] }
  return data.response.map(toCurrency)
}
