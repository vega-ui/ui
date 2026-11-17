import { browser, collection, controlled, defineWidget, Entry, Field, focus, idOf, internal, keep, listening, pointer, roving, source, state } from '@vega-ui/core'

export type TabsActivation = 'automatic' | 'manual'

export type TabsOrientation = 'horizontal' | 'vertical'

export interface TabsItemData {
  readonly disabled: boolean
}

export type TabsEntry = Entry<string, TabsItemData>

export const PANEL = 'panel'

const entries = source({
  key: (entry: TabsEntry) => entry.key,
  disabled: (entry) => entry.data.disabled,
})

export const tabsShape = state({
  options: { items: [] as readonly TabsEntry[], activation: 'automatic' as TabsActivation, orientation: 'horizontal' as TabsOrientation },
  owns: { value: controlled(null as string | null) },
  internal: { active: internal(null as string | null) },
  collection: (options) => entries.of(options.items),
})

type TabsSnapshot = typeof tabsShape.__snapshot

export const selectedOf = (state: TabsSnapshot) => state.value ?? collection.first(state.collection) ?? null

const show = (state: TabsSnapshot, key: string) => tabsShape.value.set(tabsShape.active.set(state, key), key)

const current: Field<TabsSnapshot, string | null> = {
  name: 'active',
  get: (state) => state.active ?? selectedOf(state),
  set: (state, key) => {
    if (key !== null && state.options.activation !== 'manual') return show(state, key)

    return tabsShape.active.set(state, key)
  },
}

const tabStopOf = (state: TabsSnapshot) => {
  const focusable = current.get(state)
  if (focusable !== null && collection.isNavigable(state.collection, focusable)) return focusable

  return collection.first(state.collection)
}

const pressing = listening<TabsSnapshot>([pointer.press], (state, input) => {
  if (!input.is(pointer.press) || input.key === undefined || !collection.isNavigable(state.collection, input.key)) return undefined

  return keep(show(state, input.key))
})

const pointing = listening<TabsSnapshot>([pointer.down], (state, input) => {
  if (!input.is(pointer.down) || input.key === undefined || !collection.isNavigable(state.collection, input.key)) return undefined

  return keep(tabsShape.active.set(state, input.key))
})

const leaving = listening<TabsSnapshot>([focus.leave], (state, input) => {
  if (!input.is(focus.leave)) return undefined

  return keep(tabsShape.active.set(state, null))
})

const revealing = listening<TabsSnapshot>([browser.reveal], (state, input) => {
  if (!input.is(browser.reveal) || input.part !== PANEL || !collection.has(state.collection, input.key)) return undefined

  return keep(tabsShape.value.set(state, input.key))
})

export const tabPart = tabsShape.part(
  (state, key) => [idOf(state, 'tab', key), idOf(state, 'panel', key), selectedOf(state) === key, tabStopOf(state) === key] as const,
  ([id, panelId, selected, stop]) => ({ id, role: 'tab', 'aria-selected': selected, 'aria-controls': panelId, tabIndex: stop ? 0 : -1, 'data-selected': selected }),
)

export const panelPart = {
  ...tabsShape.part(
    (state, key) => [idOf(state, PANEL, key), idOf(state, 'tab', key), selectedOf(state) === key] as const,
    ([id, tabId, selected]) => ({ id, role: 'tabpanel', 'aria-labelledby': tabId, tabIndex: selected ? 0 : undefined, hidden: selected ? undefined : 'until-found', 'aria-hidden': selected ? undefined : true, 'data-selected': selected }),
  ),
  live: tabsShape.part(
    (state, key) => [selectedOf(state) === key] as const,
    ([selected]) => ({ hidden: selected ? undefined : 'until-found' }),
  ),
}

export const tabsWidget = defineWidget({
  state: tabsShape,

  step: [
    pressing,
    pointing,
    leaving,
    revealing,
    roving({ active: current, strategy: 'focus', wrap: true }),
  ],

  output: {
    list: tabsShape.part((state) => [state.options.orientation] as const, ([orientation]) => ({ role: 'tablist', 'aria-orientation': orientation })),
    tab: tabPart,
    panel: panelPart,
  },
})
