import type { GridCellPosition } from '@vega-ui/core'

export type GridKey = string | number;

export type GridLayoutCell<K = GridKey> = GridCellPosition<K>

export type GridKeyMatcher<K = GridKey> = (key: K) => boolean
export type GridKeys<K = GridKey> = GridKeyMatcher<K> | K[] | K

export type GridSelection = 'single' | 'multiple' | 'range'
export type GridRangePosition = 'start' | 'between' | 'end'
