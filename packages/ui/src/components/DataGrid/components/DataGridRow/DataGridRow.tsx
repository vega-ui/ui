import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { DataGridRowProvider } from '../../providers';

export interface DataGridRowProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Zero-based row index for all descendant cells.
   * Provided to descendants via context.
   */
  row: number
}

/**
 * DataGridRow groups a set of grid cells under a shared row index
 */
export const DataGridRow: FC<PropsWithChildren<DataGridRowProps>> = ({ children, row, className, ...props }) => {
  return (
    <DataGridRowProvider row={row}>
      <div {...props} role='row' className={csx(style.row, className)}>
        {children}
      </div>
    </DataGridRowProvider>
  )
}