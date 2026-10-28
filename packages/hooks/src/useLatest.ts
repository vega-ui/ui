import type { RefObject } from 'react'
import { useLayoutEffect, useRef } from 'react'

export const useLatest = <T>(value: T): RefObject<T> => {
  const ref = useRef(value)

  useLayoutEffect(() => {
    ref.current = value
  }, [value])

  return ref
}