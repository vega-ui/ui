import { describe, expect, it, vi } from 'vitest'
import { act, browser, key, lifecycle } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { gregorianCalendar } from '@vega-ui/i18n'
import { FOCUS } from '../../grid'
import { SNAP_NEXT, SNAP_PREVIOUS } from '../../snap-scroller'
import { CalendarOptions, CLOSE_VIEW, createCalendar, DAYS, DAYS_SCROLLER, MONTHS, NEXT, PICK, PREVIOUS, TOGGLE_VIEW, YEARS, YEARS_SCROLLER } from '../widget'

const options = (overrides: Partial<CalendarOptions> = {}): CalendarOptions => ({
  calendar: gregorianCalendar,
  today: '2026-03-10',
  min: undefined,
  max: undefined,
  isDisabled: () => false,
  selected: [],
  autoFocus: undefined,
  disabled: false,
  yearsPerPage: 12,
  ...overrides,
})

describe('Critical User Paths', () => {
  it('shows the month of the focused day, otherwise of the selected day, otherwise of today', () => {
    const calendar = createCalendar()

    expect(calendar.monthOf(simulate(calendar, options()).state)).toBe('2026-03-01')
    expect(calendar.monthOf(simulate(calendar, options({ selected: ['2026-05-20'] })).state)).toBe('2026-05-01')
    expect(calendar.monthOf(simulate(calendar, options({ selected: ['2026-05-20'], defaultFocusedDate: '2026-07-04' })).state)).toBe('2026-07-01')
  })

  it('pages months in the day view and pages of years in the year view', () => {
    const calendar = createCalendar()
    const onChangeFocusedDate = vi.fn()
    const widget = simulate(calendar, options({ defaultFocusedDate: '2026-01-31', onChangeFocusedDate }))

    widget.send(NEXT)
    expect(widget.state.focusedDate).toBe('2026-02-28')
    expect(onChangeFocusedDate).toHaveBeenLastCalledWith('2026-02-28')

    widget.send(TOGGLE_VIEW, { value: 'year' })
    expect(widget.state.view).toBe('year')
    expect(calendar.focusedYearOf(widget.state)).toBe('2026-01-01')

    widget.send(NEXT).send(NEXT).send(PREVIOUS)
    expect(calendar.focusedYearOf(widget.state)).toBe('2038-01-01')
    expect(widget.state.focusedDate).toBe('2026-02-28')
  })

  it('pages years from the focused day when the calendar opens in the year view', () => {
    const calendar = createCalendar()
    const widget = simulate(calendar, options({ defaultFocusedDate: '2026-01-15', defaultView: 'year' }))

    widget.send(NEXT)

    expect(calendar.focusedYearOf(widget.state)).toBe('2038-01-01')
  })

  it('steps a month to the same day or the nearest available one, within min and max and across the years', () => {
    const stepped = (focused: string, step: typeof NEXT, overrides: Partial<CalendarOptions> = {}) =>
      simulate(createCalendar(), options({ defaultFocusedDate: focused, ...overrides })).send(step).state.focusedDate
    const disabling = (...dates: string[]) => ({ isDisabled: (date: string) => dates.includes(date) })

    expect(stepped('2026-01-15', NEXT, disabling('2026-02-15'))).toBe('2026-02-16')
    expect(stepped('2026-01-15', NEXT, disabling('2026-02-15', '2026-02-16'))).toBe('2026-02-14')
    expect(stepped('2026-01-31', NEXT, disabling('2026-02-28'))).toBe('2026-02-27')
    expect(stepped('2026-01-15', NEXT, { max: '2026-02-10' })).toBe('2026-02-10')
    expect(stepped('2026-01-15', PREVIOUS)).toBe('2025-12-15')
    expect(stepped('2026-12-15', NEXT)).toBe('2027-01-15')
  })

  it('focuses today moved inside min and max when no day is focused or selected', () => {
    const calendar = createCalendar()

    expect(calendar.focusedOf(simulate(calendar, options({ today: '2026-03-20', min: '2026-03-25' })).state)).toBe('2026-03-25')
    expect(calendar.focusedOf(simulate(calendar, options({ today: '2026-03-20', max: '2026-03-10' })).state)).toBe('2026-03-10')
  })

  it('picks a month and a year and returns to the days at the same day', () => {
    const onChangeView = vi.fn()
    const widget = simulate(createCalendar(), options({ defaultFocusedDate: '2026-03-15', onChangeView }))

    widget.send(TOGGLE_VIEW, { value: 'month' }).send(PICK, { value: '2026-05-01' })
    expect(widget.state.view).toBe('day')
    expect(widget.state.focusedDate).toBe('2026-05-15')

    widget.send(TOGGLE_VIEW, { value: 'year' }).send(PICK, { value: '2028-01-01' })
    expect(widget.state.view).toBe('day')
    expect(widget.state.focusedDate).toBe('2028-05-15')
    expect(onChangeView.mock.calls.map(([view]) => view)).toEqual(['month', 'day', 'year', 'day'])
  })

  it('closes the month and year views with Escape and leaves Escape alone in the day view', () => {
    const widget = simulate(createCalendar(), options())

    widget.send(key.escape)
    expect(widget.answer).toBe('pass')

    widget.send(TOGGLE_VIEW, { value: 'month' }).send(key.escape)
    expect(widget.state.view).toBe('day')
    expect(widget.answer).toBe('handled')
  })

  it('sends the focus to the focused day of the days when a view closes, also when its toggle is pressed again', () => {
    const widget = simulate(createCalendar(), options({ defaultFocusedDate: '2026-03-15' }))

    widget.send(TOGGLE_VIEW, { value: 'year' })
    expect(widget.actions).toEqual([])

    widget.send(PICK, { value: '2028-01-01' })
    expect(widget.actions).toEqual([act.send(DAYS, FOCUS, { key: '2028-03-15' }), act.awaitAnimations(YEARS)])

    widget.send(TOGGLE_VIEW, { value: 'month' }).send(key.escape)
    expect(widget.actions).toEqual([act.send(DAYS, FOCUS, { key: '2028-03-15' }), act.awaitAnimations(MONTHS)])

    widget.send(TOGGLE_VIEW, { value: 'month' }).send(TOGGLE_VIEW, { value: 'month' })
    expect(widget.state.view).toBe('day')
    expect(widget.actions).toEqual([act.send(DAYS, FOCUS, { key: '2028-03-15' }), act.awaitAnimations(MONTHS)])

    widget.send(CLOSE_VIEW)
    expect(widget.actions).toEqual([])
  })
})

