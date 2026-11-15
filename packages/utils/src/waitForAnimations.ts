/**
 * Resolves when all current animations of the element have finished or been canceled.
 */
export const waitForAnimations = (element: Element) => {
  return Promise.allSettled(element.getAnimations().map((animation) => animation.finished))
}
