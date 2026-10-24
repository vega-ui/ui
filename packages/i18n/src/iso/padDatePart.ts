/**
 * Pads a number of a date with leading zeros: `padDatePart(5)` is `05`,
 * `padDatePart(42, 4)` is `0042`.
 */
export const padDatePart = (value: number, length = 2) => String(value).padStart(length, '0')
