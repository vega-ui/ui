import { CalendarDateFields, CalendarSystem } from '../types'
import { addISODays } from '../iso/addISODays'
import { isoDateToUTC } from '../iso/isoDateToUTC'
import { utcToISODate } from '../iso/utcToISODate'

/**
 * Days in the shortest year of any `Intl` calendar (a deficient Hebrew year),
 * so a jump of this many days per year never overshoots the target year.
 */
const SHORTEST_YEAR_DAYS = 353

/**
 * More days than the longest year of any `Intl` calendar, so a probe this far
 * away always lands in a neighbouring year.
 */
const BEYOND_YEAR_DAYS = 400

/**
 * Days in the shortest month, the safe jump towards the end of a month.
 */
const SHORTEST_MONTH_DAYS = 28

/**
 * Upper bound of years visited while looking for a year, so a lookup that
 * cannot converge throws instead of hanging.
 */
const MAX_YEAR_STEPS = 4096

/**
 * Upper bound of eras walked back from the current one while looking for an
 * era (the Japanese calendar of ICU has about 240).
 */
const MAX_ERA_STEPS = 512

interface IntlMonthInfo {
  month: number
  start: string
  firstDay: number
  lastDay: number
}

interface IntlYearInfo {
  era?: string
  year: number
  start: string
  end: string
  months: IntlMonthInfo[]
}

interface IntlDayParts {
  era?: string
  year: number
  month: string
  day: number
}

/**
 * Creates a calendar system from the calendars built into `Intl`, with no
 * dependencies: `createCalendarSystem('persian')`, `'hebrew'`, `'japanese'`,
 * `'buddhist'`, `'islamic-umalqura'`, `'chinese'`… Any identifier supported by
 * `Intl.DateTimeFormat` works; an unsupported one throws a `RangeError`.
 *
 * Months are numbered from the start of the year. Eras are the short English
 * era names of `Intl` (`'Reiwa'`, `'Heisei'`); without an era the current one
 * is used, and an unknown era throws a `RangeError`. Fields outside an era are
 * clamped to it: a year past the end of an era is its last year, and a month
 * outside an era year (a Japanese year that ends in April) is clamped to that
 * year. Like `<input type="date">`, only ISO days of years 0001–9999 are
 * supported; fields outside them throw a `RangeError`. Create each calendar
 * once and reuse it: results are cached per instance and never evicted.
 */
