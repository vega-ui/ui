'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { CalendarSystem, gregorianCalendar } from '@vega-ui/i18n';
import { CalendarDatesDisabled } from '../../../Calendar';
import { dateFieldShape, dateFieldWidget } from '@vega-ui/widgets/date-field';

export interface DateFieldContextState {
  handle: WidgetHandle<typeof dateFieldShape>
  calendar: CalendarSystem
  locale?: string
  today?: string
  disabled?: boolean
  readOnly?: boolean
  disabledDates?: CalendarDatesDisabled
  min?: string
  max?: string
}

export const [DateFieldProvider, useDateFieldContext] = createContext<DateFieldContextState>('DateFieldContext', {
  handle: createHandle(dateFieldWidget, {
    format: 'dd.MM.yyyy',
    separator: '.',
    calendar: gregorianCalendar,
    today: undefined,
    min: undefined,
    max: undefined,
    disabledDates: undefined,
  }, { id: 'date-field' }),
  calendar: gregorianCalendar,
})
