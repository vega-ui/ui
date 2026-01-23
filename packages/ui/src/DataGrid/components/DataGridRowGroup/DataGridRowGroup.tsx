import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { DataGridRowGroupProvider } from '../../contexts';
import { DataGridScope } from '../../types';

export interface DataGridRowGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Optional logical group for grid cells.
   * Allows the DataGrid to treat cells as part of the same page or section.
   */
  scope?: DataGridScope
}

/**
 * DataGridRowGroup represents a logical grouping of rows within a DataGrid.
 */
export const DataGridRowGroup: FC<PropsWithChildren<DataGridRowGroupProps>> = ({ children, scope, ...props }) => {
  return (
    <DataGridRowGroupProvider scope={scope}>
      <div role='rowgroup' {...props}>
        {children}
      </div>
    </DataGridRowGroupProvider>
  )
}