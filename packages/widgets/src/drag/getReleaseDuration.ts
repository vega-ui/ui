/**
 * Returns the duration in milliseconds of a transition that starts at the speed
 * of the pointer released with `velocity` pixels per second, on a curve whose
 * initial speed is `initialSlope` times its average one, at least 40% of `max`.
 * A pointer that is at rest or moves away from the target gets `max`.
 */
export const getReleaseDuration = (distance: number, velocity: number, { initialSlope = 2.25, max = 500 } = {}) => {
  if (distance === 0 || velocity === 0 || Math.sign(distance) !== Math.sign(velocity)) return max

  return Math.min(max, Math.max(max * 0.4, (initialSlope * distance * 1000) / velocity))
}
