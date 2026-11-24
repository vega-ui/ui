import { isISOTime } from '@vega-ui/utils'

export type TimeFieldUnit = 'hour' | 'minute' | 'second'

export interface TimeWheelOptions {
  readonly min?: string
  readonly max?: string
  readonly step: number
  readonly seconds: boolean
}

export interface TimeWheelOption {
  readonly value: string
  readonly disabled: boolean
}

const UNITS: Record<TimeFieldUnit, { readonly count: number, readonly length: number }> = {
  hour: { count: 24, length: 3600 },
  minute: { count: 60, length: 60 },
  second: { count: 60, length: 1 },
}

const pad = (value: number) => String(value).padStart(2, '0')

const secondsOf = (time: string) => {
  const [hours = 0, minutes = 0, seconds = 0] = time.split(':').map(Number)
  return hours * 3600 + minutes * 60 + seconds
}

const timeAt = (seconds: number, withSeconds: boolean) => {
  const time = `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor(seconds / 60) % 60)}`
  if (!withSeconds) return time

  return `${time}:${pad(seconds % 60)}`
}

const boundsOf = ({ min, max }: TimeWheelOptions) => ({
  earliest: isISOTime(min) ? secondsOf(min) : 0,
  latest: isISOTime(max) ? secondsOf(max) : 24 * 3600 - 1,
})

const shownSeconds = (value: string, options: TimeWheelOptions) => {
  if (isISOTime(value)) return secondsOf(value)

  return boundsOf(options).earliest
}

const startOf = (unit: TimeFieldUnit, seconds: number) => seconds - (seconds % (UNITS[unit].length * UNITS[unit].count))

export const getTimeWheelValue = (unit: TimeFieldUnit, value: string, options: TimeWheelOptions) => {
  const { count, length } = UNITS[unit]

  return pad(Math.floor(shownSeconds(value, options) / length) % count)
}

export const getTimeWheelOptions = (unit: TimeFieldUnit, value: string, options: TimeWheelOptions): readonly TimeWheelOption[] => {
  const { count, length } = UNITS[unit]
  const shown = shownSeconds(value, options)
  const start = startOf(unit, shown)
  const current = Math.floor(shown / length) % count
  const step = unit === 'hour' ? 1 : Math.max(1, options.step)
  const { earliest, latest } = boundsOf(options)

  return Array.from({ length: count }, (_, position) => position)
    .filter((position) => position % step === 0 || position === current)
    .map((position) => {
      const from = start + position * length

      return { value: pad(position), disabled: from + length - 1 < earliest || from > latest }
    })
}

export const pickTimeWheel = (unit: TimeFieldUnit, picked: string, value: string, options: TimeWheelOptions) => {
  const { count, length } = UNITS[unit]
  const shown = shownSeconds(value, options)
  const current = Math.floor(shown / length) % count
  const { earliest, latest } = boundsOf(options)
  const next = Math.min(latest, Math.max(earliest, shown + (Number(picked) - current) * length))

  return timeAt(next, options.seconds)
}
