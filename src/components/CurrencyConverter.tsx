import { useEffect, useState } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import { AmountInput } from '@/features/currencies/AmountInput'
import { CurrencySelect } from '@/features/currencies/CurrencySelect'
import { useCurrencies } from '@/features/currencies/useCurrencies'
import { ConversionResult } from '@/features/conversion/ConversionResult'
import { useConversion } from '@/features/conversion/useConversion'
import { useLocalStorage } from "@/hooks/useLocalStorage.ts";

// Guards against the stored code not existing in the loaded list (before currencies arrive).
// function resolveCode(code: string, currencies: Currency[], fallbackIndex: number): string {
//   if (currencies.length === 0) return code
//   if (currencies.some((c) => c.code === code)) return code
//   return currencies[fallbackIndex]?.code ?? currencies[0].code
// }

export function CurrencyConverter() {
  const [from, setFrom] = useLocalStorage('cc-from', '')
  const [to, setTo] = useLocalStorage('cc-to', '')
  const [direction, setDirection] = useState<'from' | 'to'>('from')
  const [activeAmount, setActiveAmount] = useLocalStorage('cc-amount', 1)

  const { data: currencies = [], isLoading: loadingCurrencies, isError: currenciesError } = useCurrencies()

  // const [from, setFrom] = useState('USD')
  // const [to, setTo] = useState('EUR')
  // const [amount, setAmount] = useState(1)

  // const fromCode = resolveCode(from, currencies, 0)
  // const toCode = resolveCode(to, currencies, 1)
  // const conversion = useConversion(fromCode, toCode, amount)


  useEffect(() => {
    if (from || currencies.length < 2) return
    setFrom(currencies[0].code)
    setTo(currencies[1].code)
  }, [currencies, from, setFrom, setTo])

  const convFrom = direction === 'from' ? from : to;
  const convTo = direction === 'from' ? to : from;
  const conversion = useConversion(convFrom, convTo, activeAmount)

  // TODO refactor later
  const fromDisplayAmount = direction === 'from' ? activeAmount : (conversion.data?.value ?? 0)
  const toDisplayAmount = direction === 'to' ? activeAmount : (conversion.data?.value ?? 0)

  const fromCurrency = currencies.find((c) => c.code === from)
  const toCurrency = currencies.find((c) => c.code === to)


  // function firstOtherThan(exclude: string): string {
  //   return currencies.find((c) => c.code !== exclude)?.code ?? exclude
  // }

  function handleFromChange(code: string) {
    if (code === to) setTo(from)
    setFrom(code)
  }

  function handleToChange(code: string) {
    if (code === from) setFrom(to)
    setTo(code)
  }

  function handleSwap() {
    setFrom(to)
    setTo(from)
    setDirection('from')
  }

  function handleFromAmountChange(value: number) {
    setDirection('from')
    setActiveAmount(value)
  }

  function handleToAmountChange(value: number) {
    setDirection('to')
    setActiveAmount(value)
  }

  if (currenciesError) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full max-w-xl mx-auto">
        <p className="text-sm text-red-500">Failed to load currencies. Please refresh the page.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full max-w-xl mx-auto">
      <h1 className="text-xl font-semibold text-gray-800 mb-6">Currency Converter</h1>

      {loadingCurrencies ? (
        <p className="text-sm text-gray-400">Loading currencies...</p>
      ) : (
        <>
          <div className="flex items-end gap-3">
            <div className="flex-1 flex flex-col gap-3">
              <CurrencySelect
                label="From"
                currencies={currencies}
                value={from}
                onChange={handleFromChange}
                excludeCode={to}
              />
              <AmountInput label="Amount" value={fromDisplayAmount} onChange={handleFromAmountChange} currency={fromCurrency} />
            </div>

            <button
              type="button"
              onClick={handleSwap}
              className="mb-0.5 p-2 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
            >
              <ArrowLeftRight size={16} />
            </button>

            <div className="flex-1 flex flex-col gap-3">
              <CurrencySelect
                label="To"
                currencies={currencies}
                value={to}
                onChange={handleToChange}
                excludeCode={from}
              />
              <AmountInput
                label="Converted"
                value={toDisplayAmount}
                onChange={handleToAmountChange}
                currency={toCurrency}
              />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <ConversionResult
              result={conversion.data}
              isLoading={conversion.isLoading}
              isError={conversion.isError}
              onRetry={() => void conversion.refetch()}
            />
          </div>
        </>
      )}
    </div>
  )
}
