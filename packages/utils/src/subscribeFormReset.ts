/**
 * Calls `onReset` when a form that owns `element` or a control inside it is
 * reset, before the browser restores the default values of its controls.
 * A reset canceled before it reaches the root of `element` is skipped.
 * Returns the unsubscribe function.
 */
export const subscribeFormReset = (element: Element, onReset: () => void) => {
  const root = element.getRootNode()

  const onFormReset = (event: Event) => {
    if (event.defaultPrevented) return
    if (!(event.target instanceof HTMLFormElement)) return

    const controls = Array.from(event.target.elements)
    if (!controls.some((control) => element.contains(control))) return

    onReset()
  }

  root.addEventListener('reset', onFormReset)

  return () => root.removeEventListener('reset', onFormReset)
}
