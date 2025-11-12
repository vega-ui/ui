/**
 * Returns the first day of week for the given locale (0–6)
 *
 * 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday,
 * 4 = Thursday, 5 = Friday, 6 = Saturday
 *
 * @param locale BCP-47 locale code (e.g. 'en-US', 'ru-RU', 'ar-SA')
 * @returns number (0–6)
 */
export const getFirstDayOfWeek = (locale: string = 'en-US'): 0 | 1 | 2 | 3 | 4 | 5 | 6 => {
  try {
    const loc = new Intl.Locale(locale) as unknown as typeof Intl.Locale & { weekInfo: { firstDay: number } }
    const first = loc?.weekInfo?.firstDay
    if (typeof first === 'number' && first >= 0 && first <= 6) {
      return first as 0 | 1 | 2 | 3 | 4 | 5 | 6
    }
  } catch {
    // ignore and fallback
  }
  
  const lower = locale.toLowerCase()
  
  if (
    lower.startsWith('en-us') ||
    lower.startsWith('en-ca') ||
    lower.startsWith('ph') ||
    lower.startsWith('jp') ||
    lower.startsWith('ja') ||
    lower.startsWith('kr') ||
    lower.startsWith('ko-kr') ||
    lower.startsWith('sa') ||
    lower.startsWith('il') ||
    lower.startsWith('he-il') ||
    lower.startsWith('hk')
  ) {
    return 0
  }
  
  // (Maldives, Bangladesh)
  if (lower.startsWith('mv') || lower.startsWith('bn-bd')) {
    return 5 // Friday
  }
  
  // (Iran, Afghanistan, Egypt historically)
  if (lower.startsWith('ir') || lower.startsWith('af') || lower.startsWith('eg')) {
    return 6 // Saturday
  }
  
  // Default: Monday
  return 1
}
