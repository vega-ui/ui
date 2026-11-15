import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { Slot } from '../../../Slot';
import { GridRowProvider } from '../../contexts';

export interface GridRowProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Zero-based row index for all descendant cells.
   * Provided to descendants via context.
   */
  row: number

  /**
   * When `true`, renders the child element instead of a `<div>`, merging the props,
   * for example a `<tr>`.
   *
   * @default false
   */
  asChild?: boolean
}

/**
 * GridRow groups a set of grid cells under a shared row index
 */
export const GridRow: FC<PropsWithChildren<GridRowProps>> = ({ children, row, asChild, className, ...props }) => {
  const Element = asChild ? Slot : 'div'

  return (
    <GridRowProvider row={row}>
      <Element {...props} role='row' className={csx(style.row, className)}>
        {children}
      </Element>
    </GridRowProvider>
  )
}