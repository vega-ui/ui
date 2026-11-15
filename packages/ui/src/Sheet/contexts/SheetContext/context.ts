'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { sheetShape, sheetWidget } from '@vega-ui/widgets/sheet';

export interface SheetContextState {
  handle: WidgetHandle<typeof sheetShape>
}

export const [SheetProvider, useSheetContext] = createContext<SheetContextState>('SheetContext', {
  handle: createHandle(sheetWidget, { snapPoints: undefined, steppedSnapPoints: false }, { id: 'sheet' }),
})
