/**
 * Turns a time format such as `HH:mm:ss` (hours, minutes and seconds, as in
 * Unicode date patterns) into the template of the time segments (`HH:MM:SS`).
 */
export const getTimeTemplate = (format: string) => format.replace(/m+/g, 'MM').replace(/s+/g, 'SS')
