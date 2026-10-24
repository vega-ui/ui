import { getDefaultLocale } from './getDefaultLocale'

/**
 * The first locale of a locales argument of `Intl` as an `Intl.Locale`, or
 * the runtime locale when none is given. Unicode extensions such as
 * `-u-fw-mon` are kept. Throws a `RangeError` for an invalid locale.
 */
export const getIntlLocale = (locales?: Intl.LocalesArgument) => {
  if (locales === undefined) return new Intl.Locale(getDefaultLocale())
  if (typeof locales === 'string' || locales instanceof Intl.Locale) return new Intl.Locale(locales)

  const [first] = locales
  if (first === undefined) return new Intl.Locale(getDefaultLocale())

  return new Intl.Locale(first)
}
