'use client';

import { FC } from 'react';
import { DayPickerLayout, type DayPickerLayoutProps } from '../DayPickerLayout';
import { useDayPickerScrollerContext } from '../../contexts';
import { useIndexedSnapScrollerContext } from '../../../IndexedSnapScroller';

export type DayPickerScrollerLayoutProps = Omit<DayPickerLayoutProps, 'offset'>

/**
 * DayPickerScrollerLayout is a scroller-aware wrapper around
 * DayPickerLayout. It automatically injects the current page `index`
 * from IndexedSnapScroller into the layout's `offset` prop, enabling
 * month-by-month paging when used inside a DayPickerScroller.
 *
 * This component contains no additional logic — it simply binds the
 * grid generator to the scroller's virtual index, ensuring that each
 * snapped page renders the correct shifted month.
 */
export const DayPickerScrollerLayout: FC<DayPickerScrollerLayoutProps> = (props) => {
  const { index } = useIndexedSnapScrollerContext()
  const { referenceDate } = useDayPickerScrollerContext()
  
  const year = referenceDate.getFullYear()
  const month = referenceDate.getMonth()
  
  return <DayPickerLayout scope={index} year={year} month={month} offset={index} {...props} />
}