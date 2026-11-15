import { Input, key } from '../input'

const TEXT_INPUT_TYPES = new Set(['text', 'search', 'url', 'tel', 'email', 'password', 'number', 'date', 'time', 'datetime-local', 'month', 'week'])

const CARET_KEYS = new Set([key.arrowLeft.name, key.arrowRight.name, key.home.name, key.end.name, key.backspace.name, key.delete.name, key.space.name])

const LINE_KEYS = new Set([key.arrowUp.name, key.arrowDown.name, key.pageUp.name, key.pageDown.name, key.enter.name])

const isMultiline = (element: Element) => element instanceof HTMLTextAreaElement || (element as HTMLElement).isContentEditable === true

export const isTextEntry = (element: Element): boolean => {
  if (element instanceof HTMLTextAreaElement) return true
  if (element instanceof HTMLInputElement) return TEXT_INPUT_TYPES.has(element.type)
  if (element instanceof HTMLSelectElement) return true

  return (element as HTMLElement).isContentEditable === true
}

export const inOpenPopup = (item: Element, target: Element): boolean => {
  if (target.getAttribute('aria-expanded') === 'true') return true

  const popup = target.closest(':popover-open, dialog[open]')
  return popup !== null && item.contains(popup)
}

export const yieldsToNative = (target: Element, input: Input): boolean => {
  if (input.type !== 'key') return false
  if (!isTextEntry(target)) return false
  if (input.mods.has('mod')) return false
  if (CARET_KEYS.has(input.name)) return true
  if (LINE_KEYS.has(input.name) && isMultiline(target)) return true

  return input.char !== undefined && !input.mods.has('alt')
}
