import { FC } from 'react';
import { DayPickerItem, DayPickerItemProps } from '../DayPickerItem';
import { useDayPickerCellContext } from '../../contexts';

export type DayPickerCellProps = Omit<DayPickerItemProps, 'col' | 'value'>

/**
 * DayPickerCell is the cell of the DayPicker layouts, placed as their template. It takes its
 * day, column and label from the cell context, so it can be placed as the
 * layout's children with custom content inside.
 */
export const DayPickerCell: FC<DayPickerCellProps> = ({ children, ...props }) => {
  const { col, date, label, inMonth } = useDayPickerCellContext()

  return (
    <DayPickerItem
      col={col}
      value={date}
      disabled={!inMonth}
      excluded={!inMonth}
      {...props}
    >
      {children ?? label}
    </DayPickerItem>
  )
}
