import { FormEvent, RefObject, useLayoutEffect, useRef } from 'react'
import { useEventCallback } from './useEventCallback'
import { useFormReset } from './useFormReset'

/**
 * Calls the latest `onValue` when the text of the input in `ref` changes:
 * checked after every render, so a controlled `value` set outside or a
 * rejected keystroke is seen, when its form is reset (the input takes its
 * default value right away, before the render), and from the returned
 * handler, which must be the `onInput` of the input. The copy is updated inside
 * React's event handling, so a controlled input keeps every keystroke.
 */
export const useInputValue = (
  ref: RefObject<HTMLInputElement | null>,
  onValue: (value: string) => void,
) => {
  const lastValue = useRef<string>(undefined)

  const sync = useEventCallback((value: string) => {
    if (value === lastValue.current) return

    lastValue.current = value
    onValue(value)
  })

  useLayoutEffect(() => {
    if (!ref.current) return
    sync(ref.current.value)
  })

  useFormReset(ref, () => {
    if (!ref.current) return

    ref.current.value = ref.current.defaultValue
    sync(ref.current.value)
  })

  return (event: FormEvent<HTMLInputElement>) => sync(event.currentTarget.value)
}
