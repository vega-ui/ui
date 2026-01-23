import { FC } from 'react';
import { DataGridSelectableRowGroup, DataGridSelectableRowGroupProps } from '../../../DataGridSelectable';
import { DataGridScope } from '../../../DataGrid';

export interface DataGridPickerRowGroupProps extends DataGridSelectableRowGroupProps {
  /**
   * The `scope` prop is required and identifies the logical group of cells
   * rendered by this row group.
   *
   * When used with `DataGridIndexedSnapScroller`, the scope usually matches
   * the current index or page.
   *
   * Providing a scope allows the DataGrid to restore focus to the first
   * available cell when the index changes and new cells are rendered.
   */
  scope?: DataGridScope
}

/**
 * DataGridPickerRowGroup is a structural wrapper component used inside DataGridPicker
 */
export const DataGridPickerRowGroup: FC<DataGridPickerRowGroupProps> = (props) => {
  return <DataGridSelectableRowGroup {...props} />
}