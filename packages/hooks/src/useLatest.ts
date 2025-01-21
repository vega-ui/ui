import type { MutableRefObject } from 'react'
import { useRef } from 'react'
import { useIsomorphicLayoutEffect } from './useIsomophicLayoutEffect.ts'

export const useLatest = <T>(value: T): MutableRefObject<T> => {
  const ref = useRef(value)

  useIsomorphicLayoutEffect(() => {
    ref.current = value
  }, [value])

  return ref
}