describe('Edge Cases', () => {
  it('keeps a closed view mounted until its exit animations end, also when the parent closes it', () => {
    const calendar = createCalendar()
    const widget = simulate(calendar, options({ view: 'month' })).send(lifecycle.connect)
    expect(calendar.mountedOf(widget.state, 'month')).toBe(true)

    widget.setOptions(options({ view: 'year' }))
    expect(widget.actions).toEqual([act.awaitAnimations(MONTHS)])
    expect(calendar.mountedOf(widget.state, 'month')).toBe(true)
    expect(calendar.mountedOf(widget.state, 'year')).toBe(true)

    widget.send(browser.animationEnd, { part: MONTHS })
    expect(calendar.mountedOf(widget.state, 'month')).toBe(false)

    widget.setOptions(options({ view: 'day' })).setOptions(options({ view: 'year' }))
    widget.send(browser.animationEnd, { part: YEARS })
    expect(calendar.mountedOf(widget.state, 'year')).toBe(true)
  })

  it('scrolls the scroller of the shown view along with the page, when there is one', () => {
    const widget = simulate(createCalendar(), options())

    widget.send(PREVIOUS)
    expect(widget.actions).toEqual([])

    widget.observe({ daysScrolled: true }).send(PREVIOUS)
    expect(widget.actions).toEqual([act.send(DAYS_SCROLLER, SNAP_PREVIOUS)])

    widget.send(TOGGLE_VIEW, { value: 'year' }).observe({ yearsScrolled: true }).send(NEXT)
    expect(widget.actions).toEqual([act.send(YEARS_SCROLLER, SNAP_NEXT)])
  })

  it('hides the step buttons in the months, past min and max, and disables them with the calendar', () => {
    const calendar = createCalendar()
    const render = (state: typeof widget.state, step: 'previous' | 'next') => calendar.output[step].render(calendar.output[step].select(state, undefined as never))
    const widget = simulate(calendar, options({ min: '2026-03-01', max: '2026-04-01' }))

    expect(render(widget.state, 'previous')).toEqual({ disabled: true, 'data-visible': false })
    expect(render(widget.state, 'next')).toEqual({ disabled: false, 'data-visible': true })

    widget.send(NEXT)
    expect(render(widget.state, 'previous')).toEqual({ disabled: false, 'data-visible': true })
    expect(render(widget.state, 'next')).toEqual({ disabled: true, 'data-visible': false })

    widget.send(TOGGLE_VIEW, { value: 'month' })
    expect(render(widget.state, 'previous')).toEqual({ disabled: true, 'data-visible': false })

    widget.send(TOGGLE_VIEW, { value: 'year' })
    expect(render(widget.state, 'next')).toEqual({ disabled: false, 'data-visible': true })

    widget.setOptions(options({ min: '2026-03-01', max: '2026-04-01', disabled: true }))
    expect(render(widget.state, 'next')).toEqual({ disabled: true, 'data-visible': true })
  })

  it('clamps the picked day to min and max', () => {
    const widget = simulate(createCalendar(), options({ defaultFocusedDate: '2026-03-15', max: '2026-04-10' }))

    widget.send(TOGGLE_VIEW, { value: 'month' }).send(PICK, { value: '2026-04-01' })

    expect(widget.state.focusedDate).toBe('2026-04-10')
  })

  it('requests the focus of the view that opens and of the days when it closes', () => {
    const calendar = createCalendar()

    expect(calendar.requestedOf(simulate(calendar, options({ defaultView: 'month' })).state)).toBe('day')
    expect(calendar.requestedOf(simulate(calendar, options({ defaultView: 'month', autoFocus: true })).state)).toBe('month')

    const widget = simulate(calendar, options())
    widget.send(TOGGLE_VIEW, { value: 'year' })
    expect(calendar.requestedOf(widget.state)).toBe('year')

    widget.send(CLOSE_VIEW)
    expect(calendar.requestedOf(widget.state)).toBe('day')
    expect(widget.state.view).toBe('day')
  })
})

describe('Accessibility', () => {
  it('presses the button of the shown view and releases it when the days come back', () => {
    const calendar = createCalendar()
    const pressed = (state: typeof widget.state) => [calendar.output.monthView, calendar.output.yearView].map((part) => part.render(part.select(state, undefined as never))['aria-pressed'])
    const widget = simulate(calendar, options())

    expect(pressed(widget.state)).toEqual([false, false])

    widget.send(TOGGLE_VIEW, { value: 'month' })
    expect(pressed(widget.state)).toEqual([true, false])

    widget.send(TOGGLE_VIEW, { value: 'year' })
    expect(pressed(widget.state)).toEqual([false, true])

    widget.send(CLOSE_VIEW)
    expect(pressed(widget.state)).toEqual([false, false])
  })
})
