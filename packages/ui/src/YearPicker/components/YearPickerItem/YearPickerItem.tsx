import { FC } from 'react';
import { GridCell, GridCellProps, GridItem, GridItemSize, GridItemVariant } from '../../../Grid';
import { useYearPickerContext } from '../../contexts';

export interface YearPickerItemProps extends Omit<GridCellProps, 'value' | 'asChild'> {
  /**
   * Date of the cell as a `YYYY-MM-DD` string, used as its key in the grid.
   */
  value?: string

  /**
   * Controls the item’s visual size. Defaults to the size of the YearPicker.
   */
  size?: GridItemSize

  /**
   * Color of the selected item. Defaults to the variant of the YearPicker.
   */
  variant?: GridItemVariant
}

/**
 * YearPickerItem is a year cell of the YearPicker: a GridCell keyed by the
 * first day of its year with the look of GridItem. The size and variant
 * come from the YearPicker unless set on the item.
 */
export const YearPickerItem: FC<YearPickerItemProps> = ({ value, size, variant, children, ...props }) => {
  const { size: _size, variant: _variant } = useYearPickerContext()

  return (
    <GridCell value={value} {...props} asChild>
      <GridItem size={size ?? _size} variant={variant ?? _variant}>
        {children}
      </GridItem>
    </GridCell>
  )
}
