import { FC, HTMLAttributes, PropsWithChildren, Ref } from 'react';
import { csx } from '@vega-ui/utils';
import { useMergeRefs } from '@vega-ui/hooks';
import { useGridCell } from '../../hooks';
import { GridKey } from '../../types';
import { Slot } from '../../../Slot';
import style from '../GridCell/style.module.css';

export interface GridRowHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Column index of the header (0-based), placed like a cell in its row.
   */
  col: number;

  /**
   * External ref to the header element.
   */
  ref?: Ref<HTMLDivElement>;

  /**
   * Stable key of the header in the grid. If omitted, a key is derived as `${row}:${col}`.
   */
  value?: GridKey;

  /**
   * When `true`, renders the child element instead of a `<div>`, merging the props,
   * for example a `<th>`.
   *
   * @default false
   */
  asChild?: boolean;

  /**
   * Excludes the header from focus traversal, for a header with nothing to interact with,
   * like the weekday names of a calendar. A header with a button, such as a sort button,
   * stays focusable so the keyboard reaches the button.
   */
  excluded?: boolean;
}

/**
 * GridRowHeader names the cells of its row with `role="rowheader"`. It takes part in the keyboard
 * navigation like a cell but is never selected.
 */
export const GridRowHeader: FC<PropsWithChildren<GridRowHeaderProps>> = ({
  children,
  asChild,
  ref,
  col,
  className,
  excluded,
  value,
  ...props
}) => {
  const Element = asChild ? Slot : 'div'
  const cell = useGridCell({ value, col, excluded, selectable: false })
  const cellRef = useMergeRefs([ref, cell.ref])

  return (
    <Element
      {...cell.props}
      role='rowheader'
      ref={cellRef}
      className={csx(style.cell, className)}
      {...props}
    >
      {children}
    </Element>
  )
}
