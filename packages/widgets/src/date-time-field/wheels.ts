import { getISODatePart, getISOTimePart } from '@vega-ui/utils'
import { getTimeWheelOptions, getTimeWheelValue, pickTimeWheel, TimeFieldUnit, TimeWheelOption } from '../time-field'

export interface DateTimeWheelOptions {
  readonly min?: string
  readonly max?: string
  readonly today: string
  readonly step: number
  readonly seconds: boolean
}

const dateOf = (value: string, { min, max, today }: DateTimeWheelOptions) => {
  const date = getISODatePart(value)
  if (date) return date

  const earliest = getISODatePart(min)
  if (earliest && today < earliest) return earliest

  const latest = getISODatePart(max)
  if (latest && today > latest) return latest

  return today
}

const boundOn = (date: string, bound?: string) => (getISODatePart(bound) === date ? getISOTimePart(bound) : undefined)

const wheelOf = (value: string, options: DateTimeWheelOptions) => {
  const date = dateOf(value, options)
  const time = getISOTimePart(value) ?? ''
  const wheel = { min: boundOn(date, options.min), max: boundOn(date, options.max), step: options.step, seconds: options.seconds }

  return { date, time, wheel }
}

export const getDateTimeWheelValue = (unit: TimeFieldUnit, value: string, options: DateTimeWheelOptions) => {
  const { time, wheel } = wheelOf(value, options)

  return getTimeWheelValue(unit, time, wheel)
}

export const getDateTimeWheelOptions = (unit: TimeFieldUnit, value: string, options: DateTimeWheelOptions): readonly TimeWheelOption[] => {
  const { time, wheel } = wheelOf(value, options)

  return getTimeWheelOptions(unit, time, wheel)
}

export const pickDateTimeWheel = (unit: TimeFieldUnit, picked: string, value: string, options: DateTimeWheelOptions) => {
  const { date, time, wheel } = wheelOf(value, options)

  return `${date}T${pickTimeWheel(unit, picked, time, wheel)}`
}
