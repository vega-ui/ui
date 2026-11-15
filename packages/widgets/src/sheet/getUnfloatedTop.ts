/**
 * Returns the top of a floating panel before its gap, given the top it is
 * painted at. The gap grows with the top up to `inset` at `lowestTop`, so a
 * panel placed by this value moves exactly as far as its painted top should.
 */
export const getUnfloatedTop = (paintedTop: number, lowestTop: number, inset: number) => {
  if (lowestTop <= inset || paintedTop <= 0) return paintedTop
  if (paintedTop >= lowestTop - inset) return paintedTop + inset

  return paintedTop * lowestTop / (lowestTop - inset)
}
