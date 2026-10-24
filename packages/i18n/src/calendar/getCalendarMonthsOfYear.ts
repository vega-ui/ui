import { CalendarSystem } from '../types'

/**
 * First days of all months of the calendar year containing the given ISO day.
 * In a year where an era starts or ends (Japanese 2019: Heisei 31 and Reiwa 1)
 * each era year has only its own months.
 */
export const getCalendarMonthsOfYear = (calendar: CalendarSystem, date: string) => {
  const fields = calendar.toFields(date)

  const months = Array.from({ length: calendar.getMonthsInYear(fields) }, (_, index) =>
    calendar.fromFields({ ...fields, month: index + 1, day: 1 })
  )

  return Array.from(new Set(months))
}
