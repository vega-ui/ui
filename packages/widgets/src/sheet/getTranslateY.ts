/**
 * Returns the vertical translation of a computed `transform` value.
 */
export const getTranslateY = (transform: string) => {
  if (!transform.startsWith('matrix')) return 0

  const values = transform.slice(transform.indexOf('(') + 1, -1).split(',').map(parseFloat)
  if (transform.startsWith('matrix3d')) return values[13]

  return values[5]
}
