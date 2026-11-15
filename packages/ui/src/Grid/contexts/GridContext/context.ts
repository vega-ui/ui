'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { createGrid, GridCellData, GridShape, GridWidget } from '@vega-ui/widgets/grid';
import { GridKey } from '@vega-ui/widgets/grid';

export type GridHandle<Key extends GridKey = GridKey> = WidgetHandle<GridShape<Key>, GridCellData>

export interface GridContextState<Key extends GridKey = GridKey> {
  handle: GridHandle<Key>
  grid: GridWidget<Key>
}

const grid = createGrid()

export const eraseKey = <Key extends GridKey>(context: GridContextState<Key>): GridContextState => context as unknown as GridContextState

export const [GridProvider, useGridContext] = createContext<GridContextState>('GridContext', {
  handle: createHandle(grid, grid.emptyOptions, { id: 'grid' }),
  grid,
})
