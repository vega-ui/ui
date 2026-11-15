export type { CalendarDatesDisabled } from '@vega-ui/widgets/dates'
export type CalendarValue<S extends CalendarSelection> = S extends 'single' ? string : S extends 'range' ? [start: string, end: string] : string[]
export type { CalendarView } from '@vega-ui/widgets/calendar'
export type CalendarSelection = 'single' | 'multiple' | 'range'
export type CalendarVariant = 'primary' | 'secondary' | (string & {})
export type CalendarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | (string & {})
