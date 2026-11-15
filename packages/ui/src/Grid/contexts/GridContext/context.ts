'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { createGrid, GridCellData, GridShape, GridWidget } from '@vega-ui/widgets/grid';
import { GridKey } from '@vega-ui/widgets/grid';

export type GridHandle<K extends GridKey = GridKey> = WidgetHandle<GridShape<K>, GridCellData>

export interface GridContextState<K extends GridKey = GridKey> {
  handle: GridHandle<K>
  grid: GridWidget<K>
}

const grid = createGrid()

export const eraseKey = <K extends GridKey>(context: GridContextState<K>): GridContextState => context as unknown as GridContextState

export const [GridProvider, useGridContext] = createContext<GridContextState>('GridContext', {
  handle: createHandle(grid, grid.emptyOptions, { id: 'grid' }),
  grid,
})
