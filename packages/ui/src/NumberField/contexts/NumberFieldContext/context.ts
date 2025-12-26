'use client';

import { createContext } from '@vega-ui/react-context';
import { NumberFieldSize } from '../../types';
import { InputEvent, Ref } from 'react';

export interface NumberFieldContextState {
  size?: NumberFieldSize
  error?: boolean
  isMin?: boolean
  isMax?: boolean
  disabled?: boolean
  max?: number
  min?: number
  inputRef?: Ref<HTMLInputElement>
  decrement(): void
  increment(): void
  onInput?(e: InputEvent<HTMLInputElement>): void
}

export const [NumberFieldProvider, useNumberFieldContext] = createContext<NumberFieldContextState>('PhoneFieldContext', {
  size: 'md',
  error: false,
  decrement() {
    return
  },
  increment() {
    return
  }
})