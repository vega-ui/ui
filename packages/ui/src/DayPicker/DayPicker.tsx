import { PropsWithChildren } from 'react';
import { DataGridPicker, DataGridPickerProps } from '../DataGridPicker';
import { getCurrentDate } from '@vega-ui/utils';
import { DataGridSelection } from '../DataGridSelectable';
import { DayPickerProvider } from './contexts';

export interface DayPickerProps<S extends DataGridSelection = 'single'> extends DataGridPickerProps<number, S> {
  /**
   * When provided, determines the calendar year that should be shown (e.g. `2025`)
   */
  year?: number
  
  /**
   * Zero-based month index (`0` = January, `11` = December)
   */
  month?: number
}

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

export const DayPicker = <S extends DataGridSelection = 'single'>({
  children,
  size = 'xs',
  year,
  month,
  ...props
}: PropsWithChildren<DayPickerProps<S>>) => {
  const currentDate = getCurrentDate()
  
  return (
    <DayPickerProvider year={year ?? currentDate.getFullYear()} month={month ?? currentDate.getMonth()}>
      <DataGridPicker size={size} defaultActive={currentDate.getTime()} {...props}>
        {children}
      </DataGridPicker>
    </DayPickerProvider>
  )
}