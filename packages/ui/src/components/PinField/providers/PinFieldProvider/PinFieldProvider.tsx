'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { PinContext, PinFieldContextState } from './context.ts';

export type PinProviderProps = PinFieldContextState

export const PinFieldProvider: FC<PropsWithChildren<PinProviderProps>> = ({
  inputId,
  slotClassName,
  size,
  error,
  selectionRange,
  onSelectionRangeChange,
  disabled,
  placeholder,
  inputRef,
  value,
  maxLength,
  children
}) => {
  const providerValue = useMemo(() => ({
    inputId,
    size,
    selectionRange, 
    onSelectionRangeChange, 
    placeholder, 
    inputRef, 
    value,
    maxLength,
    disabled,
    error,
    slotClassName,
  }), [disabled, inputId, inputRef, error, maxLength, onSelectionRangeChange, placeholder, slotClassName, selectionRange, size, value])

  return (
    <PinContext.Provider value={providerValue}>
      {children}
    </PinContext.Provider>
  )
}