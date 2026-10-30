/**
 * Returns how far an element moves when dragged `overshoot` pixels past its
 * limit, with the resistance of iOS scroll views: the further the drag, the
 * less the element follows, never moving farther than `dimension`.
 */
export const rubberBand = (overshoot: number, dimension: number, constant = 0.55) => {
  const distance = Math.abs(overshoot)
  const moved = (1 - 1 / ((distance * constant) / dimension + 1)) * dimension

  return Math.sign(overshoot) * moved
}
