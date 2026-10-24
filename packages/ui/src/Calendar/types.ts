export type CalendarValue<S extends CalendarSelection> = S extends 'single' ? string : S extends 'range' ? [start: string, end: string] : string[]
export type CalendarView = 'day' | 'month' | 'year'
export type CalendarSelection = 'single' | 'multiple' | 'range'
export type CalendarDatesDisabled = string | string[] | ((date: string) => boolean)