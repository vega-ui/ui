/**
 * Applies pending style changes at once, so that the next change starts its
 * transition from them.
 */
export const flushStyles = (element: Element) => {
  element.getAnimations()
}
