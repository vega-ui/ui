import { FC } from 'react';
import { createInput } from '@vega-ui/core';
import { IndexedSnapScroller, IndexedSnapScrollerProps } from '../../../IndexedSnapScroller';
import { ACTIVATE_WITHIN } from '@vega-ui/widgets/grid'
import { useGridContext } from '../../contexts';

export type GridScrollerProps = IndexedSnapScrollerProps

/**
 * GridScroller integrates IndexedSnapScroller with Grid focus management.
 *
 * When a page snaps into view and the active cell is not on it, the first
 * available (non-excluded) cell of the page becomes the active cell, so the
 * keyboard and focus restoration stay on the visible page.
 */
export const GridScroller: FC<GridScrollerProps> = ({ onScrollSnapChanging: _onScrollSnapChanging, ...props }) => {
  const { handle } = useGridContext()

  const onScrollSnapChanging = (element: HTMLElement, index: number) => {
    handle.send(createInput(ACTIVATE_WITHIN, { keys: handle.elements.within(element) }))
    _onScrollSnapChanging?.(element, index)
  }

  return <IndexedSnapScroller {...props} onScrollSnapChanging={onScrollSnapChanging} />
}
