import { act, collection, controlled, defineWidget, Entry, internal, keep, listening, measure, pointer, roving, source, state, Step } from '@vega-ui/core'

export interface PageControlItemData {
  readonly disabled: boolean
}

export type PageControlEntry = Entry<number, PageControlItemData>

const entries = source({
  key: (entry: PageControlEntry) => entry.key,
  disabled: (entry) => entry.data.disabled,
})

const SCRUB = 'scrub'

export const pageControlShape = state({
  options: { items: [] as readonly PageControlEntry[] },
  owns: { active: controlled(null as number | null) },
  internal: { scrubbedAt: internal(null as number | null) },
  collection: (options) => entries.of(options.items),
})

type PageControlSnapshot = typeof pageControlShape.__snapshot

export const activeOf = (state: PageControlSnapshot) => state.active

const dragging = listening<PageControlSnapshot>([pointer.drag], (state, input) => {
  if (!input.is(pointer.drag) || input.pointerType === 'mouse' || !input.point) return undefined

  return keep(pageControlShape.scrubbedAt.set(state, input.point.x), [act.measure<number>({ name: SCRUB, items: 'all', rect: true })])
})

const scrubbing: Step<PageControlSnapshot> = (state, input) => {
  if (!input.is(measure.done) || input.measured?.name !== SCRUB) return undefined

  const { scrubbedAt } = state
  if (scrubbedAt === null) return keep(state)

  const hit = input.measured.items.find(([, { rect }]) => rect !== undefined && rect.x <= scrubbedAt && scrubbedAt <= rect.x + rect.width)
  if (!hit) return keep(state)

  const [index] = hit
  if (index === state.active || !collection.isNavigable(state.collection, index)) return keep(state)

  return keep(pageControlShape.active.set(state, index), [act.focus(index)])
}

const tabOf = (selected: boolean, focusable = selected) => ({
  role: 'tab',
  tabIndex: focusable ? 0 : -1,
  'aria-selected': selected,
  'data-active': selected,
})

export const currentTabOf = (current: boolean) => ({ ...tabOf(current), 'aria-current': current ? 'page' : undefined })

const tabStopOf = (state: PageControlSnapshot) => {
  if (state.active !== null && collection.isNavigable(state.collection, state.active)) return state.active

  return collection.first(state.collection)
}

export const tabPart = pageControlShape.part((state, key) => [state.active === key, tabStopOf(state) === key] as const, ([selected, focusable]) => tabOf(selected, focusable))

export const pageControlWidget = defineWidget({
  state: pageControlShape,

  step: [
    dragging,
    scrubbing,
    roving({ active: pageControlShape.active, strategy: 'focus', wrap: true }),
  ],

  output: {
    root: pageControlShape.part(() => [] as const, () => ({ role: 'tablist' })),
    tab: tabPart,
  },
})
