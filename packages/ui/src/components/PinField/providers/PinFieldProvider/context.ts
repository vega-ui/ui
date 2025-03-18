'use client';

import { Context, createContext, RefObject } from 'react';

export interface PinFieldContextState {
  inputId?: string
  size?: 'small' | 'medium' | 'large'
  maxLength?: number
  value: string
  placeholder?: string
  inputRef?: RefObject<HTMLInputElement | null>
  slotClassName?: string
  disabled?: boolean
  error?: boolean
  selectionRange: [number, number] | []
  onSelectionRangeChange: (selectionRange: [number, number]) => void
}

export const defaultPinContext: PinFieldContextState = {
  inputId: undefined,
  size: 'medium',
  maxLength: undefined,
  value: '',
  inputRef: undefined,
  disabled: false,
  error: false,
  selectionRange: [],
  slotClassName: undefined,
  onSelectionRangeChange: () => undefined
}

export const PinContext: Context<PinFieldContextState> = createContext(defaultPinContext)