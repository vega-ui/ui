import { FC } from 'react';
import { DayPickerItem, DayPickerItemProps } from '../DayPickerItem';
import { useDayPickerCellContext } from '../../contexts';

export type DayPickerCellProps = Omit<DayPickerItemProps, 'col' | 'value'>

/**
 * DayPickerCell is the cell of the DayPicker layouts, placed as their template. It takes its
 * day, column and label from the cell context, so it can be placed as the
 * layout's children with custom content inside. Today has `aria-current="date"`.
 */
export const DayPickerCell: FC<DayPickerCellProps> = ({ children, ...props }) => {
  const { col, date, label, inMonth, isToday } = useDayPickerCellContext()

  return (
    <DayPickerItem
      col={col}
      value={date}
      disabled={!inMonth}
      excluded={!inMonth}
      aria-current={isToday ? 'date' : undefined}
      {...props}
    >
      {children ?? label}
    </DayPickerItem>
  )
}
