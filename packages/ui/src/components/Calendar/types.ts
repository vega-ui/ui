export type CalendarPicker = 'month' | 'year' | 'day'
export type CalendarSelection = 'single' | 'multiple' | 'range'
export type CalendarDatesDisabled = Date | Date[] | ((d: Date) => boolean)