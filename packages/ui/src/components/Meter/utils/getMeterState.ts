type MeterState = 'good' | 'warn' | 'bad'

export function getMeterState({
  value: rawValue,
  min: rawMin,
  max: rawMax,
  low: rawLow = rawMin,
  high: rawHigh = rawMax,
  optimum: rawOptimum,
}: {
  value: number
  min?: number
  max?: number
  low?: number
  high?: number
  optimum?: number
}): MeterState | null {
  if (rawOptimum == null) return null

  const min = rawMin ?? 0
  const max = rawMax !== undefined && rawMax >= min ? rawMax : min

  let value = rawValue
  if (value < min) value = min
  else if (value > max) value = max

  let low = rawLow ?? min
  if (low < min) low = min
  else if (low > max) low = max

  let high = rawHigh ?? max
  if (high < low) high = low
  else if (high > max) high = max

  let optimum = rawOptimum ?? (min + max) / 2
  if (optimum < min) optimum = min
  else if (optimum > max) optimum = max

  if (optimum >= low && optimum <= high) {
    if (value < low || value > high) return 'bad'
    return 'good'
  }

  if (optimum < low) {
    if (value < low) return 'good'
    if (value <= high) return 'warn'
    return 'bad'
  }

  if (optimum > high) {
    if (value > high) return 'good'
    if (value >= low) return 'warn'
    return 'bad'
  }

  return 'warn'
}