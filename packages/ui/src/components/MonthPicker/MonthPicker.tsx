import { FC, PropsWithChildren } from 'react';
import { DataGridPicker, DataGridPickerProps } from '../DataGridPicker';

export type MonthPickerProps = DataGridPickerProps<number>

/**
 * MonthPicker is a thin wrapper around DataGridPicker specialized for
 * selecting months. It forwards all DataGridPicker props, applies a
 * default size of `"xs"`, and automatically sets the initial active
 * month to the current month when `defaultActive` is not provided.
 *
 * Custom month layouts can be composed by passing children, allowing
 * full control over how months are rendered within the grid.
 */
export const MonthPicker: FC<PropsWithChildren<MonthPickerProps>> = ({ children, defaultActive, size = 'xs', ...props }) => {
  return (
    <DataGridPicker {...props} size={size} defaultActive={defaultActive ?? new Date().getMonth()}>
      {children}
    </DataGridPicker>
  )
}