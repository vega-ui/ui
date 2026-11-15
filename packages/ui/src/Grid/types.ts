export type { GridIntent, GridWrap } from '@vega-ui/core'
export type { GridKey, GridLayoutCell, GridKeyMatcher, GridKeys, GridSelection, GridRangePosition } from '@vega-ui/widgets/grid'

export interface GridApiRef<K> {
  focus(key?: K): void
}

export type GridItemSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | (string & {})
export type GridItemVariant = 'primary' | 'secondary' | (string & {})
