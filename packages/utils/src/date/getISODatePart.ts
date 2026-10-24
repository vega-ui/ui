/**
 * Date part (`YYYY-MM-DD`) of a `YYYY-MM-DD` or `YYYY-MM-DDTHH:mm[:ss]` string.
 * Returns `undefined` for `undefined`.
 */
export const getISODatePart = (value?: string) => value?.slice(0, 10)
