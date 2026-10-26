import { RefObject, useEffect } from 'react'
import { subscribeFormReset } from '@vega-ui/utils'
import { useEventCallback } from './useEventCallback'

/**
 * Calls `onReset` when a form that owns the element in `ref` or a control
 * inside it is reset, before the browser restores the default values of its
 * controls.
 */
export const useFormReset = (ref: RefObject<Element | null>, onReset: () => void) => {
  const reset = useEventCallback(onReset)

  useEffect(() => {
    if (!ref.current) return

    return subscribeFormReset(ref.current, reset)
  }, [ref, reset])
}
