import { CalendarDateFields, GregorianCalendar } from '..'

export class BuddhistCalendar extends GregorianCalendar {
  readonly identifier = 'buddhist'

  toFields(date: string): CalendarDateFields {
    const fields = super.toFields(date)
    return { ...fields, year: fields.year + 543 }
  }

  fromFields(fields: CalendarDateFields) {
    return super.fromFields({ ...fields, year: fields.year - 543 })
  }

  getDaysInMonth(fields: Pick<CalendarDateFields, 'era' | 'year' | 'month'>) {
    return super.getDaysInMonth({ ...fields, year: fields.year - 543 })
  }
}
