export const MOCK_CURRENCIES_RESPONSE = {
  meta: { code: 200, disclaimer: '' },
  response: [
    { id: 1, name: 'US Dollar', short_code: 'USD', code: 'USD', precision: 2, subunit: 100, symbol: '$', symbol_first: true, decimal_mark: '.', thousands_separator: ',' },
    { id: 2, name: 'Euro', short_code: 'EUR', code: 'EUR', precision: 2, subunit: 100, symbol: '€', symbol_first: true, decimal_mark: ',', thousands_separator: '.' },
    { id: 3, name: 'British Pound', short_code: 'GBP', code: 'GBP', precision: 2, subunit: 100, symbol: '£', symbol_first: true, decimal_mark: '.', thousands_separator: ',' },
    { id: 4, name: 'Polski Złoty', short_code: 'PLN', code: 'PLN', precision: 2, subunit: 100, symbol: 'zł', symbol_first: false, decimal_mark: ',', thousands_separator: ' ' },
  ],
}

export const MOCK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.9235,
  GBP: 0.7921,
  PLN: 3.9712,
}
