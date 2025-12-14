import { FC, PropsWithChildren } from 'react';
import { IndexedSnapScroller, IndexedSnapScrollerProps } from '../../../IndexedSnapScroller';

export type YearPickerScrollerProps = IndexedSnapScrollerProps

/**
 * YearPickerScroller is a semantic wrapper around IndexedSnapScroller
 * that provides paged, scroll-snap navigation for year grids.
 * It enables smooth decade-style scrolling, preserves the active page,
 * and integrates seamlessly with YearPicker layouts. The component
 * accepts all SnapScroller props and adds no custom logic of its own.
 */
export const YearPickerScroller: FC<PropsWithChildren<YearPickerScrollerProps>> = (props) => {
  return (
    <IndexedSnapScroller {...props} />
  )
}