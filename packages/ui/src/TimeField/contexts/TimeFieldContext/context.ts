'use client';

import { RefObject } from 'react'
import { createContext } from '@vega-ui/react-context';

export interface TimeFieldContextState {
  template: string
  text?: string
  changeText?(text: string): void
  inputRef?: RefObject<HTMLInputElement | null>
  min?: string
  max?: string
  step?: number
}

export const [TimeFieldProvider, useTimeFieldContext] = createContext<TimeFieldContextState>('TimeFieldContext', {
  template: 'HH:MM'
})
