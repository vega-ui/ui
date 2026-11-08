/**
 * Creates a shared warm-up window, like the one macOS uses for tooltips:
 * once something calls `warm`, `isWarm` stays true for `duration`
 * milliseconds, so the next element can skip its delay.
 */
export const createWarmUp = (duration: number) => {
  let warmUntil = 0

  return {
    warm: () => {
      warmUntil = Date.now() + duration
    },
    isWarm: () => Date.now() < warmUntil,
  }
}

export const tooltipWarmUp = createWarmUp(500)
