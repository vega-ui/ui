import { getIntlLocale } from './getIntlLocale'

type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6

type WeekInfo = { firstDay?: number }

type WeekInfoLocale = Intl.Locale & {
  weekInfo?: WeekInfo
  getWeekInfo?(): WeekInfo
}

const SUNDAY_FIRST_REGIONS = [
  'AG', 'AS', 'BD', 'BR', 'BS', 'BT', 'BW', 'BZ', 'CA', 'CO', 'DM', 'DO', 'ET', 'GT', 'GU', 'HK', 'HN', 'ID',
  'IL', 'IN', 'JM', 'JP', 'KE', 'KH', 'KR', 'LA', 'MH', 'MM', 'MO', 'MT', 'MX', 'MZ', 'NI', 'NP', 'PA', 'PE',
  'PH', 'PK', 'PR', 'PT', 'PY', 'SA', 'SG', 'SV', 'TH', 'TT', 'TW', 'UM', 'US', 'VE', 'VI', 'WS', 'YE', 'ZA', 'ZW',
]

const FRIDAY_FIRST_REGIONS = ['MV']

const SATURDAY_FIRST_REGIONS = ['AF', 'BH', 'DJ', 'DZ', 'EG', 'IQ', 'IR', 'JO', 'KW', 'LY', 'OM', 'QA', 'SD', 'SY']

/**
 * Returns the first day of week for the given locale (0–6), by default the
 * runtime locale
 *
 * 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday,
 * 4 = Thursday, 5 = Friday, 6 = Saturday
 *
 * Reads `Intl.Locale#getWeekInfo()` or `Intl.Locale#weekInfo` (where Sunday is 7).
 * Where neither is available, falls back to the region of the locale
 * (or its likely region, e.g. `fa` → `IR`), Monday by default.
 *
 * @param locale locales argument of `Intl` (e.g. 'en-US', 'ru-RU', 'ar-SA')
 * @returns number (0–6)
 */
export const getFirstDayOfWeek = (locale?: Intl.LocalesArgument): WeekDay => {
  let intlLocale: WeekInfoLocale

  try {
    intlLocale = getIntlLocale(locale)
  } catch {
    return 1
  }

  const weekInfo = intlLocale.getWeekInfo ? intlLocale.getWeekInfo() : intlLocale.weekInfo
  const firstDay = weekInfo?.firstDay

  if (firstDay === 7) return 0
  if (typeof firstDay === 'number' && firstDay >= 1 && firstDay <= 6) return firstDay as WeekDay

  const region = intlLocale.maximize().region ?? ''

  if (SUNDAY_FIRST_REGIONS.includes(region)) return 0
  if (FRIDAY_FIRST_REGIONS.includes(region)) return 5
  if (SATURDAY_FIRST_REGIONS.includes(region)) return 6

  return 1
}
