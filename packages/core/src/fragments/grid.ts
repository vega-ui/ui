import { Collection } from '../collection'

export type GridWrap = 'horizontal' | 'vertical' | 'both'

export type GridIntent = 'forward' | 'backward' | 'up' | 'down' | 'rowStart' | 'rowEnd' | 'gridStart' | 'gridEnd' | 'pageUp' | 'pageDown'

export interface GridCellPosition<K> {
  readonly key: K
  readonly row: number
  readonly col: number
}

export interface GridCellFlags {
  readonly excluded?: boolean
  readonly selectable?: boolean
}

export interface GridCell<K> extends GridCellPosition<K> {
  readonly excluded: boolean
  readonly selectable: boolean
}

interface Line<K> {
  readonly indexes: number[]
  readonly keys: Map<number, K>
}

export interface GridLayout<K> {
  readonly cells: ReadonlyMap<K, GridCell<K>>
  readonly keys: readonly K[]
  readonly rows: readonly number[]
  readonly cols: readonly number[]
  readonly byRow: ReadonlyMap<number, Line<K>>
  readonly byCol: ReadonlyMap<number, Line<K>>
  readonly compare: (first: K, second: K) => number
  readonly collection: Collection<K>
}

export interface GridLayoutOptions<K> {
  readonly positions: readonly GridCellPosition<K>[]
  readonly flags?: ReadonlyMap<K, GridCellFlags>
  readonly isExcluded?: (key: K) => boolean
  readonly compare?: (first: K, second: K) => number
}

const ascending = (first: number, second: number) => first - second

const addTo = <K>(lines: Map<number, Line<K>>, index: number, at: number, key: K) => {
  let line = lines.get(index)
  if (!line) lines.set(index, (line = { indexes: [], keys: new Map() }))

  line.indexes.push(at)
  line.keys.set(at, key)
}

const sortLines = <K>(lines: Map<number, Line<K>>) => {
  for (const line of lines.values()) line.indexes.sort(ascending)
}

const byPosition = <K>(cells: ReadonlyMap<K, GridCellPosition<K>>) => (first: K, second: K) => {
  const firstCell = cells.get(first)
  const secondCell = cells.get(second)
  if (firstCell && !secondCell) return -1
  if (!firstCell && secondCell) return 1
  if (!firstCell || !secondCell) return 0

  return firstCell.row - secondCell.row || firstCell.col - secondCell.col
}

export const createGridLayout = <K>({ positions, flags, isExcluded, compare }: GridLayoutOptions<K>): GridLayout<K> => {
  const known = new Map<K, GridCellPosition<K>>(positions.map((cell) => [cell.key, cell]))
  const order = compare ?? byPosition(known)

  const cells = new Map<K, GridCell<K>>()
  const byRow = new Map<number, Line<K>>()
  const byCol = new Map<number, Line<K>>()

  for (const { key, row, col } of positions) {
    const cellFlags = flags?.get(key)
    const excluded = cellFlags?.excluded === true || isExcluded?.(key) === true
    cells.set(key, { key, row, col, excluded, selectable: cellFlags?.selectable !== false })

    if (excluded) continue
    addTo(byRow, row, col, key)
    addTo(byCol, col, row, key)
  }

  sortLines(byRow)
  sortLines(byCol)

  const rows = [...byRow.keys()].sort(ascending)
  const cols = [...byCol.keys()].sort(ascending)
  const keys = rows.flatMap((row) => byRow.get(row)!.indexes.map((col) => byRow.get(row)!.keys.get(col)!))
  const every = [...cells.keys()]
  const collection: Collection<K> = {
    order: every,
    index: new Map(every.map((key, position) => [key, position])),
    disabled: new Set(every.filter((key) => cells.get(key)!.excluded)),
    labels: new Map(),
  }

  return { cells, keys, rows, cols, byRow, byCol, compare: order, collection }
}

const edgeOf = <K>(lines: ReadonlyMap<number, Line<K>>, index: number | undefined, side: 'first' | 'last') => {
  const line = index === undefined ? undefined : lines.get(index)
  if (!line) return undefined

  return line.keys.get(side === 'first' ? line.indexes[0] : line.indexes[line.indexes.length - 1])
}

const nextIn = (indexes: readonly number[], current: number, direction: 1 | -1) => {
  const position = indexes.indexOf(current)
  if (position === -1) return undefined

  return indexes[position + direction]
}

const along = <K>(lines: ReadonlyMap<number, Line<K>>, all: readonly number[], lineIndex: number, at: number, direction: 1 | -1, wraps: boolean) => {
  const line = lines.get(lineIndex)
  if (!line) return undefined

  const next = nextIn(line.indexes, at, direction)
  if (next !== undefined) return line.keys.get(next)
  if (!wraps) return undefined

  return edgeOf(lines, nextIn(all, lineIndex, direction), direction === 1 ? 'first' : 'last')
}

export const gridNeighbor = <K>(layout: GridLayout<K>, from: K, intent: GridIntent, wrap: GridWrap | undefined): K | undefined => {
  const cell = layout.cells.get(from)
  if (!cell || cell.excluded) return undefined

  const horizontal = wrap === 'horizontal' || wrap === 'both'
  const vertical = wrap === 'vertical' || wrap === 'both'

  switch (intent) {
    case 'forward': return along(layout.byRow, layout.rows, cell.row, cell.col, 1, horizontal)
    case 'backward': return along(layout.byRow, layout.rows, cell.row, cell.col, -1, horizontal)
    case 'down': return along(layout.byCol, layout.cols, cell.col, cell.row, 1, vertical)
    case 'up': return along(layout.byCol, layout.cols, cell.col, cell.row, -1, vertical)
    case 'rowStart': return edgeOf(layout.byRow, cell.row, 'first')
    case 'rowEnd': return edgeOf(layout.byRow, cell.row, 'last')
    case 'gridStart': return edgeOf(layout.byRow, layout.rows[0], 'first')
    case 'gridEnd': return edgeOf(layout.byRow, layout.rows[layout.rows.length - 1], 'last')
    case 'pageDown': return edgeOf(layout.byCol, cell.col, 'last')
    case 'pageUp': return edgeOf(layout.byCol, cell.col, 'first')
  }
}

export const gridBetween = <K>(layout: GridLayout<K>, from: K, to: K): K[] => {
  if (!layout.cells.has(from) || !layout.cells.has(to)) return []

  const [start, end] = layout.compare(from, to) > 0 ? [to, from] : [from, to]

  return layout.keys
    .filter((key) => layout.compare(key, start) >= 0 && layout.compare(key, end) <= 0)
    .sort(layout.compare)
}
