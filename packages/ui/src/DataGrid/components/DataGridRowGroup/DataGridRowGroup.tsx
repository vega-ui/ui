import { FC, HTMLAttributes, PropsWithChildren } from 'react';

export type DataGridRowGroupProps = HTMLAttributes<HTMLDivElement>

/**
 * DataGridRowGroup represents a logical grouping of rows within a DataGrid.
 */
export const DataGridRowGroup: FC<PropsWithChildren<DataGridRowGroupProps>> = ({ children, ...props }) => {
  return (
    <div role='rowgroup' {...props}>
      {children}
    </div>
  )
}