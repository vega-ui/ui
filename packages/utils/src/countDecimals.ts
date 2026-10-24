/**
 * Counts the decimals of a number as JavaScript prints it, also in exponent
 * notation: `0.25` → 2, `1.5e-7` → 8, `100` → 0.
 */
export const countDecimals = (value: number) => {
  const [mantissa, exponent = '0'] = String(value).toLowerCase().split('e')
  const fraction = mantissa.split('.')[1]?.length ?? 0

  return Math.max(0, fraction - Number(exponent))
}
