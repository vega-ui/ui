import { FC } from 'react';
import { IndexedSnapScrollerContent, IndexedSnapScrollerContentProps } from '../../../IndexedSnapScroller';

export type DataGridPickerScrollerContentProps = IndexedSnapScrollerContentProps

/**
 * DataGridPickerScrollerContent is a thin wrapper around IndexedSnapScrollerContent
 * used within DataGridPicker.
 *
 * It exists for semantic clarity and API consistency, allowing picker-related
 * layouts to explicitly depend on a scroller-aware content container without
 * introducing additional behavior.
 */
export const DataGridPickerScrollerContent: FC<DataGridPickerScrollerContentProps> = (props) => {
  return <IndexedSnapScrollerContent {...props} />
}