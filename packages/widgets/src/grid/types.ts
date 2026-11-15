import type { GridCellPosition } from '@vega-ui/core'

export type GridKey = string | number;

export type GridLayoutCell<Key = GridKey> = GridCellPosition<Key>

export type GridKeyMatcher<Key = GridKey> = (key: Key) => boolean
export type GridKeys<Key = GridKey> = GridKeyMatcher<Key> | Key[] | Key

export type GridSelection = 'single' | 'multiple' | 'range'
export type GridRangePosition = 'start' | 'between' | 'end'
