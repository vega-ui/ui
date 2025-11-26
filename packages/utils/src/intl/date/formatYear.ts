/**
 * Formats a numeric year using Intl.DateTimeFormat.
 *
 * @param year  Full year number (e.g., 2025)
 * @param locale Locale or list of locales (default: 'en-US')
 * @param format Formatting style for the year ('numeric' | '2-digit')
 */
export const formatYear = (
  year: number,
  locale: Intl.LocalesArgument = 'en-US',
  format: Intl.DateTimeFormatOptions['year'] = 'numeric'
): string => {
  return new Intl.DateTimeFormat(locale, { year: format }).format(new Date(year, 0, 1));
};