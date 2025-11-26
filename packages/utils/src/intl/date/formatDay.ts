/**
 * Formats a numeric day using Intl.DateTimeFormat.
 *
 * @param day  Day (e.g., 1)
 * @param month  Month (e.g., 0 = Jan)
 * @param year  Month (e.g., 2025)
 * @param locale Locale or list of locales (default: 'en-US')
 * @param format Formatting style for the year ('numeric' | '2-digit')
 */
export const formatDay = (
  day: number,
  month: number,
  year: number,
  locale: Intl.LocalesArgument = 'en-US',
  format: Intl.DateTimeFormatOptions['day'] = 'numeric'
): string => {
  return new Intl.DateTimeFormat(locale, { day: format }).format(new Date(year, month, day));
};