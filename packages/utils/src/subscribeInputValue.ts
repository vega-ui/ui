/**
 * Calls `onValue` with the element's text now, on every `input` event and
 * after its form is reset. Returns the unsubscribe function.
 */
export const subscribeInputValue = (
  element: HTMLElement & { value: string },
  onValue: (value: string) => void,
) => {
  const form = element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement ? element.form : null
  let resetTimeout: ReturnType<typeof setTimeout> | undefined

  const notify = () => onValue(element.value)
  const onReset = () => {
    resetTimeout = setTimeout(notify)
  }

  notify()
  element.addEventListener('input', notify)
  form?.addEventListener('reset', onReset)

  return () => {
    element.removeEventListener('input', notify)
    form?.removeEventListener('reset', onReset)
    clearTimeout(resetTimeout)
  }
}
