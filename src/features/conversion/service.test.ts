import { describe, expect, it } from 'vitest'
import { fetchConversion } from './service'

describe('fetchConversion (mock mode)', () => {
  it('returns correct shape', async () => {
    const result = await fetchConversion('USD', 'EUR', 100)
    expect(result).toMatchObject({ from: 'USD', to: 'EUR', amount: 100 })
    expect(result.rate).toBeGreaterThan(0)
    expect(result.value).toBeCloseTo(result.amount * result.rate)
  })
})
