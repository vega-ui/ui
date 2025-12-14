export type CalendarValue<S extends CalendarSelection> = S extends 'single' ? Date : S extends 'range' ? [Date, Date] : Date[]
export type CalendarPicker = 'month' | 'year' | 'day'
export type CalendarSelection = 'single' | 'multiple' | 'range'
export type CalendarDatesDisabled = Date | Date[] | ((d: Date) => boolean)