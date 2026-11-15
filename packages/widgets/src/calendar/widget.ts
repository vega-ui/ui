import { act, Action, browser, command, controlled, defineWidget, handled, internal, keep, key, lifecycle, listening, matching, Result, state, Step } from '@vega-ui/core'
import {
  addCalendarMonths,
  addCalendarYears,
  CalendarSystem,
  getCalendarMonthStart,
  getCalendarYearStart,
  getSameDayInCalendarMonth,
  getSameMonthInCalendarYear,
  gregorianCalendar,
} from '@vega-ui/i18n'
import { clampDate, DateAvailability, getAvailableDate } from '../dates'
import { FOCUS as FOCUS_GRID } from '../grid'
import { SNAP_NEXT, SNAP_PREVIOUS } from '../snap-scroller'
import { CalendarView } from './types'

export const PREVIOUS = command('previous')
export const NEXT = command('next')
export const TOGGLE_VIEW = command('toggleView')
export const CLOSE_VIEW = command('closeView')
export const PICK = command('pick')
export const FOCUS_DATE = command('focusDate')
export const FOCUS_YEAR = command('focusYear')

export const DAYS = 'days'
export const MONTHS = 'months'
export const YEARS = 'years'
export const DAYS_SCROLLER = 'daysScroller'
export const YEARS_SCROLLER = 'yearsScroller'

type OpenableView = Exclude<CalendarView, 'day'>

const VIEW_PARTS: Record<OpenableView, typeof MONTHS | typeof YEARS> = { month: MONTHS, year: YEARS }

const NEVER_DISABLED = () => false

const createCalendarShape = () => state({
  options: {
    calendar: gregorianCalendar as CalendarSystem,
    today: undefined as string | undefined,
    min: undefined as string | undefined,
    max: undefined as string | undefined,
    isDisabled: NEVER_DISABLED as (date: string) => boolean,
    selected: [] as readonly string[],
    autoFocus: undefined as boolean | undefined,
    disabled: false,
    yearsPerPage: 12,
  },
  owns: {
    view: controlled('day' as CalendarView),
    focusedDate: controlled(undefined as string | undefined),
  },
  internal: {
    focusedYear: internal(undefined as string | undefined),
    requested: internal(undefined as CalendarView | undefined),
    shownView: internal('day' as CalendarView),
    leaving: internal([] as readonly OpenableView[]),
  },
  observes: { daysScrolled: matching(DAYS_SCROLLER, '*'), yearsScrolled: matching(YEARS_SCROLLER, '*') },
  parts: [DAYS, MONTHS, YEARS, DAYS_SCROLLER, YEARS_SCROLLER],
})

export type CalendarShape = ReturnType<typeof createCalendarShape>

export type CalendarSnapshot = CalendarShape['__snapshot']

export type CalendarOptions = CalendarSnapshot['options']

const isOpenable = (view: unknown): view is OpenableView => view === 'month' || view === 'year'

