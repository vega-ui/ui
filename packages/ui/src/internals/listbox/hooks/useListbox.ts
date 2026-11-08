import { KeyboardEvent, RefObject, useId, useState } from 'react';
import { isActivationKey, scrollIntoContainer } from '@vega-ui/utils';
import { resolveListNavigation } from '../lib/resolveListNavigation';
import { createListboxStore, ListboxActiveSource, ListboxItem } from '../lib/createListboxStore';
import { useEventCallback } from '@vega-ui/hooks';
import { useTypeahead } from './useTypeahead';

export interface UseListboxOptions {
  typeahead?: boolean
  isSelected(value: string | number): boolean
  onSelect(value: string | number): void
}

export const useListbox = (listRef: RefObject<HTMLElement | null>, { typeahead = true, isSelected, onSelect }: UseListboxOptions) => {
  const id = useId()
  const [store] = useState(createListboxStore)
  const search = useTypeahead({ enabled: typeahead })

  const moveActive = (item: ListboxItem | undefined, source: ListboxActiveSource) => {
    store.setActive(item?.id, source)

    if (item && listRef.current) scrollIntoContainer(listRef.current, item.element)
  }

  const activate = useEventCallback(() => {
    if (store.get().activeId) return

    const enabled = store.getItems().filter((item) => !item.disabled)

    moveActive(enabled.find((item) => isSelected(item.value)) ?? enabled[0], 'auto')
  })

  const selectActive = useEventCallback(() => {
    const activeId = store.get().activeId
    if (!activeId) return

    const item = store.getItem(activeId)
    if (item && !item.disabled) onSelect(item.value)
  })

  const move = useEventCallback((event: KeyboardEvent<HTMLElement>) => {
    if (event.ctrlKey || event.metaKey) return false

    const items = store.getItems().map((item) => ({
      ...item,
      label: item.label ?? item.element.textContent ?? '',
    }))

    const position = items.findIndex((item) => item.id === store.get().activeId)
    const activeIndex = position === -1 ? null : position
    const target = resolveListNavigation(event.key, items, activeIndex) ?? search(event, items, activeIndex)

    if (target === null) return false

    event.preventDefault()

    const item = items[target]
    if (!item) return false

    moveActive(item, 'keyboard')
    return true
  })

  const navigate = useEventCallback((event: KeyboardEvent<HTMLElement>) => {
    move(event)
    if (event.defaultPrevented || !isActivationKey(event)) return

    event.preventDefault()
    selectActive()
  })

  return { id, store, activate, selectActive, move, moveActive, navigate }
}
