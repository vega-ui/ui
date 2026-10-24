/**
 * Turns a date format such as `dd.MM.yyyy` into the lowercase template of the
 * date fields (`dd.mm.yyyy`): the letter groups of the format joined with the
 * given separator.
 */
export const getDateTemplate = (format: string, separator: string) => {
  const segments = format.toLowerCase().split(/[^a-z]+/).filter((segment) => segment !== '')
  return segments.join(separator)
}
