'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { timeFieldShape, timeFieldWidget } from '@vega-ui/widgets/time-field';

export interface TimeFieldContextState {
  handle: WidgetHandle<typeof timeFieldShape>
}

export const [TimeFieldProvider, useTimeFieldContext] = createContext<TimeFieldContextState>('TimeFieldContext', {
  handle: createHandle(timeFieldWidget, { format: 'HH:mm', min: undefined, max: undefined, step: 1 }, { id: 'time-field' }),
})
