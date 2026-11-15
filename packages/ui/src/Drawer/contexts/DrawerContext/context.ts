'use client';

import { createContext } from '../../../internals/context';
import { createHandle, WidgetHandle } from '../../../internals/widget';
import { drawerShape, drawerWidget } from '@vega-ui/widgets/drawer';
import { DrawerPosition } from '../../types';

export interface DrawerContextState {
  handle: WidgetHandle<typeof drawerShape>
  position?: DrawerPosition
}

export const [DrawerProvider, useDrawerContext] = createContext<DrawerContextState>('DrawerContext', {
  handle: createHandle(drawerWidget, { position: 'end' }, { id: 'drawer' }),
})
