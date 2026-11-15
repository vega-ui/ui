'use client';

import { CalendarSystem, gregorianCalendar } from '@vega-ui/i18n';
import { createContext } from '../../../internals/context';
import { CalendarSelection, CalendarSize, CalendarVariant, CalendarView } from '../../types';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { createCalendar, CalendarShape, CalendarWidget } from '@vega-ui/widgets/calendar';

export interface CalendarInternalContextState {
  today?: string
  calendar: CalendarSystem
  locale: string
  view: CalendarView
  selection: CalendarSelection
  size: CalendarSize
  variant: CalendarVariant
  disabled?: boolean
  readOnly?: boolean
  headingId?: string
  handle: WidgetHandle<CalendarShape>
  widget: CalendarWidget
  changeFocusedDate(date: string): void
  closeView(): void
  toggleView(view: Exclude<CalendarView, 'day'>): void
  prev(): void
  next(): void
}

export type CalendarContextState = Pick<
  CalendarInternalContextState,
  'today' | 'view' | 'locale' | 'calendar' | 'headingId' | 'changeFocusedDate' | 'toggleView' | 'closeView' | 'prev' | 'next'
>

const defaultWidget = createCalendar()

export const [CalendarProvider, useCalendarInternalContext] = createContext<CalendarInternalContextState>('CalendarContext', {
  handle: createHandle(defaultWidget, { calendar: gregorianCalendar, today: undefined, min: undefined, max: undefined, isDisabled: () => false, selected: [], autoFocus: undefined, disabled: false, yearsPerPage: 12 }, { id: 'calendar' }),
  widget: defaultWidget,
  calendar: gregorianCalendar,
  locale: 'en-US',
  changeFocusedDate() {},
  closeView() {},
  toggleView() {},
  prev() {},
  next() {},
  selection: 'single',
  size: 'xs',
  variant: 'secondary',
  view: 'day',
})

export const useCalendarContext = (): CalendarContextState => {
  const { today, view, locale, calendar, headingId, changeFocusedDate, toggleView, closeView, prev, next } = useCalendarInternalContext()

  return { today, view, locale, calendar, headingId, changeFocusedDate, toggleView, closeView, prev, next }
}
