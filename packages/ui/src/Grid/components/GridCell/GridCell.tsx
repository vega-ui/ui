import { FC, HTMLAttributes, PropsWithChildren, Ref } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { useMergeRefs } from '@vega-ui/hooks';
import { useGridCell } from '../../hooks';
import { isInteractiveChild } from '../../helpers';
import { Slot } from '../../../Slot';
import { GridKey } from '../../types';

export interface GridCellProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Column index of the cell (0-based). Together with the `row` of its `GridRow` it places the cell
   * for the keyboard navigation and orders the cells when the grid has no `compare`.
   */
  col: number;

  /**
   * External ref to the cell root element, merged with the internal registration ref.
   */
  ref?: Ref<HTMLDivElement>;

  /**
   * Stable key that identifies the cell: what `value` of the Grid holds when the cell is selected.
   * If omitted, a key is derived as `${row}:${col}` from row/col.
   */
  value?: GridKey;

  /**
   * When `true`, renders children via `Slot` and forwards props/refs to the child
   * element instead of using a native `<div>`.
   *
   * An interactive child, like a `<button>` or a link, keeps its own role: the cell has no `role="gridcell"`
   * then, so the control is announced for what it is. For a cell that holds a control, prefer the control inside
   * the cell with `tabIndex={-1}`, `<GridCell><button tabIndex={-1}>…</button></GridCell>`: the cell stays
   * a gridcell, Enter and F2 move the focus into the control and Escape brings it back.
   *
   * @default false
   */
  asChild?: boolean;

  /**
   * Excludes the cell from focus traversal: it is not focusable and never becomes active.
   * Adds to the `exclude` of the root Grid.
   */
  excluded?: boolean;

  /**
   * Marks the cell as disabled with `aria-disabled`: it cannot be selected.
   * Adds to the `disabled` of the root Grid. A disabled cell stays focusable.
   */
  disabled?: boolean;
}

/**
 * GridCell registers itself in the Grid, exposes ARIA roles/attributes,
 * and manages focusability based on the grid’s active cell. In a grid with
 * `selection` it has `aria-selected`, and a click, Enter or Space selects it.
 * With `selection='range'` the selected cells have `data-range`: `start`, `between` or `end`.
 */
export const GridCell: FC<PropsWithChildren<GridCellProps>> = ({
  children,
  asChild,
  ref,
  col,
  className,
  excluded,
  disabled,
  value,
  ...props
}) => {
  const Element = asChild ? Slot : 'div'
  const cell = useGridCell({ value, col, excluded, disabled, selectable: true, interactive: asChild === true && isInteractiveChild(children) })
  const cellRef = useMergeRefs([ref, cell.ref])

  return (
    <Element
      {...cell.props}
      ref={cellRef}
      className={csx(style.cell, className)}
      {...props}
    >
      {children}
    </Element>
  )
}
