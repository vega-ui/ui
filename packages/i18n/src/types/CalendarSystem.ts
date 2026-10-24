/**
 * Fields of a date in a particular calendar system.
 * `month` and `day` are 1-based within that calendar.
 */
export interface CalendarDateFields {
  era?: string
  year: number
  month: number
  day: number
}

/**
 * Adapter describing a calendar system.
 *
 * Components exchange dates as ISO `YYYY-MM-DD` strings (a calendar-neutral
 * day) and ask the adapter only about the calendar's structure; names of
 * months, years and eras come from `Intl.DateTimeFormat` with `identifier`.
 */
export interface CalendarSystem {
  /**
   * Calendar identifier understood by `Intl.DateTimeFormat`, e.g. `gregory`, `persian`, `hebrew`.
   */
  identifier: string

  /**
   * Converts an ISO `YYYY-MM-DD` day into this calendar's fields.
   */
  toFields(date: string): CalendarDateFields

  /**
   * Converts existing fields of this calendar into an ISO `YYYY-MM-DD` day.
   */
  fromFields(fields: CalendarDateFields): string

  /**
   * Number of months in the given year.
   */
  getMonthsInYear(fields: Pick<CalendarDateFields, 'era' | 'year'>): number

  /**
   * Number of days in the given month.
   */
  getDaysInMonth(fields: Pick<CalendarDateFields, 'era' | 'year' | 'month'>): number
}
