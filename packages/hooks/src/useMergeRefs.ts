import { Ref, useMemo } from 'react'
import { mergeRefs } from '@vega-ui/utils'

/**
 * Merges `refs` into one callback ref that keeps its identity until one of them
 * changes, so that React does not detach and attach them on every render.
 * The number of `refs` must not change between renders.
 */
export const useMergeRefs = <T,>(refs: Array<Ref<T> | undefined | null>) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => mergeRefs(refs), refs)
}
