'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { NumberFieldSize } from '../../types';
import { numberFieldShape, numberFieldWidget } from '@vega-ui/widgets/number-field';

export interface NumberFieldContextState {
  handle: WidgetHandle<typeof numberFieldShape>
  size?: NumberFieldSize
  isMin?: boolean
  isMax?: boolean
  disabled?: boolean
  max?: number
  min?: number
  decrement(): void
  increment(): void
}

export const [NumberFieldProvider, useNumberFieldContext] = createContext<NumberFieldContextState>('NumberFieldContext', {
  handle: createHandle(numberFieldWidget, {
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    step: 1,
    maximumFractionDigits: 2,
    allowEmpty: true,
    changeOnWheel: true,
  }, { id: 'number-field' }),
  size: 'md',
  decrement() {
    return
  },
  increment() {
    return
  },
})
