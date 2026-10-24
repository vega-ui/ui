import { useDayPickerCellContext } from '../../../DayPicker';

/**
 * The day of the surrounding `CalendarDay` template: its `YYYY-MM-DD` date
 * (`undefined` for an empty overflow cell), fields in the calendar system,
 * the formatted label, and whether it belongs to the rendered month.
 */
export const useCalendarDayContext = useDayPickerCellContext
