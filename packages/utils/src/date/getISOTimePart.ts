/**
 * Time part (`HH:mm[:ss]`) of a `YYYY-MM-DDTHH:mm[:ss]` string. Returns
 * `undefined` for `undefined` or a string without a time.
 */
export const getISOTimePart = (value?: string) => {
  if (!value?.includes('T')) return undefined

  return value.slice(value.indexOf('T') + 1)
}
