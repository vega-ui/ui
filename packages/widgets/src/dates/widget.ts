import { act, Collection, command, controlled, defineWidget, Field, GridIntent, handled, internal, keep, key, lifecycle, listening, matching, mod, nav, state, Step } from '@vega-ui/core'
import { CalendarSystem, gregorianCalendar } from '@vega-ui/i18n'
import { compare as compareStrings, createKeyMatcher } from '@vega-ui/utils'
import { createGridLayouts, createGridLogic, GridBaseOptions, gridInternal, GridKeys, gridOptions, GridValue, keysOf } from '../grid'
import { DateAvailability, isDateAvailable } from './isDateAvailable'

export type PeriodValue = GridValue<string>

export type PeriodIntent = GridIntent | 'yearUp' | 'yearDown'

export interface PeriodContext extends DateAvailability {
  readonly calendar: CalendarSystem
  readonly weekStartsOn: number
}

export interface PeriodRules {
  tabStop(focused: string, candidates: readonly (string | undefined)[], context: PeriodContext): string | undefined
  navigate?(intent: PeriodIntent, from: string, context: PeriodContext): string | undefined
  show?(date: string, active: string | undefined, context: PeriodContext): string | undefined
  resolve?(date: string, context: PeriodContext): string | undefined
  page?(from: string, offset: number, context: PeriodContext): string | undefined
  pageEdge?(from: string, origin: string, period: number, edge: 'start' | 'end', context: PeriodContext): string | undefined
}

export const SHOW = command('show')
export const FOCUS_DATE = command('focusDate')

export const PAGES = 'pages'

const SHIFT_PAGE_UP = key.with(nav.pageBackward, mod.shift)
const SHIFT_PAGE_DOWN = key.with(nav.pageForward, mod.shift)

const isDate = (date: unknown): date is string => typeof date === 'string' && date !== ''

const available = (date: string, context: PeriodContext) => (isDateAvailable(date, context) ? date : undefined)

interface PeriodOptionsBase extends GridBaseOptions<string> {
  readonly calendar: CalendarSystem
  readonly weekStartsOn: number
  readonly today: string | undefined
  readonly autoFocus: boolean | undefined
  readonly period?: number
}

const periodOptions = (): PeriodOptionsBase => ({ ...gridOptions<string>(), calendar: gregorianCalendar, weekStartsOn: 0, today: undefined, autoFocus: undefined, period: undefined })

const createPeriodShape = (collectionOf: (options: PeriodOptionsBase) => Collection<string>) => state({
  options: periodOptions(),
  owns: {
    value: controlled(null as PeriodValue),
    focusedDate: controlled(undefined as string | undefined),
  },
  follows: ['today'],
  internal: { ...gridInternal<string>(), origin: internal(undefined as string | undefined) },
  observes: { paged: matching(PAGES, '*') },
  collection: collectionOf,
  parts: [PAGES],
})

export type PeriodShape = ReturnType<typeof createPeriodShape>

export type PeriodSnapshot = PeriodShape['__snapshot']

export type PeriodOptions = PeriodSnapshot['options']

interface ContextInputs {
  readonly calendar: CalendarSystem
  readonly weekStartsOn: number
  readonly min: string | undefined
  readonly max: string | undefined
  readonly disabled: GridKeys<string> | undefined
}

const sameContext = (first: ContextInputs, second: ContextInputs) =>
  first.calendar === second.calendar && first.weekStartsOn === second.weekStartsOn && first.min === second.min && first.max === second.max && first.disabled === second.disabled

