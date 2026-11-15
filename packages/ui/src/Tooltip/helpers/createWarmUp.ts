/**
 * Creates a shared warm-up window, like the one macOS uses for tooltips:
 * `isWarm` is true while anything holds it and for `duration` milliseconds
 * after the last hold is released, so the next element can skip its delay.
 * A new hold calls `hide` of the previous one, so only one element is shown at a time.
 */
export const createWarmUp = (duration: number) => {
  let held = 0
  let warmUntil = 0
  let hideLast: (() => void) | undefined

  return {
    hold: (hide?: () => void) => {
      hideLast?.()
      hideLast = hide
      held++

      return () => {
        held--
        warmUntil = Date.now() + duration
        if (hideLast === hide) hideLast = undefined
      }
    },
    isWarm: () => held > 0 || Date.now() < warmUntil,
  }
}

export const createTooltipGroup = () => createWarmUp(500)

export const tooltipWarmUp = createTooltipGroup()
