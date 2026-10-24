import { FC } from 'react';
import { MonthPickerItem, MonthPickerItemProps } from '../MonthPickerItem';
import { useMonthPickerCellContext } from '../../contexts';

export type MonthPickerCellProps = Omit<MonthPickerItemProps, 'col' | 'value'>

/**
 * MonthPickerCell is the cell of the MonthPicker layouts, placed as their template. It takes its
 * month, column and label from the cell context, so it can be placed as the
 * layout's children with custom content inside.
 */
export const MonthPickerCell: FC<MonthPickerCellProps> = ({ children, ...props }) => {
  const { col, date, label } = useMonthPickerCellContext()

  return (
    <MonthPickerItem
      col={col}
      value={date}
      {...props}
    >
      {children ?? label}
    </MonthPickerItem>
  )
}
