import { FC } from 'react';
import { YearPickerItem, YearPickerItemProps } from '../YearPickerItem';
import { useYearPickerCellContext } from '../../contexts';

export type YearPickerCellProps = Omit<YearPickerItemProps, 'col' | 'value'>

/**
 * YearPickerCell is the cell of the YearPicker layouts, placed as their template. It takes its
 * year, column and label from the cell context, so it can be placed as the
 * layout's children with custom content inside.
 */
export const YearPickerCell: FC<YearPickerCellProps> = ({ children, ...props }) => {
  const { col, date, label } = useYearPickerCellContext()

  return (
    <YearPickerItem
      col={col}
      value={date}
      {...props}
    >
      {children ?? label}
    </YearPickerItem>
  )
}
