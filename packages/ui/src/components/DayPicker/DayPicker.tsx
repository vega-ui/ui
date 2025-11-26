import { FC, PropsWithChildren } from 'react';
import { DataGridPicker, DataGridPickerProps } from '../DataGridPicker';
import { getCurrentDate } from '@vega-ui/utils';

export type DayPickerProps = DataGridPickerProps<number>

/**
 * DayPicker is a high-level calendar day selection component built on
 * top of DataGridPicker. It provides the selection engine, keyboard
 * navigation, focus management, and range behavior, while leaving the
 * visual layout fully customizable through composition.
 *
 * By default, the active (focused) cell is set to the current date
 * using a UNIX timestamp (via getCurrentDate().getTime()), ensuring
 * that keyboard navigation and range selection start from “today.”
 *
 * The component does not define its own layout — you are expected to
 * supply children such as DayPickerLayout, DayPickerRowGroup, or a
 * fully custom grid. All single / multiple / range selection modes,
 * disabled logic, min/max constraints, and picker sizing come directly
 * from DataGridPicker.
 */

export const DayPicker: FC<PropsWithChildren<DayPickerProps>> = ({ children, size = 'xs', ...props }) => {
  return (
    <DataGridPicker {...props} size={size} defaultActive={getCurrentDate().getTime()}>
      {children}
    </DataGridPicker>
  )
}