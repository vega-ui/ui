/**
 * Resolves a length given as a fraction of `total` (`0.5`) or in pixels
 * (`'120px'`) to pixels, never more than `total`.
 */
export const resolveLength = (length: number | `${number}px`, total: number) => {
  if (typeof length === 'number') return Math.min(length * total, total)

  return Math.min(parseFloat(length), total)
}
