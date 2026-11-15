import { Collection } from '../collection'

export type GridWrap = 'horizontal' | 'vertical' | 'both'

export type GridIntent = 'forward' | 'backward' | 'up' | 'down' | 'rowStart' | 'rowEnd' | 'gridStart' | 'gridEnd' | 'pageUp' | 'pageDown'

export interface GridCellPosition<Key> {
  readonly key: Key
  readonly row: number
  readonly col: number
}

export interface GridCellFlags {
  readonly excluded?: boolean
  readonly selectable?: boolean
}

export interface GridCell<Key> extends GridCellPosition<Key> {
  readonly excluded: boolean
  readonly selectable: boolean
}

interface Line<Key> {
  readonly indexes: number[]
  readonly keys: Map<number, Key>
}

export interface GridLayout<Key> {
  readonly cells: ReadonlyMap<Key, GridCell<Key>>
  readonly keys: readonly Key[]
  readonly rows: readonly number[]
  readonly cols: readonly number[]
  readonly byRow: ReadonlyMap<number, Line<Key>>
  readonly byCol: ReadonlyMap<number, Line<Key>>
  readonly compare: (first: Key, second: Key) => number
  readonly collection: Collection<Key>
}

export interface GridLayoutOptions<Key> {
  readonly positions: readonly GridCellPosition<Key>[]
  readonly flags?: ReadonlyMap<Key, GridCellFlags>
  readonly isExcluded?: (key: Key) => boolean
  readonly compare?: (first: Key, second: Key) => number
}

const ascending = (first: number, second: number) => first - second

const addTo = <Key>(lines: Map<number, Line<Key>>, index: number, at: number, key: Key) => {
  let line = lines.get(index)
  if (!line) lines.set(index, (line = { indexes: [], keys: new Map() }))

  line.indexes.push(at)
  line.keys.set(at, key)
}

const sortLines = <Key>(lines: Map<number, Line<Key>>) => {
  for (const line of lines.values()) line.indexes.sort(ascending)
}

const byPosition = <Key>(cells: ReadonlyMap<Key, GridCellPosition<Key>>) => (first: Key, second: Key) => {
  const firstCell = cells.get(first)
  const secondCell = cells.get(second)
  if (firstCell && !secondCell) return -1
  if (!firstCell && secondCell) return 1
  if (!firstCell || !secondCell) return 0

  return firstCell.row - secondCell.row || firstCell.col - secondCell.col
}

export const createGridLayout = <Key>({ positions, flags, isExcluded, compare }: GridLayoutOptions<Key>): GridLayout<Key> => {
  const known = new Map<Key, GridCellPosition<Key>>(positions.map((cell) => [cell.key, cell]))
  const order = compare ?? byPosition(known)

  const cells = new Map<Key, GridCell<Key>>()
  const byRow = new Map<number, Line<Key>>()
  const byCol = new Map<number, Line<Key>>()

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
  const collection: Collection<Key> = {
    order: every,
    index: new Map(every.map((key, position) => [key, position])),
    disabled: new Set(every.filter((key) => cells.get(key)!.excluded)),
    labels: new Map(),
  }

  return { cells, keys, rows, cols, byRow, byCol, compare: order, collection }
}

const edgeOf = <Key>(lines: ReadonlyMap<number, Line<Key>>, index: number | undefined, side: 'first' | 'last') => {
  const line = index === undefined ? undefined : lines.get(index)
  if (!line) return undefined

  return line.keys.get(side === 'first' ? line.indexes[0] : line.indexes[line.indexes.length - 1])
}

const nextIn = (indexes: readonly number[], current: number, direction: 1 | -1) => {
  const position = indexes.indexOf(current)
  if (position === -1) return undefined

  return indexes[position + direction]
}

const along = <Key>(lines: ReadonlyMap<number, Line<Key>>, all: readonly number[], lineIndex: number, at: number, direction: 1 | -1, wraps: boolean) => {
  const line = lines.get(lineIndex)
  if (!line) return undefined

  const next = nextIn(line.indexes, at, direction)
  if (next !== undefined) return line.keys.get(next)
  if (!wraps) return undefined

  return edgeOf(lines, nextIn(all, lineIndex, direction), direction === 1 ? 'first' : 'last')
}

export const gridNeighbor = <Key>(layout: GridLayout<Key>, from: Key, intent: GridIntent, wrap: GridWrap | undefined): Key | undefined => {
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

export const gridBetween = <Key>(layout: GridLayout<Key>, from: Key, to: Key): Key[] => {
  if (!layout.cells.has(from) || !layout.cells.has(to)) return []

  const [start, end] = layout.compare(from, to) > 0 ? [to, from] : [from, to]

  return layout.keys
    .filter((key) => layout.compare(key, start) >= 0 && layout.compare(key, end) <= 0)
    .sort(layout.compare)
}
