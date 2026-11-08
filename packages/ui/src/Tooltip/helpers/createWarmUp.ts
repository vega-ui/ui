/**
 * Creates a shared warm-up window, like the one macOS uses for tooltips:
 * `isWarm` is true while anything holds it and for `duration` milliseconds
 * after the last hold is released, so the next element can skip its delay.
 */
export const createWarmUp = (duration: number) => {
  let held = 0
  let warmUntil = 0

  return {
    hold: () => {
      held++

      return () => {
        held--
        warmUntil = Date.now() + duration
      }
    },
    isWarm: () => held > 0 || Date.now() < warmUntil,
  }
}

export const tooltipWarmUp = createWarmUp(500)