export const createPeriodPicker = (rules: PeriodRules) => {
  const layouts = createGridLayouts<string>()

  let contextFor: { inputs: ContextInputs; context: PeriodContext } | undefined

  const contextOf = (inputs: ContextInputs): PeriodContext => {
    if (contextFor && sameContext(contextFor.inputs, inputs)) return contextFor.context

    const { calendar, weekStartsOn, min, max, disabled } = inputs
    contextFor = { inputs, context: { calendar, weekStartsOn, from: min, to: max, isDisabled: createKeyMatcher(disabled) } }

    return contextFor.context
  }

  let excludedFor: { exclude: GridKeys<string> | undefined; context: PeriodContext; matches: (date: string) => boolean } | undefined

  const excludedOf = (exclude: GridKeys<string> | undefined, context: PeriodContext) => {
    if (excludedFor && excludedFor.exclude === exclude && excludedFor.context === context) return excludedFor.matches

    const byUser = createKeyMatcher(exclude)
    excludedFor = { exclude, context, matches: (date) => byUser(date) || !isDateAvailable(date, context) }

    return excludedFor.matches
  }

  const shape = createPeriodShape((options) => {
    const context = contextOf(options)
    const exclude = excludedOf(options.exclude, context)

    return layouts.layoutFor({ entries: options.entries, cells: options.cells, exclude, compare: options.compare ?? compareStrings }).layout.collection
  })

  type State = PeriodSnapshot

  const context = (state: State) => contextOf(state.options)

  const selectedOf = (state: State) => keysOf(state.value).filter(isDate)

  const focusedOf = (state: State) => state.focusedDate ?? selectedOf(state)[0] ?? state.options.today

  const originOf = (state: State) => state.origin ?? focusedOf(state)

  const originated = (state: State) => (state.origin === undefined ? shape.origin.set(state, focusedOf(state)) : state)

  const actives = new WeakMap<object, string | undefined>()

  const activeOf = (state: State) => {
    if (actives.has(state)) return actives.get(state)

    const focused = focusedOf(state)
    const found = focused === undefined ? undefined : rules.tabStop(focused, [...selectedOf(state), state.options.today], context(state))
    actives.set(state, found)

    return found
  }

  const active: Field<State, string | undefined> = {
    name: 'active',
    get: activeOf,
    set: (state, date) => (date === undefined ? state : shape.focusedDate.set(state, date)),
  }

  const pageEdgeOf = (state: State, intent: PeriodIntent, from: string) => {
    const { period } = state.options
    if (intent !== 'gridStart' && intent !== 'gridEnd') return undefined
    if (!state.paged || !rules.pageEdge || period === undefined) return undefined

    const origin = originOf(state)
    if (origin === undefined) return undefined

    return rules.pageEdge(from, origin, period, intent === 'gridStart' ? 'start' : 'end', context(state))
  }

  const logic = createGridLogic<State, string>({
    active,
    value: shape.value,
    anchor: shape.anchor,
    extension: shape.extension,
    gesture: shape.gesture,
    layouts,
    next: (state, intent, from, found) => {
      const target = pageEdgeOf(state, intent, from) ?? (rules.navigate ? rules.navigate(intent, from, context(state)) : found)
      return state.options.getNextKey ? state.options.getNextKey(intent, from, target) : target
    },
  })

  const show = rules.show ?? ((date, _active, current) => available(date, current))
  const resolve = rules.resolve ?? available

  const focusing = (state: State, target: string | undefined) => (target === undefined ? handled(state) : handled(logic.activate(state, target), [act.focus(target)]))

  const commands: Step<State> = (state, input) => {
    if (input.is(SHOW) && input.key !== undefined) {
      const target = show(input.key, activeOf(state), context(state))
      return keep(target === undefined ? logic.activateWithin(state, input.keys ?? []) : logic.activate(state, target))
    }

    if (input.is(FOCUS_DATE) && input.key !== undefined) return focusing(state, resolve(input.key, context(state)))

    if (input.is(lifecycle.connect)) {
      const target = state.options.autoFocus ? logic.tabStop(state) : undefined
      return keep(originated(state), target === undefined ? [] : [act.focus(target)])
    }

    if (input.is(lifecycle.options)) return keep(originated(state))

    return undefined
  }

  const moveFrom = (state: State, target: (from: string) => string | undefined) => {
    const from = activeOf(state)
    if (from === undefined) return handled(state)

    const to = target(from)
    return focusing(state, to === from ? undefined : to)
  }

  const paging = listening<State>([SHIFT_PAGE_UP, SHIFT_PAGE_DOWN, nav.pageBackward, nav.pageForward], (state, input) => {
    const up = input.is(SHIFT_PAGE_UP)
    if ((up || input.is(SHIFT_PAGE_DOWN)) && rules.navigate) {
      const navigate = rules.navigate
      return moveFrom(state, (from) => navigate(up ? 'yearUp' : 'yearDown', from, context(state)))
    }

    const { period } = state.options
    const backward = input.is(nav.pageBackward)
    if ((!backward && !input.is(nav.pageForward)) || !state.paged || !rules.page || period === undefined) return undefined

    const page = rules.page
    return moveFrom(state, (from) => page(from, backward ? -period : period, context(state)))
  })

  const { steps, invariants, ...view } = logic

  return {
    ...defineWidget({ state: shape, step: [commands, paging, ...steps], output: logic.output, invariants }),
    ...view,
    activeOf,
    focusedOf,
    originOf,
  }
}

export type PeriodPicker = ReturnType<typeof createPeriodPicker>
