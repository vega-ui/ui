'use client';

import { RefObject } from 'react';
import { createContext } from '@vega-ui/react-context';

export interface PinFieldContextState {
  inputId?: string
  size?: 'small' | 'medium' | 'large' | string
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

export const [PinFieldProvider, usePinFieldContext] = createContext<PinFieldContextState>('PinContext', {
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
})