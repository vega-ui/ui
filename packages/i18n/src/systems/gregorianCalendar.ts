import { CalendarDateFields, CalendarSystem } from '../types'
import { padDatePart } from '../iso/padDatePart'

/**
 * The proleptic Gregorian calendar — the calendar of ISO `YYYY-MM-DD` days.
 *
 * Methods are bound to the instance, so they can be passed around as callbacks.
 * Extend the class to build a calendar on top of the Gregorian one; overridden
 * methods can call `super`.
 */
export class GregorianCalendar implements CalendarSystem {
  readonly identifier: string = 'gregory'

  constructor() {
    this.toFields = this.toFields.bind(this)
    this.fromFields = this.fromFields.bind(this)
    this.getMonthsInYear = this.getMonthsInYear.bind(this)
    this.getDaysInMonth = this.getDaysInMonth.bind(this)
  }

  toFields(date: string): CalendarDateFields {
    const [year, month, day] = date.split('-').map(Number)
    return { year, month, day }
  }

  fromFields({ year, month, day }: CalendarDateFields) {
    return `${padDatePart(year, 4)}-${padDatePart(month)}-${padDatePart(day)}`
  }

  getMonthsInYear() {
    return 12
  }

  getDaysInMonth({ year, month }: Pick<CalendarDateFields, 'era' | 'year' | 'month'>) {
    const date = new Date(Date.UTC(2000, 0, 1))
    date.setUTCFullYear(year, month, 0)

    return date.getUTCDate()
  }
}

/**
 * The shared Gregorian calendar instance, used when no calendar is given.
 */
export const gregorianCalendar = new GregorianCalendar()
