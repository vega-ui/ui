import { getDateTemplate } from './getDateTemplate'
import { getTimeTemplate } from './getTimeTemplate'

export interface GetDateTimeTemplateOptions {
  /**
   * Date format such as `dd.MM.yyyy`.
   */
  dateFormat: string

  /**
   * Separator between the date segments.
   */
  dateSeparator: string

  /**
   * Separator between the date and the time.
   */
  separator: string

  /**
   * Time format such as `HH:mm` or `HH:mm:ss`.
   */
  timeFormat: string
}

/**
 * Template of a date and time (`dd.mm.yyyy, HH:MM`): the date template of
 * `dateFormat` (see `getDateTemplate`), the separator and the time template
 * of `timeFormat` (see `getTimeTemplate`).
 */
export const getDateTimeTemplate = ({ dateFormat, dateSeparator, separator, timeFormat }: GetDateTimeTemplateOptions) =>
  `${getDateTemplate(dateFormat, dateSeparator)}${separator}${getTimeTemplate(timeFormat)}`
