import { useCallback } from 'react';
import { useSnapshot } from '../../internals/widget';
import { GridState } from '@vega-ui/widgets/grid'
import { useGridContext } from '../contexts';
import { GridKey } from '../types';

export const useGridDisabled = (key: GridKey) => {
  const { handle, grid } = useGridContext()

  return useSnapshot(handle, useCallback((state: GridState) => grid.isDisabled(state, key), [grid, key]))
}
