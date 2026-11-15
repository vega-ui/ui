import { FC } from 'react';
import { GridCell, GridCellProps, GridItem, GridItemSize, GridItemVariant } from '../../../Grid';
import { useMonthPickerContext } from '../../contexts';

export interface MonthPickerItemProps extends Omit<GridCellProps, 'value' | 'asChild'> {
  /**
   * Date of the cell as a `YYYY-MM-DD` string, used as its key in the grid.
   */
  value?: string

  /**
   * Controls the item’s visual size. Defaults to the size of the MonthPicker.
   */
  size?: GridItemSize

  /**
   * Color of the selected item. Defaults to the variant of the MonthPicker.
   */
  variant?: GridItemVariant
}

/**
 * MonthPickerItem is a month cell of the MonthPicker: a GridCell keyed by the
 * first day of its month with the look of GridItem. The size and variant
 * come from the MonthPicker unless set on the item.
 */
export const MonthPickerItem: FC<MonthPickerItemProps> = ({ value, size, variant, children, ...props }) => {
  const { size: _size, variant: _variant } = useMonthPickerContext()

  return (
    <GridCell value={value} {...props} asChild>
      <GridItem size={size ?? _size} variant={variant ?? _variant}>
        {children}
      </GridItem>
    </GridCell>
  )
}
