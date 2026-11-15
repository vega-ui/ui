'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { CalendarSystem, gregorianCalendar } from '@vega-ui/i18n';
import { CalendarDatesDisabled } from '../../../Calendar';
import { dateRangeFieldShape, dateRangeFieldWidget } from '@vega-ui/widgets/date-range-field';

export interface DateRangeFieldContextState {
  handle: WidgetHandle<typeof dateRangeFieldShape>
  calendar: CalendarSystem
  locale?: string
  today?: string
  disabled?: boolean
  readOnly?: boolean
  disabledDates?: CalendarDatesDisabled
  min?: string
  max?: string
}

export const [DateRangeFieldProvider, useDateRangeFieldContext] = createContext<DateRangeFieldContextState>('DateRangeFieldContext', {
  handle: createHandle(dateRangeFieldWidget, {
    format: 'dd.MM.yyyy',
    separator: '.',
    rangeSeparator: ' – ',
    calendar: gregorianCalendar,
    today: undefined,
    min: undefined,
    max: undefined,
    disabledDates: undefined,
  }, { id: 'date-range-field' }),
  calendar: gregorianCalendar,
})
