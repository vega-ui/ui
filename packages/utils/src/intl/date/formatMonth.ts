/**
 * Formats a numeric month using Intl.DateTimeFormat.
 *
 * @param month  Month index (e.g., 0 = Jan)
 * @param locale Locale or list of locales (default: 'en-US')
 * @param format Formatting style for the year ('numeric' | '2-digit')
 */
export const formatMonth = (
  month: number,
  locale: Intl.LocalesArgument = 'en-US',
  format: Intl.DateTimeFormatOptions['month'] = 'numeric'
): string => {
  return new Intl.DateTimeFormat(locale, { month: format }).format(new Date(1970, month, 1));
};