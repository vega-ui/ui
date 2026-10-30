'use client';

import { FC, ReactNode } from 'react';
import { useControlledState } from '@vega-ui/hooks';
import { DrawerProvider } from './contexts';
import { DrawerPosition } from './types';

export interface DrawerProps {
  /**
   * Controls whether the drawer is default open.
   */
  defaultOpen?: boolean;

  /**
   * Controls whether the drawer is open.
   * When provided, the component becomes controlled.
   */
  open?: boolean

  /**
   * Callback fired when the drawer's open state changes.
   * Receives the new state as a boolean.
   */
  onChangeOpen?: (value: boolean) => void

  /**
   * Defines from which side of the screen the drawer appears. `start` and `end` follow the writing direction,
   * like CSS logical properties: in right-to-left text `end` is the left side.
   */
  position?: DrawerPosition

  /**
   * The content to display inside the drawer.
   * Typically, includes navigation, settings, or forms.
   */
  children?: ReactNode
}

/** A Drawer is a UI component that slides in from the side of the screen to display additional content or navigation options, often used for menus or sidebars */
export const Drawer: FC<DrawerProps> = ({
  position = 'end',
  defaultOpen = false,
  open: controlledOpen,
  onChangeOpen: controlledOnChangeOpen,
  children,
}) => {
  const [open, setOpen] = useControlledState(controlledOpen, defaultOpen, controlledOnChangeOpen)

  return (
    <DrawerProvider
      open={open}
      changeOpen={setOpen}
      position={position}
    >
      {children}
    </DrawerProvider>
  )
}
