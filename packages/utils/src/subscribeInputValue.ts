import { subscribeFormReset } from './subscribeFormReset'

/**
 * Calls `onValue` with the element's text now, on every `input` event and
 * with its default text when its form is reset. Returns the unsubscribe function.
 */
export const subscribeInputValue = (
  element: HTMLElement & { value: string },
  onValue: (value: string) => void,
) => {
  const notify = () => onValue(element.value)

  const onReset = () => {
    if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) return

    onValue(element.defaultValue)
  }

  notify()
  element.addEventListener('input', notify)
  const unsubscribeReset = subscribeFormReset(element, onReset)

  return () => {
    element.removeEventListener('input', notify)
    unsubscribeReset()
  }
}