export const createCalendar = () => {
  const shape = createCalendarShape()

  type State = CalendarSnapshot

  let availabilityFor: { min: string | undefined; max: string | undefined; isDisabled: (date: string) => boolean; availability: DateAvailability } | undefined

  const availabilityOf = (state: State): DateAvailability => {
    const { min, max, isDisabled } = state.options
    if (!availabilityFor || availabilityFor.min !== min || availabilityFor.max !== max || availabilityFor.isDisabled !== isDisabled) {
      availabilityFor = { min, max, isDisabled, availability: { from: min, to: max, isDisabled } }
    }

    return availabilityFor.availability
  }

  const focusedOf = (state: State) => {
    if (state.focusedDate !== undefined) return state.focusedDate

    const [selected] = state.options.selected
    if (selected !== undefined) return selected

    const { today, min, max } = state.options
    return today === undefined ? undefined : clampDate(today, min, max)
  }

  const focusDays = (state: State) => [act.send(DAYS, FOCUS_GRID, { key: focusedOf(state) })]

  const monthOf = (state: State) => {
    const focused = focusedOf(state)
    return focused === undefined ? undefined : getCalendarMonthStart(state.options.calendar, focused)
  }

  const requestedOf = (state: State): CalendarView => state.requested ?? (state.options.autoFocus ? state.view : 'day')

  const close = (state: State) => shape.requested.set(shape.view.set(state, 'day'), 'day')


  const showDay = (state: State, date: string) => close(shape.focusedDate.set(state, getAvailableDate(state.options.calendar, date, availabilityOf(state)) ?? date))

  const stepMonth = (state: State, step: number) => {
    const focused = focusedOf(state)
    if (focused === undefined) return state

    const { calendar } = state.options
    const month = addCalendarMonths(calendar, getCalendarMonthStart(calendar, focused), step)
    const day = getAvailableDate(calendar, getSameDayInCalendarMonth(calendar, focused, month), availabilityOf(state))

    return shape.focusedDate.set(state, day ?? month)
  }

  const focusedYearOf = (state: State) => {
    if (state.focusedYear !== undefined) return state.focusedYear

    const focused = focusedOf(state)
    return focused === undefined ? undefined : getCalendarYearStart(state.options.calendar, focused)
  }

  const stepYears = (state: State, step: number) => {
    const focusedYear = focusedYearOf(state)
    if (focusedYear === undefined) return state

    const { calendar, min, max, yearsPerPage } = state.options
    const target = clampDate(addCalendarYears(calendar, focusedYear, step * yearsPerPage), min, max)

    return shape.focusedYear.set(state, getCalendarYearStart(calendar, target))
  }

  const open = (state: State, view: Exclude<CalendarView, 'day'>) => {
    const opened = shape.requested.set(shape.view.set(state, view), view)
    const focused = focusedOf(state)
    if (view !== 'year' || focused === undefined) return opened

    return shape.focusedYear.set(opened, getCalendarYearStart(state.options.calendar, focused))
  }

  const pickMonth = (state: State, month: string) => {
    const focused = focusedOf(state)
    return showDay(state, focused === undefined ? month : getSameDayInCalendarMonth(state.options.calendar, focused, month))
  }

  const pickYear = (state: State, year: string) => {
    const { calendar, min, max } = state.options
    const focused = focusedOf(state)
    if (focused === undefined) return showDay(state, clampDate(getSameMonthInCalendarYear(calendar, year, year), min, max))

    const month = getSameMonthInCalendarYear(calendar, getCalendarMonthStart(calendar, focused), year)
    return showDay(state, clampDate(getSameDayInCalendarMonth(calendar, focused, month), min, max))
  }

  const scroll = (scrolled: boolean, part: typeof DAYS_SCROLLER | typeof YEARS_SCROLLER, step: number): Action<never, typeof part>[] => {
    if (!scrolled) return []

    return [act.send(part, step < 0 ? SNAP_PREVIOUS : SNAP_NEXT)]
  }

  const paging: Step<State> = (state, input) => {
    if (!input.is(PREVIOUS) && !input.is(NEXT)) return undefined

    const step = input.is(PREVIOUS) ? -1 : 1
    if (state.view === 'day') return keep(stepMonth(state, step), scroll(state.daysScrolled, DAYS_SCROLLER, step))
    if (state.view === 'year') return keep(stepYears(state, step), scroll(state.yearsScrolled, YEARS_SCROLLER, step))

    return keep(state)
  }

  const switching = (result: Result<State> | undefined): Result<State> | undefined => {
    if (!result) return result

    const { state } = result
    const previous = state.shownView
    if (previous === state.view) return result

    const kept = state.leaving.filter((view) => view !== state.view && view !== previous)
    const switched = shape.shownView.set(state, state.view)
    if (!isOpenable(previous)) return { ...result, state: shape.leaving.set(switched, kept) }

    return { ...result, state: shape.leaving.set(switched, [...kept, previous]), actions: [...result.actions, act.awaitAnimations(VIEW_PARTS[previous])] }
  }

  const following: Step<State> = (state, input) => {
    if (input.is(lifecycle.connect)) return keep(shape.shownView.set(state, state.view))
    if (input.is(lifecycle.options)) return switching(keep(state))

    return undefined
  }

  const settling: Step<State> = (state, input) => {
    if (!input.is(browser.animationEnd)) return undefined

    if (input.part !== MONTHS && input.part !== YEARS) return undefined

    const view = input.part === MONTHS ? 'month' : 'year'

    return keep(shape.leaving.set(state, state.leaving.filter((leaving) => leaving !== view)))
  }

  const views = listening<State>([key.escape], (state, input) => switching(viewing(state, input)))

  const viewing: Step<State> = (state, input) => {
    if (input.is(key.escape)) return state.view === 'day' ? undefined : handled(close(state), focusDays(state))
    if (input.is(CLOSE_VIEW)) return keep(close(state), state.view === 'day' ? [] : focusDays(state))

    if (input.is(TOGGLE_VIEW) && isOpenable(input.value)) {
      if (state.view === input.value) return keep(close(state), focusDays(state))
      return keep(open(state, input.value))
    }

    if (input.is(PICK) && input.value !== undefined) {
      if (state.view === 'day') return keep(state)

      const picked = state.view === 'month' ? pickMonth(state, input.value) : pickYear(state, input.value)
      return keep(picked, focusDays(picked))
    }

    if (input.is(FOCUS_DATE) && input.value !== undefined) return keep(shape.focusedDate.set(state, input.value))
    if (input.is(FOCUS_YEAR) && input.value !== undefined) return keep(shape.focusedYear.set(state, input.value))

    return undefined
  }

  const mountedOf = (state: State, view: OpenableView) => state.view === view || state.leaving.includes(view)

  const pagesTo = (state: State, step: -1 | 1) => {
    if (state.view === 'month') return false
    if (state.view === 'year') return true

    const month = monthOf(state)
    if (month === undefined) return false

    const { calendar, min, max } = state.options
    if (step < 0) return min === undefined || min < month

    return max === undefined || addCalendarMonths(calendar, month, 1) <= max
  }

  const stepPart = (step: -1 | 1) => shape.part(
    (state) => [pagesTo(state, step), state.options.disabled] as const,
    ([visible, disabled]) => ({ disabled: disabled || !visible, 'data-visible': visible }),
  )

  const viewPart = (view: OpenableView) => shape.part((state) => [state.view === view] as const, ([pressed]) => ({ 'aria-pressed': pressed }))

  const widget = defineWidget({
    state: shape,
    step: [following, settling, paging, views],
    output: { previous: stepPart(-1), next: stepPart(1), monthView: viewPart('month'), yearView: viewPart('year') },
  })

  return { ...widget, focusedOf, focusedYearOf, monthOf, requestedOf, mountedOf }
}

export type CalendarWidget = ReturnType<typeof createCalendar>
