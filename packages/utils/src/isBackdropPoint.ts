import { inRange } from './inRange'

export interface PointerPoint {
  target: EventTarget | null
  clientX: number
  clientY: number
}

/**
 * Returns whether a press on a modal `<dialog>` landed on its `::backdrop`:
 * the dialog itself is the target, but the point lies outside its box.
 */
export const isBackdropPoint = (dialog: Element, { target, clientX, clientY }: PointerPoint) => {
  if (target !== dialog) return false

  const rect = dialog.getBoundingClientRect()
  const inside = inRange(clientX, [rect.left, rect.right]) && inRange(clientY, [rect.top, rect.bottom])

  return !inside
}
