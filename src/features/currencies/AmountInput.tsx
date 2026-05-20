import { useId } from 'react'
import { Input } from '@/components/ui/input'
import type { Currency } from './service'

interface Props {
  value: number
  onChange?: (value: number) => void
  currency: Currency | undefined
  label: string
  readOnly?: boolean
}

export function AmountInput({ value, onChange, currency, label, readOnly = false }: Props) {
  const id = useId()

  const displayValue = currency
    ? `${currency.symbol} ${value.toFixed(currency.precision)}`
    : '-'

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs text-muted-foreground uppercase tracking-wide">
        {label}
      </label>
      {readOnly ? (
        <div
          id={id}
          className="flex h-10 w-full items-center rounded-md border border-input bg-muted px-3 text-sm font-medium"
        >
          {displayValue}
        </div>
      ) : (
        <Input
          id={id}
          type="number"
          min="0"
          step="any"
          value={value || ''}
          placeholder="0"
          onChange={(e) => onChange?.(parseFloat(e.target.value) || 0)}
        />
      )}
    </div>
  )
}
