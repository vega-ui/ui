'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { wheelPickerShape, wheelPickerWidget } from '@vega-ui/widgets/wheel-picker';

export interface WheelPickerColumnContextState {
  handle: WidgetHandle<typeof wheelPickerShape>
}

export const [WheelPickerColumnProvider, useWheelPickerColumnContext] = createContext<WheelPickerColumnContextState>('WheelPickerColumnContext', {
  handle: createHandle(wheelPickerWidget, { items: [], loop: false, page: 5, scrollTimeline: true, disabled: false, readOnly: false }, { id: 'wheel-picker-column' }),
})
