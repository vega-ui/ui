'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { CalendarSystem, gregorianCalendar } from '@vega-ui/i18n';
import { CalendarDatesDisabled } from '../../../Calendar';
import { dateTimeFieldShape, dateTimeFieldWidget } from '@vega-ui/widgets/date-time-field';

export interface DateTimeFieldContextState {
  handle: WidgetHandle<typeof dateTimeFieldShape>
  calendar: CalendarSystem
  locale?: string
  today?: string
  disabled?: boolean
  readOnly?: boolean
  disabledDates?: CalendarDatesDisabled
  min?: string
  max?: string
}

export const [DateTimeFieldProvider, useDateTimeFieldContext] = createContext<DateTimeFieldContextState>('DateTimeFieldContext', {
  handle: createHandle(dateTimeFieldWidget, {
    dateFormat: 'dd.MM.yyyy',
    dateSeparator: '.',
    separator: ', ',
    timeFormat: 'HH:mm',
    timeStep: 1,
    calendar: gregorianCalendar,
    today: undefined,
    min: undefined,
    max: undefined,
    disabledDates: undefined,
  }, { id: 'date-time-field' }),
  calendar: gregorianCalendar,
})