export const createCalendarSystem = (identifier: string): CalendarSystem => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    calendar: identifier,
    era: 'short',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: 'UTC',
  })

  if (formatter.resolvedOptions().calendar !== identifier) {
    throw new RangeError(`Unsupported calendar: ${identifier}`)
  }

  const days = new Map<string, IntlDayParts>()
  const years = new Map<string, IntlYearInfo>()
  const anchors = new Map<string | undefined, string>()
  const directions = new Map<string | undefined, number>()

  const getYearKey = (era: string | undefined, year: number) => `${era ?? ''}:${year}`

  const readDay = (date: string): IntlDayParts => {
    const cached = days.get(date)
    if (cached) return cached

    const parts = formatter.formatToParts(isoDateToUTC(date))
    const getPart = (type: string) => parts.find((part) => part.type === type)?.value

    const day: IntlDayParts = {
      era: getPart('era'),
      year: Number(getPart('year') ?? getPart('relatedYear')),
      month: getPart('month') ?? '',
      day: Number(getPart('day')),
    }

    days.set(date, day)
    anchors.set(day.era, date)

    return day
  }

  const isSameYear = (date: string, { era, year }: IntlDayParts) => {
    const day = readDay(date)
    return day.era === era && day.year === year
  }

  const isSameMonth = (date: string, other: IntlDayParts) => {
    if (!isSameYear(date, other)) return false
    return readDay(date).month === other.month
  }

  const getMonthStart = (date: string) => {
    const day = readDay(date)
    let start = addISODays(date, 1 - day.day)

    while (!isSameMonth(start, day)) {
      start = addISODays(start, 1)
    }

    return start
  }

  const getMonthEnd = (date: string) => {
    const day = readDay(date)
    const jump = addISODays(date, Math.max(0, SHORTEST_MONTH_DAYS - day.day))
    let end = isSameMonth(jump, day) ? jump : date

    while (isSameMonth(addISODays(end, 1), day)) {
      end = addISODays(end, 1)
    }

    return end
  }

  const getYear = (date: string): IntlYearInfo => {
    const day = readDay(date)
    const key = getYearKey(day.era, day.year)

    const cached = years.get(key)
    if (cached) return cached

    let start = getMonthStart(date)
    while (isSameYear(addISODays(start, -1), day)) {
      start = getMonthStart(addISODays(start, -1))
    }

    const ends: string[] = []
    let monthStart = start

    while (isSameYear(monthStart, day)) {
      const end = getMonthEnd(monthStart)
      ends.push(end)
      monthStart = addISODays(end, 1)
    }

    const numbered = ends.every((end) => /^\d+$/.test(readDay(end).month))

    const months = ends.map((end, index) => ({
      month: numbered ? Number(readDay(end).month) : index + 1,
      start: getMonthStart(end),
      firstDay: readDay(getMonthStart(end)).day,
      lastDay: readDay(end).day,
    }))

    const year = {
      era: day.era,
      year: day.year,
      start,
      end: addISODays(monthStart, -1),
      months,
    }
    years.set(key, year)

    return year
  }

  const getCurrentEra = () => readDay(utcToISODate(new Date())).era

  const findEraAnchor = (era: string | undefined) => {
    let date = anchors.get(getCurrentEra())

    for (let step = 0; step < MAX_ERA_STEPS && date !== undefined; step++) {
      if (readDay(date).era === era) return date

      const first = findYear(readDay(date).era, 1, date)
      date = addISODays(first.start, -1)
    }

    throw new RangeError(`Unknown era of the ${identifier} calendar: ${era}`)
  }

  const readYearDirection = (date: string) => {
    const { era, year } = readDay(date)
    const next = readDay(addISODays(date, BEYOND_YEAR_DAYS))
    const previous = readDay(addISODays(date, -BEYOND_YEAR_DAYS))

    if (next.era === era) return next.year < year ? -1 : 1
    if (previous.era === era) return previous.year > year ? -1 : 1

    return 1
  }

  const getYearDirection = (date: string) => {
    const { era } = readDay(date)

    const cached = directions.get(era)
    if (cached) return cached

    const direction = readYearDirection(date)
    directions.set(era, direction)

    return direction
  }

  const getNeighbourYear = (year: IntlYearInfo, distance: number) => {
    if (distance > 0) return getYear(addISODays(year.end, 1))
    return getYear(addISODays(year.start, -1))
  }

  const jumpTowardsYear = (year: IntlYearInfo, distance: number) => {
    if (distance > 0) return getYear(addISODays(year.end, 1 + (distance - 1) * SHORTEST_YEAR_DAYS))
    return getYear(addISODays(year.start, -1 + (distance + 1) * SHORTEST_YEAR_DAYS))
  }

  const findYear = (era: string | undefined, year: number, anchor: string): IntlYearInfo => {
    const direction = getYearDirection(anchor)
    let current = getYear(anchor)

    for (let step = 0; step < MAX_YEAR_STEPS; step++) {
      const distance = (year - current.year) * direction
      if (distance === 0) return current

      const jump = jumpTowardsYear(current, distance)
      if (jump.era === era) {
        current = jump
        continue
      }

      const neighbour = getNeighbourYear(current, distance)
      if (neighbour.era !== era) return current

      current = neighbour
    }

    throw new RangeError(`Year ${year} of the ${identifier} calendar was not found`)
  }

  const getFieldsYear = ({ era, year }: Pick<CalendarDateFields, 'era' | 'year'>) => {
    const targetEra = era ?? getCurrentEra()
    const anchor = anchors.get(targetEra) ?? findEraAnchor(targetEra)

    return findYear(targetEra, year, anchor)
  }

  const getFieldsMonth = (fields: Pick<CalendarDateFields, 'era' | 'year' | 'month'>) => {
    const { months } = getFieldsYear(fields)
    const first = months[0]
    const last = months[months.length - 1]

    if (fields.month <= first.month) return first
    if (fields.month >= last.month) return last

    return months.find(({ month }) => month === fields.month) ?? first
  }

  return {
    identifier,
    toFields(date) {
      const { era, year } = readDay(date)
      const month = getYear(date).months.filter(({ start }) => start <= date).pop()

      return { era, year, month: month?.month ?? 1, day: readDay(date).day }
    },
    fromFields(fields) {
      const year = getFieldsYear(fields)
      const first = year.months[0]
      const last = year.months[year.months.length - 1]

      if (fields.month < first.month) return year.start
      if (fields.month > last.month) return year.end

      const month = getFieldsMonth(fields)
      const day = Math.min(Math.max(fields.day, month.firstDay), month.lastDay)

      return addISODays(month.start, day - month.firstDay)
    },
    getMonthsInYear(fields) {
      const { months } = getFieldsYear(fields)
      return months[months.length - 1].month
    },
    getDaysInMonth(fields) {
      return getFieldsMonth(fields).lastDay
    },
  }
}
