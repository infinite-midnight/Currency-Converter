import type { ConversionResult as Result } from './service'

interface Props {
  result: Result | undefined
  isLoading: boolean
  isError: boolean
  onRetry: () => void
}

export function ConversionResult({ result, isLoading, isError, onRetry }: Props) {
  if (isError) {
    return (
      <div className="flex items-center gap-3 text-sm">
        <span className="text-red-500">Couldn't fetch rate.</span>
        <button
          type="button"
          onClick={onRetry}
          className="text-blue-600 underline underline-offset-2 hover:text-blue-800"
        >
          Try again
        </button>
      </div>
    )
  }

  if (isLoading) {
    return <p className="text-sm text-gray-400">Loading...</p>
  }

  if (!result) return <div className="h-5" />

  return (
    <p className="text-sm text-gray-500">
      1 {result.from} ={' '}
      <span className="font-medium text-gray-800">
        {result.rate.toFixed(6)} {result.to}
      </span>
      <span className="ml-2 text-xs text-gray-400">{result.date}</span>
    </p>
  )
}
