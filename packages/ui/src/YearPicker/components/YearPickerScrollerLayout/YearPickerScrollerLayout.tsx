import { FC } from 'react';
import { YearPickerLayout, YearPickerLayoutProps } from '../YearPickerLayout';
import { useYearPickerScrollerContext } from '../../hooks';

export type YearPickerScrollerLayoutProps = Omit<YearPickerLayoutProps, 'offset'>

/**
 * YearPickerScrollerLayout is a scroll-aware wrapper around
 * YearPickerLayout. It automatically injects the current virtual
 * page index (from IndexedSnapScroller) into the layout’s `offset`
 * prop, allowing the layout to render the correct year grid for each
 * scroller page. All layout logic remains inside YearPickerLayout.
 */
export const YearPickerScrollerLayout: FC<YearPickerScrollerLayoutProps> = (props) => {
  const { index } = useYearPickerScrollerContext()
  
  return <YearPickerLayout {...props} offset={index} />
}