import { FC, PropsWithChildren } from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'
import { DataGridPickerScrollerContent, type DataGridPickerScrollerContentProps } from '../../../DataGridPicker';

export type DayPickerScrollerContentProps = Omit<DataGridPickerScrollerContentProps, 'index'>

/**
 * DayPickerScrollerContent is a styled wrapper around
 * IndexedSnapScrollerContent, representing a single paged “month”
 * within a scrollable DayPicker.
 *
 * It applies DayPicker-specific layout styles while preserving all
 * snapping, indexing, and focus behavior provided by the underlying
 * scroller system.
 *
 * By omitting the `index` prop, the component automatically receives
 * its page index from the surrounding IndexedSnapScroller context.
 */
export const DayPickerScrollerContent: FC<PropsWithChildren<DayPickerScrollerContentProps>> = ({ className, ...props }) => {
  return <DataGridPickerScrollerContent {...props} className={csx(style.content, className)} />
}