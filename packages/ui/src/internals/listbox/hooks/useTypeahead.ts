import { KeyboardEvent, useRef } from 'react';
import { matchTypeahead } from '@vega-ui/utils';
import { useEventCallback } from '@vega-ui/hooks';

export interface UseTypeaheadOptions {
  enabled?: boolean
  timeout?: number
}

export const useTypeahead = ({ enabled = true, timeout = 500 }: UseTypeaheadOptions) => {
  const search = useRef({ query: '', time: 0 })

  return useEventCallback((
    event: KeyboardEvent<HTMLElement>,
    items: ReadonlyArray<{ label: string, disabled?: boolean }>,
    activeIndex: number | null,
  ) => {
    if (!enabled || event.altKey || event.key.length !== 1) return null

    const now = Date.now()
    const searching = search.current.query !== '' && now - search.current.time <= timeout

    if (event.key === ' ' && !searching) return null

    const query = searching ? search.current.query + event.key : event.key
    search.current = { query, time: now }

    return matchTypeahead(items, query, activeIndex)
  })
}
