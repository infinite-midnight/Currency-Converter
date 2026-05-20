import { useId } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Currency } from './service'

interface Props {
  currencies: Currency[]
  value: string
  onChange: (code: string) => void
  label: string
  excludeCode?: string
}

export function CurrencySelect({ currencies, value, onChange, label, excludeCode }: Props) {
  const id = useId()

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs text-muted-foreground uppercase tracking-wide">
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {currencies
            .filter((c) => c.code !== excludeCode)
            .map((c) => (
              <SelectItem key={c.code} value={c.code}>
                {c.code} - {c.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}
