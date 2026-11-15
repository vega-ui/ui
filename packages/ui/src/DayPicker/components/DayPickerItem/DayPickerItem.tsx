import { FC } from 'react';
import { GridCell, GridCellProps, GridItem, GridItemSize, GridItemVariant } from '../../../Grid';
import { useDayPickerContext } from '../../contexts';

export interface DayPickerItemProps extends Omit<GridCellProps, 'value' | 'asChild'> {
  /**
   * Date of the cell as a `YYYY-MM-DD` string, used as its key in the grid.
   */
  value?: string

  /**
   * Controls the item’s visual size. Defaults to the size of the DayPicker.
   */
  size?: GridItemSize

  /**
   * Color of the selected item. Defaults to the variant of the DayPicker.
   */
  variant?: GridItemVariant
}

/**
 * DayPickerItem is a day cell of the DayPicker: a GridCell keyed by its
 * `YYYY-MM-DD` value with the look of GridItem. The size and variant
 * come from the DayPicker unless set on the item.
 */
export const DayPickerItem: FC<DayPickerItemProps> = ({ value, size, variant, children, ...props }) => {
  const { size: _size, variant: _variant } = useDayPickerContext()

  return (
    <GridCell value={value} {...props} asChild>
      <GridItem size={size ?? _size} variant={variant ?? _variant}>
        {children}
      </GridItem>
    </GridCell>
  )
}
