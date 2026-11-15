import { FocusInsideAt } from '../step'

const FOCUSABLE = 'a[href], button, input:not([type="hidden"]), select, textarea, [contenteditable]:not([contenteditable="false"]), [tabindex]'

export const focusablesIn = (container: Element): HTMLElement[] => {
  const candidates = container.querySelectorAll<HTMLElement>(FOCUSABLE)

  return [...candidates].filter((element) => !element.matches(':disabled') && element.closest('[hidden], [inert]') === null)
}

export const holdsFocusable = (container: Element) => focusablesIn(container).length > 0

export const focusableAt = (container: Element, at: FocusInsideAt, current: Element | null): HTMLElement | undefined => {
  const focusables = focusablesIn(container)
  if (at === 'first') return focusables[0]

  const position = focusables.findIndex((focusable) => current !== null && focusable.contains(current))
  if (position === -1) return undefined

  const step = at === 'next' ? 1 : -1
  return focusables[(position + step + focusables.length) % focusables.length]
}
