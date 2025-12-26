'use client';

import { Ref, RefObject } from 'react';
import { createContext } from '@vega-ui/react-context';
import { PinFieldSize } from '../../types.ts';

export interface PinFieldContextState {
  size?: PinFieldSize
  placeholder?: string
  inputRef?: Ref<HTMLInputElement | null>
  innerInputRef?: RefObject<HTMLInputElement | null>
  disabled?: boolean
  selectedAll?: boolean
  error?: boolean
  maxLength: number
  active: number
  value: string
  setActive(position: number): void
  setSelectedAll(all: boolean): void
  setValue(value: string): void
  syncActive(index?: number, expand?: boolean): void
}

export const [PinFieldProvider, usePinFieldContext] = createContext<PinFieldContextState>('PinContext', {
  size: 'md',
  inputRef: undefined,
  disabled: false,
  maxLength: 4,
  error: false,
  active: 0,
  value: '',
  setActive() {},
  setSelectedAll() {},
  setValue() {},
  syncActive() {},
})