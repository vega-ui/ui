import { useCallback, useState } from 'react';
import { useLatest } from './useLatest';

export type UseControlled = <T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: ((v: T, ...args: never[]) => void) | undefined
) => [T, (value: T) => void]

export const useControlledState: UseControlled = <T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (v: T, ...args: never[]) => void,
): [T, (value: T) => void] => {
  const [stateValue, setStateValue] = useState(
    value !== undefined ? value : defaultValue,
  )
  const isControlled = value !== undefined

  const onChangeRef = useLatest(onChange)
  const setValue = useCallback(
    (newValue: T) => {
      if (!isControlled) {
        setStateValue(newValue)
      }
      onChangeRef.current?.(newValue)
    },
    [isControlled, onChangeRef],
  )

  return [isControlled ? value : stateValue, setValue]
}
