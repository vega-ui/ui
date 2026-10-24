'use client';

import { FC } from 'react';
import { addCalendarMonths } from '@vega-ui/i18n';
import { DayPickerLayout, type DayPickerLayoutProps } from '../DayPickerLayout';
import { useDayPickerContext, useDayPickerScrollerContext } from '../../contexts';
import { useIndexedSnapScrollerContext } from '../../../IndexedSnapScroller';

export type DayPickerScrollerLayoutProps = Omit<DayPickerLayoutProps, 'month' | 'offset'>

/**
 * DayPickerScrollerLayout renders the month of the current scroller page:
 * the scroller's reference month shifted by the page index in the
 * DayPicker's calendar system.
 */
export const DayPickerScrollerLayout: FC<DayPickerScrollerLayoutProps> = (props) => {
  const { index } = useIndexedSnapScrollerContext()
  const { referenceMonth } = useDayPickerScrollerContext()
  const { calendar } = useDayPickerContext()
  
  return <DayPickerLayout scope={index} month={addCalendarMonths(calendar, referenceMonth, index)} offset={index} {...props} />
}
