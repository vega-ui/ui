'use client';

import { Ref, RefObject } from 'react';
import { createContext } from '@vega-ui/react-context';
import { PinFieldSize } from '../../types';

export interface PinFieldContextState {
  size?: PinFieldSize
  placeholder?: string
  inputRef?: Ref<HTMLInputElement | null>
  innerInputRef: RefObject<HTMLInputElement | null>
  disabled?: boolean
  selectedAll?: boolean
  error?: boolean
  maxLength: number
  active: number
  value: string
  setValue(value: string): void
  setActive(position: number): void
  setSelectedAll(all: boolean): void
  syncActive(index?: number, expand?: boolean): void
}

export const [PinFieldProvider, usePinFieldContext] = createContext<PinFieldContextState>('PinFieldContext', {
  size: 'md',
  inputRef: undefined,
  innerInputRef: { current: null },
  disabled: false,
  maxLength: 4,
  error: false,
  active: 0,
  value: '',
  setValue() {},
  setActive() {},
  setSelectedAll() {},
  syncActive() {},
})