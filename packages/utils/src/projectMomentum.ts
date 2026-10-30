/**
 * Returns the distance in pixels that a flick with `velocity` pixels per
 * second travels before it stops, using the deceleration of iOS scroll views.
 */
export const projectMomentum = (velocity: number, decelerationRate = 0.998) =>
  ((velocity / 1000) * decelerationRate) / (1 - decelerationRate)
