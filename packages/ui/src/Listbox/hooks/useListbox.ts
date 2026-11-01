import { KeyboardEvent, RefObject, useCallback, useId, useState } from 'react';
import { resolveListNavigation, scrollIntoContainer } from '@vega-ui/utils';
import { useEventCallback, useTypeahead } from '@vega-ui/hooks';

export interface UseListboxOptions {
  typeahead?: boolean
}

export const useListbox = (listRef: RefObject<HTMLElement | null>, { typeahead = true }: UseListboxOptions) => {
  const id = useId()
  const [activeId, setActiveId] = useState<string>()
  const search = useTypeahead({ enabled: typeahead })

  const getOptionId = useCallback((value: string | number) => {
    return `${id}-${typeof value}-${encodeURIComponent(value)}`
  }, [id])

  const clearActive = useCallback((optionId: string) => {
    setActiveId((current) => current === optionId ? undefined : current)
  }, [])

  const moveActive = (option: HTMLElement | null | undefined) => {
    setActiveId(option?.id)

    if (option && listRef.current) scrollIntoContainer(listRef.current, option)
  }

  const activate = useEventCallback(() => {
    if (activeId) return

    const list = listRef.current

    moveActive(
      list?.querySelector<HTMLElement>('[role="option"][aria-selected="true"]:not([aria-disabled="true"])')
      ?? list?.querySelector<HTMLElement>('[role="option"]:not([aria-disabled="true"])')
    )
  })

  const selectActive = useEventCallback(() => {
    if (!activeId) return

    listRef.current?.querySelector<HTMLElement>(`#${CSS.escape(activeId)}`)?.click()
  })

  const move = useEventCallback((event: KeyboardEvent<HTMLElement>) => {
    if (event.ctrlKey || event.metaKey) return null

    const options = [...listRef.current?.querySelectorAll<HTMLElement>('[role="option"]') ?? []]
    const items = options.map((option) => ({
      label: option.dataset.label ?? option.textContent ?? '',
      disabled: option.getAttribute('aria-disabled') === 'true',
    }))

    const position = options.findIndex((option) => option.id === activeId)
    const activeIndex = position === -1 ? null : position
    const target = resolveListNavigation(event.key, items, activeIndex) ?? search(event, items, activeIndex)

    if (target === null) return null

    event.preventDefault()

    const option = options[target]
    if (option) moveActive(option)

    return target
  })

  return { id, activeId, getOptionId, setActiveId, clearActive, activate, selectActive, move }
}
