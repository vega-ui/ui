'use client';

import { createContext } from '@vega-ui/react-context';
import { NumberFieldSize } from '../../types';
import { Ref } from 'react';

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
  text?: string
  changeText?(text: string): void
}

export const [NumberFieldProvider, useNumberFieldContext] = createContext<NumberFieldContextState>('NumberFieldContext', {
  size: 'md',
  error: false,
  decrement() {
    return
  },
  increment() {
    return
  },
})