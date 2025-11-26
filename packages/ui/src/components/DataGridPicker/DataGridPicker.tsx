import { DataGridSelectable, DataGridSelectableProps } from '../DataGridSelectable';
import { DataGridPickerSize, DataGridPickerVariant } from './types';
import { DataGridPickerProvider } from './providers';
import { DataGridCellKey } from '../DataGrid';

export interface DataGridPickerProps<K extends DataGridCellKey = DataGridCellKey> extends DataGridSelectableProps<K> {
  /**
   * Controls the item’s visual size.
   * Useful for adapting the picker to compact or large layouts.
   */
  size?: DataGridPickerSize
  
  /**
   * Visual appearance preset for the picker.
   */
  variant?: DataGridPickerVariant
}

/**
 * DataGridPicker is a higher-level component built on top of DataGridSelectable that allows users to pick or highlight elements (cells) within a selectable grid
 */
export const DataGridPicker = <K extends DataGridCellKey = DataGridCellKey>({ wrap = 'horizontal', size = 'md', excludeDisabled = true, variant = 'secondary', children, ...props }: DataGridPickerProps<K>) => {
  return (
    <DataGridPickerProvider variant={variant} size={size}>
      <DataGridSelectable
        wrap={wrap}
        excludeDisabled={excludeDisabled}
        {...props}
      >
        {children}
      </DataGridSelectable>
    </DataGridPickerProvider>
  )
}