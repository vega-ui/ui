const ISO_TIME = /^(\d{2}):(\d{2})(?::(\d{2}))?$/

/**
 * Checks that a value is a `HH:mm` or `HH:mm:ss` time of a day.
 */
export const isISOTime = (value?: string): value is string => {
  const match = ISO_TIME.exec(value ?? '')
  if (!match) return false

  const [, hours, minutes, seconds = '0'] = match
  return Number(hours) <= 23 && Number(minutes) <= 59 && Number(seconds) <= 59
}
