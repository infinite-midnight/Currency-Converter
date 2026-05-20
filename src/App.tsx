import { CurrencyConverter } from '@/components/CurrencyConverter'

export default function App() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl">
        <CurrencyConverter />
      </div>
    </main>
  )
}
